import React from 'react';
import { 
  Play, 
  Pause, 
  Heart, 
  Bookmark, 
  Clock, 
  Headphones, 
  Radio, 
  Sparkles 
} from 'lucide-react';
import { Episode } from '../types';
import { useApp } from '../context/AppContext';

export const EpisodeCard: React.FC<{ episode: Episode; isCompact?: boolean }> = ({ 
  episode, 
  isCompact = false 
}) => {
  const { 
    activeEpisode, 
    isPlaying, 
    togglePlayEpisode, 
    toggleLikeEpisode, 
    toggleSaveEpisode 
  } = useApp();

  const isCurrentPlaying = activeEpisode?.id === episode.id && isPlaying;

  return (
    <div 
      aria-label={`Episode: ${episode.title}`}
      className={`group relative rounded-2xl bg-[#1B1826] border border-white/6 overflow-hidden transition-all duration-300 hover:border-[#FF4D8D]/30 hover:shadow-xl hover:-translate-y-1 text-left ${
        isCompact ? 'w-64 sm:w-72 shrink-0' : 'w-full'
      }`}
    >
      {/* Cover Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-black/40">
        <img 
          src={episode.coverImage} 
          alt={episode.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1826] via-transparent to-black/30" />

        {/* Live / Episode Badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          {episode.id === 'ep-1' ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-bold shadow-md animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              LIVE RECORDING
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-semibold border border-white/10">
              EP #{episode.episodeNumber}
            </span>
          )}
        </div>

        {/* Duration badge */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-mono border border-white/10">
          <Clock className="w-3 h-3 text-[#FF4D8D]" />
          <span>{episode.duration}</span>
        </div>

        {/* Floating Play Button Overlay */}
        <button
          onClick={() => togglePlayEpisode(episode)}
          className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 cursor-pointer ${
            isCurrentPlaying
              ? 'bg-[#FF4D8D] scale-105 glow-pink-md'
              : 'bg-white/20 backdrop-blur-md hover:bg-[#FF4D8D] hover:scale-110 opacity-90 group-hover:opacity-100'
          }`}
          title={isCurrentPlaying ? 'Pause episode' : 'Play episode'}
          aria-label={isCurrentPlaying ? 'Pause episode' : 'Play episode'}
        >
          {isCurrentPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-[#8C86A0] mb-1">
            <span className="text-pink-300 font-medium">{episode.host}</span>
            <span>•</span>
            <span>{episode.releaseDate}</span>
          </div>

          <h4 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-pink-200 transition-colors">
            {episode.title}
          </h4>

          {!isCompact && (
            <p className="text-xs text-[#8C86A0] mt-1.5 line-clamp-2 leading-relaxed">
              {episode.description}
            </p>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {episode.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-[#8C86A0] font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Card Footer: Listen stats & Actions */}
        <div className="flex items-center justify-between pt-2.5 border-t border-white/5 text-xs text-[#8C86A0]">
          <span className="flex items-center gap-1 text-[11px]">
            <Headphones className="w-3.5 h-3.5 text-[#FF4D8D]" />
            {episode.listens.toLocaleString()} listens
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleLikeEpisode(episode.id)}
              className={`p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer ${
                episode.isLiked ? 'text-[#FF4D8D]' : 'hover:text-[#FF4D8D]'
              }`}
              title="Like episode"
            >
              <Heart className={`w-3.5 h-3.5 ${episode.isLiked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => toggleSaveEpisode(episode.id)}
              className={`p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer ${
                episode.isSaved ? 'text-purple-400' : 'hover:text-purple-300'
              }`}
              title="Save to My List"
            >
              <Bookmark className={`w-3.5 h-3.5 ${episode.isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
