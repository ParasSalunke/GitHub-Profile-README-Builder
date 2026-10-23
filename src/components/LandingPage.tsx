import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Github, 
  Layers, 
  TrendingUp, 
  Palette, 
  Cloud, 
  FileCode2, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Code2
} from 'lucide-react';
import { TEMPLATES } from '../utils/templates.ts';
import { TemplatePreset, ProfileData } from '../types.ts';

interface LandingPageProps {
  onStartEditing: () => void;
  onSelectTemplate: (tpl: TemplatePreset) => void;
  onOpenGuide: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartEditing,
  onSelectTemplate,
  onOpenGuide
}) => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-sky-500/10 to-purple-500/15 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Top pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
            <span>Powered by Gemini AI • Zero Code Required</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Craft a High-Impact{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-sky-500 to-purple-600 bg-clip-text text-transparent">
              GitHub Profile README
            </span>{' '}
            in Minutes
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Stand out to recruiters, tech leads, and open-source contributors. Generate clean markdown, 
            tech badges, GitHub streak analytics, and personalized AI bios without writing any code.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onStartEditing}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Launch Studio Generator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onOpenGuide}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>How To Deploy to GitHub</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>150+ Tech Stack Badges</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Live GitHub SVG Stats</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Dark & Light Themes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Multi-Device Cloud Sync</span>
            </div>
          </div>

          {/* Interactive Live Teaser Card */}
          <div className="mt-14 max-w-4xl mx-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden text-left">
            <div className="p-3.5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-zinc-500 ml-2">README.md — Live Render Preview</span>
              </div>
              <button
                onClick={onStartEditing}
                className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Customize in Studio</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Hey there, I'm Alex Rivera 👋
                </h3>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-mono">
                  Full-Stack Developer 💻 • Cloud Architecture Geek ☁️
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
                  Crafting robust distributed systems, edge-native microservices, and delightful developer tools.
                </p>
              </div>

              {/* Skills preview */}
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Tech Stack & Tooling
                </span>
                <div className="flex flex-wrap justify-center gap-2 pt-1">
                  {['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'].map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Simulated Stats preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-center space-y-1">
                  <div className="text-xs text-zinc-500 font-medium">GitHub Streak</div>
                  <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">142 Days 🔥</div>
                  <div className="text-[11px] text-zinc-400">Longest Streak: 310 Days</div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-center space-y-1">
                  <div className="text-xs text-zinc-500 font-medium">Top Languages</div>
                  <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">TypeScript 64%</div>
                  <div className="text-[11px] text-zinc-400">Python 22% • Go 14%</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Templates Showcase Section */}
      <section className="py-16 border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              Curated Ready-Made Templates
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Select any pre-configured template tailored to your specific engineering discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEMPLATES.slice(0, 3).map(tpl => (
              <div
                key={tpl.id}
                className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {tpl.role}
                    </span>
                    <span className={`w-3 h-3 rounded-full ${tpl.previewBadgeColor}`} />
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                    {tpl.description}
                  </p>
                </div>

                <button
                  onClick={() => onSelectTemplate(tpl)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-indigo-600 hover:text-white dark:bg-zinc-800 dark:hover:bg-indigo-600 text-zinc-800 dark:text-zinc-200 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Use This Template</span>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onStartEditing}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Explore all {TEMPLATES.length} templates in the Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            Everything You Need for a 10/10 Profile
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            A comprehensive suite of widgets, badges, and AI helpers to showcase your engineering journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white">
              Gemini AI Bio & Tagline Polish
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Generate punchy developer elevator pitches in various tones (executive, witty, or high-impact) with 1 click.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white">
              150+ Tech Badges & Icons
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Choose from Shields.io badges or dynamic SkillIcons. Supports custom badge styles: flat, for-the-badge, and plastic.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white">
              Live GitHub Stats & Streaks
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Showcase commits, repositories, streak days, languages breakdown, trophies, and profile visitor counters.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white">
              9 Customizable Themes
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Sync stats card palettes with your preferred aesthetic: Tokyo Night, Dracula, Catppuccin, Nord, Synthwave, and more.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Cloud className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white">
              Multi-Device Cloud Sync
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Never lose your configuration. Save your projects to the cloud and edit seamlessly across your laptop, tablet, or desktop.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center">
              <FileCode2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white">
              1-Click Copy & Download
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Export standard Markdown with clean formatting, ready to paste directly into your GitHub special profile repo.
            </p>
          </div>

        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 border-t border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-transparent to-indigo-50/50 dark:to-indigo-950/20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            Ready to upgrade your GitHub presence?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Join thousands of developers presenting their projects and open-source contributions with style.
          </p>
          <div className="pt-2">
            <button
              onClick={onStartEditing}
              className="px-8 py-3.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/25 transition-transform hover:scale-105 inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create My Profile Now</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
