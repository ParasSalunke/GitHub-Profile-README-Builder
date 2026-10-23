import test from 'node:test';
import assert from 'node:assert/strict';
import { generateMarkdown } from './markdownGenerator.ts';
import { ProfileData } from '../types.ts';

const mockProfile: ProfileData = {
  id: 'test-1',
  titleName: 'Sample Profile',
  name: 'Alex Rivera',
  tagline: 'Senior Full Stack Engineer & Open Source Contributor',
  bio: 'Passionate about building scalable distributed systems and delightful developer tools.',
  headerAlignment: 'left',
  showWavingHand: true,
  typingEffect: false,
  typingTexts: ['Full Stack Engineer', 'Cloud Architect'],
  aboutMe: {
    workingOn: { title: 'OctoProfile', url: 'https://github.com/octoprofile' },
    learning: 'Rust & WebAssembly',
    askMeAbout: 'TypeScript, React, Node.js',
    funFact: 'I play jazz guitar in my spare time!'
  },
  skills: ['javascript', 'typescript', 'react', 'nodejs', 'docker'],
  skillDisplayMode: 'skillicons',
  badgeStyle: 'for-the-badge',
  githubStats: {
    username: 'alexrivera',
    theme: 'tokyonight',
    showStatsCard: true,
    showTopLangsCard: true,
    showStreakStats: true,
    showTrophy: false,
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
      title: 'DevPulse Analytics',
      description: 'Real-time telemetry dashboard for microservices.',
      repoUrl: 'https://github.com/alexrivera/devpulse',
      demoUrl: 'https://devpulse.io',
      stars: 342,
      tags: ['TypeScript', 'React', 'Go', 'Docker'],
      featured: true
    }
  ],
  socialLinks: {
    github: 'alexrivera',
    linkedin: 'alexrivera-dev',
    twitter: 'alexrivera_codes'
  },
  addons: {
    devQuote: true,
    devJoke: false,
    spotifyWidget: false
  }
};

test('generateMarkdown generates header, bio, and waving hand correctly', () => {
  const md = generateMarkdown(mockProfile);
  assert.ok(md.includes("# Hi, I'm Alex Rivera 👋"));
  assert.ok(md.includes("Senior Full Stack Engineer & Open Source Contributor"));
  assert.ok(md.includes("Passionate about building scalable distributed systems"));
});

test('generateMarkdown includes about me bullet points with links', () => {
  const md = generateMarkdown(mockProfile);
  assert.ok(md.includes("🔭 I’m currently working on [OctoProfile](https://github.com/octoprofile)"));
  assert.ok(md.includes("🌱 I’m currently learning **Rust & WebAssembly**"));
  assert.ok(md.includes("⚡ Fun fact: **I play jazz guitar in my spare time!**"));
});

test('generateMarkdown outputs skillicons with correct icon slugs', () => {
  const md = generateMarkdown(mockProfile);
  assert.ok(md.includes("https://skillicons.dev/icons?i=js,ts,react,nodejs,docker"));
});

test('generateMarkdown outputs GitHub stats cards with username and theme', () => {
  const md = generateMarkdown(mockProfile);
  assert.ok(md.includes("github-readme-stats.vercel.app/api?username=alexrivera&theme=tokyonight"));
  assert.ok(md.includes("streak-stats.demolab.com?user=alexrivera&theme=tokyonight"));
});

test('generateMarkdown formats projects and social badges', () => {
  const md = generateMarkdown(mockProfile);
  assert.ok(md.includes("### [DevPulse Analytics](https://github.com/alexrivera/devpulse)  ⭐ *Featured*"));
  assert.ok(md.includes("[📁 Repository](https://github.com/alexrivera/devpulse) • [🌐 Live Demo](https://devpulse.io) • ⭐ 342 stars"));
  assert.ok(md.includes("img.shields.io/badge/LinkedIn-0077B5"));
  assert.ok(md.includes("img.shields.io/badge/Twitter-000000"));
});
