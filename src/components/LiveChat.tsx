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
  Volume2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';
import { INITIAL_CHAT_MESSAGES, CHAT_MESSAGE_POOL } from '../data/mockData';

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
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Automated incoming chat messages every 2.8 to 4.5 seconds
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
        };

        setMessages(prev => [...prev.slice(-40), newMsg]); // keep last 40 for memory

        // Occasional floating heart
        if (Math.random() > 0.5) {
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

    const userMessage: ChatMessage = {
      id: `my-${Date.now()}`,
      username: userProfile.alias,
      avatarColor: userProfile.avatarColor,
      text: inputText.trim(),
      timestamp: timeStr,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setShowEmojiTray(false);
    triggerFloatingHeart();
  };

  const quickEmojis = ['❤️', '🥺', '✨', '🌙', '🫂', '💌', '☕', '🌧️'];

  return (
    <aside 
      aria-label="Live Chat"
      className={`relative flex flex-col bg-[#14121C] border-l border-white/6 overflow-hidden select-none ${
        isDrawer 
          ? 'w-full h-full' 
          : 'hidden xl:flex w-[320px] 2xl:w-[360px] h-screen sticky top-0'
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF4D8D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-48 h-48 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />

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
            className="p-1.5 rounded-full bg-[#FF4D8D]/10 hover:bg-[#FF4D8D]/25 text-[#FF4D8D] transition-colors"
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

      {/* Broadcast mini announcement bar */}
      <div className="px-3.5 py-2 bg-gradient-to-r from-[#FF4D8D]/10 via-[#8B5CF6]/10 to-transparent border-b border-white/5 flex items-center justify-between text-[11px]">
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

      {/* Messages Stream */}
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

      {/* Emoji Tray */}
      {showEmojiTray && (
        <div className="p-2 border-t border-white/6 bg-[#181524] flex items-center justify-around gap-1 z-20">
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
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowEmojiTray(!showEmojiTray)}
            className="p-2 rounded-full text-[#8C86A0] hover:text-[#FF4D8D] hover:bg-white/5 transition-colors"
            title="Emoji reactions"
          >
            <Smile className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Share your thoughts anonymously..."
            className="flex-1 bg-[#1B1826] border border-white/10 rounded-full px-3.5 py-2 text-xs text-[#E8E4F0] placeholder-[#8C86A0] focus:outline-none focus:border-[#FF4D8D]/60 focus:ring-1 focus:ring-[#FF4D8D]/30 transition-all"
            maxLength={180}
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF4D8D] to-[#F06292] text-white flex items-center justify-center disabled:opacity-40 hover:opacity-95 hover:scale-105 active:scale-95 transition-all shadow-md glow-pink-sm cursor-pointer"
            title="Send anonymous message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
        <div className="flex items-center justify-between mt-1.5 px-2 text-[10px] text-[#8C86A0]">
          <span>Posting as: <strong className="text-pink-300 font-normal">{userProfile.alias}</strong></span>
          <button 
            type="button" 
            onClick={triggerFloatingHeart}
            className="text-[#FF4D8D] hover:underline flex items-center gap-1"
          >
            <Heart className="w-2.5 h-2.5 fill-current" /> Send Heart
          </button>
        </div>
      </div>
    </aside>
  );
};
