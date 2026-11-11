import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Heart, 
  Send, 
  EyeOff, 
  Music, 
  Lock, 
  Check, 
  Flame, 
  Smile,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MoodTag } from '../types';

export const ConfessionModal: React.FC = () => {
  const { 
    isConfessionModalOpen, 
    setIsConfessionModalOpen, 
    addConfession, 
    userProfile 
  } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodTag>('Love');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [songDedication, setSongDedication] = useState('');
  const [aliasOption, setAliasOption] = useState<string>('random');
  const [randomAlias, setRandomAlias] = useState('Midnight Whisperer');

  const randomAliases = [
    'Midnight Whisperer', 
    'Anonymous Rose', 
    'Train Window Dreamer', 
    'Velvet Soul', 
    'Quiet Rain', 
    'Starlit Stranger', 
    'Echo in the Dark'
  ];

  // Refresh random alias on open
  useEffect(() => {
    if (isConfessionModalOpen) {
      setRandomAlias(randomAliases[Math.floor(Math.random() * randomAliases.length)]);
    }
  }, [isConfessionModalOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsConfessionModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsConfessionModalOpen]);

  if (!isConfessionModalOpen) return null;

  const moodTags: Array<{ tag: MoodTag; color: string; border: string; glow: string; bg: string }> = [
    { tag: 'Love', color: 'text-pink-400', border: 'border-pink-500/40', glow: 'glow-pink-sm', bg: 'bg-pink-500/10' },
    { tag: 'Heartbreak', color: 'text-cyan-400', border: 'border-cyan-500/40', glow: 'shadow-cyan-500/20', bg: 'bg-cyan-500/10' },
    { tag: 'Crush', color: 'text-rose-400', border: 'border-rose-500/40', glow: 'shadow-rose-500/20', bg: 'bg-rose-500/10' },
    { tag: 'Regret', color: 'text-amber-400', border: 'border-amber-500/40', glow: 'shadow-amber-500/20', bg: 'bg-amber-500/10' },
    { tag: 'Secret', color: 'text-purple-400', border: 'border-purple-500/40', glow: 'shadow-purple-500/20', bg: 'bg-purple-500/10' },
    { tag: 'Gratitude', color: 'text-emerald-400', border: 'border-emerald-500/40', glow: 'shadow-emerald-500/20', bg: 'bg-emerald-500/10' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !title.trim()) return;

    const chosenAuthor = !isAnonymous 
      ? userProfile.alias 
      : (aliasOption === 'random' ? randomAlias : 'Anonymous Soul');

    addConfession({
      title: title.trim(),
      content: content.trim(),
      mood,
      author: chosenAuthor,
      isAnonymous,
      songDedication: songDedication.trim() || undefined
    });

    // Reset and close
    setTitle('');
    setContent('');
    setSongDedication('');
    setIsConfessionModalOpen(false);
  };

  const charLimit = 500;
  const remaining = charLimit - content.length;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#14121C] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-7 overflow-hidden text-left"
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#FF4D8D]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsConfessionModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-[#8C86A0] hover:text-white hover:bg-white/5 transition-colors"
          title="Close"
          aria-label="Close confession modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF4D8D] to-[#8B5CF6] text-white flex items-center justify-center shadow-md">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <h2 id="modal-title" className="text-xl font-bold text-white tracking-tight">
            Share a Confession
          </h2>
        </div>
        <p className="text-xs text-[#8C86A0] mb-5">
          Let it off your chest. Your words will be broadcast softly to thousands of listening hearts.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Mood Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#E8E4F0] mb-2 uppercase tracking-wider">
              Choose Mood Category
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {moodTags.map((item) => {
                const isSelected = mood === item.tag;
                return (
                  <button
                    key={item.tag}
                    type="button"
                    onClick={() => setMood(item.tag)}
                    className={`px-2 py-1.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      isSelected 
                        ? `${item.bg} ${item.border} ${item.color} scale-[1.03] ring-1 ring-white/20 shadow-md` 
                        : 'bg-white/[0.02] border-white/5 text-[#8C86A0] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    #{item.tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Confession Title */}
          <div>
            <label className="block text-xs font-semibold text-[#E8E4F0] mb-1.5 uppercase tracking-wider">
              Title / Dedication Line
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., To the girl on the 11:42 PM train..."
              className="w-full bg-[#1B1826] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#E8E4F0] placeholder-[#8C86A0] focus:outline-none focus:border-[#FF4D8D]/60 focus:ring-1 focus:ring-[#FF4D8D]/30 transition-all"
              maxLength={90}
            />
          </div>

          {/* Confession Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#E8E4F0] uppercase tracking-wider">
                Your Words
              </label>
              <span className={`text-[10px] font-mono ${remaining < 50 ? 'text-rose-400' : 'text-[#8C86A0]'}`}>
                {remaining} characters left
              </span>
            </div>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write what you never dared to say out loud..."
              maxLength={charLimit}
              className="w-full bg-[#1B1826] border border-white/10 rounded-xl p-3.5 text-xs sm:text-sm text-[#E8E4F0] placeholder-[#8C86A0] focus:outline-none focus:border-[#FF4D8D]/60 focus:ring-1 focus:ring-[#FF4D8D]/30 transition-all resize-none leading-relaxed"
            />
          </div>

          {/* Optional Song Dedication */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#E8E4F0] mb-1.5 uppercase tracking-wider">
              <Music className="w-3.5 h-3.5 text-[#FF4D8D]" />
              Song Dedication (Optional)
            </label>
            <input
              type="text"
              value={songDedication}
              onChange={(e) => setSongDedication(e.target.value)}
              placeholder="e.g., Cigarettes After Sex — 'Sweet'"
              className="w-full bg-[#1B1826] border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#E8E4F0] placeholder-[#8C86A0] focus:outline-none focus:border-[#FF4D8D]/60 transition-all"
              maxLength={60}
            />
          </div>

          {/* Anonymity Controls */}
          <div className="p-3 rounded-2xl bg-[#1B1826]/70 border border-white/5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-medium text-white">Post 100% Anonymously</span>
              </div>
              <button
                type="button"
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  isAnonymous ? 'bg-gradient-to-r from-[#FF4D8D] to-[#8B5CF6]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isAnonymous ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {isAnonymous ? (
              <div className="text-[11px] text-[#8C86A0] flex items-center justify-between">
                <span>Displaying as: <strong className="text-pink-300 font-medium">{randomAlias}</strong></span>
                <button
                  type="button"
                  onClick={() => setRandomAlias(randomAliases[Math.floor(Math.random() * randomAliases.length)])}
                  className="text-[#FF4D8D] hover:underline"
                >
                  Reroll alias
                </button>
              </div>
            ) : (
              <span className="text-[11px] text-[#8C86A0]">
                Posting with your saved profile alias: <strong className="text-white font-medium">{userProfile.alias}</strong>
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsConfessionModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#8C86A0] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !content.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF4D8D] via-[#F06292] to-[#8B5CF6] text-white text-xs font-bold shadow-lg glow-pink-sm hover:opacity-95 hover:scale-[1.02] active:scale-95 disabled:opacity-40 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Confession</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
