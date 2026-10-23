import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Bot, 
  Check, 
  Wand2, 
  Loader2, 
  TrendingUp, 
  FileText, 
  Layers, 
  Star,
  Copy
} from 'lucide-react';
import { ProfileData } from '../types.ts';
import { ALL_SKILLS, SKILL_MAP } from '../utils/skillsData.ts';

interface AiEnhancerModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onApplyBio: (tagline: string, bio: string, typingTexts?: string[]) => void;
  onApplySkills: (skillIds: string[]) => void;
  currentMarkdown: string;
}

export const AiEnhancerModal: React.FC<AiEnhancerModalProps> = ({
  isOpen,
  onClose,
  profile,
  onApplyBio,
  onApplySkills,
  currentMarkdown
}) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'skills' | 'review'>('bio');

  // Bio generator state
  const [targetRole, setTargetRole] = useState('Senior Full Stack Developer');
  const [bioTone, setBioTone] = useState<'high_impact' | 'creative_witty' | 'professional' | 'minimalist'>('high_impact');
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [bioOptions, setBioOptions] = useState<Array<{ tagline: string; bio: string; tone: string }>>([]);
  const [typingTexts, setTypingTexts] = useState<string[]>([]);
  const [appliedBioIdx, setAppliedBioIdx] = useState<number | null>(null);

  // Skill suggester state
  const [skillPrompt, setSkillPrompt] = useState('Cloud-Native & Distributed Systems Engineer');
  const [isSuggestingSkills, setIsSuggestingSkills] = useState(false);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [skillReasoning, setSkillReasoning] = useState<string | null>(null);
  const [skillsApplied, setSkillsApplied] = useState(false);

  // Review state
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewResult, setReviewResult] = useState<{
    score: number;
    strengths: string[];
    improvements: string[];
    recruiterImpression: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleGenerateBio = async () => {
    setIsGeneratingBio(true);
    setAppliedBioIdx(null);
    try {
      const res = await fetch('/api/gemini/enhance-bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
          currentBio: profile.bio,
          targetRole,
          tone: bioTone
        }),
      });
      const data = await res.json();
      if (data.options) {
        setBioOptions(data.options);
        if (data.typingTexts) setTypingTexts(data.typingTexts);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingBio(false);
    }
  };

  const handleSuggestSkills = async () => {
    setIsSuggestingSkills(true);
    setSkillsApplied(false);
    try {
      const res = await fetch('/api/gemini/suggest-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleOrDescription: skillPrompt,
          existingSkills: profile.skills
        }),
      });
      const data = await res.json();
      if (data.recommendedSkills) {
        setSuggestedSkills(data.recommendedSkills);
        setSkillReasoning(data.reasoning || null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSuggestingSkills(false);
    }
  };

  const handleReviewReadme = async () => {
    setIsReviewing(true);
    try {
      const res = await fetch('/api/gemini/polish-readme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown: currentMarkdown }),
      });
      const data = await res.json();
      if (data.score) {
        setReviewResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                  Gemini AI Studio Assistant
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                  gemini-3.8-flash
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Generate high-impact copy, discover trending tech stacks & audit your profile
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 border-b border-zinc-200 dark:border-zinc-800 flex gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('bio')}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'bio'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Bio & Taglines</span>
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'skills'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Stack Recommender</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('review');
              if (!reviewResult) handleReviewReadme();
            }}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'review'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Profile Audit & Score</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          
          {/* TAB 1: BIO & TAGLINES */}
          {activeTab === 'bio' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Your Target Role / Title
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Lead Frontend Architect"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Desired Copy Tone
                  </label>
                  <select
                    value={bioTone}
                    onChange={(e) => setBioTone(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  >
                    <option value="high_impact">High Impact & Accomplishment Driven</option>
                    <option value="creative_witty">Creative, Witty & Personality-rich</option>
                    <option value="professional">Executive & Professional</option>
                    <option value="minimalist">Minimalist & Direct</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerateBio}
                disabled={isGeneratingBio}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {isGeneratingBio ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Gemini is generating crafted options...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Bio & Animated Headlines</span>
                  </>
                )}
              </button>

              {/* Bio Options Results */}
              {bioOptions.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Generated Bio Options
                  </h4>
                  {bioOptions.map((opt, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 hover:border-indigo-400 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          {opt.tagline}
                        </span>
                        <button
                          onClick={() => {
                            onApplyBio(opt.tagline, opt.bio, typingTexts);
                            setAppliedBioIdx(idx);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                            appliedBioIdx === idx
                              ? 'bg-emerald-600 text-white'
                              : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 hover:bg-indigo-100'
                          }`}
                        >
                          {appliedBioIdx === idx ? <Check className="w-3.5 h-3.5" /> : null}
                          <span>{appliedBioIdx === idx ? 'Applied!' : 'Apply to Profile'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {opt.bio}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SKILL RECOMMENDER */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Target Engineering Specialty or Job Title
                </label>
                <input
                  type="text"
                  value={skillPrompt}
                  onChange={(e) => setSkillPrompt(e.target.value)}
                  placeholder="e.g. Modern Full-Stack (Next.js & Supabase) or AI Engineer"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                />
              </div>

              <button
                onClick={handleSuggestSkills}
                disabled={isSuggestingSkills}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {isSuggestingSkills ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing tech ecosystem...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Recommend Optimal Tech Stack</span>
                  </>
                )}
              </button>

              {suggestedSkills.length > 0 && (
                <div className="space-y-3 pt-2">
                  {skillReasoning && (
                    <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-xs text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900">
                      💡 {skillReasoning}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {suggestedSkills.map(sId => {
                      const item = SKILL_MAP.get(sId);
                      return (
                        <span 
                          key={sId}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"
                        >
                          {item ? item.name : sId}
                        </span>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => {
                      const combined = Array.from(new Set([...profile.skills, ...suggestedSkills]));
                      onApplySkills(combined);
                      setSkillsApplied(true);
                    }}
                    className={`w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      skillsApplied 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    }`}
                  >
                    {skillsApplied ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    <span>{skillsApplied ? 'Added to Profile Tech Stack!' : 'Add All to My Tech Stack'}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: REVIEW & AUDIT */}
          {activeTab === 'review' && (
            <div className="space-y-4">
              {isReviewing ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3 text-center">
                  <Loader2 className="w-7 h-7 text-indigo-600 animate-spin" />
                  <p className="text-xs text-zinc-500">Gemini is auditing your Markdown structure & recruiter appeal...</p>
                </div>
              ) : reviewResult ? (
                <div className="space-y-4">
                  {/* Score badge */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200 dark:border-indigo-900 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        README Profile Impact Score
                      </div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 max-w-sm">
                        "{reviewResult.recruiterImpression}"
                      </div>
                    </div>
                    <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                      {reviewResult.score}/100
                    </div>
                  </div>

                  {/* Strengths */}
                  <div className="space-y-1.5">
                    <h5 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> What looks great
                    </h5>
                    <ul className="text-xs space-y-1 text-zinc-600 dark:text-zinc-300 list-disc list-inside">
                      {reviewResult.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div className="space-y-1.5">
                    <h5 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" /> Pro Tips to Increase Recruiter Interest
                    </h5>
                    <ul className="text-xs space-y-1 text-zinc-600 dark:text-zinc-300 list-disc list-inside">
                      {reviewResult.improvements.map((imp, i) => (
                        <li key={i}>{imp}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={handleReviewReadme}
                    className="w-full py-2 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                  >
                    Re-Audit README
                  </button>
                </div>
              ) : null}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
