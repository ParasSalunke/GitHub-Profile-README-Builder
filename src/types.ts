export type BadgeStyle = 'for-the-badge' | 'flat' | 'flat-square' | 'plastic' | 'social';

export type PreviewTheme = 
  | 'github_dark'
  | 'tokyonight'
  | 'dracula'
  | 'catppuccin_mocha'
  | 'radical'
  | 'nord'
  | 'onedark'
  | 'gruvbox'
  | 'synthwave';

export interface SkillItem {
  id: string;
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'database' | 'devops' | 'ai' | 'mobile' | 'tools';
  iconSlug: string; // for skillicons.dev
  badgeName?: string; // for shields.io
  logoColor?: string; // hex without #
  badgeBg?: string; // hex without #
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  demoUrl?: string;
  stars?: number;
  tags: string[];
  featured?: boolean;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  discord?: string;
  youtube?: string;
  medium?: string;
  devto?: string;
  hashnode?: string;
  leetcode?: string;
  codeforces?: string;
  kaggle?: string;
  instagram?: string;
  portfolio?: string;
  email?: string;
  buymeacoffee?: string;
  kofi?: string;
}

export interface AboutMeSection {
  workingOn?: { title: string; url?: string };
  learning?: string;
  collaboratingOn?: string;
  helpWith?: string;
  askMeAbout?: string;
  reachingMe?: string;
  funFact?: string;
  currentPronouns?: string;
}

export interface GithubStatsConfig {
  username: string;
  theme: PreviewTheme;
  showStatsCard: boolean;
  showTopLangsCard: boolean;
  showStreakStats: boolean;
  showTrophy: boolean;
  showActivityGraph: boolean;
  showContributionSnake: boolean;
  showVisitorBadge: boolean;
  hideBorder: boolean;
  showIcons: boolean;
  includeAllCommits: boolean;
  countPrivate: boolean;
}

export interface ProfileData {
  id: string;
  titleName: string;
  name: string;
  tagline: string;
  bio: string;
  avatarUrl?: string;
  bannerUrl?: string;
  headerAlignment: 'left' | 'center';
  showWavingHand: boolean;
  typingEffect: boolean;
  typingTexts: string[];
  
  aboutMe: AboutMeSection;
  
  skills: string[]; // skill IDs
  skillDisplayMode: 'skillicons' | 'shields' | 'grouped_shields';
  badgeStyle: BadgeStyle;
  
  githubStats: GithubStatsConfig;
  
  projects: ProjectItem[];
  socialLinks: SocialLinks;
  
  addons: {
    devQuote: boolean;
    devJoke: boolean;
    spotifyWidget: boolean;
    spotifyTrackUrl?: string;
    customMarkdown?: string;
  };

  updatedAt?: string;
}

export interface TemplatePreset {
  id: string;
  name: string;
  role: string;
  description: string;
  previewBadgeColor: string;
  data: Partial<ProfileData>;
}

export interface UserSession {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}
