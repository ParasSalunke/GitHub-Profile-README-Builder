import React, { useState, useId } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  HelpCircle, 
  Eye, 
  Code2, 
  Palette, 
  User, 
  Info, 
  Layers, 
  BarChart3, 
  Rocket, 
  Share2, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Cloud, 
  RefreshCw,
  Search,
  Sliders,
  ChevronDown,
  ChevronUp,
  Wand2,
  Smile
} from 'lucide-react';
import { 
  ProfileData, 
  PreviewTheme, 
  BadgeStyle, 
  ProjectItem, 
  TemplatePreset 
} from '../types.ts';
import { ALL_SKILLS, SKILL_CATEGORIES, SKILL_MAP } from '../utils/skillsData.ts';
import { generateMarkdown } from '../utils/markdownGenerator.ts';
import { TEMPLATES } from '../utils/templates.ts';

interface EditorPageProps {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  onOpenAiModal: () => void;
  onOpenGuideModal: () => void;
  onOpenTemplatesModal: () => void;
  onSaveCloud: () => void;
  isSavingCloud: boolean;
  cloudMessage: string | null;
}

export const EditorPage: React.FC<EditorPageProps> = ({
  profile,
  setProfile,
  onOpenAiModal,
  onOpenGuideModal,
  onOpenTemplatesModal,
  onSaveCloud,
  isSavingCloud,
  cloudMessage
}) => {
  const [activeTab, setActiveTab] = useState<'theme' | 'header' | 'about' | 'skills' | 'stats' | 'projects' | 'social' | 'addons'>('header');
  const [previewMode, setPreviewMode] = useState<'rendered' | 'markdown'>('rendered');
  const [copied, setCopied] = useState(false);
  const [skillSearch, setSkillSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // New typing text input helper
  const [newTypingText, setNewTypingText] = useState('');

  // Project generator helper state
  const [aiProjectIndex, setAiProjectIndex] = useState<number | null>(null);
  const [isGeneratingProject, setIsGeneratingProject] = useState(false);

  const markdownOutput = React.useMemo(() => generateMarkdown(profile), [profile]);

  const handleCopyMarkdown = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(markdownOutput);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      // Fallback for restricted iframe or permissions
      const textarea = document.createElement('textarea');
      textarea.value = markdownOutput;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
      } catch (e) {
        console.warn('execCommand failed:', e);
      }
      document.body.removeChild(textarea);
    }
    setCopied(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch {}
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdownOutput], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    link.click();
    URL.revokeObjectURL(url);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 }
    });
  };

  // Skill toggle
  const toggleSkill = (id: string) => {
    setProfile(prev => {
      const exists = prev.skills.includes(id);
      return {
        ...prev,
        skills: exists ? prev.skills.filter(s => s !== id) : [...prev.skills, id]
      };
    });
  };

  // Add project
  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: 'proj_' + Date.now(),
      title: 'New Awesome Project',
      description: 'A brief description of this cutting-edge application.',
      repoUrl: `https://github.com/${profile.githubStats.username || 'username'}/project`,
      demoUrl: 'https://demo.dev',
      stars: 12,
      tags: ['TypeScript', 'React'],
      featured: true
    };
    setProfile(prev => ({
      ...prev,
      projects: [...prev.projects, newProj]
    }));
  };

  const handleUpdateProject = (id: string, updates: Partial<ProjectItem>) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  };

  const handleDeleteProject = (id: string) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const handleAiProjectDesc = async (idx: number, project: ProjectItem) => {
    setAiProjectIndex(idx);
    setIsGeneratingProject(true);
    try {
      const res = await fetch('/api/gemini/generate-project-desc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: project.title,
          roughNotes: project.description,
          tags: project.tags
        }),
      });
      const data = await res.json();
      if (data.description) {
        handleUpdateProject(project.id, {
          description: data.description,
          tags: data.suggestedTags || project.tags
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingProject(false);
      setAiProjectIndex(null);
    }
  };

  // Filter skills
  const filteredSkills = ALL_SKILLS.filter(s => {
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(skillSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Banner: Quick Template Switcher & AI Trigger */}
      <div className="mb-6 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-zinc-900 dark:text-white">
                Active Template: {profile.titleName || 'Full-Stack Artisan'}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Editing live. Changes reflect immediately in the preview.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={onOpenAiModal}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gemini AI Studio</span>
          </button>
          <button
            onClick={onOpenTemplatesModal}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors"
          >
            Templates Gallery
          </button>
          <button
            onClick={onSaveCloud}
            disabled={isSavingCloud}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors flex items-center gap-1"
          >
            <Cloud className="w-3.5 h-3.5 text-indigo-500" />
            <span>{isSavingCloud ? 'Saving...' : 'Sync Cloud'}</span>
          </button>
        </div>
      </div>

      {cloudMessage && (
        <div className="mb-4 p-3 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          {cloudMessage}
        </div>
      )}

      {/* Main 2-Column Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Tab Navigation */}
          <div className="p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-1">
            {[
              { id: 'header', label: 'Header & Bio', icon: User },
              { id: 'skills', label: 'Skills Stack', icon: Layers },
              { id: 'stats', label: 'GitHub Stats', icon: BarChart3 },
              { id: 'projects', label: 'Projects', icon: Rocket },
              { id: 'about', label: 'About Me', icon: Info },
              { id: 'social', label: 'Socials', icon: Share2 },
              { id: 'theme', label: 'Theme & Style', icon: Palette },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content Area */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
            
            {/* TAB: HEADER & BIO */}
            {activeTab === 'header' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                    Personal Details & Intro
                  </h3>
                  <button
                    onClick={onOpenAiModal}
                    className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Polish Bio</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. Alex Rivera"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Header Alignment
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setProfile(p => ({ ...p, headerAlignment: 'left' }))}
                        className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                          profile.headerAlignment === 'left'
                            ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        Left Align
                      </button>
                      <button
                        onClick={() => setProfile(p => ({ ...p, headerAlignment: 'center' }))}
                        className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                          profile.headerAlignment === 'center'
                            ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        Center Align
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Tagline / Subheadline
                  </label>
                  <input
                    type="text"
                    value={profile.tagline}
                    onChange={(e) => setProfile(p => ({ ...p, tagline: e.target.value }))}
                    placeholder="e.g. Crafting robust distributed systems & modern web experiences"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Short Bio (Markdown supported)
                  </label>
                  <textarea
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))}
                    placeholder="Write a concise overview of your background, passions, and engineering mindset..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <label className="flex items-center gap-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <input
                      type="checkbox"
                      checked={profile.showWavingHand}
                      onChange={(e) => setProfile(p => ({ ...p, showWavingHand: e.target.checked }))}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      Show Waving Hand 👋
                    </span>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <input
                      type="checkbox"
                      checked={profile.typingEffect}
                      onChange={(e) => setProfile(p => ({ ...p, typingEffect: e.target.checked }))}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      Typing SVG Animation ⚡
                    </span>
                  </label>
                </div>

                {/* Typing lines editor */}
                {profile.typingEffect && (
                  <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      <span>Typing Headlines</span>
                      <span className="text-[10px] text-zinc-400">Rotates in sequence</span>
                    </div>

                    <div className="space-y-1.5">
                      {profile.typingTexts.map((text, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={text}
                            onChange={(e) => {
                              const updated = [...profile.typingTexts];
                              updated[i] = e.target.value;
                              setProfile(p => ({ ...p, typingTexts: updated }));
                            }}
                            className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                          />
                          <button
                            onClick={() => {
                              const updated = profile.typingTexts.filter((_, idx) => idx !== i);
                              setProfile(p => ({ ...p, typingTexts: updated }));
                            }}
                            className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={newTypingText}
                        onChange={(e) => setNewTypingText(e.target.value)}
                        placeholder="Add new title (e.g. Open Source Contributor)..."
                        className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                      />
                      <button
                        onClick={() => {
                          if (newTypingText.trim()) {
                            setProfile(p => ({ ...p, typingTexts: [...p.typingTexts, newTypingText.trim()] }));
                            setNewTypingText('');
                          }
                        }}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}

                {/* Banner & Avatar URLs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Avatar Image URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={profile.avatarUrl || ''}
                      onChange={(e) => setProfile(p => ({ ...p, avatarUrl: e.target.value }))}
                      placeholder="https://..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Header Banner Image URL
                    </label>
                    <input
                      type="text"
                      value={profile.bannerUrl || ''}
                      onChange={(e) => setProfile(p => ({ ...p, bannerUrl: e.target.value }))}
                      placeholder="https://..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: TECH STACK & SKILLS */}
            {activeTab === 'skills' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                      Tech Stack & Ecosystem
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Select languages, frameworks, and tools to showcase on your profile.
                    </p>
                  </div>
                  <button
                    onClick={onOpenAiModal}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Recommend Stack</span>
                  </button>
                </div>

                {/* Display Mode selector */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'skillicons', label: 'SkillIcons (Clean SVG)' },
                    { id: 'shields', label: 'Shields.io Badges' },
                    { id: 'grouped_shields', label: 'Grouped by Category' },
                  ].map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setProfile(p => ({ ...p, skillDisplayMode: mode.id as any }))}
                      className={`p-2 rounded-xl text-xs font-semibold border text-center transition-colors ${
                        profile.skillDisplayMode === mode.id
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                          : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>

                {/* Search & Category Filter */}
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={skillSearch}
                      onChange={(e) => setSkillSearch(e.target.value)}
                      placeholder="Filter 150+ skills (e.g. React, Docker, Python)..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1 text-[11px] font-semibold">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-2.5 py-1 rounded-lg transition-colors ${
                        selectedCategory === 'all'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                      }`}
                    >
                      All ({ALL_SKILLS.length})
                    </button>
                    {SKILL_CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                          selectedCategory === cat.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="max-h-60 overflow-y-auto p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 flex flex-wrap gap-1.5">
                  {filteredSkills.map(skill => {
                    const isSelected = profile.skills.includes(skill.id);
                    return (
                      <button
                        key={skill.id}
                        onClick={() => toggleSkill(skill.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-sm scale-105'
                            : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-indigo-400'
                        }`}
                      >
                        {isSelected ? <Check className="w-3 h-3 text-white" /> : null}
                        <span>{skill.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected count info */}
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>Selected: <strong>{profile.skills.length}</strong> skills</span>
                  {profile.skills.length > 0 && (
                    <button
                      onClick={() => setProfile(p => ({ ...p, skills: [] }))}
                      className="text-red-500 hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TAB: GITHUB STATS & WIDGETS */}
            {activeTab === 'stats' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                    GitHub Profile Cards & Analytics
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Enter your GitHub username to dynamically pull your real contribution activity.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    value={profile.githubStats.username}
                    onChange={(e) => setProfile(p => ({
                      ...p,
                      githubStats: { ...p.githubStats, username: e.target.value.trim() }
                    }))}
                    placeholder="e.g. salunkeparas24"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-mono"
                  />
                </div>

                {/* Cards Toggles */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Active Profile Widgets
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { key: 'showStatsCard', label: 'Overall GitHub Stats' },
                      { key: 'showStreakStats', label: 'Contribution Streak' },
                      { key: 'showTopLangsCard', label: 'Top Languages Card' },
                      { key: 'showTrophy', label: 'Profile Trophies Showcase' },
                      { key: 'showActivityGraph', label: 'Activity Graph' },
                      { key: 'showContributionSnake', label: 'Contribution Snake' },
                      { key: 'showVisitorBadge', label: 'Profile Views Badge' },
                    ].map(card => (
                      <label 
                        key={card.key}
                        className="flex items-center gap-2 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-xs font-medium text-zinc-800 dark:text-zinc-200"
                      >
                        <input
                          type="checkbox"
                          checked={(profile.githubStats as any)[card.key]}
                          onChange={(e) => setProfile(p => ({
                            ...p,
                            githubStats: { ...p.githubStats, [card.key]: e.target.checked }
                          }))}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>{card.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Appearance tweaks */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Card Options
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={profile.githubStats.hideBorder}
                        onChange={(e) => setProfile(p => ({
                          ...p,
                          githubStats: { ...p.githubStats, hideBorder: e.target.checked }
                        }))}
                        className="rounded text-indigo-600"
                      />
                      <span>Hide Card Borders</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={profile.githubStats.showIcons}
                        onChange={(e) => setProfile(p => ({
                          ...p,
                          githubStats: { ...p.githubStats, showIcons: e.target.checked }
                        }))}
                        className="rounded text-indigo-600"
                      />
                      <span>Show Metric Icons</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={profile.githubStats.includeAllCommits}
                        onChange={(e) => setProfile(p => ({
                          ...p,
                          githubStats: { ...p.githubStats, includeAllCommits: e.target.checked }
                        }))}
                        className="rounded text-indigo-600"
                      />
                      <span>Count All Commits</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={profile.githubStats.countPrivate}
                        onChange={(e) => setProfile(p => ({
                          ...p,
                          githubStats: { ...p.githubStats, countPrivate: e.target.checked }
                        }))}
                        className="rounded text-indigo-600"
                      />
                      <span>Count Private Contributions</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                      Featured Projects & Repositories
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Highlight your notable applications, libraries, and open-source contributions.
                    </p>
                  </div>
                  <button
                    onClick={handleAddProject}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {profile.projects.map((proj, idx) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1 mr-2">
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => handleUpdateProject(proj.id, { title: e.target.value })}
                            placeholder="Project Title"
                            className="font-bold text-xs px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white flex-1"
                          />
                          <label className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!proj.featured}
                              onChange={(e) => handleUpdateProject(proj.id, { featured: e.target.checked })}
                              className="rounded text-amber-500"
                            />
                            <span>Featured</span>
                          </label>
                        </div>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="relative">
                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => handleUpdateProject(proj.id, { description: e.target.value })}
                          placeholder="What problem does this project solve? Key technical highlights..."
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        />
                        <button
                          onClick={() => handleAiProjectDesc(idx, proj)}
                          disabled={isGeneratingProject && aiProjectIndex === idx}
                          className="absolute right-2 bottom-3 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-50 text-indigo-600 dark:bg-indigo-950/70 dark:text-indigo-300 hover:bg-indigo-100 flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>{isGeneratingProject && aiProjectIndex === idx ? 'Enhancing...' : 'AI Polish'}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <input
                          type="text"
                          value={proj.repoUrl}
                          onChange={(e) => handleUpdateProject(proj.id, { repoUrl: e.target.value })}
                          placeholder="GitHub Repository URL"
                          className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        />
                        <input
                          type="text"
                          value={proj.demoUrl || ''}
                          onChange={(e) => handleUpdateProject(proj.id, { demoUrl: e.target.value })}
                          placeholder="Live Demo URL (Optional)"
                          className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          value={proj.tags.join(', ')}
                          onChange={(e) => handleUpdateProject(proj.id, { 
                            tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) 
                          })}
                          placeholder="Tech Tags (comma separated: TypeScript, React, Go)"
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-mono"
                        />
                      </div>
                    </div>
                  ))}

                  {profile.projects.length === 0 && (
                    <div className="py-6 text-center text-xs text-zinc-400">
                      No projects added yet. Click "Add Project" above to showcase your repositories!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: ABOUT ME */}
            {activeTab === 'about' && (
              <div className="space-y-3.5">
                <div>
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                    About Me Bullet Points
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Standard GitHub profile bullet points that recruiters love to scan.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold block mb-1">🔭 Currently working on</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={profile.aboutMe.workingOn?.title || ''}
                        onChange={(e) => setProfile(p => ({
                          ...p,
                          aboutMe: { ...p.aboutMe, workingOn: { ...p.aboutMe.workingOn, title: e.target.value } }
                        }))}
                        placeholder="Project title..."
                        className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                      />
                      <input
                        type="text"
                        value={profile.aboutMe.workingOn?.url || ''}
                        onChange={(e) => setProfile(p => ({
                          ...p,
                          aboutMe: { ...p.aboutMe, workingOn: { ...p.aboutMe.workingOn, title: p.aboutMe.workingOn?.title || '', url: e.target.value } }
                        }))}
                        placeholder="Project URL..."
                        className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">🌱 Currently learning</label>
                    <input
                      type="text"
                      value={profile.aboutMe.learning || ''}
                      onChange={(e) => setProfile(p => ({
                        ...p,
                        aboutMe: { ...p.aboutMe, learning: e.target.value }
                      }))}
                      placeholder="e.g. Rust, WebAssembly & Deep Learning"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">👯 Looking to collaborate on</label>
                    <input
                      type="text"
                      value={profile.aboutMe.collaboratingOn || ''}
                      onChange={(e) => setProfile(p => ({
                        ...p,
                        aboutMe: { ...p.aboutMe, collaboratingOn: e.target.value }
                      }))}
                      placeholder="e.g. Developer tools & open source projects"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">💬 Ask me about</label>
                    <input
                      type="text"
                      value={profile.aboutMe.askMeAbout || ''}
                      onChange={(e) => setProfile(p => ({
                        ...p,
                        aboutMe: { ...p.aboutMe, askMeAbout: e.target.value }
                      }))}
                      placeholder="e.g. React, Next.js, Cloud Architecture, GraphQL"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">📫 How to reach me</label>
                    <input
                      type="text"
                      value={profile.aboutMe.reachingMe || ''}
                      onChange={(e) => setProfile(p => ({
                        ...p,
                        aboutMe: { ...p.aboutMe, reachingMe: e.target.value }
                      }))}
                      placeholder="e.g. email or LinkedIn handle"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">⚡ Fun fact</label>
                    <input
                      type="text"
                      value={profile.aboutMe.funFact || ''}
                      onChange={(e) => setProfile(p => ({
                        ...p,
                        aboutMe: { ...p.aboutMe, funFact: e.target.value }
                      }))}
                      placeholder="e.g. I make artisanal sourdough and play guitar!"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SOCIALS */}
            {activeTab === 'social' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                    Social & Contact Badges
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Rendered as sleek Shields.io badges linking directly to your profiles.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold block mb-1">LinkedIn Username or URL</label>
                    <input
                      type="text"
                      value={profile.socialLinks.linkedin || ''}
                      onChange={(e) => setProfile(p => ({
                        ...p,
                        socialLinks: { ...p.socialLinks, linkedin: e.target.value }
                      }))}
                      placeholder="e.g. alexrivera-dev"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Twitter / X Handle</label>
                    <input
                      type="text"
                      value={profile.socialLinks.twitter || ''}
                      onChange={(e) => setProfile(p => ({
                        ...p,
                        socialLinks: { ...p.socialLinks, twitter: e.target.value }
                      }))}
                      placeholder="e.g. alex_codes"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Portfolio Website URL</label>
                    <input
                      type="text"
                      value={profile.socialLinks.portfolio || ''}
                      onChange={(e) => setProfile(p => ({
                        ...p,
                        socialLinks: { ...p.socialLinks, portfolio: e.target.value }
                      }))}
                      placeholder="e.g. https://alexrivera.dev"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Contact Email</label>
                    <input
                      type="text"
                      value={profile.socialLinks.email || ''}
                      onChange={(e) => setProfile(p => ({
                        ...p,
                        socialLinks: { ...p.socialLinks, email: e.target.value }
                      }))}
                      placeholder="e.g. alex@gmail.com"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Discord Tag or Invite</label>
                    <input
                      type="text"
                      value={profile.socialLinks.discord || ''}
                      onChange={(e) => setProfile(p => ({
                        ...p,
                        socialLinks: { ...p.socialLinks, discord: e.target.value }
                      }))}
                      placeholder="e.g. alex#1234"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">LeetCode Username</label>
                    <input
                      type="text"
                      value={profile.socialLinks.leetcode || ''}
                      onChange={(e) => setProfile(p => ({
                        ...p,
                        socialLinks: { ...p.socialLinks, leetcode: e.target.value }
                      }))}
                      placeholder="e.g. alex_coder"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">YouTube Channel Handle</label>
                    <input
                      type="text"
                      value={profile.socialLinks.youtube || ''}
                      onChange={(e) => setProfile(p => ({
                        ...p,
                        socialLinks: { ...p.socialLinks, youtube: e.target.value }
                      }))}
                      placeholder="e.g. AlexRiveraTech"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Buy Me A Coffee Username</label>
                    <input
                      type="text"
                      value={profile.socialLinks.buymeacoffee || ''}
                      onChange={(e) => setProfile(p => ({
                        ...p,
                        socialLinks: { ...p.socialLinks, buymeacoffee: e.target.value }
                      }))}
                      placeholder="e.g. alexrivera"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: THEME & STYLE */}
            {activeTab === 'theme' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                    Theme & Aesthetic Customization
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Personalize your GitHub stats color scheme and badge styling.
                  </p>
                </div>

                {/* Theme Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    GitHub Stats Theme
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'github_dark', label: 'GitHub Dark' },
                      { id: 'tokyonight', label: 'Tokyo Night' },
                      { id: 'dracula', label: 'Dracula' },
                      { id: 'catppuccin_mocha', label: 'Catppuccin' },
                      { id: 'radical', label: 'Radical' },
                      { id: 'nord', label: 'Nord' },
                      { id: 'onedark', label: 'One Dark' },
                      { id: 'gruvbox', label: 'Gruvbox' },
                      { id: 'synthwave', label: 'Synthwave' },
                    ].map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => setProfile(p => ({
                          ...p,
                          githubStats: { ...p.githubStats, theme: theme.id as PreviewTheme }
                        }))}
                        className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                          profile.githubStats.theme === theme.id
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                        }`}
                      >
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Badge Style Selector */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Shields.io Badge Style
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'for-the-badge', label: 'For The Badge' },
                      { id: 'flat', label: 'Flat' },
                      { id: 'flat-square', label: 'Flat Square' },
                      { id: 'plastic', label: 'Plastic' },
                    ].map(style => (
                      <button
                        key={style.id}
                        onClick={() => setProfile(p => ({ ...p, badgeStyle: style.id as BadgeStyle }))}
                        className={`p-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                          profile.badgeStyle === style.id
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                        }`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Addons toggles */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Profile Add-ons & Extra Widgets
                  </label>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={profile.addons.devQuote}
                        onChange={(e) => setProfile(p => ({
                          ...p,
                          addons: { ...p.addons, devQuote: e.target.checked }
                        }))}
                        className="rounded text-indigo-600"
                      />
                      <span>Dynamic Daily Dev Quote Card</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={profile.addons.devJoke}
                        onChange={(e) => setProfile(p => ({
                          ...p,
                          addons: { ...p.addons, devJoke: e.target.checked }
                        }))}
                        className="rounded text-indigo-600"
                      />
                      <span>Random Dev Joke Card</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Live Sticky Preview */}
        <div className="lg:col-span-6 sticky top-20">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden flex flex-col max-h-[calc(100vh-6rem)]">
            
            {/* Preview Toolbar */}
            <div className="p-3.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex flex-wrap items-center justify-between gap-2">
              
              {/* Tab Switcher: Rendered vs Raw Markdown */}
              <div className="flex items-center gap-1 bg-zinc-200/80 dark:bg-zinc-800 p-1 rounded-xl">
                <button
                  onClick={() => setPreviewMode('rendered')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    previewMode === 'rendered'
                      ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Rendered Preview</span>
                </button>
                <button
                  onClick={() => setPreviewMode('markdown')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    previewMode === 'markdown'
                      ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Raw Markdown</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopyMarkdown}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
                  title="Copy markdown to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Markdown'}</span>
                </button>

                <button
                  onClick={handleDownloadMarkdown}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-semibold border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors flex items-center gap-1"
                  title="Download README.md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">.md</span>
                </button>

                <button
                  onClick={onOpenGuideModal}
                  className="p-1.5 rounded-xl text-zinc-500 hover:text-indigo-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  title="How to add to GitHub"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Preview Body */}
            <div className="p-6 overflow-y-auto flex-1 font-sans text-sm">
              {previewMode === 'rendered' ? (
                /* Authentically Styled GitHub Profile Render View */
                <div className="space-y-6 text-zinc-900 dark:text-zinc-100">
                  
                  {/* Banner */}
                  {profile.bannerUrl && (
                    <div className={profile.headerAlignment === 'center' ? 'text-center' : ''}>
                      <img 
                        src={profile.bannerUrl} 
                        alt="Banner" 
                        className="w-full max-h-48 object-cover rounded-xl shadow-xs" 
                      />
                    </div>
                  )}

                  {/* Header Title & Avatar */}
                  <div className={`space-y-2 ${profile.headerAlignment === 'center' ? 'text-center' : 'text-left'}`}>
                    {profile.avatarUrl && (
                      <div className={`flex ${profile.headerAlignment === 'center' ? 'justify-center' : 'justify-start'}`}>
                        <img 
                          src={profile.avatarUrl} 
                          alt={profile.name} 
                          className="w-20 h-20 rounded-full border-2 border-indigo-500/30 object-cover shadow-sm"
                        />
                      </div>
                    )}

                    <h1 className="text-2xl font-bold tracking-tight">
                      Hey there, I'm {profile.name || 'Developer'} {profile.showWavingHand ? '👋' : ''}
                    </h1>

                    {profile.typingEffect && profile.typingTexts.length > 0 ? (
                      <div className="py-1">
                        <span className="font-mono text-sm px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-200 dark:border-indigo-800">
                          ⚡ {profile.typingTexts[0]}
                        </span>
                      </div>
                    ) : profile.tagline ? (
                      <h3 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                        {profile.tagline}
                      </h3>
                    ) : null}

                    {profile.githubStats.showVisitorBadge && (
                      <div className={`pt-1 flex ${profile.headerAlignment === 'center' ? 'justify-center' : 'justify-start'}`}>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
                          👁️ Profile Views: 4,892
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bio */}
                  {profile.bio && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed border-l-2 border-indigo-500 pl-3">
                      {profile.bio}
                    </p>
                  )}

                  {/* About Me */}
                  {(profile.aboutMe.workingOn?.title || profile.aboutMe.learning || profile.aboutMe.askMeAbout || profile.aboutMe.funFact) && (
                    <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500">
                        💫 About Me
                      </h4>
                      <ul className="text-xs space-y-1.5 text-zinc-700 dark:text-zinc-300">
                        {profile.aboutMe.workingOn?.title && (
                          <li>🔭 I’m currently working on <strong>{profile.aboutMe.workingOn.title}</strong></li>
                        )}
                        {profile.aboutMe.learning && (
                          <li>🌱 I’m currently learning <strong>{profile.aboutMe.learning}</strong></li>
                        )}
                        {profile.aboutMe.collaboratingOn && (
                          <li>👯 Looking to collaborate on <strong>{profile.aboutMe.collaboratingOn}</strong></li>
                        )}
                        {profile.aboutMe.askMeAbout && (
                          <li>💬 Ask me about <strong>{profile.aboutMe.askMeAbout}</strong></li>
                        )}
                        {profile.aboutMe.reachingMe && (
                          <li>📫 How to reach me: <strong>{profile.aboutMe.reachingMe}</strong></li>
                        )}
                        {profile.aboutMe.funFact && (
                          <li>⚡ Fun fact: <strong>{profile.aboutMe.funFact}</strong></li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack */}
                  {profile.skills.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500">
                        🛠️ Tech Stack & Skills
                      </h4>

                      {profile.skillDisplayMode === 'skillicons' ? (
                        <div className={`p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 flex flex-wrap gap-2 ${profile.headerAlignment === 'center' ? 'justify-center' : ''}`}>
                          {profile.skills.map(id => {
                            const s = SKILL_MAP.get(id);
                            return (
                              <div 
                                key={id}
                                className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5 shadow-xs"
                              >
                                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                                <span>{s?.name || id}</span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className={`flex flex-wrap gap-1.5 ${profile.headerAlignment === 'center' ? 'justify-center' : ''}`}>
                          {profile.skills.map(id => {
                            const s = SKILL_MAP.get(id);
                            return (
                              <span
                                key={id}
                                style={{ backgroundColor: s?.badgeBg ? `#${s.badgeBg}` : '#333' }}
                                className="px-2 py-0.5 rounded text-[11px] font-bold text-white uppercase tracking-wider shadow-xs"
                              >
                                {s?.name || id}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* GitHub Analytics Widgets */}
                  {(profile.githubStats.showStatsCard || profile.githubStats.showStreakStats || profile.githubStats.showTopLangsCard) && (
                    <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500">
                        📊 GitHub Analytics
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {profile.githubStats.showStatsCard && (
                          <div className="p-3.5 rounded-xl bg-zinc-900 text-white border border-zinc-800 space-y-1.5 font-mono text-xs">
                            <div className="font-bold text-indigo-400">
                              {profile.githubStats.username || 'username'}'s GitHub Stats
                            </div>
                            <div className="text-[11px] space-y-1 text-zinc-300">
                              <div className="flex justify-between"><span>⭐ Total Stars:</span> <span>1,248</span></div>
                              <div className="flex justify-between"><span>📦 Total PRs:</span> <span>342</span></div>
                              <div className="flex justify-between"><span>🔥 Total Commits:</span> <span>2,890</span></div>
                              <div className="flex justify-between"><span>💼 Contributed to:</span> <span>34 repos</span></div>
                            </div>
                          </div>
                        )}

                        {profile.githubStats.showStreakStats && (
                          <div className="p-3.5 rounded-xl bg-zinc-900 text-white border border-zinc-800 space-y-1.5 font-mono text-xs text-center">
                            <div className="text-xs text-amber-400 font-bold">Current Streak 🔥</div>
                            <div className="text-2xl font-bold text-white">48 Days</div>
                            <div className="text-[10px] text-zinc-400">Longest Streak: 192 Days</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {profile.projects.length > 0 && (
                    <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500">
                        🚀 Featured Projects
                      </h4>
                      <div className="space-y-2.5">
                        {profile.projects.map(p => (
                          <div
                            key={p.id}
                            className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                                <span>{p.title}</span>
                                {p.featured && <span className="text-amber-500 text-[10px]">⭐ Featured</span>}
                              </span>
                              <div className="flex items-center gap-2 text-xs">
                                {p.repoUrl && (
                                  <a href={p.repoUrl} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                                    Code
                                  </a>
                                )}
                                {p.demoUrl && (
                                  <a href={p.demoUrl} target="_blank" rel="noreferrer" className="text-indigo-500 hover:underline">
                                    Demo
                                  </a>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-zinc-600 dark:text-zinc-300">
                              {p.description}
                            </p>
                            {p.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 pt-0.5">
                                {p.tags.map(t => (
                                  <span key={t} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-300">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Connect Badges */}
                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500">
                      🤝 Connect With Me
                    </h4>
                    <div className={`flex flex-wrap gap-1.5 ${profile.headerAlignment === 'center' ? 'justify-center' : ''}`}>
                      {profile.socialLinks.linkedin && (
                        <span className="px-2 py-1 rounded bg-[#0077B5] text-white text-[11px] font-bold">LinkedIn</span>
                      )}
                      {profile.socialLinks.twitter && (
                        <span className="px-2 py-1 rounded bg-black text-white text-[11px] font-bold">Twitter/X</span>
                      )}
                      {profile.socialLinks.discord && (
                        <span className="px-2 py-1 rounded bg-[#5865F2] text-white text-[11px] font-bold">Discord</span>
                      )}
                      {profile.socialLinks.email && (
                        <span className="px-2 py-1 rounded bg-[#EA4335] text-white text-[11px] font-bold">Email</span>
                      )}
                      {profile.socialLinks.portfolio && (
                        <span className="px-2 py-1 rounded bg-[#4285F4] text-white text-[11px] font-bold">Portfolio</span>
                      )}
                    </div>
                  </div>

                </div>
              ) : (
                /* Raw Markdown Code View */
                <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-200 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-indigo-600">
                  {markdownOutput}
                </pre>
              )}
            </div>

            {/* Bottom preview info */}
            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 flex items-center justify-between text-xs text-zinc-500">
              <span>Lines: {markdownOutput.split('\n').length}</span>
              <button
                onClick={handleCopyMarkdown}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Raw Markdown'}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
