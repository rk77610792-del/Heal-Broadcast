import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  NavigationTab, 
  Confession, 
  Episode, 
  CommunityRoom, 
  Conversation, 
  NotificationItem, 
  UserProfile,
  MoodTag
} from '../types';
import { 
  INITIAL_CONFESSIONS, 
  INITIAL_EPISODES, 
  INITIAL_ROOMS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_USER_PROFILE 
} from '../data/mockData';
import { radioAudio } from '../utils/audioSynthesizer';

interface AppContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Confessions
  confessions: Confession[];
  addConfession: (newConfession: {
    title: string;
    content: string;
    mood: MoodTag;
    author: string;
    isAnonymous: boolean;
    songDedication?: string;
  }) => void;
  toggleLikeConfession: (id: string) => void;
  toggleSaveConfession: (id: string) => void;
  addCommentToConfession: (confessionId: string, text: string) => void;

  // Episodes & Audio
  episodes: Episode[];
  activeEpisode: Episode | null;
  isPlaying: boolean;
  isLiveMode: boolean;
  playbackProgress: number; // 0 to 100
  playbackTime: number; // in seconds
  volume: number; // 0 to 1
  togglePlayEpisode: (episode?: Episode, forcePlay?: boolean) => void;
  startLiveStream: () => void;
  seekToProgress: (percent: number) => void;
  setVolume: (val: number) => void;
  toggleLikeEpisode: (id: string) => void;
  toggleSaveEpisode: (id: string) => void;

  // Modal
  isConfessionModalOpen: boolean;
  setIsConfessionModalOpen: (open: boolean) => void;

  // Community
  communityRooms: CommunityRoom[];
  toggleJoinRoom: (roomId: string) => void;

  // Direct Messages
  conversations: Conversation[];
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;
  sendDirectMessage: (conversationId: string, text: string) => void;
  unreadMessagesCount: number;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;

  // Profile
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;

  // Mobile / Chat UI
  isMobileChatOpen: boolean;
  setIsMobileChatOpen: (open: boolean) => void;
  floatingHearts: Array<{ id: number; x: number }>;
  triggerFloatingHeart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isConfessionModalOpen, setIsConfessionModalOpen] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  // Persistent Confessions
  const [confessions, setConfessions] = useState<Confession[]>(() => {
    try {
      const saved = localStorage.getItem('love_broadcast_confessions');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_CONFESSIONS;
  });

  // Episodes
  const [episodes, setEpisodes] = useState<Episode[]>(() => {
    try {
      const saved = localStorage.getItem('love_broadcast_episodes');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_EPISODES;
  });

  // Audio Player State
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(INITIAL_EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLiveMode, setIsLiveMode] = useState<boolean>(false);
  const [playbackTime, setPlaybackTime] = useState<number>(342); // starts 5m in
  const [volume, setVolumeState] = useState<number>(0.8);

  // Community rooms
  const [communityRooms, setCommunityRooms] = useState<CommunityRoom[]>(() => {
    try {
      const saved = localStorage.getItem('love_broadcast_rooms');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ROOMS;
  });

  // Conversations
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem('love_broadcast_conversations');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_CONVERSATIONS;
  });
  const [activeConversationId, setActiveConversationId] = useState<string>(INITIAL_CONVERSATIONS[0].id);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('love_broadcast_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_USER_PROFILE;
  });

  // Floating hearts animation
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; x: number }>>([]);

  const triggerFloatingHeart = useCallback(() => {
    const id = Date.now() + Math.random();
    const x = Math.floor(Math.random() * 80) + 10; // 10% to 90%
    setFloatingHearts(prev => [...prev.slice(-15), { id, x }]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== id));
    }, 2500);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('love_broadcast_confessions', JSON.stringify(confessions));
    } catch {
      // ignore
    }
  }, [confessions]);

  useEffect(() => {
    try {
      localStorage.setItem('love_broadcast_episodes', JSON.stringify(episodes));
    } catch {
      // ignore
    }
  }, [episodes]);

  useEffect(() => {
    try {
      localStorage.setItem('love_broadcast_rooms', JSON.stringify(communityRooms));
    } catch {
      // ignore
    }
  }, [communityRooms]);

  useEffect(() => {
    try {
      localStorage.setItem('love_broadcast_conversations', JSON.stringify(conversations));
    } catch {
      // ignore
    }
  }, [conversations]);

  useEffect(() => {
    try {
      localStorage.setItem('love_broadcast_profile', JSON.stringify(userProfile));
    } catch {
      // ignore
    }
  }, [userProfile]);

  // Audio timer ticker
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setPlaybackTime(prev => {
          if (!activeEpisode) return prev + 1;
          if (isLiveMode) return prev + 1;
          if (prev >= activeEpisode.durationSeconds) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeEpisode, isLiveMode]);

  const setVolume = (val: number) => {
    setVolumeState(val);
    radioAudio.setVolume(val);
  };

  const togglePlayEpisode = (episode?: Episode, forcePlay?: boolean) => {
    const target = episode || activeEpisode || episodes[0];
    const shouldPlay = forcePlay !== undefined ? forcePlay : !(isPlaying && activeEpisode?.id === target.id);

    if (shouldPlay) {
      setActiveEpisode(target);
      setIsPlaying(true);
      setIsLiveMode(target.id === 'ep-1');
      radioAudio.playTheme(target.audioTheme || 'lofi');
    } else {
      setIsPlaying(false);
      radioAudio.stop();
    }
  };

  const startLiveStream = () => {
    const liveEp = episodes.find(e => e.id === 'ep-1') || episodes[0];
    setActiveEpisode(liveEp);
    setIsLiveMode(true);
    setIsPlaying(true);
    setCurrentTab('now-live');
    radioAudio.playTheme('lofi');
  };

  const seekToProgress = (percent: number) => {
    if (!activeEpisode || isLiveMode) return;
    const newSeconds = Math.round((percent / 100) * activeEpisode.durationSeconds);
    setPlaybackTime(newSeconds);
  };

  const playbackProgress = activeEpisode && !isLiveMode 
    ? Math.min(100, (playbackTime / activeEpisode.durationSeconds) * 100)
    : 65;

  // Confessions Actions
  const addConfession = (newConf: {
    title: string;
    content: string;
    mood: MoodTag;
    author: string;
    isAnonymous: boolean;
    songDedication?: string;
  }) => {
    const created: Confession = {
      id: `conf-${Date.now()}`,
      author: newConf.isAnonymous ? (newConf.author || userProfile.alias) : userProfile.alias,
      avatarColor: userProfile.avatarColor,
      mood: newConf.mood,
      title: newConf.title,
      content: newConf.content,
      timestamp: 'Just now',
      likes: 1,
      isLiked: true,
      comments: [],
      songDedication: newConf.songDedication,
    };

    setConfessions(prev => [created, ...prev]);

    // Update profile stats
    setUserProfile(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        confessionsCount: prev.stats.confessionsCount + 1,
        heartsGiven: prev.stats.heartsGiven + 1
      }
    }));

    // Trigger floating heart
    triggerFloatingHeart();
  };

  const toggleLikeConfession = (id: string) => {
    setConfessions(prev =>
      prev.map(c => {
        if (c.id === id) {
          const isLiked = !c.isLiked;
          const likes = isLiked ? c.likes + 1 : Math.max(0, c.likes - 1);
          if (isLiked) triggerFloatingHeart();
          return { ...c, isLiked, likes };
        }
        return c;
      })
    );

    setUserProfile(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        heartsGiven: prev.stats.heartsGiven + 1
      }
    }));
  };

  const toggleSaveConfession = (id: string) => {
    setConfessions(prev =>
      prev.map(c => {
        if (c.id === id) {
          const isSaved = !c.isSaved;
          return { ...c, isSaved };
        }
        return c;
      })
    );

    setUserProfile(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        savedCount: prev.stats.savedCount + 1
      }
    }));
  };

  const addCommentToConfession = (confessionId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: userProfile.alias,
      avatarColor: userProfile.avatarColor,
      text: text.trim(),
      timestamp: 'Just now',
      likes: 0
    };

    setConfessions(prev =>
      prev.map(c => {
        if (c.id === confessionId) {
          return {
            ...c,
            comments: [...c.comments, newComment]
          };
        }
        return c;
      })
    );
  };

  // Episode like/save
  const toggleLikeEpisode = (id: string) => {
    setEpisodes(prev =>
      prev.map(ep => {
        if (ep.id === id) {
          const isLiked = !ep.isLiked;
          const likes = isLiked ? ep.likes + 1 : Math.max(0, ep.likes - 1);
          if (isLiked) triggerFloatingHeart();
          return { ...ep, isLiked, likes };
        }
        return ep;
      })
    );
  };

  const toggleSaveEpisode = (id: string) => {
    setEpisodes(prev =>
      prev.map(ep => {
        if (ep.id === id) {
          return { ...ep, isSaved: !ep.isSaved };
        }
        return ep;
      })
    );
  };

  // Community Room Join
  const toggleJoinRoom = (roomId: string) => {
    setCommunityRooms(prev =>
      prev.map(room => {
        if (room.id === roomId) {
          const isJoined = !room.isJoined;
          const memberCount = isJoined ? room.memberCount + 1 : room.memberCount - 1;
          return { ...room, isJoined, memberCount };
        }
        return room;
      })
    );
  };

  // Direct Messages
  const sendDirectMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'You',
      text: text.trim(),
      timestamp: 'Just now',
      isMe: true
    };

    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            lastMessage: text.trim(),
            lastTimestamp: 'Just now',
            messages: [...conv.messages, newMsg]
          };
        }
        return conv;
      })
    );
  };

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({
      ...prev,
      ...updates
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        searchQuery,
        setSearchQuery,
        confessions,
        addConfession,
        toggleLikeConfession,
        toggleSaveConfession,
        addCommentToConfession,
        episodes,
        activeEpisode,
        isPlaying,
        isLiveMode,
        playbackProgress,
        playbackTime,
        volume,
        togglePlayEpisode,
        startLiveStream,
        seekToProgress,
        setVolume,
        toggleLikeEpisode,
        toggleSaveEpisode,
        isConfessionModalOpen,
        setIsConfessionModalOpen,
        communityRooms,
        toggleJoinRoom,
        conversations,
        activeConversationId,
        setActiveConversationId,
        sendDirectMessage,
        unreadMessagesCount,
        notifications,
        markNotificationAsRead,
        markAllNotificationsRead,
        unreadNotificationsCount,
        userProfile,
        updateUserProfile,
        isMobileChatOpen,
        setIsMobileChatOpen,
        floatingHearts,
        triggerFloatingHeart
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
