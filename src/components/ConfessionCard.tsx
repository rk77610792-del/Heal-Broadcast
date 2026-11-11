import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  Music, 
  Send, 
  Check, 
  Sparkles,
  CornerDownRight
} from 'lucide-react';
import { Confession } from '../types';
import { useApp } from '../context/AppContext';

export const ConfessionCard: React.FC<{ confession: Confession }> = ({ confession }) => {
  const { 
    toggleLikeConfession, 
    toggleSaveConfession, 
    addCommentToConfession, 
    triggerFloatingHeart,
    userProfile 
  } = useApp();

  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [copied, setCopied] = useState(false);

  const moodColors: Record<string, { badge: string; border: string }> = {
    Love: { badge: 'bg-pink-500/15 text-pink-300 border-pink-500/30', border: 'hover:border-pink-500/40' },
    Heartbreak: { badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30', border: 'hover:border-cyan-500/40' },
    Crush: { badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30', border: 'hover:border-rose-500/40' },
    Regret: { badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30', border: 'hover:border-amber-500/40' },
    Secret: { badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30', border: 'hover:border-purple-500/40' },
    Gratitude: { badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', border: 'hover:border-emerald-500/40' },
  };

  const currentMood = moodColors[confession.mood] || moodColors.Love;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addCommentToConfession(confession.id, commentInput);
    setCommentInput('');
    triggerFloatingHeart();
  };

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(`"${confession.title}" - Anonymous confession on Heal Broadcast`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <article 
      aria-label={`Confession: ${confession.title}`}
      className={`group relative rounded-2xl bg-[#1B1826] border border-white/6 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl ${currentMood.border} hover:-translate-y-0.5 text-left`}
    >
      {/* Top Header: Author, Mood Badge, Timestamp */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${confession.avatarColor} text-white flex items-center justify-center text-xs font-bold ring-2 ring-white/10 shrink-0`}>
            {confession.author.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              {confession.author}
            </span>
            <span className="text-[10px] text-[#8C86A0]">{confession.timestamp}</span>
          </div>
        </div>

        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentMood.badge}`}>
          #{confession.mood}
        </span>
      </div>

      {/* Confession Title */}
      <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight group-hover:text-pink-200 transition-colors">
        {confession.title}
      </h3>

      {/* Confession Body */}
      <p className="text-xs sm:text-sm text-[#E8E4F0]/90 leading-relaxed font-light mb-4 whitespace-pre-line">
        {confession.content}
      </p>

      {/* Song Dedication if present */}
      {confession.songDedication && (
        <div className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-white/[0.03] border border-white/5 mb-4 text-xs text-[#8C86A0]">
          <Music className="w-3.5 h-3.5 text-[#FF4D8D]" />
          <span>Dedicated song: <strong className="text-pink-300 font-medium">{confession.songDedication}</strong></span>
        </div>
      )}

      {/* Action Footer: Like, Comment, Save, Share */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-[#8C86A0]">
        <div className="flex items-center gap-4">
          {/* Like Button */}
          <button
            onClick={() => toggleLikeConfession(confession.id)}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
              confession.isLiked 
                ? 'text-[#FF4D8D] font-semibold' 
                : 'hover:text-[#FF4D8D]'
            }`}
            title="Resonate with this confession"
          >
            <Heart className={`w-4 h-4 transition-transform active:scale-125 ${confession.isLiked ? 'fill-current text-[#FF4D8D]' : ''}`} />
            <span>{confession.likes}</span>
          </button>

          {/* Comment Button */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            title="View or reply"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{confession.comments.length}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Share */}
          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors relative"
            title="Copy confession quote"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            {copied && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-emerald-500 text-[10px] text-white font-bold whitespace-nowrap shadow-md">
                Copied!
              </span>
            )}
          </button>

          {/* Bookmark */}
          <button
            onClick={() => toggleSaveConfession(confession.id)}
            className={`p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer ${
              confession.isSaved ? 'text-purple-400' : 'hover:text-purple-300'
            }`}
            title="Save to My List"
          >
            <Bookmark className={`w-4 h-4 ${confession.isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Expandable Comments Thread */}
      {showComments && (
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-3">
          {/* Comments List */}
          {confession.comments.length > 0 ? (
            <div className="flex flex-col gap-2.5 max-h-60 overflow-y-auto pr-1">
              {confession.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-2 text-xs bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-tr ${comment.avatarColor} text-white flex items-center justify-center text-[9px] font-bold shrink-0`}>
                    {comment.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white/90 text-[11px]">{comment.author}</span>
                      <span className="text-[10px] text-[#8C86A0]">{comment.timestamp}</span>
                    </div>
                    <p className="text-[#E8E4F0]/80 mt-0.5 leading-relaxed">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-[#8C86A0] italic">
              No replies yet. Be the first gentle voice to answer.
            </p>
          )}

          {/* Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder={`Reply kindly as ${userProfile.alias}...`}
              className="flex-1 bg-[#14121C] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-[#E8E4F0] placeholder-[#8C86A0] focus:outline-none focus:border-[#FF4D8D]/50"
              maxLength={200}
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="p-2 rounded-xl bg-[#FF4D8D]/20 text-[#FF4D8D] hover:bg-[#FF4D8D] hover:text-white disabled:opacity-30 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </article>
  );
};
