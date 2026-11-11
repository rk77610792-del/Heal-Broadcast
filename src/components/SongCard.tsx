import React from 'react';
import { 
  Play, 
  Pause, 
  Heart, 
  ListPlus, 
  Clock, 
  Music2, 
  Radio 
} from 'lucide-react';
import { Song, Playlist } from '../types';
import { useApp } from '../context/AppContext';

export const SongCard: React.FC<{ 
  song: Song; 
  playlistContext?: Playlist;
  isCompact?: boolean;
}> = ({ 
  song, 
  playlistContext,
  isCompact = false 
}) => {
  const { 
    activeSong, 
    activeMediaType, 
    isPlaying, 
    playSong, 
    togglePlayActive, 
    toggleLikeSong, 
    openAddToPlaylistModal 
  } = useApp();

  const isCurrentPlaying = activeMediaType === 'song' && activeSong?.id === song.id && isPlaying;

  const handlePlayToggle = () => {
    if (activeMediaType === 'song' && activeSong?.id === song.id) {
      togglePlayActive();
    } else {
      playSong(song, playlistContext);
    }
  };

  return (
    <div 
      aria-label={`Song: ${song.title} by ${song.artist}`}
      className={`group relative rounded-2xl bg-[#1B1826] border border-white/6 overflow-hidden transition-all duration-300 hover:border-[#FF4D8D]/40 hover:shadow-xl hover:-translate-y-0.5 flex flex-col justify-between text-left ${
        isCompact ? 'p-3' : 'p-4'
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Cover Art with Play Button Overlay */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-black/40 ring-1 ring-white/10 group-hover:ring-[#FF4D8D]/40 transition-all">
          <img 
            src={song.coverImage} 
            alt={song.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handlePlayToggle}
              className="w-8 h-8 rounded-full bg-[#FF4D8D] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
            >
              {isCurrentPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>
          </div>

          {isCurrentPlaying && (
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-[#FF4D8D] animate-ping" />
          )}
        </div>

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-pink-300 transition-colors">
              {song.title}
            </h4>
            {isCurrentPlaying && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#FF4D8D]/20 text-[#FF4D8D] border border-[#FF4D8D]/30 shrink-0">
                PLAYING
              </span>
            )}
          </div>

          <p className="text-[11px] text-[#8C86A0] truncate font-medium">
            {song.artist}
          </p>

          <span className="inline-block text-[10px] text-pink-300/80 mt-1 font-mono">
            {song.genre} • {song.duration}
          </span>
        </div>
      </div>

      {/* Lyrics Snippet Quote if present */}
      {song.lyricsSnippet && !isCompact && (
        <p className="text-[11px] text-[#8C86A0] italic mt-2.5 px-2 py-1.5 rounded-lg bg-white/[0.02] border border-white/5 line-clamp-1">
          "{song.lyricsSnippet}"
        </p>
      )}

      {/* Card Actions Footer */}
      <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-white/5 text-xs text-[#8C86A0]">
        <button
          type="button"
          onClick={handlePlayToggle}
          className={`flex items-center gap-1.5 font-bold transition-colors ${
            isCurrentPlaying ? 'text-[#FF4D8D]' : 'text-white/80 hover:text-[#FF4D8D]'
          }`}
        >
          {isCurrentPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Playing</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play Song</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-2">
          {/* Add to Playlist button */}
          <button
            type="button"
            onClick={() => openAddToPlaylistModal(song)}
            className="p-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors text-[#8C86A0]"
            title="Add to Playlist"
          >
            <ListPlus className="w-4 h-4" />
          </button>

          {/* Like Song */}
          <button
            type="button"
            onClick={() => toggleLikeSong(song.id)}
            className={`p-1.5 rounded-lg hover:bg-white/5 transition-colors ${
              song.isLiked ? 'text-[#FF4D8D]' : 'hover:text-[#FF4D8D]'
            }`}
            title="Like song"
          >
            <Heart className={`w-4 h-4 ${song.isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
