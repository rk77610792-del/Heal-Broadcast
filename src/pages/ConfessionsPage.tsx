import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  Flame, 
  Clock, 
  MessageCircle, 
  Filter, 
  Search 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ConfessionCard } from '../components/ConfessionCard';
import { MoodTag } from '../types';

export const ConfessionsPage: React.FC = () => {
  const { 
    confessions, 
    searchQuery, 
    setSearchQuery, 
    setIsConfessionModalOpen 
  } = useApp();

  const [selectedMood, setSelectedMood] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'trending' | 'discussed'>('trending');

  const moodFilters = ['All', 'Love', 'Heartbreak', 'Crush', 'Regret', 'Secret', 'Gratitude'];

  // Filter
  const filtered = confessions.filter((conf) => {
    const matchesMood = selectedMood === 'All' || conf.mood === selectedMood;
    const matchesSearch = !searchQuery || 
      conf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conf.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conf.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMood && matchesSearch;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'trending') return b.likes - a.likes;
    if (sortBy === 'discussed') return b.comments.length - a.comments.length;
    // 'recent' by default or id
    return b.id.localeCompare(a.id);
  });

  return (
    <div className="flex flex-col gap-6 pb-24 text-left">
      {/* Top Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#1B1826] via-[#261b33] to-[#1B1826] border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <HeartHandshake className="w-4 h-4 text-[#FF4D8D]" />
            <span>Anonymous Whispers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            The Confessions Wall
          </h1>
          <p className="text-xs sm:text-sm text-[#8C86A0] leading-relaxed">
            Real stories, unsent texts, and silent heartaches posted by strangers across the world. No judgments, only resonance.
          </p>
        </div>

        <button
          onClick={() => setIsConfessionModalOpen(true)}
          className="relative z-10 flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#FF4D8D] to-[#8B5CF6] text-white text-xs sm:text-sm font-bold shadow-lg glow-pink-sm hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Post Confession</span>
        </button>
      </div>

      {/* Filter and Sorting Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#14121C] p-3 rounded-2xl border border-white/6">
        {/* Mood Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {moodFilters.map((mood) => {
            const isSelected = selectedMood === mood;
            return (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#FF4D8D] to-[#F06292] text-white shadow-sm glow-pink-sm'
                    : 'bg-white/[0.03] text-[#8C86A0] hover:text-white hover:bg-white/5'
                }`}
              >
                {mood === 'All' ? 'All Stories' : `#${mood}`}
              </button>
            );
          })}
        </div>

        {/* Sorting options */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-[#8C86A0] flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Sort:
          </span>
          <div className="flex items-center rounded-xl bg-[#1B1826] p-1 border border-white/5 text-xs">
            <button
              onClick={() => setSortBy('trending')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                sortBy === 'trending' ? 'bg-[#FF4D8D]/20 text-white font-semibold' : 'text-[#8C86A0] hover:text-white'
              }`}
            >
              <Flame className="w-3 h-3 text-[#FF4D8D]" />
              Trending
            </button>
            <button
              onClick={() => setSortBy('recent')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                sortBy === 'recent' ? 'bg-[#FF4D8D]/20 text-white font-semibold' : 'text-[#8C86A0] hover:text-white'
              }`}
            >
              <Clock className="w-3 h-3 text-purple-400" />
              Recent
            </button>
            <button
              onClick={() => setSortBy('discussed')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                sortBy === 'discussed' ? 'bg-[#FF4D8D]/20 text-white font-semibold' : 'text-[#8C86A0] hover:text-white'
              }`}
            >
              <MessageCircle className="w-3 h-3 text-cyan-400" />
              Discussed
            </button>
          </div>
        </div>
      </div>

      {/* Confessions Stream */}
      {sorted.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sorted.map((confession) => (
            <ConfessionCard key={confession.id} confession={confession} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl bg-[#14121C] border border-white/6 flex flex-col items-center justify-center gap-3">
          <HeartHandshake className="w-10 h-10 text-[#8C86A0]/40" />
          <h3 className="text-base font-semibold text-white">No confessions matched</h3>
          <p className="text-xs text-[#8C86A0]">
            Try a different filter or search term, or be the first to share one.
          </p>
          <button
            onClick={() => setIsConfessionModalOpen(true)}
            className="mt-2 px-4 py-2 rounded-full bg-[#FF4D8D] text-white text-xs font-bold"
          >
            Share Confession
          </button>
        </div>
      )}
    </div>
  );
};
