import React from 'react';
import { X, ExternalLink, Check, Copy, AlertCircle, BookOpen } from 'lucide-react';

interface GitHubGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

export const GitHubGuideModal: React.FC<GitHubGuideModalProps> = ({
  isOpen,
  onClose,
  username
}) => {
  const [copiedStep, setCopiedStep] = React.useState<number | null>(null);

  if (!isOpen) return null;

  const validUsername = username?.trim() || 'your-github-username';

  const copyText = async (text: string, stepIndex: number) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
      } catch {}
      document.body.removeChild(textarea);
    }
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-title"
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 id="guide-title" className="text-lg font-bold text-zinc-900 dark:text-white">
                How to Add Your README to GitHub
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                A simple 3-minute setup to activate your special profile repository
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close Guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-zinc-600 dark:text-zinc-300">
          
          {/* Note Box */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Special GitHub Secret:</strong> Creating a public repository with the exact same name as your GitHub username triggers GitHub's special profile feature! GitHub will display this repository’s <code className="font-mono bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded">README.md</code> directly at the top of your public profile page.
            </div>
          </div>

          {/* Step 1 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs">
                  1
                </span>
                <span>Create a Special Repository</span>
              </div>
              <a
                href="https://github.com/new"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                <span>github.com/new</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-xs text-zinc-500 pl-8">
              Set the <strong>Repository name</strong> to match your GitHub username:
            </p>
            <div className="pl-8 flex items-center gap-2">
              <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex-1 border border-zinc-200 dark:border-zinc-700">
                {validUsername}
              </div>
              <button
                onClick={() => copyText(validUsername, 1)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-1"
              >
                {copiedStep === 1 ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedStep === 1 ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs">
                2
              </span>
              <span>Configure Settings</span>
            </div>
            <ul className="pl-8 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 list-disc list-inside">
              <li>Make sure visibility is set to <strong>Public</strong> (private repos won’t show on your profile).</li>
              <li>Check the box <strong>"Add a README file"</strong> (optional if you plan to upload the downloaded file directly).</li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs">
                3
              </span>
              <span>Paste & Commit Your README</span>
            </div>
            <p className="text-xs text-zinc-500 pl-8">
              Click the green <strong>"Copy Markdown"</strong> button in OctoProfile, edit the <code className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">README.md</code> file in your new repository, paste the contents, and click <strong>"Commit changes"</strong>!
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Got it, Let's Build!
          </button>
        </div>
      </div>
    </div>
  );
};
