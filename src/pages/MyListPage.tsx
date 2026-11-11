import React, { useState } from 'react';
import { 
  Bookmark, 
  HeartHandshake, 
  Headphones, 
  Sparkles, 
  Trash2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ConfessionCard } from '../components/ConfessionCard';
import { EpisodeCard } from '../components/EpisodeCard';

export const MyListPage: React.FC = () => {
  const { confessions, episodes, setCurrentTab } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'confessions' | 'episodes'>('confessions');

  const savedConfessions = confessions.filter(c => c.isSaved);
  const savedEpisodes = episodes.filter(e => e.isSaved);

  return (
    <div className="flex flex-col gap-6 pb-24 text-left">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#1B1826] via-[#221731] to-[#1B1826] border border-white/10 p-6 sm:p-8">
        <div className="flex items-center gap-2 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Bookmark className="w-4 h-4 text-[#8B5CF6]" />
          <span>Personal Sanctuary</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          My Saved Stories & Episodes
        </h1>
        <p className="text-xs sm:text-sm text-[#8C86A0] leading-relaxed max-w-xl">
          The confessions that brought you tears and the podcast episodes you want to revisit on sleepless rainy nights.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveSubTab('confessions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'confessions'
              ? 'bg-[#FF4D8D]/20 text-[#FF4D8D] border border-[#FF4D8D]/30 glow-pink-sm'
              : 'text-[#8C86A0] hover:text-white'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Saved Confessions ({savedConfessions.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('episodes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'episodes'
              ? 'bg-[#8B5CF6]/20 text-purple-300 border border-[#8B5CF6]/30'
              : 'text-[#8C86A0] hover:text-white'
          }`}
        >
          <Headphones className="w-4 h-4" />
          <span>Bookmarked Episodes ({savedEpisodes.length})</span>
        </button>
      </div>

      {/* Content Rendering */}
      {activeSubTab === 'confessions' ? (
        savedConfessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedConfessions.map((conf) => (
              <ConfessionCard key={conf.id} confession={conf} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl bg-[#14121C] border border-white/6 flex flex-col items-center justify-center gap-3">
            <Bookmark className="w-10 h-10 text-[#8C86A0]/40" />
            <h3 className="text-base font-semibold text-white">No confessions saved yet</h3>
            <p className="text-xs text-[#8C86A0]">
              Click the bookmark icon on any confession to save it here for later.
            </p>
            <button
              onClick={() => setCurrentTab('confessions')}
              className="mt-2 px-4 py-2 rounded-full bg-[#FF4D8D] text-white text-xs font-bold"
            >
              Browse Confessions
            </button>
          </div>
        )
      ) : (
        savedEpisodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedEpisodes.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl bg-[#14121C] border border-white/6 flex flex-col items-center justify-center gap-3">
            <Headphones className="w-10 h-10 text-[#8C86A0]/40" />
            <h3 className="text-base font-semibold text-white">No episodes bookmarked</h3>
            <p className="text-xs text-[#8C86A0]">
              Save episodes from the catalog to listen to them on long train rides.
            </p>
            <button
              onClick={() => setCurrentTab('episodes')}
              className="mt-2 px-4 py-2 rounded-full bg-[#8B5CF6] text-white text-xs font-bold"
            >
              Explore Episodes
            </button>
          </div>
        )
      )}
    </div>
  );
};
