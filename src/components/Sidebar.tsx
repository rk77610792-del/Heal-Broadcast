import React from 'react';
import { 
  Home, 
  Radio, 
  HeartHandshake, 
  Headphones, 
  Users, 
  MessageSquareHeart, 
  Bookmark, 
  UserCheck, 
  Mic, 
  Sparkles, 
  ArrowRight, 
  Heart,
  Music2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavigationTab } from '../types';

export const Sidebar: React.FC = () => {
  const { 
    currentTab, 
    setCurrentTab, 
    unreadMessagesCount, 
    setIsConfessionModalOpen,
    userProfile 
  } = useApp();

  const navItems: Array<{
    id: NavigationTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    hasLivePulse?: boolean;
  }> = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'now-live', label: 'Now Live', icon: Radio, hasLivePulse: true, badge: 'LIVE' },
    { id: 'music', label: 'Music & Playlists', icon: Music2 },
    { id: 'confessions', label: 'Confessions', icon: HeartHandshake },
    { id: 'episodes', label: 'Episodes', icon: Headphones },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquareHeart, badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined },
    { id: 'my-list', label: 'My List', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: UserCheck },
  ];

  return (
    <>
      {/* Desktop / Tablet Sidebar */}
      <aside 
        aria-label="Main Navigation"
        className="hidden md:flex flex-col w-20 lg:w-60 h-screen fixed left-0 top-0 z-30 bg-[#14121C]/95 backdrop-blur-xl border-r border-white/6 p-3 lg:p-4 justify-between transition-all duration-300"
      >
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div 
            onClick={() => setCurrentTab('home')}
            className="cursor-pointer flex items-center gap-3 px-2 py-1 group select-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4D8D] to-[#8B5CF6] text-white shadow-lg glow-pink-sm transition-transform duration-300 group-hover:scale-105">
              <Radio className="w-5 h-5" />
              <Heart className="w-3.5 h-3.5 text-white absolute -top-1 -right-1 fill-white animate-pulse" />
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="font-script text-2xl font-bold bg-gradient-to-r from-[#FF4D8D] via-[#F06292] to-[#c084fc] bg-clip-text text-transparent leading-none">
                Heal Broadcast
              </span>
              <span className="text-[10px] tracking-widest text-[#8C86A0] uppercase mt-1 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 98.4 FM Midnight Healing
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1.5" aria-label="Sidebar Sections">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`group relative flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#FF4D8D]/20 to-[#8B5CF6]/10 text-white border border-[#FF4D8D]/30 glow-pink-sm' 
                      : 'text-[#8C86A0] hover:text-[#E8E4F0] hover:bg-white/5'
                  }`}
                  title={item.label}
                >
                  <div className="relative">
                    <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-[#FF4D8D]' : 'text-[#8C86A0] group-hover:text-white'}`} />
                    {item.hasLivePulse && (
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                      </span>
                    )}
                  </div>

                  <span className="hidden lg:inline-block flex-1 truncate">
                    {item.label}
                  </span>

                  {/* Badge */}
                  {item.badge && (
                    <span className="hidden lg:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-[#FF4D8D] to-[#8B5CF6] text-white shadow-sm">
                      {item.badge}
                    </span>
                  )}

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-[#FF4D8D] glow-pink-sm lg:hidden" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Action Card & User Snippet */}
        <div className="flex flex-col gap-3">
          {/* "Your Voice Matters" Card */}
          <div 
            onClick={() => setIsConfessionModalOpen(true)}
            className="cursor-pointer group relative overflow-hidden rounded-2xl p-3.5 bg-gradient-to-br from-[#1B1826] to-[#252033] border border-[#FF4D8D]/20 hover:border-[#FF4D8D]/50 transition-all duration-300 hover:shadow-lg glow-pink-sm"
          >
            <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-[#FF4D8D]/10 blur-xl group-hover:bg-[#FF4D8D]/25 transition-all"></div>
            
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 rounded-lg bg-[#FF4D8D]/20 text-[#FF4D8D] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mic className="w-4 h-4" />
              </div>
              <span className="hidden lg:inline-block text-xs font-semibold text-white tracking-wide">
                Your Voice Matters
              </span>
            </div>

            <p className="hidden lg:block text-[11px] text-[#8C86A0] leading-snug mb-2.5">
              Whisper your truth into the night air. Completely anonymous.
            </p>

            <button 
              type="button"
              className="w-full flex items-center justify-between text-[11px] font-semibold text-[#FF4D8D] group-hover:text-white transition-colors"
            >
              <span className="hidden lg:inline flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#FF4D8D]" />
                Confess Now
              </span>
              <div className="w-6 h-6 rounded-full bg-[#FF4D8D]/10 flex items-center justify-center group-hover:bg-[#FF4D8D] group-hover:text-white transition-all mx-auto lg:mx-0">
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          </div>

          {/* User mini profile */}
          <div 
            onClick={() => setCurrentTab('profile')}
            className="cursor-pointer flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
          >
            <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${userProfile.avatarColor} flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/10 shrink-0`}>
              {userProfile.alias.charAt(0)}
            </div>
            <div className="hidden lg:flex flex-col min-w-0">
              <span className="text-xs font-medium text-[#E8E4F0] truncate">
                {userProfile.alias}
              </span>
              <span className="text-[10px] text-[#8C86A0]">Anonymous Listener</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav 
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#14121C]/95 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 flex items-center justify-around"
      >
        {[
          { id: 'home', label: 'Home', icon: Home },
          { id: 'now-live', label: 'Live', icon: Radio, hasLivePulse: true },
          { id: 'music', label: 'Music', icon: Music2 },
          { id: 'confessions', label: 'Confess', icon: HeartHandshake },
          { id: 'episodes', label: 'Episodes', icon: Headphones },
          { id: 'messages', label: 'Inbox', icon: MessageSquareHeart, badge: unreadMessagesCount || undefined },
          { id: 'profile', label: 'Profile', icon: UserCheck },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id as NavigationTab)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-xs font-medium relative transition-colors ${
                isActive ? 'text-[#FF4D8D]' : 'text-[#8C86A0]'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.hasLivePulse && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
                {item.badge && (
                  <span className="absolute -top-1 -right-2 px-1 text-[9px] font-bold rounded-full bg-[#FF4D8D] text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
