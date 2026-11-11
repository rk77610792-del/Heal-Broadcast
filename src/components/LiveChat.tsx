import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Heart, 
  Smile, 
  Users, 
  Sparkles, 
  X,
  Radio,
  Flame,
  Volume2,
  Pin,
  ChevronDown,
  ChevronUp,
  Coffee,
  Star,
  Zap,
  Mic2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChatMessage, PopMessageStyle } from '../types';
import { INITIAL_CHAT_MESSAGES, CHAT_MESSAGE_POOL } from '../data/mockData';
import { radioAudio } from '../utils/audioSynthesizer';

export const LiveChat: React.FC<{ isDrawer?: boolean; onCloseDrawer?: () => void }> = ({
  isDrawer = false,
  onCloseDrawer,
}) => {
  const { 
    userProfile, 
    floatingHearts, 
    triggerFloatingHeart,
    isLiveMode,
    startLiveStream
  } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [onlineCount, setOnlineCount] = useState(12480);
  const [showEmojiTray, setShowEmojiTray] = useState(false);
  const [selectedPopStyle, setSelectedPopStyle] = useState<PopMessageStyle | null>(null);
  const [showPopSelector, setShowPopSelector] = useState(false);
  const [activePinIndex, setActivePinIndex] = useState(0);
  const [isPinVisible, setIsPinVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const pinnedBroadcasts = [
    {
      author: 'Maya & Julian (Hosts)',
      text: '🎙️ "Reading the train romance confession live now! Send your styled pop whispers to the screen."',
      badge: 'ON-AIR HIGHLIGHT',
      color: 'from-pink-500 to-rose-500'
    },
    {
      author: 'Station Producer',
      text: '☕ "Tonight’s secret prompt: What is the text message you typed out but never sent?"',
      badge: 'MIDNIGHT PROMPT',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      author: 'Live DJ Console',
      text: '🎵 "Now playing: Cigarettes After Sex — Sweet (Acoustic radio cut)"',
      badge: 'NOW PLAYING',
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  // Rotate pinned broadcast message every 14 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePinIndex(prev => (prev + 1) % pinnedBroadcasts.length);
    }, 14000);
    return () => clearInterval(interval);
  }, [pinnedBroadcasts.length]);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Online count gentle realistic fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => prev + Math.floor(Math.random() * 9) - 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Automated incoming chat messages (some are standard, some are styled pop messages)
  useEffect(() => {
    let timeoutId: number;

    const scheduleNextMessage = () => {
      const delay = Math.floor(Math.random() * 1800) + 2600; // 2.6s - 4.4s
      timeoutId = window.setTimeout(() => {
        const randomItem = CHAT_MESSAGE_POOL[Math.floor(Math.random() * CHAT_MESSAGE_POOL.length)];
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        const newMsg: ChatMessage = {
          id: `chat-${Date.now()}-${Math.random()}`,
          username: randomItem.username,
          avatarColor: randomItem.avatarColor,
          text: randomItem.text,
          timestamp: timeStr,
          isSystem: randomItem.isSystem,
          popStyle: randomItem.popStyle,
          popBadge: randomItem.popBadge,
          popHighlight: randomItem.popHighlight,
          heartsCount: randomItem.heartsCount || (randomItem.popStyle ? Math.floor(Math.random() * 50) + 12 : undefined)
        };

        setMessages(prev => [...prev.slice(-45), newMsg]);

        // If it's a styled pop message, trigger extra floating hearts
        if (randomItem.popStyle) {
          triggerFloatingHeart();
          setTimeout(() => triggerFloatingHeart(), 300);
        } else if (Math.random() > 0.55) {
          triggerFloatingHeart();
        }

        scheduleNextMessage();
      }, delay);
    };

    scheduleNextMessage();
    return () => clearTimeout(timeoutId);
  }, [triggerFloatingHeart]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    let badge = undefined;
    if (selectedPopStyle === 'love') badge = '💖 MY LOVE POP';
    else if (selectedPopStyle === 'midnight') badge = '🌟 MY MIDNIGHT POP';
    else if (selectedPopStyle === 'flame') badge = '🔥 MY FLAME POP';
    else if (selectedPopStyle === 'radio') badge = '🎙️ MY ON-AIR POP';
    else if (selectedPopStyle === 'warm') badge = '☕ MY WARM HUG';

    const userMessage: ChatMessage = {
      id: `my-${Date.now()}`,
      username: userProfile.alias,
      avatarColor: userProfile.avatarColor,
      text: inputText.trim(),
      timestamp: timeStr,
      isUser: true,
      popStyle: selectedPopStyle || undefined,
      popBadge: badge,
      popHighlight: !!selectedPopStyle,
      heartsCount: selectedPopStyle ? 1 : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setShowEmojiTray(false);
    setSelectedPopStyle(null);
    setShowPopSelector(false);

    // Multi-heart burst for user's message
    triggerFloatingHeart();
    setTimeout(() => triggerFloatingHeart(), 250);
    setTimeout(() => triggerFloatingHeart(), 500);
  };

  const handleLikeMessage = (messageId: string) => {
    setMessages(prev =>
      prev.map(m => {
        if (m.id === messageId) {
          const current = m.heartsCount || 0;
          return { ...m, heartsCount: current + 1 };
        }
        return m;
      })
    );
    triggerFloatingHeart();
  };

  const quickEmojis = ['❤️', '🥺', '✨', '🌙', '🫂', '💌', '☕', '🌧️', '🔥', '💖'];

  // Style definitions for pop messages
  const popStyleConfig: Record<PopMessageStyle, {
    container: string;
    border: string;
    badge: string;
    glow: string;
    titleColor: string;
    icon: React.ReactNode;
  }> = {
    love: {
      container: 'bg-gradient-to-br from-[#2f1025] via-[#1B1826] to-[#3a122e]',
      border: 'border-pink-500/60 shadow-lg shadow-pink-500/25',
      badge: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm',
      glow: 'glow-pink-md',
      titleColor: 'text-pink-300',
      icon: <Heart className="w-3 h-3 fill-white" />
    },
    midnight: {
      container: 'bg-gradient-to-br from-[#1d1038] via-[#1B1826] to-[#281248]',
      border: 'border-purple-400/60 shadow-lg shadow-purple-500/25',
      badge: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm',
      glow: 'glow-violet-md',
      titleColor: 'text-purple-300',
      icon: <Star className="w-3 h-3 fill-white" />
    },
    flame: {
      container: 'bg-gradient-to-br from-[#2e1709] via-[#1B1826] to-[#381b0a]',
      border: 'border-amber-500/60 shadow-lg shadow-amber-500/25',
      badge: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm',
      glow: 'shadow-amber-500/30',
      titleColor: 'text-amber-300',
      icon: <Flame className="w-3 h-3 fill-white" />
    },
    radio: {
      container: 'bg-gradient-to-br from-[#350d18] via-[#1B1826] to-[#40101e]',
      border: 'border-rose-500/70 shadow-lg shadow-rose-500/30',
      badge: 'bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-sm',
      glow: 'shadow-rose-500/35',
      titleColor: 'text-rose-300',
      icon: <Radio className="w-3 h-3 text-white" />
    },
    warm: {
      container: 'bg-gradient-to-br from-[#0c2621] via-[#1B1826] to-[#11312b]',
      border: 'border-teal-400/60 shadow-lg shadow-teal-500/25',
      badge: 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-sm',
      glow: 'shadow-teal-500/30',
      titleColor: 'text-teal-300',
      icon: <Coffee className="w-3 h-3 text-white" />
    }
  };

  const currentPin = pinnedBroadcasts[activePinIndex];

  return (
    <aside 
      aria-label="Live Chat"
      className={`relative flex flex-col bg-[#14121C] border-l border-white/6 overflow-hidden select-none ${
        isDrawer 
          ? 'w-full h-full' 
          : 'hidden xl:flex w-[330px] 2xl:w-[380px] h-screen sticky top-0'
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-52 h-52 bg-[#FF4D8D]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-52 h-52 bg-[#8B5CF6]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Hearts Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            style={{ left: `${heart.x}%`, bottom: '70px' }}
            className="absolute animate-float-heart"
          >
            <Heart className="w-5 h-5 text-[#FF4D8D] fill-[#FF4D8D] drop-shadow-md" />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="px-4 py-3.5 border-b border-white/6 flex items-center justify-between bg-[#14121C]/90 backdrop-blur-md z-10">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D8D] animate-ping absolute" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D8D] relative" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-semibold text-white">Live Chat</h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                LIVE
              </span>
            </div>
            <p className="text-[11px] text-[#8C86A0] flex items-center gap-1 mt-0.5">
              <Users className="w-3 h-3 text-[#FF4D8D]" />
              <span className="text-white font-medium">{onlineCount.toLocaleString()}</span> listening now
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick Floating Heart Spawner Button */}
          <button
            onClick={triggerFloatingHeart}
            className="p-1.5 rounded-full bg-[#FF4D8D]/15 hover:bg-[#FF4D8D]/30 text-[#FF4D8D] transition-all hover:scale-110 active:scale-95"
            title="Send Love Heart"
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>

          {isDrawer && onCloseDrawer && (
            <button
              onClick={onCloseDrawer}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#8C86A0] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* STYLISH PINNED BROADCAST POP BANNER */}
      {isPinVisible && currentPin && (
        <div className="relative mx-3 mt-2.5 p-2.5 rounded-2xl bg-gradient-to-r from-[#20172e] via-[#2a1b38] to-[#1c1328] border border-pink-500/30 shadow-md animate-pop-in z-10 text-left">
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1.5">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#FF4D8D]/20 text-[#FF4D8D]">
                <Pin className="w-2.5 h-2.5 fill-current" />
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.2 rounded bg-[#FF4D8D]/20 text-pink-300 border border-[#FF4D8D]/30">
                {currentPin.badge}
              </span>
            </div>

            <button
              onClick={() => setIsPinVisible(false)}
              className="text-[#8C86A0] hover:text-white p-0.5"
              title="Dismiss pinned message"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <p className="text-[11px] text-[#E8E4F0] font-medium leading-snug">
            {currentPin.text}
          </p>
        </div>
      )}

      {/* Broadcast mini announcement bar */}
      <div className="px-3.5 py-2 bg-gradient-to-r from-[#FF4D8D]/10 via-[#8B5CF6]/10 to-transparent border-b border-white/5 flex items-center justify-between text-[11px] mt-1">
        <div className="flex items-center gap-1.5 text-white/90 truncate">
          <Radio className="w-3.5 h-3.5 text-[#FF4D8D] shrink-0" />
          <span className="truncate">Ep #142: Midnight Whispers</span>
        </div>
        {!isLiveMode && (
          <button
            onClick={startLiveStream}
            className="text-[10px] font-semibold text-[#FF4D8D] hover:underline shrink-0"
          >
            Tune In
          </button>
        )}
      </div>

      {/* Messages Stream with Styled Pop Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3.5 py-3 flex flex-col gap-2.5 z-10 scrollbar-thin"
      >
        {messages.map((msg) => {
          if (msg.isSystem) {
            return (
              <div 
                key={msg.id}
                className="py-1 px-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-center text-[10px] text-[#8C86A0] italic flex items-center justify-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-[#FF4D8D]" />
                {msg.text}
              </div>
            );
          }

          const isMe = msg.isUser;
          const isHost = msg.isHost;
          const popCfg = msg.popStyle ? popStyleConfig[msg.popStyle] : null;

          // STYLED POP MESSAGE CARD
          if (popCfg) {
            return (
              <div
                key={msg.id}
                className="w-full my-1 animate-pop-in text-left group"
              >
                <div className={`relative rounded-2xl p-3 border transition-all duration-300 ${popCfg.container} ${popCfg.border}`}>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 rounded-2xl animate-shimmer pointer-events-none" />

                  {/* Pop Header */}
                  <div className="relative z-10 flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${msg.avatarColor} shrink-0 flex items-center justify-center text-[10px] font-bold text-white ring-1 ring-white/30 shadow-md`}>
                        {msg.username.charAt(0)}
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-bold leading-tight ${popCfg.titleColor}`}>
                            {msg.username}
                          </span>
                          {isMe && <span className="text-[9px] px-1 rounded bg-pink-500/30 text-pink-300 font-semibold">YOU</span>}
                        </div>
                        <span className="text-[9px] text-[#8C86A0]">{msg.timestamp}</span>
                      </div>
                    </div>

                    {/* Styled Pop Badge */}
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase ${popCfg.badge}`}>
                      {popCfg.icon}
                      <span>{msg.popBadge || 'POP MESSAGE'}</span>
                    </div>
                  </div>

                  {/* Pop Body Text */}
                  <p className="relative z-10 text-xs sm:text-[13px] text-white font-medium leading-relaxed my-1 px-0.5">
                    {msg.text}
                  </p>

                  {/* Pop Footer with interactive reaction button */}
                  <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-white/10 text-[10px] text-[#8C86A0]">
                    <span className="italic flex items-center gap-1 text-white/70 text-[10px]">
                      <Sparkles className="w-3 h-3 text-[#FF4D8D]" />
                      Special Pop Message
                    </span>

                    <button
                      type="button"
                      onClick={() => handleLikeMessage(msg.id)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 hover:bg-[#FF4D8D]/25 hover:text-white text-pink-300 font-bold transition-all hover:scale-105 active:scale-95"
                    >
                      <Heart className="w-3 h-3 fill-current text-[#FF4D8D]" />
                      <span>{msg.heartsCount || 1}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          // STANDARD CHAT MESSAGE
          return (
            <div 
              key={msg.id}
              className={`flex items-start gap-2.5 group transition-all text-left ${
                isMe ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${msg.avatarColor} shrink-0 flex items-center justify-center text-[10px] font-bold text-white ring-1 ring-white/15 shadow-sm`}>
                {msg.username.charAt(0)}
              </div>

              {/* Message Bubble */}
              <div className={`flex flex-col max-w-[82%] ${isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`text-[11px] font-medium leading-none ${
                    isHost 
                      ? 'text-[#FF4D8D] font-bold flex items-center gap-1' 
                      : isMe 
                        ? 'text-pink-300' 
                        : 'text-[#E8E4F0]'
                  }`}>
                    {msg.username}
                    {isHost && <span className="text-[9px] px-1 rounded bg-[#FF4D8D]/20 text-[#FF4D8D]">HOST</span>}
                  </span>
                  <span className="text-[9px] text-[#8C86A0]">{msg.timestamp}</span>
                </div>

                <div className={`px-3 py-1.5 rounded-2xl text-xs leading-relaxed break-words shadow-sm ${
                  isMe 
                    ? 'bg-gradient-to-r from-[#FF4D8D] to-[#F06292] text-white rounded-tr-none' 
                    : isHost 
                      ? 'bg-gradient-to-br from-[#1B1826] to-[#2b1828] border border-[#FF4D8D]/30 text-white rounded-tl-none glow-pink-sm'
                      : 'bg-[#1B1826] border border-white/6 text-[#E8E4F0] rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* POP MESSAGE STYLE SELECTOR TRAY */}
      {showPopSelector && (
        <div className="p-3 border-t border-pink-500/20 bg-gradient-to-b from-[#1c1428] to-[#14121C] flex flex-col gap-2 z-20 animate-pop-in text-left">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#FF4D8D]" />
              Select Pop Message Style
            </span>
            <button 
              onClick={() => setShowPopSelector(false)} 
              className="text-[#8C86A0] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {[
              { id: 'love', label: 'Love', icon: '💖', border: 'border-pink-500', bg: 'bg-pink-500/20' },
              { id: 'midnight', label: 'Cosmic', icon: '🌟', border: 'border-purple-400', bg: 'bg-purple-500/20' },
              { id: 'flame', label: 'Flame', icon: '🔥', border: 'border-amber-500', bg: 'bg-amber-500/20' },
              { id: 'radio', label: 'On-Air', icon: '🎙️', border: 'border-rose-500', bg: 'bg-rose-500/20' },
              { id: 'warm', label: 'Hearth', icon: '☕', border: 'border-teal-400', bg: 'bg-teal-500/20' },
            ].map((st) => {
              const isSelected = selectedPopStyle === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => {
                    setSelectedPopStyle(isSelected ? null : (st.id as PopMessageStyle));
                    setShowPopSelector(false);
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                    isSelected 
                      ? `${st.bg} ${st.border} scale-105 shadow-md` 
                      : 'bg-white/[0.03] border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span className="text-base mb-0.5">{st.icon}</span>
                  <span className="text-[10px] font-bold text-white">{st.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Emoji Tray */}
      {showEmojiTray && (
        <div className="p-2 border-t border-white/6 bg-[#181524] flex items-center justify-around gap-1 z-20 animate-pop-in">
          {quickEmojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                setInputText(prev => prev + emoji);
                setShowEmojiTray(false);
              }}
              className="text-base p-1 hover:scale-125 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Chat Input Bar */}
      <div className="p-3 border-t border-white/6 bg-[#14121C]/95 backdrop-blur-md z-10">
        {/* Active Pop Indicator Tag */}
        {selectedPopStyle && (
          <div className="flex items-center justify-between mb-2 px-2.5 py-1 rounded-xl bg-pink-500/15 border border-pink-500/30 text-xs text-pink-300">
            <span className="flex items-center gap-1.5 font-bold text-[11px]">
              <Sparkles className="w-3 h-3 text-[#FF4D8D]" />
              Pop Style Armed: <span className="uppercase text-white font-extrabold">{selectedPopStyle} POP</span>
            </span>
            <button
              onClick={() => setSelectedPopStyle(null)}
              className="text-[#8C86A0] hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          {/* Pop Message Picker Button */}
          <button
            type="button"
            onClick={() => {
              setShowPopSelector(!showPopSelector);
              setShowEmojiTray(false);
            }}
            className={`p-2 rounded-full transition-all cursor-pointer ${
              selectedPopStyle 
                ? 'bg-gradient-to-r from-[#FF4D8D] to-[#8B5CF6] text-white glow-pink-sm' 
                : 'text-[#8C86A0] hover:text-[#FF4D8D] hover:bg-white/5'
            }`}
            title="Choose a Styled Pop Message"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              setShowEmojiTray(!showEmojiTray);
              setShowPopSelector(false);
            }}
            className="p-2 rounded-full text-[#8C86A0] hover:text-[#FF4D8D] hover:bg-white/5 transition-colors"
            title="Emoji reactions"
          >
            <Smile className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={selectedPopStyle ? "Type your glowing pop message..." : "Share your thoughts anonymously..."}
            className={`flex-1 bg-[#1B1826] border rounded-full px-3.5 py-2 text-xs text-[#E8E4F0] placeholder-[#8C86A0] focus:outline-none transition-all ${
              selectedPopStyle 
                ? 'border-pink-500/60 ring-1 ring-pink-500/40 shadow-sm' 
                : 'border-white/10 focus:border-[#FF4D8D]/60 focus:ring-1 focus:ring-[#FF4D8D]/30'
            }`}
            maxLength={180}
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF4D8D] to-[#F06292] text-white flex items-center justify-center disabled:opacity-40 hover:opacity-95 hover:scale-105 active:scale-95 transition-all shadow-md glow-pink-sm cursor-pointer"
            title="Send message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="flex items-center justify-between mt-1.5 px-2 text-[10px] text-[#8C86A0]">
          <span>Posting as: <strong className="text-pink-300 font-normal">{userProfile.alias}</strong></span>
          <button 
            type="button" 
            onClick={triggerFloatingHeart}
            className="text-[#FF4D8D] hover:underline flex items-center gap-1 font-medium"
          >
            <Heart className="w-2.5 h-2.5 fill-current" /> Send Heart
          </button>
        </div>
      </div>
    </aside>
  );
};
