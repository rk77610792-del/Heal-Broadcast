import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  MessageCircle, 
  Sparkles, 
  CheckCheck, 
  X,
  Radio,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavigationTab } from '../types';

export const Header: React.FC = () => {
  const { 
    currentTab, 
    setCurrentTab, 
    searchQuery, 
    setSearchQuery, 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsRead, 
    unreadNotificationsCount, 
    userProfile,
    setIsConfessionModalOpen,
    isMobileChatOpen,
    setIsMobileChatOpen
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close notifications on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const topTabs: Array<{ id: NavigationTab; label: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'episodes', label: 'Episodes' },
    { id: 'confessions', label: 'Confessions' },
    { id: 'community', label: 'Community' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-20 w-full bg-[#0B0A10]/85 backdrop-blur-md border-b border-white/6 px-4 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
      {/* Top Main Navigation Tabs */}
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
        {topTabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`relative px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                isActive 
                  ? 'text-white' 
                  : 'text-[#8C86A0] hover:text-[#E8E4F0] hover:bg-white/5'
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#FF4D8D] to-[#8B5CF6] rounded-full glow-pink-sm" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Controls: Search, Notifications, Write button, User pill, Mobile Chat */}
      <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto justify-end">
        {/* Search Bar */}
        <div className="relative flex-1 md:w-56 lg:w-72">
          <Search className="w-4 h-4 text-[#8C86A0] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search confessions, episodes..."
            className="w-full pl-9 pr-7 py-1.5 rounded-full bg-[#14121C] border border-white/10 text-xs sm:text-sm text-[#E8E4F0] placeholder-[#8C86A0] focus:outline-none focus:border-[#FF4D8D]/60 focus:ring-1 focus:ring-[#FF4D8D]/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C86A0] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Post Button */}
        <button
          onClick={() => setIsConfessionModalOpen(true)}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FF4D8D] to-[#F06292] text-white text-xs font-semibold shadow-md glow-pink-sm hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Confess</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-full bg-[#14121C] border border-white/10 text-[#8C86A0] hover:text-white hover:border-[#FF4D8D]/40 transition-colors"
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF4D8D] glow-pink-sm ring-2 ring-[#14121C] animate-pulse" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#14121C] border border-white/10 shadow-2xl p-4 z-50 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">Notifications</span>
                  {unreadNotificationsCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#FF4D8D]/20 text-[#FF4D8D] font-bold">
                      {unreadNotificationsCount} new
                    </span>
                  )}
                </div>
                {unreadNotificationsCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-[#8C86A0] hover:text-[#FF4D8D] flex items-center gap-1 transition-colors"
                  >
                    <CheckCheck className="w-3 h-3" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      markNotificationAsRead(notif.id);
                      if (notif.actionUrl) {
                        setCurrentTab(notif.actionUrl as NavigationTab);
                        setIsNotifOpen(false);
                      }
                    }}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer border ${
                      notif.read 
                        ? 'bg-white/[0.02] border-transparent text-[#8C86A0] hover:bg-white/5' 
                        : 'bg-[#1B1826] border-[#FF4D8D]/20 text-white hover:border-[#FF4D8D]/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold leading-tight flex items-center gap-1.5">
                        {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D8D]" />}
                        {notif.title}
                      </span>
                      <span className="text-[10px] text-[#8C86A0] shrink-0">{notif.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-[#8C86A0] mt-1 line-clamp-2">
                      {notif.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile / Tablet Live Chat Toggle */}
        <button
          onClick={() => setIsMobileChatOpen(!isMobileChatOpen)}
          className="xl:hidden relative p-2 rounded-full bg-[#14121C] border border-white/10 text-[#8C86A0] hover:text-[#FF4D8D] transition-colors"
          title="Toggle Live Chat"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D8D] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4D8D]"></span>
          </span>
        </button>

        {/* User Pill */}
        <div
          onClick={() => setCurrentTab('profile')}
          className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-[#14121C] border border-white/10 hover:border-[#FF4D8D]/30 cursor-pointer transition-all"
        >
          <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${userProfile.avatarColor} text-white flex items-center justify-center text-[10px] font-bold`}>
            {userProfile.alias.charAt(0)}
          </div>
          <span className="hidden lg:inline text-xs font-medium text-[#E8E4F0] max-w-[100px] truncate">
            {userProfile.alias}
          </span>
        </div>
      </div>
    </header>
  );
};
