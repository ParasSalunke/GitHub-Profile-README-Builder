import { TemplatePreset, ProfileData } from '../types.ts';

export const TEMPLATES: TemplatePreset[] = [
  {
    id: 'fullstack-artisan',
    name: 'Full-Stack Artisan',
    role: 'Web & Cloud Developer',
    description: 'Balanced, modern developer layout with animated typing headline, GitHub stats, featured projects, and tech stack icons.',
    previewBadgeColor: 'bg-emerald-500',
    data: {
      titleName: 'Full-Stack Artisan',
      name: 'Alex Rivera',
      tagline: 'Crafting robust distributed systems & modern web experiences',
      bio: 'Software engineer passionate about scalable architecture, developer ergonomics, and open-source software. Currently focused on building edge-native web applications.',
      headerAlignment: 'center',
      showWavingHand: true,
      typingEffect: true,
      typingTexts: [
        'Full-Stack Developer 💻',
        'TypeScript & React Enthusiast ⚡',
        'Open Source Contributor 🌍',
        'Cloud Architecture Geek ☁️'
      ],
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      aboutMe: {
        workingOn: { title: 'EdgePulse - Real-time Edge Monitoring', url: 'https://github.com' },
        learning: 'Rust, WebAssembly & Distributed consensus',
        collaboratingOn: 'Developer tooling & open source libraries',
        askMeAbout: 'React, Next.js, Node.js, PostgreSQL, Docker',
        reachingMe: 'alex.rivera.dev@gmail.com',
        currentPronouns: 'they/them',
        funFact: 'I roast my own coffee beans and love mechanical keyboards!'
      },
      skills: ['typescript', 'javascript', 'react', 'nextjs', 'tailwindcss', 'nodejs', 'express', 'postgresql', 'redis', 'docker', 'aws', 'git'],
      skillDisplayMode: 'skillicons',
      badgeStyle: 'for-the-badge',
      githubStats: {
        username: 'salunkeparas24',
        theme: 'tokyonight',
        showStatsCard: true,
        showTopLangsCard: true,
        showStreakStats: true,
        showTrophy: true,
        showActivityGraph: true,
        showContributionSnake: false,
        showVisitorBadge: true,
        hideBorder: false,
        showIcons: true,
        includeAllCommits: true,
        countPrivate: false
      },
      projects: [
        {
          id: 'p1',
          title: 'EdgePulse Telemetry',
          description: 'Ultra-low latency real-time telemetry agent and dashboard for multi-region Docker clusters.',
          repoUrl: 'https://github.com',
          demoUrl: 'https://demo.dev',
          stars: 482,
          tags: ['TypeScript', 'React', 'Go', 'Docker'],
          featured: true
        },
        {
          id: 'p2',
          title: 'NextFast Starter',
          description: 'Production-ready Next.js 15 template with authentication, Drizzle ORM, and Tailwind CSS.',
          repoUrl: 'https://github.com',
          demoUrl: 'https://demo.dev',
          stars: 215,
          tags: ['Next.js', 'PostgreSQL', 'Tailwind CSS'],
          featured: false
        }
      ],
      socialLinks: {
        github: 'salunkeparas24',
        linkedin: 'alexrivera-dev',
        twitter: 'alex_codes',
        portfolio: 'https://alexrivera.dev',
        discord: 'alex#1234',
        email: 'alex.rivera.dev@gmail.com',
        buymeacoffee: 'alexrivera'
      },
      addons: {
        devQuote: true,
        devJoke: false,
        spotifyWidget: false
      }
    }
  },
  {
    id: 'ai-ml-scientist',
    name: 'AI & ML Engineer',
    role: 'Deep Learning & LLMs',
    description: 'Tailored for data scientists, ML engineers, and AI researchers highlighting Python, PyTorch, HuggingFace, and research papers.',
    previewBadgeColor: 'bg-purple-500',
    data: {
      titleName: 'AI & ML Specialist',
      name: 'Dr. Elena Rostova',
      tagline: 'Researching Multimodal Foundation Models & Efficient Fine-Tuning',
      bio: 'Machine learning scientist specializing in generative vision-language models, inference optimization, and autonomous AI agents. Passionate about democratizing open AI weights.',
      headerAlignment: 'left',
      showWavingHand: true,
      typingEffect: true,
      typingTexts: [
        'AI Research Scientist 🧠',
        'Fine-Tuning & RAG Architect 🚀',
        'PyTorch & Hugging Face Practitioner ⚡'
      ],
      bannerUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
      aboutMe: {
        workingOn: { title: 'NeuroQuant - Sub-4bit Quantization Framework', url: 'https://github.com' },
        learning: 'Mechanistic Interpretability & RLHF',
        collaboratingOn: 'Open-weight foundation model evaluations',
        askMeAbout: 'PyTorch, Transformers, LoRA, CUDA kernel optimization',
        reachingMe: 'elena.rostova@ai-lab.io',
        funFact: 'I once trained a GAN to generate synthetic origami folds!'
      },
      skills: ['python', 'pytorch', 'tensorflow', 'huggingface', 'scikitlearn', 'pandas', 'numpy', 'opencv', 'jupyter', 'docker', 'gcp', 'git'],
      skillDisplayMode: 'grouped_shields',
      badgeStyle: 'for-the-badge',
      githubStats: {
        username: 'salunkeparas24',
        theme: 'catppuccin_mocha',
        showStatsCard: true,
        showTopLangsCard: true,
        showStreakStats: true,
        showTrophy: false,
        showActivityGraph: true,
        showContributionSnake: false,
        showVisitorBadge: true,
        hideBorder: false,
        showIcons: true,
        includeAllCommits: true,
        countPrivate: true
      },
      projects: [
        {
          id: 'p1',
          title: 'NeuroQuant Engine',
          description: 'High-throughput 3-bit and 4-bit quantizer for transformer architectures reducing VRAM by 62%.',
          repoUrl: 'https://github.com',
          demoUrl: 'https://huggingface.co',
          stars: 1240,
          tags: ['Python', 'PyTorch', 'CUDA', 'Triton'],
          featured: true
        },
        {
          id: 'p2',
          title: 'VisionRAG-Toolkit',
          description: 'Multimodal vector search pipeline integrating CLIP embeddings with hybrid lexical ranking.',
          repoUrl: 'https://github.com',
          stars: 620,
          tags: ['Python', 'LangChain', 'FastAPI'],
          featured: false
        }
      ],
      socialLinks: {
        github: 'salunkeparas24',
        linkedin: 'elena-rostova-phd',
        twitter: 'elena_ai',
        kaggle: 'elenarostova',
        email: 'elena.rostova@ai-lab.io'
      },
      addons: {
        devQuote: true,
        devJoke: false,
        spotifyWidget: false
      }
    }
  },
  {
    id: 'minimalist-lead',
    name: 'Minimalist Tech Lead',
    role: 'Principal / Staff Engineer',
    description: 'Understated, executive aesthetic focusing on clarity, core proficiencies, architecture philosophy, and direct links.',
    previewBadgeColor: 'bg-zinc-700',
    data: {
      titleName: 'Minimalist Tech Lead',
      name: 'Marcus Vance',
      tagline: 'Principal Engineer • Distributed Systems Architect',
      bio: 'Leading engineering teams to deliver high-scale infrastructure. Believer in simple code, resilient systems, and high-trust engineering cultures.',
      headerAlignment: 'left',
      showWavingHand: false,
      typingEffect: false,
      typingTexts: [],
      aboutMe: {
        workingOn: { title: 'Global Multi-Region Database Orchestration', url: 'https://github.com' },
        learning: 'Formal verification (TLA+) & deterministic concurrency',
        collaboratingOn: 'High-throughput networking in Go & Rust',
        askMeAbout: 'System design, engineering leadership, fault tolerance, Go',
        reachingMe: 'marcus@vance.engineering'
      },
      skills: ['golang', 'rust', 'kubernetes', 'docker', 'postgresql', 'terraform', 'aws', 'linux'],
      skillDisplayMode: 'shields',
      badgeStyle: 'flat-square',
      githubStats: {
        username: 'salunkeparas24',
        theme: 'github_dark',
        showStatsCard: true,
        showTopLangsCard: true,
        showStreakStats: false,
        showTrophy: false,
        showActivityGraph: false,
        showContributionSnake: false,
        showVisitorBadge: false,
        hideBorder: true,
        showIcons: true,
        includeAllCommits: true,
        countPrivate: true
      },
      projects: [
        {
          id: 'p1',
          title: 'RaftKV',
          description: 'A distributed consensus key-value store with zero third-party dependencies implemented in Go.',
          repoUrl: 'https://github.com',
          stars: 890,
          tags: ['Go', 'Raft', 'Distributed Systems'],
          featured: true
        }
      ],
      socialLinks: {
        github: 'salunkeparas24',
        linkedin: 'marcus-vance-eng',
        email: 'marcus@vance.engineering'
      },
      addons: {
        devQuote: false,
        devJoke: false,
        spotifyWidget: false
      }
    }
  },
  {
    id: 'cyberpunk-dev',
    name: 'Cyberpunk Neo-Hacker',
    role: 'Full Stack & Security',
    description: 'High-energy cyberpunk dark theme with Synthwave colors, stats cards, and playful hacker quotes.',
    previewBadgeColor: 'bg-pink-600',
    data: {
      titleName: 'Cyberpunk Neo-Hacker',
      name: 'Kaelen Voss (0xVoss)',
      tagline: '⚡ Breaker of Monoliths • Architect of Micro-Frontends • Night Owl',
      bio: 'Specializing in reactive user interfaces, Web3 smart contracts, and high-performance WebGL canvas experiences. Coding to synthwave frequencies.',
      headerAlignment: 'center',
      showWavingHand: true,
      typingEffect: true,
      typingTexts: [
        '> INITIALIZING PROTOCOL...',
        '> CRACKING MAINFRAMES...',
        '> COMPILING TYPESCRIPT AT 3:00 AM...',
        '> CYBERPUNK SYNTHWAVE DEV'
      ],
      avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=300&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
      aboutMe: {
        workingOn: { title: 'NeonGlitch UI Component System', url: 'https://github.com' },
        learning: 'WebAssembly SIMD & WGSL Shaders',
        collaboratingOn: 'Creative coding experiments & synth tools',
        askMeAbout: 'Three.js, WebGL, Next.js, Security, Shaders',
        funFact: 'I listen to darksynth on repeat while debugging race conditions.'
      },
      skills: ['typescript', 'javascript', 'threejs', 'react', 'nextjs', 'tailwindcss', 'vite', 'solidity', 'nodejs', 'redis', 'git'],
      skillDisplayMode: 'skillicons',
      badgeStyle: 'for-the-badge',
      githubStats: {
        username: 'salunkeparas24',
        theme: 'synthwave',
        showStatsCard: true,
        showTopLangsCard: true,
        showStreakStats: true,
        showTrophy: true,
        showActivityGraph: true,
        showContributionSnake: false,
        showVisitorBadge: true,
        hideBorder: false,
        showIcons: true,
        includeAllCommits: true,
        countPrivate: false
      },
      projects: [
        {
          id: 'p1',
          title: 'CyberGrid-3D',
          description: 'Procedurally generated neon cyberpunk terrain running at 60 FPS in pure WebGL.',
          repoUrl: 'https://github.com',
          demoUrl: 'https://demo.dev',
          stars: 710,
          tags: ['Three.js', 'WebGL', 'TypeScript'],
          featured: true
        }
      ],
      socialLinks: {
        github: 'salunkeparas24',
        twitter: '0xVoss_cyber',
        discord: 'voss#0001',
        youtube: '0xVossCodes'
      },
      addons: {
        devQuote: true,
        devJoke: true,
        spotifyWidget: false
      }
    }
  },
  {
    id: 'devops-cloud-guru',
    name: 'DevOps & Cloud SRE',
    role: 'Infrastructure & Reliability',
    description: 'Spotlight on Kubernetes, Terraform, Docker, CI/CD pipelines, AWS, and zero-downtime deployments.',
    previewBadgeColor: 'bg-blue-600',
    data: {
      titleName: 'Cloud SRE Guru',
      name: 'Sofia Chen',
      tagline: 'Site Reliability Engineer • Automating Everything That Moves',
      bio: 'Focused on high-availability cloud architecture, declarative infrastructure as code, and observability platforms across multi-cloud topologies.',
      headerAlignment: 'left',
      showWavingHand: true,
      typingEffect: true,
      typingTexts: [
        'Site Reliability Engineer 🚢',
        'Kubernetes & Terraform Expert ⚙️',
        'Incident Commander & Observability Nerd 📈'
      ],
      bannerUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
      aboutMe: {
        workingOn: { title: 'AutoKube - GitOps Operator for Multi-Cloud', url: 'https://github.com' },
        learning: 'eBPF kernel tracing & OpenTelemetry',
        askMeAbout: 'Kubernetes, Terraform, Prometheus, CI/CD, AWS'
      },
      skills: ['docker', 'kubernetes', 'terraform', 'aws', 'gcp', 'linux', 'nginx', 'githubactions', 'golang', 'bash', 'python'],
      skillDisplayMode: 'grouped_shields',
      badgeStyle: 'for-the-badge',
      githubStats: {
        username: 'salunkeparas24',
        theme: 'nord',
        showStatsCard: true,
        showTopLangsCard: true,
        showStreakStats: true,
        showTrophy: false,
        showActivityGraph: true,
        showContributionSnake: false,
        showVisitorBadge: true,
        hideBorder: false,
        showIcons: true,
        includeAllCommits: true,
        countPrivate: true
      },
      projects: [
        {
          id: 'p1',
          title: 'KubeDrift Guardian',
          description: 'Daemon that detects and automatically rectifies out-of-band config drift across EKS clusters.',
          repoUrl: 'https://github.com',
          stars: 540,
          tags: ['Go', 'Kubernetes', 'Helm'],
          featured: true
        }
      ],
      socialLinks: {
        github: 'salunkeparas24',
        linkedin: 'sofiachen-sre',
        twitter: 'sofiaclouds'
      },
      addons: {
        devQuote: true,
        devJoke: false,
        spotifyWidget: false
      }
    }
  },
  {
    id: 'mobile-app-artisan',
    name: 'Mobile App Artisan',
    role: 'Flutter & React Native',
    description: 'Showcases cross-platform mobile apps, App Store / Play Store links, polished animations, and fluid touch UX.',
    previewBadgeColor: 'bg-teal-500',
    data: {
      titleName: 'Mobile App Artisan',
      name: 'Lucas Silva',
      tagline: 'Crafting pixel-perfect, 60fps mobile applications for iOS & Android',
      bio: 'Mobile engineer dedicated to fluid gesture interactions, micro-animations, and offline-first mobile architecture.',
      headerAlignment: 'center',
      showWavingHand: true,
      typingEffect: true,
      typingTexts: [
        'Flutter & React Native Developer 📱',
        'Clean UI & Micro-interactions 🎨',
        'Published 12+ Apps on App Store & Google Play 🚀'
      ],
      aboutMe: {
        workingOn: { title: 'ZenTrack - Minimalist Habit Journal', url: 'https://github.com' },
        learning: 'SwiftUI & Kotlin Multiplatform (KMP)',
        collaboratingOn: 'Open-source mobile UI libraries',
        askMeAbout: 'Flutter, React Native, Mobile UX, State Management'
      },
      skills: ['flutter', 'dart', 'reactnative', 'typescript', 'swift', 'kotlin', 'android', 'apple', 'firebase', 'figma'],
      skillDisplayMode: 'skillicons',
      badgeStyle: 'for-the-badge',
      githubStats: {
        username: 'salunkeparas24',
        theme: 'dracula',
        showStatsCard: true,
        showTopLangsCard: true,
        showStreakStats: true,
        showTrophy: true,
        showActivityGraph: false,
        showContributionSnake: false,
        showVisitorBadge: true,
        hideBorder: false,
        showIcons: true,
        includeAllCommits: true,
        countPrivate: false
      },
      projects: [
        {
          id: 'p1',
          title: 'ZenTrack Mobile App',
          description: 'A distraction-free habit tracker with offline SQLite sync and haptic feedback. 50k+ active users.',
          repoUrl: 'https://github.com',
          demoUrl: 'https://apps.apple.com',
          stars: 960,
          tags: ['Flutter', 'Dart', 'SQLite'],
          featured: true
        }
      ],
      socialLinks: {
        github: 'salunkeparas24',
        twitter: 'lucassilvadev',
        linkedin: 'lucas-silva-mobile'
      },
      addons: {
        devQuote: true,
        devJoke: false,
        spotifyWidget: false
      }
    }
  }
];

export const DEFAULT_PROFILE: ProfileData = {
  ...TEMPLATES[0].data as ProfileData,
  id: 'default-profile-1'
};
