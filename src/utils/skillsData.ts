import { SkillItem } from '../types.ts';

export const SKILL_CATEGORIES = [
  { id: 'languages', label: 'Languages', color: 'text-amber-500' },
  { id: 'frontend', label: 'Frontend', color: 'text-blue-500' },
  { id: 'backend', label: 'Backend & APIs', color: 'text-emerald-500' },
  { id: 'database', label: 'Databases & ORMs', color: 'text-indigo-500' },
  { id: 'devops', label: 'DevOps & Cloud', color: 'text-orange-500' },
  { id: 'ai', label: 'AI, ML & Data', color: 'text-purple-500' },
  { id: 'mobile', label: 'Mobile & Desktop', color: 'text-pink-500' },
  { id: 'tools', label: 'Tools & Ecosystem', color: 'text-cyan-500' },
] as const;

export const ALL_SKILLS: SkillItem[] = [
  // Languages
  { id: 'javascript', name: 'JavaScript', category: 'languages', iconSlug: 'js', badgeBg: 'F7DF1E', logoColor: 'black' },
  { id: 'typescript', name: 'TypeScript', category: 'languages', iconSlug: 'ts', badgeBg: '3178C6', logoColor: 'white' },
  { id: 'python', name: 'Python', category: 'languages', iconSlug: 'py', badgeBg: '3776AB', logoColor: 'white' },
  { id: 'rust', name: 'Rust', category: 'languages', iconSlug: 'rust', badgeBg: '000000', logoColor: 'white' },
  { id: 'golang', name: 'Go', category: 'languages', iconSlug: 'go', badgeBg: '00ADD8', logoColor: 'white' },
  { id: 'cpp', name: 'C++', category: 'languages', iconSlug: 'cpp', badgeBg: '00599C', logoColor: 'white' },
  { id: 'csharp', name: 'C#', category: 'languages', iconSlug: 'cs', badgeBg: '239120', logoColor: 'white' },
  { id: 'java', name: 'Java', category: 'languages', iconSlug: 'java', badgeBg: 'ED8B00', logoColor: 'white' },
  { id: 'kotlin', name: 'Kotlin', category: 'languages', iconSlug: 'kotlin', badgeBg: '7F52FF', logoColor: 'white' },
  { id: 'swift', name: 'Swift', category: 'languages', iconSlug: 'swift', badgeBg: 'F05138', logoColor: 'white' },
  { id: 'php', name: 'PHP', category: 'languages', iconSlug: 'php', badgeBg: '777BB4', logoColor: 'white' },
  { id: 'ruby', name: 'Ruby', category: 'languages', iconSlug: 'ruby', badgeBg: 'CC342D', logoColor: 'white' },
  { id: 'dart', name: 'Dart', category: 'languages', iconSlug: 'dart', badgeBg: '0175C2', logoColor: 'white' },
  { id: 'scala', name: 'Scala', category: 'languages', iconSlug: 'scala', badgeBg: 'DC322F', logoColor: 'white' },
  { id: 'r', name: 'R', category: 'languages', iconSlug: 'r', badgeBg: '276DC3', logoColor: 'white' },
  { id: 'lua', name: 'Lua', category: 'languages', iconSlug: 'lua', badgeBg: '2C2D72', logoColor: 'white' },
  { id: 'elixir', name: 'Elixir', category: 'languages', iconSlug: 'elixir', badgeBg: '4B275F', logoColor: 'white' },
  { id: 'solidity', name: 'Solidity', category: 'languages', iconSlug: 'solidity', badgeBg: '363636', logoColor: 'white' },
  { id: 'bash', name: 'Bash', category: 'languages', iconSlug: 'bash', badgeBg: '4EAA25', logoColor: 'white' },

  // Frontend
  { id: 'react', name: 'React', category: 'frontend', iconSlug: 'react', badgeBg: '20232A', logoColor: '61DAFB' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', iconSlug: 'nextjs', badgeBg: '000000', logoColor: 'white' },
  { id: 'vuejs', name: 'Vue.js', category: 'frontend', iconSlug: 'vue', badgeBg: '4FC08D', logoColor: 'white' },
  { id: 'nuxtjs', name: 'NuxtJS', category: 'frontend', iconSlug: 'nuxtjs', badgeBg: '00DC82', logoColor: 'white' },
  { id: 'svelte', name: 'Svelte', category: 'frontend', iconSlug: 'svelte', badgeBg: 'FF3E00', logoColor: 'white' },
  { id: 'angular', name: 'Angular', category: 'frontend', iconSlug: 'angular', badgeBg: 'DD0031', logoColor: 'white' },
  { id: 'tailwindcss', name: 'Tailwind CSS', category: 'frontend', iconSlug: 'tailwind', badgeBg: '38B2AC', logoColor: 'white' },
  { id: 'html5', name: 'HTML5', category: 'frontend', iconSlug: 'html', badgeBg: 'E34F26', logoColor: 'white' },
  { id: 'css3', name: 'CSS3', category: 'frontend', iconSlug: 'css', badgeBg: '1572B6', logoColor: 'white' },
  { id: 'sass', name: 'Sass', category: 'frontend', iconSlug: 'sass', badgeBg: 'CC6699', logoColor: 'white' },
  { id: 'redux', name: 'Redux', category: 'frontend', iconSlug: 'redux', badgeBg: '764ABC', logoColor: 'white' },
  { id: 'threejs', name: 'Three.js', category: 'frontend', iconSlug: 'threejs', badgeBg: '000000', logoColor: 'white' },
  { id: 'vite', name: 'Vite', category: 'frontend', iconSlug: 'vite', badgeBg: '646CFF', logoColor: 'white' },
  { id: 'webpack', name: 'Webpack', category: 'frontend', iconSlug: 'webpack', badgeBg: '8DD6F9', logoColor: 'black' },
  { id: 'astro', name: 'Astro', category: 'frontend', iconSlug: 'astro', badgeBg: 'BC52EE', logoColor: 'white' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'frontend', iconSlug: 'bootstrap', badgeBg: '7952B3', logoColor: 'white' },

  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend', iconSlug: 'nodejs', badgeBg: '339933', logoColor: 'white' },
  { id: 'express', name: 'Express.js', category: 'backend', iconSlug: 'express', badgeBg: '000000', logoColor: 'white' },
  { id: 'nestjs', name: 'NestJS', category: 'backend', iconSlug: 'nestjs', badgeBg: 'E0234E', logoColor: 'white' },
  { id: 'django', name: 'Django', category: 'backend', iconSlug: 'django', badgeBg: '092E20', logoColor: 'white' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', iconSlug: 'fastapi', badgeBg: '009688', logoColor: 'white' },
  { id: 'flask', name: 'Flask', category: 'backend', iconSlug: 'flask', badgeBg: '000000', logoColor: 'white' },
  { id: 'springboot', name: 'Spring Boot', category: 'backend', iconSlug: 'spring', badgeBg: '6DB33F', logoColor: 'white' },
  { id: 'rails', name: 'Ruby on Rails', category: 'backend', iconSlug: 'rails', badgeBg: 'CC0000', logoColor: 'white' },
  { id: 'laravel', name: 'Laravel', category: 'backend', iconSlug: 'laravel', badgeBg: 'FF2D20', logoColor: 'white' },
  { id: 'dotnet', name: '.NET', category: 'backend', iconSlug: 'dotnet', badgeBg: '512BD4', logoColor: 'white' },
  { id: 'graphql', name: 'GraphQL', category: 'backend', iconSlug: 'graphql', badgeBg: 'E10098', logoColor: 'white' },
  { id: 'grpc', name: 'gRPC', category: 'backend', iconSlug: 'grpc', badgeBg: '244B5A', logoColor: 'white' },
  { id: 'trpc', name: 'tRPC', category: 'backend', iconSlug: 'trpc', badgeBg: '2596BE', logoColor: 'white' },

  // Database
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', iconSlug: 'postgres', badgeBg: '316192', logoColor: 'white' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', iconSlug: 'mongodb', badgeBg: '47A248', logoColor: 'white' },
  { id: 'mysql', name: 'MySQL', category: 'database', iconSlug: 'mysql', badgeBg: '4479A1', logoColor: 'white' },
  { id: 'redis', name: 'Redis', category: 'database', iconSlug: 'redis', badgeBg: 'DC382D', logoColor: 'white' },
  { id: 'supabase', name: 'Supabase', category: 'database', iconSlug: 'supabase', badgeBg: '3ECF8E', logoColor: 'white' },
  { id: 'firebase', name: 'Firebase', category: 'database', iconSlug: 'firebase', badgeBg: 'FFCA28', logoColor: 'black' },
  { id: 'sqlite', name: 'SQLite', category: 'database', iconSlug: 'sqlite', badgeBg: '003B57', logoColor: 'white' },
  { id: 'prisma', name: 'Prisma', category: 'database', iconSlug: 'prisma', badgeBg: '2D3748', logoColor: 'white' },
  { id: 'drizzle', name: 'Drizzle ORM', category: 'database', iconSlug: 'drizzle', badgeBg: 'C5F74F', logoColor: 'black' },
  { id: 'elasticsearch', name: 'Elasticsearch', category: 'database', iconSlug: 'elasticsearch', badgeBg: '005571', logoColor: 'white' },
  { id: 'dynamodb', name: 'DynamoDB', category: 'database', iconSlug: 'dynamodb', badgeBg: '4053D6', logoColor: 'white' },

  // DevOps & Cloud
  { id: 'docker', name: 'Docker', category: 'devops', iconSlug: 'docker', badgeBg: '2496ED', logoColor: 'white' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops', iconSlug: 'kubernetes', badgeBg: '326CE5', logoColor: 'white' },
  { id: 'aws', name: 'AWS', category: 'devops', iconSlug: 'aws', badgeBg: '232F3E', logoColor: 'FF9900' },
  { id: 'gcp', name: 'Google Cloud', category: 'devops', iconSlug: 'gcp', badgeBg: '4285F4', logoColor: 'white' },
  { id: 'azure', name: 'Azure', category: 'devops', iconSlug: 'azure', badgeBg: '0078D4', logoColor: 'white' },
  { id: 'terraform', name: 'Terraform', category: 'devops', iconSlug: 'terraform', badgeBg: '7B42BC', logoColor: 'white' },
  { id: 'linux', name: 'Linux', category: 'devops', iconSlug: 'linux', badgeBg: 'FCC624', logoColor: 'black' },
  { id: 'nginx', name: 'Nginx', category: 'devops', iconSlug: 'nginx', badgeBg: '009639', logoColor: 'white' },
  { id: 'githubactions', name: 'GitHub Actions', category: 'devops', iconSlug: 'githubactions', badgeBg: '2088FF', logoColor: 'white' },
  { id: 'vercel', name: 'Vercel', category: 'devops', iconSlug: 'vercel', badgeBg: '000000', logoColor: 'white' },
  { id: 'netlify', name: 'Netlify', category: 'devops', iconSlug: 'netlify', badgeBg: '00C7B7', logoColor: 'white' },
  { id: 'cloudflare', name: 'Cloudflare', category: 'devops', iconSlug: 'cloudflare', badgeBg: 'F38020', logoColor: 'white' },
  { id: 'ansible', name: 'Ansible', category: 'devops', iconSlug: 'ansible', badgeBg: 'EE0000', logoColor: 'white' },

  // AI & ML
  { id: 'tensorflow', name: 'TensorFlow', category: 'ai', iconSlug: 'tensorflow', badgeBg: 'FF6F00', logoColor: 'white' },
  { id: 'pytorch', name: 'PyTorch', category: 'ai', iconSlug: 'pytorch', badgeBg: 'EE4C2C', logoColor: 'white' },
  { id: 'scikitlearn', name: 'Scikit-Learn', category: 'ai', iconSlug: 'sklearn', badgeBg: 'F7931E', logoColor: 'white' },
  { id: 'pandas', name: 'Pandas', category: 'ai', iconSlug: 'pandas', badgeBg: '150458', logoColor: 'white' },
  { id: 'numpy', name: 'NumPy', category: 'ai', iconSlug: 'numpy', badgeBg: '013243', logoColor: 'white' },
  { id: 'opencv', name: 'OpenCV', category: 'ai', iconSlug: 'opencv', badgeBg: '5C3EE8', logoColor: 'white' },
  { id: 'huggingface', name: 'Hugging Face', category: 'ai', iconSlug: 'hf', badgeBg: 'FFD21E', logoColor: 'black' },
  { id: 'langchain', name: 'LangChain', category: 'ai', iconSlug: 'langchain', badgeBg: '1C3C3C', logoColor: 'white' },
  { id: 'gemini', name: 'Gemini AI', category: 'ai', iconSlug: 'gemini', badgeBg: '4E75F6', logoColor: 'white' },
  { id: 'jupyter', name: 'Jupyter', category: 'ai', iconSlug: 'jupyter', badgeBg: 'F37626', logoColor: 'white' },

  // Mobile
  { id: 'reactnative', name: 'React Native', category: 'mobile', iconSlug: 'react', badgeBg: '61DAFB', logoColor: 'black' },
  { id: 'flutter', name: 'Flutter', category: 'mobile', iconSlug: 'flutter', badgeBg: '02569B', logoColor: 'white' },
  { id: 'android', name: 'Android', category: 'mobile', iconSlug: 'android', badgeBg: '3DDC84', logoColor: 'white' },
  { id: 'apple', name: 'iOS', category: 'mobile', iconSlug: 'apple', badgeBg: '000000', logoColor: 'white' },
  { id: 'electron', name: 'Electron', category: 'mobile', iconSlug: 'electron', badgeBg: '47848F', logoColor: 'white' },
  { id: 'expo', name: 'Expo', category: 'mobile', iconSlug: 'expo', badgeBg: '000020', logoColor: 'white' },

  // Tools
  { id: 'git', name: 'Git', category: 'tools', iconSlug: 'git', badgeBg: 'F05032', logoColor: 'white' },
  { id: 'github', name: 'GitHub', category: 'tools', iconSlug: 'github', badgeBg: '181717', logoColor: 'white' },
  { id: 'gitlab', name: 'GitLab', category: 'tools', iconSlug: 'gitlab', badgeBg: 'FC6D26', logoColor: 'white' },
  { id: 'vscode', name: 'VS Code', category: 'tools', iconSlug: 'vscode', badgeBg: '007ACC', logoColor: 'white' },
  { id: 'figma', name: 'Figma', category: 'tools', iconSlug: 'figma', badgeBg: 'F24E1E', logoColor: 'white' },
  { id: 'postman', name: 'Postman', category: 'tools', iconSlug: 'postman', badgeBg: 'FF6C37', logoColor: 'white' },
  { id: 'jest', name: 'Jest', category: 'tools', iconSlug: 'jest', badgeBg: 'C21325', logoColor: 'white' },
  { id: 'npm', name: 'npm', category: 'tools', iconSlug: 'npm', badgeBg: 'CB3837', logoColor: 'white' },
  { id: 'bun', name: 'Bun', category: 'tools', iconSlug: 'bun', badgeBg: 'FBF0DF', logoColor: 'black' },
  { id: 'graphql_tool', name: 'Insomnia', category: 'tools', iconSlug: 'insomnia', badgeBg: '5849BE', logoColor: 'white' },
];

export const SKILL_MAP = new Map<string, SkillItem>(
  ALL_SKILLS.map(s => [s.id, s])
);
