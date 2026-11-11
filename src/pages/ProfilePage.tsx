import React, { useState } from 'react';
import { 
  UserCheck, 
  Edit3, 
  Heart, 
  Headphones, 
  Bookmark, 
  Sparkles, 
  Moon, 
  Mic, 
  HeartHandshake, 
  Save, 
  Check,
  Shield,
  Palette
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ConfessionCard } from '../components/ConfessionCard';

export const ProfilePage: React.FC = () => {
  const { userProfile, updateUserProfile, confessions, setIsConfessionModalOpen } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [aliasInput, setAliasInput] = useState(userProfile.alias);
  const [taglineInput, setTaglineInput] = useState(userProfile.tagline);
  const [avatarColor, setAvatarColor] = useState(userProfile.avatarColor);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const myConfessions = confessions.filter(c => c.author === userProfile.alias);

  const avatarGradients = [
    'from-pink-500 via-rose-500 to-violet-600',
    'from-purple-500 to-indigo-600',
    'from-cyan-500 to-blue-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-rose-500',
    'from-fuchsia-600 to-pink-500'
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aliasInput.trim()) return;

    updateUserProfile({
      alias: aliasInput.trim(),
      tagline: taglineInput.trim(),
      avatarColor
    });

    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const getBadgeIcon = (icon: string) => {
    switch (icon) {
      case 'Moon': return Moon;
      case 'HeartHandshake': return HeartHandshake;
      case 'Mic': return Mic;
      case 'Bookmark': return Bookmark;
      default: return Sparkles;
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-24 text-left">
      {/* Profile Header Card */}
      <div className="relative rounded-3xl bg-[#14121C] border border-white/10 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#FF4D8D]/15 to-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-tr ${userProfile.avatarColor} text-white flex items-center justify-center text-3xl font-extrabold shadow-xl ring-4 ring-white/10`}>
              {userProfile.alias.charAt(0)}
              <span className="absolute -bottom-1 -right-1 p-1 bg-black/60 rounded-full border border-white/20">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {userProfile.alias}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">
                  Anonymous Citizen
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#8C86A0] max-w-md leading-relaxed">
                {userProfile.tagline}
              </p>
              <span className="text-[11px] text-[#8C86A0]/70 mt-1 block">
                Member of Heal Broadcast since {userProfile.joinedDate}
              </span>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Alias & Glow'}</span>
          </button>
        </div>

        {/* Edit Form Drawer */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-[#FF4D8D]" />
              Customize Your Anonymous Persona
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#E8E4F0] mb-1">
                  Anonymous Alias
                </label>
                <input
                  type="text"
                  required
                  value={aliasInput}
                  onChange={(e) => setAliasInput(e.target.value)}
                  className="w-full bg-[#1B1826] border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#FF4D8D]/60"
                  maxLength={32}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E8E4F0] mb-1">
                  Short Tagline
                </label>
                <input
                  type="text"
                  value={taglineInput}
                  onChange={(e) => setTaglineInput(e.target.value)}
                  className="w-full bg-[#1B1826] border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#FF4D8D]/60"
                  maxLength={90}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#E8E4F0] mb-2">
                Avatar Glow Gradient
              </label>
              <div className="flex items-center gap-3">
                {avatarGradients.map((grad, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAvatarColor(grad)}
                    className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${grad} transition-transform ${
                      avatarColor === grad ? 'scale-125 ring-2 ring-white' : 'opacity-80 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF4D8D] to-[#8B5CF6] text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Persona</span>
              </button>
            </div>
          </form>
        )}

        {savedSuccess && (
          <div className="mt-3 p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs text-center font-medium">
            ✨ Anonymous alias saved successfully!
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#1B1826] border border-white/6 flex flex-col gap-1">
          <div className="flex items-center justify-between text-[#8C86A0] text-xs">
            <span>Confessions</span>
            <Mic className="w-4 h-4 text-[#FF4D8D]" />
          </div>
          <span className="text-2xl font-extrabold text-white">
            {userProfile.stats.confessionsCount}
          </span>
          <span className="text-[10px] text-[#8C86A0]">Whispers shared</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#1B1826] border border-white/6 flex flex-col gap-1">
          <div className="flex items-center justify-between text-[#8C86A0] text-xs">
            <span>Hearts Given</span>
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400/20" />
          </div>
          <span className="text-2xl font-extrabold text-white">
            {userProfile.stats.heartsGiven}
          </span>
          <span className="text-[10px] text-[#8C86A0]">Resonances sent</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#1B1826] border border-white/6 flex flex-col gap-1">
          <div className="flex items-center justify-between text-[#8C86A0] text-xs">
            <span>Hours Listened</span>
            <Headphones className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-2xl font-extrabold text-white">
            {userProfile.stats.hoursListened}h
          </span>
          <span className="text-[10px] text-[#8C86A0]">Under the night air</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#1B1826] border border-white/6 flex flex-col gap-1">
          <div className="flex items-center justify-between text-[#8C86A0] text-xs">
            <span>Saved Stories</span>
            <Bookmark className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-2xl font-extrabold text-white">
            {userProfile.stats.savedCount}
          </span>
          <span className="text-[10px] text-[#8C86A0]">In your sanctuary</span>
        </div>
      </div>

      {/* Badges Section */}
      <div className="p-6 rounded-3xl bg-[#14121C] border border-white/10">
        <h2 className="text-base font-bold text-white mb-1 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FF4D8D]" />
          Listener Badges & Honor
        </h2>
        <p className="text-xs text-[#8C86A0] mb-4">
          Milestones unlocked during your midnight journeys on Heal Broadcast.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {userProfile.badges.map((b) => {
            const Icon = getBadgeIcon(b.icon);
            return (
              <div key={b.id} className="p-3.5 rounded-2xl bg-[#1B1826] border border-white/5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF4D8D]/15 text-[#FF4D8D] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{b.name}</h4>
                  <p className="text-[11px] text-[#8C86A0] leading-snug mt-0.5">{b.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confessions Posted By You */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            Your Posted Confessions ({myConfessions.length})
          </h2>
          <button
            onClick={() => setIsConfessionModalOpen(true)}
            className="text-xs text-[#FF4D8D] font-semibold hover:underline"
          >
            + Post another confession
          </button>
        </div>

        {myConfessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myConfessions.map((conf) => (
              <ConfessionCard key={conf.id} confession={conf} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center rounded-2xl bg-[#14121C] border border-white/6 flex flex-col items-center justify-center gap-2">
            <Mic className="w-8 h-8 text-[#8C86A0]/40" />
            <p className="text-xs text-[#8C86A0]">
              You haven't posted any confessions with this alias yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
