export type MoodTag = 'Love' | 'Heartbreak' | 'Crush' | 'Regret' | 'Secret' | 'Gratitude';

export interface Comment {
  id: string;
  author: string;
  avatarColor: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface Confession {
  id: string;
  author: string;
  avatarColor: string;
  mood: MoodTag;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  isLiked?: boolean;
  isSaved?: boolean;
  backgroundAccent?: string;
  songDedication?: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  coverImage: string;
  duration: string;
  durationSeconds: number;
  genre: string;
  mood?: string;
  audioTheme?: 'lofi' | 'ambient' | 'jazz' | 'rain';
  audioUrl?: string;
  previewUrl?: string;
  externalUrl?: string;
  releaseYear?: string;
  lyricsSnippet?: string;
  plays: number;
  isLiked?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  colorGradient: string;
  songIds: string[];
  isCustom?: boolean;
  createdBy: string;
}

export interface Episode {
  id: string;
  title: string;
  episodeNumber: number;
  host: string;
  guest?: string;
  duration: string;
  durationSeconds: number;
  coverImage: string;
  description: string;
  releaseDate: string;
  likes: number;
  listens: number;
  tags: string[];
  isLiked?: boolean;
  isSaved?: boolean;
  audioTheme?: 'lofi' | 'ambient' | 'jazz' | 'rain';
}

export type PopMessageStyle = 'love' | 'midnight' | 'flame' | 'radio' | 'warm';

export interface ChatMessage {
  id: string;
  username: string;
  avatarColor: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
  isHost?: boolean;
  isUser?: boolean;
  popStyle?: PopMessageStyle;
  popBadge?: string;
  popHighlight?: boolean;
  donationAmount?: string;
  heartsCount?: number;
}

export interface CommunityRoom {
  id: string;
  name: string;
  tagline: string;
  description: string;
  memberCount: number;
  iconName: string;
  coverGradient: string;
  tags: string[];
  isJoined?: boolean;
  activeTopic: string;
}

export interface DirectMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  alias: string;
  avatarColor: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  status: 'online' | 'idle' | 'offline';
  messages: DirectMessage[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'confession' | 'episode' | 'message' | 'community';
  read: boolean;
  actionUrl?: string;
}

export interface UserProfile {
  alias: string;
  tagline: string;
  avatarColor: string;
  joinedDate: string;
  stats: {
    confessionsCount: number;
    heartsGiven: number;
    hoursListened: number;
    savedCount: number;
  };
  badges: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
  }>;
}

export type NavigationTab = 
  | 'home' 
  | 'now-live' 
  | 'confessions' 
  | 'episodes' 
  | 'music'
  | 'community' 
  | 'messages' 
  | 'my-list' 
  | 'profile' 
  | 'about';
