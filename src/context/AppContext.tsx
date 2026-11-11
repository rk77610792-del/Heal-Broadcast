import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { 
  NavigationTab, 
  Confession, 
  Episode, 
  CommunityRoom, 
  Conversation, 
  NotificationItem, 
  UserProfile,
  MoodTag,
  Song,
  Playlist
} from '../types';
import { 
  INITIAL_CONFESSIONS, 
  INITIAL_EPISODES, 
  INITIAL_ROOMS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_USER_PROFILE,
  INITIAL_SONGS,
  INITIAL_PLAYLISTS
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

  // Episodes & Songs & Audio
  episodes: Episode[];
  songs: Song[];
  playlists: Playlist[];
  activeEpisode: Episode | null;
  activeSong: Song | null;
  activePlaylist: Playlist | null;
  activeMediaType: 'episode' | 'song';
  isPlaying: boolean;
  isLiveMode: boolean;
  playbackProgress: number; // 0 to 100
  playbackTime: number; // in seconds
  volume: number; // 0 to 1
  togglePlayEpisode: (episode?: Episode, forcePlay?: boolean) => void;
  playSong: (song: Song, playlistContext?: Playlist) => void;
  togglePlayActive: () => void;
  playNextTrack: () => void;
  playPrevTrack: () => void;
  startLiveStream: () => void;
  seekToProgress: (percent: number) => void;
  setVolume: (val: number) => void;
  toggleLikeEpisode: (id: string) => void;
  toggleSaveEpisode: (id: string) => void;
  toggleLikeSong: (id: string) => void;

  // Playlists
  createPlaylist: (name: string, description: string) => Playlist;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  playPlaylist: (playlist: Playlist, startIndex?: number) => void;
  addNewCustomSong: (songData: {
    title: string;
    artist: string;
    album?: string;
    genre: string;
    mood: string;
    coverImage?: string;
    lyricsSnippet?: string;
  }) => Song;

  // Playlist Modal
  isPlaylistModalOpen: boolean;
  setIsPlaylistModalOpen: (open: boolean) => void;
  songForPlaylistModal: Song | null;
  openAddToPlaylistModal: (song: Song) => void;

  // Confession Modal
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

  // Playlist Add Modal State
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [songForPlaylistModal, setSongForPlaylistModal] = useState<Song | null>(null);

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

  // Songs
  const [songs, setSongs] = useState<Song[]>(() => {
    try {
      const saved = localStorage.getItem('love_broadcast_songs');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_SONGS;
  });

  // Playlists
  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    try {
      const saved = localStorage.getItem('love_broadcast_playlists');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PLAYLISTS;
  });

  // Audio Player State
  const [activeMediaType, setActiveMediaType] = useState<'episode' | 'song'>('episode');
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(INITIAL_EPISODES[0]);
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);
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
    const x = Math.floor(Math.random() * 80) + 10;
    setFloatingHearts(prev => [...prev.slice(-15), { id, x }]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== id));
    }, 2500);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('love_broadcast_confessions', JSON.stringify(confessions));
    } catch {}
  }, [confessions]);

  useEffect(() => {
    try {
      localStorage.setItem('love_broadcast_episodes', JSON.stringify(episodes));
    } catch {}
  }, [episodes]);

  useEffect(() => {
    try {
      localStorage.setItem('love_broadcast_songs', JSON.stringify(songs));
    } catch {}
  }, [songs]);

  useEffect(() => {
    try {
      localStorage.setItem('love_broadcast_playlists', JSON.stringify(playlists));
    } catch {}
  }, [playlists]);

  useEffect(() => {
    try {
      localStorage.setItem('love_broadcast_rooms', JSON.stringify(communityRooms));
    } catch {}
  }, [communityRooms]);

  useEffect(() => {
    try {
      localStorage.setItem('love_broadcast_conversations', JSON.stringify(conversations));
    } catch {}
  }, [conversations]);

  useEffect(() => {
    try {
      localStorage.setItem('love_broadcast_profile', JSON.stringify(userProfile));
    } catch {}
  }, [userProfile]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playNextTrackRef = useRef<() => void>(() => {});
  const activeSongRef = useRef<Song | null>(null);
  activeSongRef.current = activeSong;

  // Initialize HTML5 Audio Element for real song streams
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setPlaybackTime(Math.floor(audio.currentTime));
    };

    const handleEnded = () => {
      playNextTrackRef.current();
    };

    const handleError = () => {
      // Fallback to ambient lofi synthesizer if stream is blocked or offline
      if (activeSongRef.current) {
        radioAudio.playTheme(activeSongRef.current.audioTheme || 'lofi');
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Audio timer ticker for synthetic themes and episodes
  useEffect(() => {
    let interval: number;
    const hasActiveAudioStream = activeMediaType === 'song' && !!(activeSong?.audioUrl || activeSong?.previewUrl);
    
    if (isPlaying && !hasActiveAudioStream) {
      interval = window.setInterval(() => {
        setPlaybackTime(prev => {
          if (isLiveMode) return prev + 1;
          const maxSec = activeMediaType === 'song' && activeSong 
            ? activeSong.durationSeconds 
            : (activeEpisode?.durationSeconds || 300);

          if (prev >= maxSec) {
            // If in a playlist or queue, advance to next track
            if (activeMediaType === 'song') {
              playNextTrackRef.current();
            }
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeMediaType, activeSong, activeEpisode, isLiveMode]);

  const setVolume = (val: number) => {
    setVolumeState(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    radioAudio.setVolume(val);
  };

  // Play Episode
  const togglePlayEpisode = (episode?: Episode, forcePlay?: boolean) => {
    const target = episode || activeEpisode || episodes[0];
    const shouldPlay = forcePlay !== undefined ? forcePlay : !(isPlaying && activeMediaType === 'episode' && activeEpisode?.id === target.id);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (shouldPlay) {
      setActiveMediaType('episode');
      setActiveEpisode(target);
      setActiveSong(null);
      setIsPlaying(true);
      setIsLiveMode(target.id === 'ep-1');
      radioAudio.playTheme(target.audioTheme || 'lofi');
    } else {
      setIsPlaying(false);
      radioAudio.stop();
    }
  };

  // Play Song with real stream preview or ambient synthesis
  const playSong = (song: Song, playlistContext?: Playlist) => {
    setActiveMediaType('song');
    setActiveSong(song);
    if (playlistContext) {
      setActivePlaylist(playlistContext);
    }
    setIsLiveMode(false);
    setIsPlaying(true);
    setPlaybackTime(0);

    const streamUrl = song.audioUrl || song.previewUrl;
    if (streamUrl && audioRef.current) {
      radioAudio.stop();
      audioRef.current.src = streamUrl;
      audioRef.current.volume = volume;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Fallback to ambient chord synth if browser autoplay blocks or stream errors
        radioAudio.playTheme(song.audioTheme || 'lofi');
      });
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      radioAudio.playTheme(song.audioTheme || 'lofi');
    }

    // Add or increment in local songs registry
    setSongs(prev => {
      const exists = prev.some(s => s.id === song.id);
      if (exists) {
        return prev.map(s => (s.id === song.id ? { ...s, plays: s.plays + 1 } : s));
      }
      return [{ ...song, plays: (song.plays || 0) + 1 }, ...prev];
    });

    setUserProfile(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        hoursListened: Number((prev.stats.hoursListened + 0.05).toFixed(1))
      }
    }));

    triggerFloatingHeart();
  };

  // Toggle active player state
  const togglePlayActive = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      radioAudio.stop();
    } else {
      setIsPlaying(true);
      const streamUrl = activeSong?.audioUrl || activeSong?.previewUrl;
      if (activeMediaType === 'song' && streamUrl && audioRef.current) {
        radioAudio.stop();
        audioRef.current.play().catch(() => {
          radioAudio.playTheme(activeSong?.audioTheme || 'lofi');
        });
      } else if (activeMediaType === 'song' && activeSong) {
        radioAudio.playTheme(activeSong?.audioTheme || 'lofi');
      } else if (activeEpisode) {
        radioAudio.playTheme(activeEpisode.audioTheme || 'lofi');
      }
    }
  };

  // Next / Previous Track in Playlist or Song List
  const playNextTrack = () => {
    if (activeMediaType === 'song') {
      const trackList = activePlaylist 
        ? activePlaylist.songIds.map(id => songs.find(s => s.id === id)).filter(Boolean) as Song[]
        : songs;

      if (trackList.length === 0) return;
      const currentIndex = trackList.findIndex(s => s.id === activeSong?.id);
      const nextIndex = (currentIndex + 1) % trackList.length;
      playSong(trackList[nextIndex], activePlaylist || undefined);
    }
  };
  playNextTrackRef.current = playNextTrack;

  const playPrevTrack = () => {
    if (activeMediaType === 'song') {
      const trackList = activePlaylist 
        ? activePlaylist.songIds.map(id => songs.find(s => s.id === id)).filter(Boolean) as Song[]
        : songs;

      if (trackList.length === 0) return;
      const currentIndex = trackList.findIndex(s => s.id === activeSong?.id);
      const prevIndex = (currentIndex - 1 + trackList.length) % trackList.length;
      playSong(trackList[prevIndex], activePlaylist || undefined);
    }
  };

  const playPlaylist = (playlist: Playlist, startIndex = 0) => {
    setActivePlaylist(playlist);
    const playlistSongs = playlist.songIds.map(id => songs.find(s => s.id === id)).filter(Boolean) as Song[];
    if (playlistSongs.length > 0) {
      const targetSong = playlistSongs[Math.min(startIndex, playlistSongs.length - 1)];
      playSong(targetSong, playlist);
    }
  };

  const startLiveStream = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const liveEp = episodes.find(e => e.id === 'ep-1') || episodes[0];
    setActiveMediaType('episode');
    setActiveEpisode(liveEp);
    setActiveSong(null);
    setIsLiveMode(true);
    setIsPlaying(true);
    setCurrentTab('now-live');
    radioAudio.playTheme('lofi');
  };

  const seekToProgress = (percent: number) => {
    if (isLiveMode) return;
    const streamUrl = activeSong?.audioUrl || activeSong?.previewUrl;
    if (activeMediaType === 'song' && streamUrl && audioRef.current && audioRef.current.duration) {
      const targetTime = (percent / 100) * audioRef.current.duration;
      audioRef.current.currentTime = targetTime;
      setPlaybackTime(Math.floor(targetTime));
      return;
    }

    const maxSec = activeMediaType === 'song' && activeSong
      ? activeSong.durationSeconds
      : (activeEpisode?.durationSeconds || 300);

    const newSeconds = Math.round((percent / 100) * maxSec);
    setPlaybackTime(newSeconds);
  };

  const currentDurationSeconds = activeMediaType === 'song' && activeSong
    ? activeSong.durationSeconds
    : (activeEpisode?.durationSeconds || 300);

  const playbackProgress = !isLiveMode 
    ? Math.min(100, (playbackTime / currentDurationSeconds) * 100)
    : 65;

  // Like Song
  const toggleLikeSong = (songId: string) => {
    setSongs(prev =>
      prev.map(s => {
        if (s.id === songId) {
          const isLiked = !s.isLiked;
          if (isLiked) triggerFloatingHeart();
          return { ...s, isLiked };
        }
        return s;
      })
    );
  };

  // Playlists CRUD
  const createPlaylist = (name: string, description: string): Playlist => {
    const newPl: Playlist = {
      id: `pl-${Date.now()}`,
      name: name.trim() || 'My Late Night Vibes',
      description: description.trim() || 'Handpicked nocturnal frequencies.',
      coverImage: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
      colorGradient: 'from-pink-900/80 via-purple-950/80 to-[#14121C]',
      songIds: [],
      isCustom: true,
      createdBy: userProfile.alias
    };

    setPlaylists(prev => [newPl, ...prev]);
    triggerFloatingHeart();
    return newPl;
  };

  const addSongToPlaylist = (playlistId: string, songId: string) => {
    setPlaylists(prev =>
      prev.map(pl => {
        if (pl.id === playlistId) {
          if (!pl.songIds.includes(songId)) {
            return { ...pl, songIds: [...pl.songIds, songId] };
          }
        }
        return pl;
      })
    );
    triggerFloatingHeart();
  };

  const removeSongFromPlaylist = (playlistId: string, songId: string) => {
    setPlaylists(prev =>
      prev.map(pl => {
        if (pl.id === playlistId) {
          return { ...pl, songIds: pl.songIds.filter(id => id !== songId) };
        }
        return pl;
      })
    );
  };

  // Add custom song (lets anyone search/add any song!)
  const addNewCustomSong = (songData: {
    title: string;
    artist: string;
    album?: string;
    genre: string;
    mood: string;
    coverImage?: string;
    lyricsSnippet?: string;
  }): Song => {
    const durationMins = 3;
    const durationSecs = Math.floor(Math.random() * 40) + 10;
    const durationStr = `${durationMins}:${durationSecs.toString().padStart(2, '0')}`;

    const themes: Array<'lofi' | 'ambient' | 'jazz' | 'rain'> = ['lofi', 'ambient', 'jazz', 'rain'];
    const chosenTheme = themes[Math.floor(Math.random() * themes.length)];

    const created: Song = {
      id: `song-${Date.now()}`,
      title: songData.title.trim(),
      artist: songData.artist.trim(),
      album: songData.album?.trim() || 'Midnight Singles',
      coverImage: songData.coverImage || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      duration: durationStr,
      durationSeconds: durationMins * 60 + durationSecs,
      genre: songData.genre || 'Late Night Indie',
      mood: songData.mood || 'Gentle Resonance',
      audioTheme: chosenTheme,
      lyricsSnippet: songData.lyricsSnippet || 'Under the midnight rain...',
      plays: 1,
      isLiked: true
    };

    setSongs(prev => [created, ...prev]);
    playSong(created);
    return created;
  };

  const openAddToPlaylistModal = (song: Song) => {
    setSongForPlaylistModal(song);
    setIsPlaylistModalOpen(true);
  };

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

    setUserProfile(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        confessionsCount: prev.stats.confessionsCount + 1,
        heartsGiven: prev.stats.heartsGiven + 1
      }
    }));

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
        songs,
        playlists,
        activeEpisode,
        activeSong,
        activePlaylist,
        activeMediaType,
        isPlaying,
        isLiveMode,
        playbackProgress,
        playbackTime,
        volume,
        togglePlayEpisode,
        playSong,
        togglePlayActive,
        playNextTrack,
        playPrevTrack,
        startLiveStream,
        seekToProgress,
        setVolume,
        toggleLikeEpisode,
        toggleSaveEpisode,
        toggleLikeSong,
        createPlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        playPlaylist,
        addNewCustomSong,
        isPlaylistModalOpen,
        setIsPlaylistModalOpen,
        songForPlaylistModal,
        openAddToPlaylistModal,
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
