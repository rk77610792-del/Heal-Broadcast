import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  Moon, 
  HeartHandshake, 
  Mail, 
  Compass, 
  Feather, 
  Check, 
  Plus, 
  MessageCircle, 
  Send,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CommunityRoom } from '../types';

export const CommunityPage: React.FC = () => {
  const { 
    communityRooms, 
    toggleJoinRoom, 
    userProfile, 
    triggerFloatingHeart,
    setIsConfessionModalOpen 
  } = useApp();

  const [activeRoomId, setActiveRoomId] = useState<string | null>(communityRooms[0].id);
  const [topicReply, setTopicReply] = useState('');
  const [replies, setReplies] = useState<Record<string, Array<{ id: string; author: string; text: string; time: string }>>>({
    'room-1': [
      { id: 'r1', author: 'Velvet Rain', text: 'I keep thinking about the conversation we never finished in the diner.', time: '12m ago' },
      { id: 'r2', author: 'Echo Drifter', text: '3 AM thoughts are always louder than daylight logic. Drinking peppermint tea.', time: '5m ago' }
    ],
    'room-4': [
      { id: 'r3', author: 'Unsent Ink', text: 'I still have the envelope with your address written in cursive. Never bought a stamp.', time: '28m ago' }
    ]
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Moon': return Moon;
      case 'HeartHandshake': return HeartHandshake;
      case 'Sparkles': return Sparkles;
      case 'Mail': return Mail;
      case 'Compass': return Compass;
      case 'Feather': return Feather;
      default: return Users;
    }
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicReply.trim() || !activeRoomId) return;

    const newEntry = {
      id: `rep-${Date.now()}`,
      author: userProfile.alias,
      text: topicReply.trim(),
      time: 'Just now'
    };

    setReplies(prev => ({
      ...prev,
      [activeRoomId]: [...(prev[activeRoomId] || []), newEntry]
    }));

    setTopicReply('');
    triggerFloatingHeart();
  };

  const currentRoom = communityRooms.find(r => r.id === activeRoomId);

  return (
    <div className="flex flex-col gap-6 pb-24 text-left">
      {/* Community Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#1B1826] via-[#201830] to-[#1B1826] border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Users className="w-4 h-4 text-[#8B5CF6]" />
            <span>Safe Spaces</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Community Rooms
          </h1>
          <p className="text-xs sm:text-sm text-[#8C86A0] leading-relaxed">
            Niches designed for specific heart stages. Join circles that resonate with where you are right now, join discussions, or listen quietly.
          </p>
        </div>

        <button
          onClick={() => setIsConfessionModalOpen(true)}
          className="relative z-10 flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#FF4D8D] to-[#8B5CF6] text-white text-xs sm:text-sm font-bold shadow-lg glow-pink-sm hover:scale-105 transition-all shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Write In Tonight</span>
        </button>
      </div>

      {/* Main Grid: Room Cards & Active Room Discussion */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Rooms List (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          <h2 className="text-sm font-semibold text-[#8C86A0] uppercase tracking-wider px-1">
            Browse Circles ({communityRooms.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {communityRooms.map((room) => {
              const Icon = getIcon(room.iconName);
              const isSelected = room.id === activeRoomId;
              return (
                <div
                  key={room.id}
                  onClick={() => setActiveRoomId(room.id)}
                  className={`cursor-pointer rounded-2xl p-4.5 border transition-all duration-200 relative overflow-hidden flex flex-col justify-between gap-3 text-left ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#1E192B] to-[#281c38] border-[#FF4D8D]/40 shadow-lg glow-pink-sm'
                      : 'bg-[#1B1826] border-white/6 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF4D8D]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white leading-tight">
                          {room.name}
                        </h3>
                        <span className="text-[10px] text-[#8C86A0]">
                          {room.memberCount.toLocaleString()} members
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleJoinRoom(room.id);
                      }}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
                        room.isJoined
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/10 text-white hover:bg-[#FF4D8D] hover:text-white'
                      }`}
                    >
                      {room.isJoined ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Joined</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>Join</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-[#8C86A0] line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-[#8C86A0]">
                    <span className="truncate max-w-[70%] text-pink-300">
                      Topic: {room.activeTopic}
                    </span>
                    <span className="text-[#8C86A0] hover:text-white flex items-center gap-0.5">
                      Enter <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Room Spotlight & Conversation Thread (5 cols) */}
        {currentRoom && (
          <div className="lg:col-span-5 rounded-2xl bg-[#14121C] border border-white/10 p-5 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#FF4D8D] uppercase tracking-wider">
                  Active Circle Discussion
                </span>
                <span className="text-xs text-[#8C86A0]">
                  {currentRoom.memberCount.toLocaleString()} members
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                {currentRoom.name}
              </h3>
              <p className="text-xs text-[#8C86A0] mb-4">
                {currentRoom.tagline}
              </p>

              {/* Prompt Box */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#FF4D8D]/15 to-[#8B5CF6]/15 border border-[#FF4D8D]/30 mb-4">
                <span className="text-[10px] text-pink-300 font-bold uppercase block mb-1">
                  Tonight's Guiding Question:
                </span>
                <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                  "{currentRoom.activeTopic}"
                </p>
              </div>

              {/* Discussion Thread */}
              <div className="flex flex-col gap-2.5 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                {(replies[currentRoom.id] || []).length > 0 ? (
                  (replies[currentRoom.id] || []).map((item) => (
                    <div key={item.id} className="p-3 rounded-xl bg-[#1B1826] border border-white/5 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-pink-200">{item.author}</span>
                        <span className="text-[10px] text-[#8C86A0]">{item.time}</span>
                      </div>
                      <p className="text-xs text-[#E8E4F0]/90 leading-relaxed">{item.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-xs text-[#8C86A0] italic">
                    Be the first voice to respond to tonight's topic.
                  </div>
                )}
              </div>
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handlePostReply} className="flex items-center gap-2 pt-2 border-t border-white/5">
              <input
                type="text"
                value={topicReply}
                onChange={(e) => setTopicReply(e.target.value)}
                placeholder={`Share your response as ${userProfile.alias}...`}
                className="flex-1 bg-[#1B1826] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#E8E4F0] placeholder-[#8C86A0] focus:outline-none focus:border-[#FF4D8D]/50"
                maxLength={180}
              />
              <button
                type="submit"
                disabled={!topicReply.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-tr from-[#FF4D8D] to-[#8B5CF6] text-white disabled:opacity-30 shadow-md glow-pink-sm"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
