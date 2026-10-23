import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { LandingPage } from './components/LandingPage.tsx';
import { EditorPage } from './components/EditorPage.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { AiEnhancerModal } from './components/AiEnhancerModal.tsx';
import { GitHubGuideModal } from './components/GitHubGuideModal.tsx';
import { TemplateGalleryModal } from './components/TemplateGalleryModal.tsx';
import { ProfileData, UserSession, TemplatePreset } from './types.ts';
import { DEFAULT_PROFILE, TEMPLATES } from './utils/templates.ts';
import { generateMarkdown } from './utils/markdownGenerator.ts';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'editor'>('landing');
  const [isDark, setIsDark] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // User auth state
  const [user, setUser] = useState<UserSession | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Profile configuration state
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem('octoprofile_draft');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PROFILE;
  });

  // Modal open states
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);

  // Cloud sync status
  const [isSavingCloud, setIsSavingCloud] = useState(false);
  const [cloudMessage, setCloudMessage] = useState<string | null>(null);

  // Sync dark mode class to HTML document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Load auth session on mount
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('octoprofile_token');
      const savedUser = localStorage.getItem('octoprofile_user');
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Session load error:', e);
    }
  }, []);

  // Autosave draft to local storage
  useEffect(() => {
    try {
      localStorage.setItem('octoprofile_draft', JSON.stringify(profile));
    } catch (e) {
      console.error('Local autosave error:', e);
    }
  }, [profile]);

  // Handle Cloud Save & Multi-Device Sync
  const handleSaveToCloud = async () => {
    if (!user || !token) {
      setIsAuthOpen(true);
      return;
    }

    setIsSavingCloud(true);
    setCloudMessage(null);
    try {
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          id: profile.id,
          name: profile.name || profile.titleName || 'My Profile README',
          data: profile
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to sync to cloud');
      }

      setCloudMessage('Profile synced securely to your cloud account!');
      setTimeout(() => setCloudMessage(null), 3500);
    } catch (err: any) {
      setCloudMessage(err.message || 'Error saving to cloud');
      setTimeout(() => setCloudMessage(null), 3500);
    } finally {
      setIsSavingCloud(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(console.error);
    }
    localStorage.removeItem('octoprofile_token');
    localStorage.removeItem('octoprofile_user');
    setUser(null);
    setToken(null);
  };

  const handleSelectTemplate = (tpl: TemplatePreset) => {
    setProfile(prev => ({
      ...prev,
      ...tpl.data as ProfileData,
      titleName: tpl.name,
      id: prev.id || 'prof_' + Date.now()
    }));
    setCurrentView('editor');
  };

  const handleApplyBio = (tagline: string, bio: string, typingTexts?: string[]) => {
    setProfile(prev => ({
      ...prev,
      tagline,
      bio,
      ...(typingTexts && typingTexts.length > 0 ? { typingTexts } : {})
    }));
  };

  const handleApplySkills = (skills: string[]) => {
    setProfile(prev => ({
      ...prev,
      skills
    }));
  };

  const currentMarkdown = React.useMemo(() => generateMarkdown(profile), [profile]);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isDark={isDark}
        setIsDark={setIsDark}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenTemplates={() => setIsTemplatesOpen(true)}
        isCloudSynced={!!user}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <LandingPage
            onStartEditing={() => setCurrentView('editor')}
            onSelectTemplate={handleSelectTemplate}
            onOpenGuide={() => setIsGuideOpen(true)}
          />
        ) : (
          <EditorPage
            profile={profile}
            setProfile={setProfile}
            onOpenAiModal={() => setIsAiOpen(true)}
            onOpenGuideModal={() => setIsGuideOpen(true)}
            onOpenTemplatesModal={() => setIsTemplatesOpen(true)}
            onSaveCloud={handleSaveToCloud}
            isSavingCloud={isSavingCloud}
            cloudMessage={cloudMessage}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">OctoProfile</span>
            <span>— The open-source GitHub Profile README Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              Deployment Guide
            </button>
            <button
              onClick={() => setIsTemplatesOpen(true)}
              className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              Templates
            </button>
            <button
              onClick={() => setCurrentView('editor')}
              className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              Editor
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(u, t) => {
          setUser(u);
          setToken(t);
        }}
      />

      <AiEnhancerModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        profile={profile}
        onApplyBio={handleApplyBio}
        onApplySkills={handleApplySkills}
        currentMarkdown={currentMarkdown}
      />

      <GitHubGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        username={profile.githubStats.username}
      />

      <TemplateGalleryModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelectTemplate={handleSelectTemplate}
        currentTemplateId={profile.titleName}
      />

    </div>
  );
}
