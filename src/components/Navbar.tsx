import React from 'react';
import { 
  Sparkles, 
  Moon, 
  Sun, 
  Cloud, 
  CloudCheck, 
  User, 
  LogOut, 
  Github, 
  HelpCircle,
  FileCode2,
  LayoutGrid
} from 'lucide-react';
import { UserSession } from '../types.ts';

interface NavbarProps {
  currentView: 'landing' | 'editor';
  setCurrentView: (v: 'landing' | 'editor') => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  user: UserSession | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenGuide: () => void;
  onOpenTemplates: () => void;
  isCloudSynced: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  isDark,
  setIsDark,
  user,
  onOpenAuth,
  onLogout,
  onOpenGuide,
  onOpenTemplates,
  isCloudSynced
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
          role="button"
          aria-label="OctoProfile Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
                OctoProfile
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                PRO
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-0.5 hidden sm:block">
              GitHub Profile README Builder
            </p>
          </div>
        </div>

        {/* Navigation Center */}
        <nav className="flex items-center gap-1">
          <button
            onClick={() => setCurrentView('landing')}
            className={`px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              currentView === 'landing'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentView('editor')}
            className={`px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 ${
              currentView === 'editor'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Studio</span>
          </button>
          <button
            onClick={onOpenTemplates}
            className="px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors hidden sm:flex items-center gap-1"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-emerald-500" />
            <span>Templates</span>
          </button>
          <button
            onClick={onOpenGuide}
            className="px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors hidden md:flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Deploy</span>
          </button>
        </nav>

        {/* Right Actions: Dark Mode, Cloud Sync, Auth */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle Dark Mode"
            className="p-1.5 sm:p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>

          {/* Cloud Sync Status / User */}
          {user ? (
            <div className="flex items-center gap-1 sm:gap-2 pl-1 sm:pl-2 border-l border-zinc-200 dark:border-zinc-800">
              <div 
                className="flex items-center gap-1 text-[11px] sm:text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                title="Synced to cloud database"
              >
                <Cloud className="w-3 h-3" />
                <span className="hidden sm:inline">Synced</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                <span className="hidden md:inline font-mono text-xs">{user.username}</span>
                <button
                  onClick={onLogout}
                  aria-label="Log Out"
                  title="Log out"
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden xs:inline">Sync</span>
            </button>
          )}

          {/* Quick CTA */}
          {currentView === 'landing' ? (
            <button
              onClick={() => setCurrentView('editor')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio</span>
            </button>
          ) : null}
        </div>

      </div>
    </header>
  );
};
