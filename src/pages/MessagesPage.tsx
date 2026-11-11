import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquareHeart, 
  Send, 
  Search, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Smile, 
  Clock 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MessagesPage: React.FC = () => {
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    sendDirectMessage, 
    userProfile 
  } = useApp();

  const [messageText, setMessageText] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];

  const filteredConversations = conversations.filter(c =>
    c.alias.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchFilter.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeConv) return;
    sendDirectMessage(activeConv.id, messageText);
    setMessageText('');
  };

  return (
    <div className="flex flex-col gap-6 pb-24 text-left">
      {/* Top Banner */}
      <div className="rounded-3xl bg-[#14121C] border border-white/10 p-5 sm:p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4D8D] to-[#8B5CF6] text-white flex items-center justify-center shadow-md">
            <MessageSquareHeart className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Anonymous Inquiries & Direct Messages
            </h1>
            <p className="text-xs text-[#8C86A0] flex items-center gap-1.5 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>End-to-end anonymized. No email or personal identifiers revealed.</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2-Column Chat Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 rounded-3xl bg-[#14121C] border border-white/10 overflow-hidden min-h-[560px]">
        {/* Left: Conversation List (4 cols) */}
        <div className="md:col-span-5 lg:col-span-4 border-r border-white/6 flex flex-col bg-[#14121C]">
          {/* Search Box */}
          <div className="p-3.5 border-b border-white/6">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8C86A0] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#1B1826] border border-white/5 text-xs text-[#E8E4F0] placeholder-[#8C86A0] focus:outline-none focus:border-[#FF4D8D]/40"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === activeConv?.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-white/[0.06] border-l-2 border-[#FF4D8D]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${conv.avatarColor} text-white flex items-center justify-center text-xs font-bold ring-1 ring-white/15`}>
                      {conv.alias.charAt(0)}
                    </div>
                    {conv.status === 'online' && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#14121C]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-white truncate">
                        {conv.alias}
                      </span>
                      <span className="text-[10px] text-[#8C86A0] shrink-0 font-mono">
                        {conv.lastTimestamp}
                      </span>
                    </div>
                    <p className="text-xs text-[#8C86A0] truncate">
                      {conv.lastMessage}
                    </p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#FF4D8D] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Window (7/8 cols) */}
        {activeConv ? (
          <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between bg-[#110f18]">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-white/6 flex items-center justify-between bg-[#14121C]">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${activeConv.avatarColor} text-white flex items-center justify-center text-xs font-bold`}>
                  {activeConv.alias.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    {activeConv.alias}
                  </h3>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Online & listening
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-[#8C86A0] flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#FF4D8D]" />
                <span>Private Whisper</span>
              </div>
            </div>

            {/* Message Thread */}
            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-3.5">
              {activeConv.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[78%] ${
                    msg.isMe ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.isMe
                        ? 'bg-gradient-to-r from-[#FF4D8D] to-[#F06292] text-white rounded-tr-none'
                        : 'bg-[#1B1826] border border-white/10 text-[#E8E4F0] rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[#8C86A0] mt-1 px-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3.5 border-t border-white/6 bg-[#14121C] flex items-center gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={`Reply anonymously to ${activeConv.alias}...`}
                className="flex-1 bg-[#1B1826] border border-white/10 rounded-full px-4 py-2 text-xs sm:text-sm text-[#E8E4F0] placeholder-[#8C86A0] focus:outline-none focus:border-[#FF4D8D]/60"
                maxLength={300}
              />
              <button
                type="submit"
                disabled={!messageText.trim()}
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF4D8D] to-[#8B5CF6] text-white flex items-center justify-center disabled:opacity-40 hover:scale-105 active:scale-95 transition-all shadow-md glow-pink-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="md:col-span-7 lg:col-span-8 flex items-center justify-center text-[#8C86A0] text-sm p-10">
            Select a conversation on the left to start reading.
          </div>
        )}
      </div>
    </div>
  );
};
