import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Play, 
  Pause, 
  Users, 
  Mic, 
  Heart, 
  Sparkles, 
  Volume2, 
  Share2, 
  PhoneCall, 
  Send,
  MessageSquare,
  Music2,
  Clock,
  Zap,
  Coffee,
  Flame,
  Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { radioAudio } from '../utils/audioSynthesizer';

export const LivePage: React.FC = () => {
  const { 
    episodes, 
    activeEpisode, 
    isPlaying, 
    togglePlayEpisode, 
    triggerFloatingHeart, 
    setIsConfessionModalOpen,
    setIsMobileChatOpen,
    userProfile
  } = useApp();

  const liveEp = episodes.find(e => e.id === 'ep-1') || episodes[0];
  const [callInRequested, setCallInRequested] = useState(false);
  const [songRequest, setSongRequest] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const [visualizerBars, setVisualizerBars] = useState<number[]>([40, 60, 30, 85, 95, 70, 50, 65, 80, 45, 90, 75, 60, 40]);

  // Live on-air popped messages rotation
  const [livePops, setLivePops] = useState<Array<{
    id: string;
    sender: string;
    text: string;
    type: 'love' | 'midnight' | 'flame' | 'radio' | 'warm';
    badge: string;
    hearts: number;
  }>>([
    {
      id: 'lp-1',
      sender: 'StarlightWanderer',
      text: 'Holding hands while listening to this with my partner of 6 years 🤍',
      type: 'love',
      badge: '💖 LOVE POP',
      hearts: 105
    },
    {
      id: 'lp-2',
      sender: 'MidnightDrifter',
      text: 'Listening from Berlin where it is 4 AM and quiet outside. City lights look ethereal.',
      type: 'midnight',
      badge: '🌟 MIDNIGHT POP',
      hearts: 84
    },
    {
      id: 'lp-3',
      sender: 'FlameKeeper',
      text: 'Sending love to night owls and shift workers keeping the world spinning 🔥',
      type: 'flame',
      badge: '🔥 FLAME POP',
      hearts: 92
    }
  ]);
  const [activePopIndex, setActivePopIndex] = useState(0);
  const [popSentToast, setPopSentToast] = useState<string | null>(null);

  // Cycle the popped message ticker every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePopIndex(prev => (prev + 1) % livePops.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [livePops.length]);

  useEffect(() => {
    let animId: number;
    const loop = () => {
      if (isPlaying) {
        setVisualizerBars(radioAudio.getVisualizerData().concat(radioAudio.getVisualizerData()));
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const handleSongRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!songRequest.trim()) return;
    setRequestSent(true);
    setSongRequest('');
    setTimeout(() => setRequestSent(false), 3000);
  };

  // Quick Pop Message Sender directly from Live Page
  const handleQuickPop = (style: 'love' | 'midnight' | 'flame' | 'warm', defaultText: string) => {
    const badge = style === 'love' ? '💖 LOVE POP' : style === 'midnight' ? '🌟 MIDNIGHT POP' : style === 'flame' ? '🔥 FLAME POP' : '☕ WARM HUG';
    const newPop = {
      id: `live-pop-${Date.now()}`,
      sender: userProfile.alias,
      text: defaultText,
      type: style,
      badge,
      hearts: 1
    };

    setLivePops(prev => [newPop, ...prev.slice(0, 5)]);
    setActivePopIndex(0);
    setPopSentToast(`✨ Your ${badge} just popped on the live broadcast screen!`);
    triggerFloatingHeart();
    setTimeout(() => triggerFloatingHeart(), 300);
    setTimeout(() => setPopSentToast(null), 3500);
  };

  const currentPop = livePops[activePopIndex] || livePops[0];

  const popColors = {
    love: 'from-pink-900/60 via-purple-900/30 to-[#1B1826] border-pink-500/50 text-pink-300',
    midnight: 'from-purple-900/60 via-indigo-900/30 to-[#1B1826] border-purple-400/50 text-purple-300',
    flame: 'from-amber-900/60 via-orange-900/30 to-[#1B1826] border-amber-500/50 text-amber-300',
    radio: 'from-red-900/60 via-rose-900/30 to-[#1B1826] border-rose-500/50 text-rose-300',
    warm: 'from-teal-900/60 via-emerald-900/30 to-[#1B1826] border-teal-400/50 text-teal-300',
  };

  return (
    <div className="flex flex-col gap-6 pb-24 text-left">
      {/* Live Stream Main Player Card */}
      <div className="relative rounded-3xl bg-[#14121C] border border-white/10 overflow-hidden shadow-2xl p-6 sm:p-10">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF4D8D]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6">
          {/* Top Live Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-sm font-bold tracking-wider text-red-400 uppercase">
                ON AIR NOW
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs text-[#8C86A0] font-mono">FM 98.4 MHZ</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#E8E4F0]">
                <Users className="w-3.5 h-3.5 text-[#FF4D8D]" />
                <span className="font-semibold text-white">12,480</span> listeners
              </div>

              <button
                onClick={() => setIsMobileChatOpen(true)}
                className="xl:hidden flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF4D8D]/20 text-[#FF4D8D] text-xs font-semibold"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>
            </div>
          </div>

          {/* Episode Title & Host */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2">
              {liveEp.title}
            </h1>
            <p className="text-sm text-[#8C86A0] flex items-center gap-2">
              <span>Hosted by <strong className="text-pink-300 font-semibold">{liveEp.host}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Episode #{liveEp.episodeNumber}
              </span>
            </p>
          </div>

          {/* Large Audio Waveform Visualizer */}
          <div className="h-28 sm:h-36 rounded-2xl bg-black/40 border border-white/5 p-4 flex items-center justify-center gap-1 sm:gap-2 overflow-hidden shadow-inner">
            {visualizerBars.slice(0, 24).map((val, idx) => (
              <div
                key={idx}
                className="flex-1 max-w-[12px] rounded-full bg-gradient-to-t from-[#FF4D8D] via-[#F06292] to-[#8B5CF6] transition-all duration-150"
                style={{ 
                  height: isPlaying ? `${Math.max(12, val)}%` : '15%',
                  opacity: isPlaying ? 0.9 : 0.3
                }}
              />
            ))}
          </div>

          {/* STYLISH LIVE ON-AIR POPPED MESSAGE STREAM BANNER */}
          {currentPop && (
            <div className={`p-3.5 rounded-2xl border bg-gradient-to-r shadow-lg transition-all duration-300 animate-pop-in ${popColors[currentPop.type]}`}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-black/40 text-white border border-white/20">
                    {currentPop.badge}
                  </span>
                  <span className="text-xs font-bold text-white">
                    {currentPop.sender}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-pink-300 font-bold">
                  <Heart className="w-3.5 h-3.5 fill-current text-[#FF4D8D]" />
                  <span>{currentPop.hearts} resonances</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#E8E4F0] font-medium leading-relaxed pl-1">
                "{currentPop.text}"
              </p>
            </div>
          )}

          {/* Toast Notification when user pops a message */}
          {popSentToast && (
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/40 text-pink-200 text-xs font-semibold text-center animate-pop-in shadow-md">
              {popSentToast}
            </div>
          )}

          {/* QUICK POP REACTIONS DOCK */}
          <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Zap className="w-3.5 h-3.5 text-[#FF4D8D]" />
              Pop a styled whisper onto the live broadcast:
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handleQuickPop('love', 'Sending warm love to everyone listening tonight! You matter ❤️')}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-300 hover:bg-pink-500/25 hover:scale-105 active:scale-95 transition-all text-xs font-bold"
              >
                <span>💖</span> Love Pop
              </button>

              <button
                type="button"
                onClick={() => handleQuickPop('midnight', '3 AM thoughts are softer with this radio show playing ✨')}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:bg-purple-500/25 hover:scale-105 active:scale-95 transition-all text-xs font-bold"
              >
                <span>🌟</span> Cosmic Pop
              </button>

              <button
                type="button"
                onClick={() => handleQuickPop('flame', 'Big shoutout to all dreamers holding their heads high! 🔥')}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 hover:scale-105 active:scale-95 transition-all text-xs font-bold"
              >
                <span>🔥</span> Flame Pop
              </button>

              <button
                type="button"
                onClick={() => handleQuickPop('warm', 'Holding space for anyone who had a heavy day. Warm tea & calm ☕')}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-300 hover:bg-teal-500/25 hover:scale-105 active:scale-95 transition-all text-xs font-bold"
              >
                <span>☕</span> Warm Hug
              </button>
            </div>
          </div>

          {/* Playback & Interaction Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-4">
              <button
                onClick={() => togglePlayEpisode(liveEp)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF4D8D] to-[#F06292] text-white font-bold text-sm shadow-xl glow-pink-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                {isPlaying && activeEpisode?.id === liveEp.id ? (
                  <>
                    <Pause className="w-5 h-5 fill-current" />
                    <span>Pause Broadcast</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                    <span>Listen Live Now</span>
                  </>
                )}
              </button>

              <button
                onClick={triggerFloatingHeart}
                className="p-3 rounded-full bg-white/5 hover:bg-[#FF4D8D]/20 text-[#8C86A0] hover:text-[#FF4D8D] border border-white/10 transition-colors"
                title="Send Live Heart React"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsConfessionModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-semibold transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#FF4D8D]" />
                <span>Submit Live Confession</span>
              </button>

              <button
                onClick={() => setCallInRequested(!callInRequested)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold border transition-all ${
                  callInRequested 
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                    : 'bg-white/5 border-white/10 text-[#8C86A0] hover:text-white'
                }`}
              >
                <PhoneCall className="w-4 h-4" />
                <span>{callInRequested ? 'In Host Queue (#3)' : 'Request to Speak'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Live Sections: Host Notes & Song Requests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Host Live Rundown */}
        <div className="rounded-2xl bg-[#1B1826] border border-white/6 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Mic className="w-4 h-4 text-[#FF4D8D]" />
            <h3 className="text-base font-bold text-white">
              Tonight's Live Rundown
            </h3>
          </div>
          <div className="flex flex-col gap-3 text-xs text-[#8C86A0]">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
              <span className="font-mono text-pink-300 font-semibold">23:00</span>
              <div>
                <strong className="text-white block">Opening Monologue</strong>
                <span>Maya reflects on city loneliness and quiet connections at late night.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-start gap-3">
              <span className="font-mono text-[#FF4D8D] font-semibold">23:20</span>
              <div>
                <strong className="text-white block">Reading Live Confessions (Now)</strong>
                <span>Reading the train connection story and the deleted voicemail.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
              <span className="font-mono text-purple-300 font-semibold">23:45</span>
              <div>
                <strong className="text-white block">Acoustic Midnight Set</strong>
                <span>Lofi piano improvisations with live listener dedicatees.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Song & Dedication Box */}
        <div className="rounded-2xl bg-[#1B1826] border border-white/6 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Music2 className="w-4 h-4 text-[#8B5CF6]" />
              <h3 className="text-base font-bold text-white">
                Live Song Dedication
              </h3>
            </div>
            <p className="text-xs text-[#8C86A0] mb-4 leading-relaxed">
              Have a song that feels like your heart right now? Send it to Julian's DJ console for the midnight rotation.
            </p>

            <form onSubmit={handleSongRequestSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={songRequest}
                onChange={(e) => setSongRequest(e.target.value)}
                placeholder="Artist — Track title (e.g. Cigarettes After Sex — Apocalypse)"
                className="w-full bg-[#14121C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#E8E4F0] placeholder-[#8C86A0] focus:outline-none focus:border-[#FF4D8D]/60"
                maxLength={80}
              />
              <button
                type="submit"
                disabled={!songRequest.trim()}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF4D8D] to-[#8B5CF6] text-white text-xs font-bold shadow-md disabled:opacity-40 hover:opacity-95 transition-opacity"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send to Host Console</span>
              </button>
            </form>

            {requestSent && (
              <p className="text-xs text-emerald-400 mt-2 text-center font-medium">
                ✨ Received! Julian will try to play it in the upcoming hour.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
