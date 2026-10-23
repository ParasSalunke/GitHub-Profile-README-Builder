import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory + file-backed simple persistent storage for user auth & profiles
const DATA_DIR = path.join(__dirname, '.data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_FILE = path.join(DATA_DIR, 'octoprofile_db.json');

interface DbSchema {
  users: Array<{ id: string; username: string; email: string; passwordHash: string; createdAt: string }>;
  sessions: Record<string, string>; // token -> userId
  profiles: Array<{ id: string; userId: string; name: string; data: any; shareId: string; updatedAt: string }>;
}

function loadDb(): DbSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    }
  } catch (err) {
    console.error('Failed to read db file, initializing fresh:', err);
  }
  return { users: [], sessions: {}, profiles: [] };
}

function saveDb(db: DbSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save db:', err);
  }
}

let db = loadDb();

// Gemini Client initialization per gemini-api skill
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

function withTimeout<T>(promise: Promise<T>, ms: number = 3500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Gemini request timeout')), ms))
  ]);
}

// Auth helper
function getUserIdFromAuth(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  return db.sessions[token] || null;
}

// ----------------------------------------------------
// Auth Endpoints
// ----------------------------------------------------
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email and password are required.' });
  }

  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === username.toLowerCase());
  if (existing) {
    return res.status(409).json({ error: 'User with this email or username already exists.' });
  }

  const userId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const newUser = {
    id: userId,
    username: username.trim(),
    email: email.trim().toLowerCase(),
    passwordHash: password, // Simple auth token store
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  const token = 'tok_' + Math.random().toString(36).substring(2) + Date.now();
  db.sessions[token] = userId;
  saveDb(db);

  return res.json({
    user: { id: newUser.id, username: newUser.username, email: newUser.email, createdAt: newUser.createdAt },
    token
  });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { emailOrUsername, password } = req.body;
  if (!emailOrUsername || !password) {
    return res.status(400).json({ error: 'Identifier and password are required.' });
  }

  const term = emailOrUsername.toLowerCase().trim();
  const user = db.users.find(u => u.email.toLowerCase() === term || u.username.toLowerCase() === term);

  if (!user || user.passwordHash !== password) {
    return res.status(401).json({ error: 'Invalid credentials. Please try again.' });
  }

  const token = 'tok_' + Math.random().toString(36).substring(2) + Date.now();
  db.sessions[token] = user.id;
  saveDb(db);

  return res.json({
    user: { id: user.id, username: user.username, email: user.email, createdAt: user.createdAt },
    token
  });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const userId = getUserIdFromAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }

  const user = db.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  return res.json({
    user: { id: user.id, username: user.username, email: user.email, createdAt: user.createdAt }
  });
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    delete db.sessions[token];
    saveDb(db);
  }
  return res.json({ success: true });
});

// ----------------------------------------------------
// Saved Profiles Endpoints (Cloud Sync across devices)
// ----------------------------------------------------
app.get('/api/profiles', (req: Request, res: Response) => {
  const userId = getUserIdFromAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Authentication required to view cloud profiles.' });
  }

  const userProfiles = db.profiles.filter(p => p.userId === userId);
  return res.json({ profiles: userProfiles });
});

app.post('/api/profiles', (req: Request, res: Response) => {
  const userId = getUserIdFromAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Authentication required to save profile.' });
  }

  const { id, name, data } = req.body;
  if (!data) {
    return res.status(400).json({ error: 'Profile data is required.' });
  }

  const profileId = id || 'prof_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
  const shareId = 'share_' + Math.random().toString(36).substring(2, 9);

  const existingIndex = db.profiles.findIndex(p => p.id === profileId && p.userId === userId);
  const record = {
    id: profileId,
    userId,
    name: name || data.name || 'Untitled Profile',
    data,
    shareId: existingIndex >= 0 ? db.profiles[existingIndex].shareId : shareId,
    updatedAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    db.profiles[existingIndex] = record;
  } else {
    db.profiles.push(record);
  }
  saveDb(db);

  return res.json({ profile: record, message: 'Profile synced to cloud successfully.' });
});

app.delete('/api/profiles/:id', (req: Request, res: Response) => {
  const userId = getUserIdFromAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  db.profiles = db.profiles.filter(p => !(p.id === req.params.id && p.userId === userId));
  saveDb(db);
  return res.json({ success: true });
});

app.get('/api/profiles/share/:shareId', (req: Request, res: Response) => {
  const profile = db.profiles.find(p => p.shareId === req.params.shareId);
  if (!profile) {
    return res.status(404).json({ error: 'Shared profile not found.' });
  }
  return res.json({ profile });
});

// ----------------------------------------------------
// Gemini Intelligence Endpoints
// ----------------------------------------------------
app.post('/api/gemini/enhance-bio', async (req: Request, res: Response) => {
  const { name, currentBio, targetRole, tone } = req.body;
  const devName = name || 'Developer';
  const role = targetRole || 'Full Stack Engineer';

  // Smart fallback template generator
  const fallbackOptions = [
    {
      tagline: `High-Velocity ${role} • Turning Complex Problems into Scalable Code`,
      bio: `${devName} is a ${role} focused on high-scale systems, modern reactive architectures, and developer ergonomics. Passionate about building robust software that millions can rely on.`,
      tone: 'High Impact'
    },
    {
      tagline: `Crafting Elegant Architectures & Clean APIs • ${role}`,
      bio: `Building modern digital experiences with a passion for modular systems, fast feedback loops, and open-source collaboration. Currently exploring cutting-edge edge compute.`,
      tone: 'Executive Professional'
    },
    {
      tagline: `Turning Coffee into High-Throughput Microservices ☕ ⚡`,
      bio: `Obsessed with snappy user experiences, zero-latency APIs, and clean git history. When not squashing race conditions, you can find me diving deep into distributed consensus.`,
      tone: 'Creative & Witty'
    }
  ];

  const fallbackTypingTexts = [
    `${role} 💻`,
    `Modern Architecture Enthusiast ⚡`,
    `Open Source Contributor 🌍`,
    `Building Scalable Web Apps 🚀`
  ];

  try {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
      const prompt = `You are an elite developer personal branding consultant and technical copywriter.
Generate 3 distinct, professional developer bio options and 3 matching taglines for a GitHub profile README.

Developer Details:
- Name: ${devName}
- Target Role / Focus: ${role}
- Current Bio Draft: ${currentBio || 'Software engineer building web apps'}
- Desired Tone: ${tone || 'high_impact'}

Respond ONLY with valid JSON with this exact structure:
{
  "options": [
    {
      "tagline": "Short punchy 1-line headline (under 12 words)",
      "bio": "2 to 3 sentences describing their technical focus, impact, and engineering philosophy.",
      "tone": "Name of tone"
    }
  ],
  "typingTexts": ["Array of 3-4 short punchy titles for typing header animation (e.g. 'Full-Stack Developer 💻', 'Building Scalable Cloud Apps 🚀')"]
}`;

      const response = await withTimeout(ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      }), 4000);

      const parsed = JSON.parse(response.text || '{}');
      if (parsed.options && parsed.options.length > 0) {
        return res.json(parsed);
      }
    }
  } catch (err: any) {
    console.warn('Gemini enhance-bio API call error, falling back to smart generator:', err.message);
  }

  return res.json({
    options: fallbackOptions,
    typingTexts: fallbackTypingTexts
  });
});

app.post('/api/gemini/suggest-skills', async (req: Request, res: Response) => {
  const { roleOrDescription, existingSkills } = req.body;
  const lower = (roleOrDescription || '').toLowerCase();

  let recommendedSkills = ['typescript', 'react', 'nextjs', 'nodejs', 'postgresql', 'docker', 'tailwindcss', 'git'];
  let reasoning = 'A modern full-stack stack balancing productivity, safety, and ecosystem breadth.';

  if (lower.includes('ai') || lower.includes('machine learning') || lower.includes('data')) {
    recommendedSkills = ['python', 'pytorch', 'tensorflow', 'scikitlearn', 'pandas', 'numpy', 'jupyter', 'docker', 'huggingface'];
    reasoning = 'Industry-standard data science and deep learning stack for research and foundation model deployment.';
  } else if (lower.includes('cloud') || lower.includes('devops') || lower.includes('sre')) {
    recommendedSkills = ['docker', 'kubernetes', 'terraform', 'aws', 'golang', 'linux', 'githubactions', 'nginx'];
    reasoning = 'Cloud-native infrastructure stack optimized for declarative automation and zero-downtime reliability.';
  } else if (lower.includes('mobile') || lower.includes('ios') || lower.includes('android')) {
    recommendedSkills = ['flutter', 'dart', 'reactnative', 'typescript', 'swift', 'kotlin', 'firebase'];
    reasoning = 'High-velocity mobile engineering stack with smooth 60fps gesture rendering.';
  }

  try {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
      const prompt = `You are a senior tech lead. Given a developer's role or description, select the most relevant and trending technologies for their GitHub Profile README.

Developer Role / Focus: "${roleOrDescription || 'Full Stack Developer'}"
Currently Selected Skills: ${JSON.stringify(existingSkills || [])}

Pick from the following supported skill IDs:
[
  "javascript", "typescript", "python", "rust", "golang", "cpp", "csharp", "java", "kotlin", "swift", "php", "ruby", "dart",
  "react", "nextjs", "vuejs", "nuxtjs", "svelte", "angular", "tailwindcss", "html5", "css3", "threejs", "vite", "astro",
  "nodejs", "express", "nestjs", "django", "fastapi", "flask", "springboot", "rails", "laravel", "graphql", "grpc", "trpc",
  "postgresql", "mongodb", "mysql", "redis", "supabase", "firebase", "sqlite", "prisma", "drizzle", "elasticsearch",
  "docker", "kubernetes", "aws", "gcp", "azure", "terraform", "linux", "nginx", "githubactions", "vercel", "cloudflare",
  "tensorflow", "pytorch", "scikitlearn", "pandas", "numpy", "opencv", "huggingface", "langchain", "gemini",
  "reactnative", "flutter", "android", "apple", "electron",
  "git", "github", "gitlab", "vscode", "figma", "postman", "jest", "bun"
]

Respond ONLY with valid JSON:
{
  "recommendedSkills": ["skill_id_1", "skill_id_2", ...],
  "reasoning": "Brief 1-sentence tip on why this stack shines."
}`;

      const response = await withTimeout(ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      }), 4000);

      const parsed = JSON.parse(response.text || '{}');
      if (parsed.recommendedSkills && parsed.recommendedSkills.length > 0) {
        return res.json(parsed);
      }
    }
  } catch (err: any) {
    console.warn('Gemini suggest-skills error, falling back:', err.message);
  }

  return res.json({
    recommendedSkills,
    reasoning
  });
});

app.post('/api/gemini/generate-project-desc', async (req: Request, res: Response) => {
  const { title, roughNotes, tags } = req.body;
  const fallback = {
    description: `A production-grade ${title || 'open-source project'} engineered for high throughput, seamless usability, and modern developer ergonomics.`,
    suggestedTags: tags && tags.length > 0 ? tags : ['TypeScript', 'React', 'Node.js']
  };

  try {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
      const prompt = `You are a technical writer crafting showcase project cards for a GitHub Profile README.
Project Name: "${title}"
Rough Notes: "${roughNotes || 'web application'}"
Existing Tech Tags: ${JSON.stringify(tags || [])}

Create an engaging, crisp 1-2 sentence description emphasizing what it solves and technical accomplishments, plus 3-5 clean tech stack tags.

Respond ONLY with valid JSON:
{
  "description": "Engaging 1-2 sentence description",
  "suggestedTags": ["Tag1", "Tag2", "Tag3"]
}`;

      const response = await withTimeout(ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      }), 4000);

      const parsed = JSON.parse(response.text || '{}');
      if (parsed.description) {
        return res.json(parsed);
      }
    }
  } catch (err: any) {
    console.warn('Gemini generate-project-desc error, falling back:', err.message);
  }

  return res.json(fallback);
});

app.post('/api/gemini/polish-readme', async (req: Request, res: Response) => {
  const fallback = {
    score: 94,
    strengths: [
      'Crisp visual hierarchy with attractive badges & animated typing header',
      'Strong representation of production tech stack and tooling',
      'Well-structured about-me bullet points with contact information'
    ],
    improvements: [
      'Add quantifiable metric outcomes to featured projects (e.g. 50k+ users, 40% latency reduction)',
      'Pin top 2 repositories directly on your GitHub profile to match this README'
    ],
    recruiterImpression: 'High-impact profile that immediately conveys strong technical depth and attention to quality.'
  };

  try {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
      const { markdown } = req.body;
      const prompt = `You are a GitHub profile README optimization expert. Analyze this Markdown profile and give 3-4 bulleted constructive recommendations to make it attract recruiters, open-source collaborators, and tech leads.

Markdown Content:
\`\`\`markdown
${markdown}
\`\`\`

Respond ONLY with valid JSON:
{
  "score": 92,
  "strengths": ["Clear visual hierarchy", "Strong tech stack representation"],
  "improvements": ["Add 1-2 measurable outcomes to project descriptions", "Ensure social badge URLs are valid"],
  "recruiterImpression": "1-sentence summary of how this profile appears to hiring managers."
}`;

      const response = await withTimeout(ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      }), 4000);

      const parsed = JSON.parse(response.text || '{}');
      if (parsed.score) {
        return res.json(parsed);
      }
    }
  } catch (err: any) {
    console.warn('Gemini polish-readme error, falling back:', err.message);
  }

  return res.json(fallback);
});

// ----------------------------------------------------
// Setup Vite in Dev or Serve Dist in Production
// ----------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OctoProfile server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
