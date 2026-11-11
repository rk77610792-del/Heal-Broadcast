import React from 'react';
import { 
  Radio, 
  Play, 
  Heart, 
  Sparkles, 
  Users, 
  Headphones, 
  ArrowRight, 
  Activity, 
  Compass, 
  ChevronRight, 
  Flame, 
  Volume2,
  Music2,
  ListPlus,
  Disc
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ConfessionCard } from '../components/ConfessionCard';
import { EpisodeCard } from '../components/EpisodeCard';
import { SongCard } from '../components/SongCard';

export const HomePage: React.FC = () => {
  const { 
    confessions, 
    episodes, 
    songs,
    playlists,
    setCurrentTab, 
    startLiveStream, 
    setIsConfessionModalOpen,
    searchQuery 
  } = useApp();

  // Filter confessions by search if any
  const filteredConfessions = confessions.filter(c => 
    !searchQuery || 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.mood.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter episodes by search if any
  const filteredEpisodes = episodes.filter(e =>
    !searchQuery ||
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.host.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 pb-24 text-left">
      {/* HERO BANNER: Cinematic Late-Night Radio Studio */}
      <section 
        aria-label="Live Broadcast Hero"
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1B1826] via-[#241a33] to-[#120e1e] p-6 sm:p-10 shadow-2xl"
      >
        {/* Background Decorative Neon Orbs & City Dusk Gradients */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-[#FF4D8D]/30 to-[#8B5CF6]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#FF4D8D]/15 rounded-full blur-3xl pointer-events-none" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            {/* Live Indicator Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-live-pulse" />
              <span>LIVE NOW • 98.4 FM MIDNIGHT</span>
              <span className="text-white/40">•</span>
              <span className="text-pink-300 font-medium">12.4K tuned in</span>
            </div>

            {/* Title with Romantic Script font */}
            <h1 className="font-script text-4xl sm:text-6xl text-white font-bold tracking-wide leading-tight mb-3 drop-shadow-md">
              <span className="bg-gradient-to-r from-pink-300 via-[#FF4D8D] to-purple-300 bg-clip-text text-transparent">
                Heal Broadcast
              </span>
            </h1>

            {/* Soundwave Heartbeat Graphic */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-end gap-1 h-6">
                {[40, 65, 90, 45, 100, 70, 30, 85, 60, 95, 50, 80, 40, 20].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-gradient-to-t from-[#FF4D8D] to-[#8B5CF6] animate-pulse"
                    style={{ 
                      height: `${h}%`,
                      animationDelay: `${i * 0.12}s`,
                      animationDuration: '1.4s'
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-[#8C86A0] tracking-widest font-mono uppercase pl-2">
                Frequency 98.4 MHz
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#E8E4F0]/90 font-light leading-relaxed mb-6">
              A gentle harbor in the night. Anonymously share unsent confessions, listen to honest conversations, and find comfort in knowing you were never alone in what you felt.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={startLiveStream}
                className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF4D8D] via-[#F06292] to-[#8B5CF6] text-white font-bold text-sm shadow-xl glow-pink-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Listen Live to Episode #142</span>
              </button>

              <button
                onClick={() => setIsConfessionModalOpen(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-sm transition-all cursor-pointer backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-[#FF4D8D]" />
                <span>Drop a Confession</span>
              </button>
            </div>
          </div>

          {/* Studio Illustration Mockup Card */}
          <div className="w-full lg:w-72 xl:w-80 rounded-2xl bg-[#14121C]/80 border border-white/10 p-4 shadow-xl backdrop-blur-md flex flex-col gap-3 shrink-0">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40">
              <img 
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80" 
                alt="Studio Desk" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-[#FF4D8D]" />
                  Main Studio Desk • On Air
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-white">
                Host: Maya Lin & Julian Vance
              </span>
              <p className="text-[11px] text-[#8C86A0] leading-snug">
                "Reading your midnight submissions with soft lo-fi piano and tea."
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#8C86A0] pt-2 border-t border-white/5">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                High Definition Audio
              </span>
              <span>Stereo FLAC</span>
            </div>
          </div>
        </div>
      </section>

      {/* THREE ACTION CARDS */}
      <section 
        aria-label="Quick Actions"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {/* Card 1 */}
        <div 
          onClick={() => setIsConfessionModalOpen(true)}
          className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#1B1826] border border-white/6 p-5 transition-all duration-300 hover:border-[#FF4D8D]/40 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-[#FF4D8D] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Heart className="w-5 h-5 fill-[#FF4D8D]" />
          </div>
          <h3 className="text-base font-bold text-white mb-1 group-hover:text-pink-300 transition-colors">
            Share a Confession
          </h3>
          <p className="text-xs text-[#8C86A0] leading-relaxed mb-4">
            Let it off your chest. Unburden the words left unsaid. You are not alone.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FF4D8D]">
            <span>Confess anonymously</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Music & Playlists */}
        <div 
          onClick={() => setCurrentTab('music')}
          className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#1B1826] border border-white/6 p-5 transition-all duration-300 hover:border-[#FF4D8D]/40 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-[#8B5CF6] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Music2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-1 group-hover:text-pink-300 transition-colors">
            Search Songs & Playlists
          </h3>
          <p className="text-xs text-[#8C86A0] leading-relaxed mb-4">
            Search any track, play it with lofi chords, and build your midnight playlists.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B5CF6]">
            <span>Explore music & playlists</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3 */}
        <div 
          onClick={() => setCurrentTab('episodes')}
          className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#1B1826] border border-white/6 p-5 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Headphones className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
            Watch & Listen to Episodes
          </h3>
          <p className="text-xs text-[#8C86A0] leading-relaxed mb-4">
            Stories that feel like home. Browse 140+ archived midnight sessions.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
            <span>Browse library</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </section>

      {/* TRENDING SONGS & PLAYLISTS PREVIEW ROW */}
      <section aria-label="Trending Songs" className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Disc className="w-5 h-5 text-[#FF4D8D]" />
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Midnight Songs • Play Any Track
            </h2>
          </div>
          <button
            onClick={() => setCurrentTab('music')}
            className="text-xs text-[#8C86A0] hover:text-[#FF4D8D] flex items-center gap-1 transition-colors font-medium"
          >
            <span>Search all songs & playlists</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {songs.slice(0, 4).map((song) => (
            <SongCard key={song.id} song={song} isCompact={true} />
          ))}
        </div>
      </section>

      {/* LATEST EPISODES CAROUSEL */}
      <section aria-label="Latest Episodes" className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Headphones className="w-5 h-5 text-[#FF4D8D]" />
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Latest Episodes
            </h2>
          </div>
          <button
            onClick={() => setCurrentTab('episodes')}
            className="text-xs text-[#8C86A0] hover:text-[#FF4D8D] flex items-center gap-1 transition-colors font-medium"
          >
            <span>See all episodes</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3 pt-1 scrollbar-thin">
          {filteredEpisodes.slice(0, 6).map((ep) => (
            <EpisodeCard key={ep.id} episode={ep} isCompact={true} />
          ))}
        </div>
      </section>

      {/* TRENDING CONFESSIONS GRID */}
      <section aria-label="Trending Confessions" className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#FF4D8D]" />
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Trending Confessions
            </h2>
          </div>
          <button
            onClick={() => setCurrentTab('confessions')}
            className="text-xs text-[#8C86A0] hover:text-[#FF4D8D] flex items-center gap-1 transition-colors font-medium"
          >
            <span>Explore all confessions</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredConfessions.slice(0, 6).map((conf) => (
            <ConfessionCard key={conf.id} confession={conf} />
          ))}
        </div>
      </section>
    </div>
  );
};
