import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Heart, 
  Bookmark, 
  Radio, 
  ChevronUp, 
  Sliders, 
  Sparkles,
  Music2,
  ListPlus,
  Disc
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { radioAudio } from '../utils/audioSynthesizer';

export const AudioPlayer: React.FC = () => {
  const { 
    activeMediaType,
    activeEpisode, 
    activeSong,
    activePlaylist,
    isPlaying, 
    togglePlayActive,
    playNextTrack,
    playPrevTrack,
    playbackProgress, 
    playbackTime, 
    seekToProgress, 
    volume, 
    setVolume, 
    isLiveMode,
    toggleLikeEpisode,
    toggleSaveEpisode,
    toggleLikeSong,
    openAddToPlaylistModal,
    setCurrentTab
  } = useApp();

  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  const [visualizerBars, setVisualizerBars] = useState<number[]>([30, 45, 60, 40, 80, 65, 90, 50, 35, 25]);

  // Update visualizer bars periodically when playing
  useEffect(() => {
    let animId: number;
    const update = () => {
      if (isPlaying) {
        const data = radioAudio.getVisualizerData();
        setVisualizerBars(data);
      }
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const currentItem = activeMediaType === 'song' ? activeSong : activeEpisode;
  if (!currentItem) return null;

  const isSong = activeMediaType === 'song' && activeSong !== null;
  const currentTitle = isSong ? activeSong.title : activeEpisode?.title;
  const currentSubtitle = isSong ? activeSong.artist : activeEpisode?.host;
  const currentCover = isSong ? activeSong.coverImage : activeEpisode?.coverImage;
  const currentDurationStr = isSong ? activeSong.duration : (isLiveMode ? 'LIVE' : activeEpisode?.duration);

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = Math.floor(sec % 60);
    return `${mins}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(prevVolume || 0.7);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
      setVolume(0);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLiveMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = Math.max(0, Math.min(100, (clickX / width) * 100));
    seekToProgress(percent);
  };

  return (
    <div 
      aria-label="Audio Player"
      className="fixed bottom-0 md:bottom-0 left-0 right-0 z-30 bg-[#14121C]/95 backdrop-blur-xl border-t border-white/10 px-3 sm:px-6 py-2.5 shadow-2xl transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-1.5">
        {/* Progress Bar */}
        <div className="w-full flex items-center gap-3">
          <span className="text-[10px] text-[#8C86A0] font-mono min-w-[32px] text-right">
            {formatSeconds(playbackTime)}
          </span>

          <div 
            onClick={handleProgressBarClick}
            className={`group relative flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden ${
              isLiveMode ? 'cursor-default' : 'cursor-pointer'
            }`}
          >
            {isLiveMode ? (
              <div className="h-full w-full bg-gradient-to-r from-[#FF4D8D] via-[#8B5CF6] to-[#FF4D8D] animate-pulse" />
            ) : (
              <div 
                className="h-full bg-gradient-to-r from-[#FF4D8D] to-[#F06292] rounded-full relative group-hover:brightness-110"
                style={{ width: `${playbackProgress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>

          <span className="text-[10px] text-[#8C86A0] font-mono min-w-[32px]">
            {currentDurationStr}
          </span>
        </div>

        {/* Player Controls & Info */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Item Info */}
          <div 
            onClick={() => setCurrentTab(isSong ? 'music' : (isLiveMode ? 'now-live' : 'episodes'))}
            className="flex items-center gap-3 min-w-0 max-w-[42%] sm:max-w-xs cursor-pointer group"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shrink-0 ring-1 ring-white/10 group-hover:ring-[#FF4D8D]/50 transition-all">
              <img 
                src={currentCover} 
                alt={currentTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="flex items-end gap-0.5 h-3.5">
                    <span className="w-1 bg-[#FF4D8D] rounded-full animate-bounce [animation-delay:-0.3s] h-full" />
                    <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s] h-2/3" />
                    <span className="w-1 bg-[#8B5CF6] rounded-full animate-bounce h-3/4" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-0 text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-pink-300 transition-colors">
                  {currentTitle}
                </span>
                {isLiveMode ? (
                  <span className="hidden sm:inline-flex px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                    LIVE
                  </span>
                ) : isSong ? (
                  <span className="hidden sm:inline-flex px-1.5 py-0.2 rounded-full text-[9px] font-semibold bg-[#8B5CF6]/20 text-purple-300 border border-[#8B5CF6]/30">
                    SONG
                  </span>
                ) : null}
              </div>

              <div className="flex items-center gap-1 text-[11px] text-[#8C86A0] truncate">
                <span className="truncate">{currentSubtitle}</span>
                {activePlaylist && (
                  <span className="hidden lg:inline text-pink-300/80 truncate">
                    • {activePlaylist.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Center Playback Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Previous Track / Rewind */}
            <button
              onClick={() => {
                if (isSong) playPrevTrack();
                else seekToProgress(Math.max(0, playbackProgress - 3));
              }}
              disabled={isLiveMode}
              className="p-1.5 sm:p-2 rounded-full text-[#8C86A0] hover:text-white disabled:opacity-30 transition-colors"
              title="Previous Track"
            >
              <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayActive}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#FF4D8D] to-[#F06292] text-white flex items-center justify-center shadow-lg glow-pink-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Next Track / Forward */}
            <button
              onClick={() => {
                if (isSong) playNextTrack();
                else seekToProgress(Math.min(100, playbackProgress + 3));
              }}
              disabled={isLiveMode}
              className="p-1.5 sm:p-2 rounded-full text-[#8C86A0] hover:text-white disabled:opacity-30 transition-colors"
              title="Next Track"
            >
              <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
            </button>
          </div>

          {/* Right Tools: Visualizer, Playlist Add, Like, Volume */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mini Visualizer */}
            <div className="hidden lg:flex items-end gap-1 h-5 px-2 bg-white/5 rounded-lg border border-white/5">
              {visualizerBars.slice(0, 8).map((height, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-gradient-to-t from-[#FF4D8D] to-[#8B5CF6] transition-all duration-150"
                  style={{ height: `${isPlaying ? Math.max(15, height * 0.2) : 4}px` }}
                />
              ))}
            </div>

            {/* Add to Playlist button if song */}
            {isSong && activeSong && (
              <button
                onClick={() => openAddToPlaylistModal(activeSong)}
                className="hidden sm:inline-flex p-1.5 sm:p-2 rounded-full text-[#8C86A0] hover:text-white hover:bg-white/5 transition-colors"
                title="Add current song to playlist"
              >
                <ListPlus className="w-4 h-4" />
              </button>
            )}

            {/* Like button */}
            <button
              onClick={() => {
                if (isSong && activeSong) toggleLikeSong(activeSong.id);
                else if (activeEpisode) toggleLikeEpisode(activeEpisode.id);
              }}
              className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                (isSong ? activeSong?.isLiked : activeEpisode?.isLiked)
                  ? 'text-[#FF4D8D] bg-[#FF4D8D]/10' 
                  : 'text-[#8C86A0] hover:text-[#FF4D8D] hover:bg-white/5'
              }`}
              title="Like track"
            >
              <Heart className={`w-4 h-4 ${(isSong ? activeSong?.isLiked : activeEpisode?.isLiked) ? 'fill-current' : ''}`} />
            </button>

            {/* Volume Control */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={handleMuteToggle}
                className="p-1.5 text-[#8C86A0] hover:text-white transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setIsMuted(false);
                  setVolume(parseFloat(e.target.value));
                }}
                className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FF4D8D]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
