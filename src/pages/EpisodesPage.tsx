import React, { useState } from 'react';
import { 
  Headphones, 
  Sparkles, 
  Search, 
  Radio, 
  Mic2, 
  Clock, 
  SlidersHorizontal 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EpisodeCard } from '../components/EpisodeCard';

export const EpisodesPage: React.FC = () => {
  const { episodes, searchQuery, startLiveStream } = useApp();
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const tags = ['All', 'Late Night', 'Healing', 'Romance', 'Solitude', 'LDR', 'Unsent Letters', 'Psychology'];

  const filtered = episodes.filter((ep) => {
    const matchesTag = selectedTag === 'All' || ep.tags.includes(selectedTag);
    const matchesSearch = !searchQuery ||
      ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.host.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 pb-24 text-left">
      {/* Episodes Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#1B1826] via-[#241730] to-[#1B1826] border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Headphones className="w-4 h-4 text-[#FF4D8D]" />
            <span>Audio Archives</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Episodes & Midnight Broadcasts
          </h1>
          <p className="text-xs sm:text-sm text-[#8C86A0] leading-relaxed">
            Curated audio journeys examining the messiness, tenderness, and grace of loving and letting go. Over 140 episodes recorded under the city dusk.
          </p>
        </div>

        <button
          onClick={startLiveStream}
          className="relative z-10 flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-red-600 to-[#FF4D8D] text-white text-xs sm:text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
        >
          <Radio className="w-4 h-4 animate-pulse" />
          <span>Tune In to Live Episode</span>
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none bg-[#14121C] p-3 rounded-2xl border border-white/6">
        {tags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-[#FF4D8D] to-[#8B5CF6] text-white shadow-sm glow-pink-sm'
                  : 'bg-white/[0.03] text-[#8C86A0] hover:text-white hover:bg-white/5'
              }`}
            >
              {tag === 'All' ? 'All Episodes' : `#${tag}`}
            </button>
          );
        })}
      </div>

      {/* Episode Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((ep) => (
          <EpisodeCard key={ep.id} episode={ep} />
        ))}
      </div>
    </div>
  );
};
