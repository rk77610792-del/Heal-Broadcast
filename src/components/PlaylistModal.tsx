import React, { useState } from 'react';
import { 
  X, 
  ListPlus, 
  Plus, 
  Check, 
  Music, 
  Sparkles, 
  FolderPlus 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PlaylistModal: React.FC = () => {
  const { 
    isPlaylistModalOpen, 
    setIsPlaylistModalOpen, 
    songForPlaylistModal, 
    playlists, 
    addSongToPlaylist, 
    createPlaylist 
  } = useApp();

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDesc, setNewPlaylistDesc] = useState('');
  const [addedPlaylistId, setAddedPlaylistId] = useState<string | null>(null);

  if (!isPlaylistModalOpen || !songForPlaylistModal) return null;

  const handleAddToPlaylist = (playlistId: string) => {
    addSongToPlaylist(playlistId, songForPlaylistModal.id);
    setAddedPlaylistId(playlistId);
    setTimeout(() => {
      setAddedPlaylistId(null);
      setIsPlaylistModalOpen(false);
    }, 1200);
  };

  const handleCreateAndAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    const created = createPlaylist(newPlaylistName, newPlaylistDesc);
    addSongToPlaylist(created.id, songForPlaylistModal.id);
    setAddedPlaylistId(created.id);
    setNewPlaylistName('');
    setNewPlaylistDesc('');
    setIsCreatingNew(false);

    setTimeout(() => {
      setAddedPlaylistId(null);
      setIsPlaylistModalOpen(false);
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#14121C] border border-white/10 rounded-3xl shadow-2xl p-6 text-left"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsPlaylistModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-[#8C86A0] hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF4D8D] to-[#8B5CF6] text-white flex items-center justify-center shadow-md">
            <ListPlus className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-white">
            Add to Playlist
          </h2>
        </div>

        {/* Song preview badge */}
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#1B1826] border border-white/5 mb-4">
          <img 
            src={songForPlaylistModal.coverImage} 
            alt={songForPlaylistModal.title}
            className="w-10 h-10 rounded-xl object-cover shrink-0" 
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white truncate">{songForPlaylistModal.title}</h4>
            <p className="text-[11px] text-[#8C86A0] truncate">{songForPlaylistModal.artist}</p>
          </div>
        </div>

        {/* Existing Playlists List */}
        <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1 mb-4 scrollbar-thin">
          {playlists.map((pl) => {
            const isAlreadyIn = pl.songIds.includes(songForPlaylistModal.id);
            const isJustAdded = addedPlaylistId === pl.id;

            return (
              <div 
                key={pl.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors"
              >
                <div className="min-w-0 pr-2">
                  <h5 className="text-xs font-semibold text-white truncate">{pl.name}</h5>
                  <span className="text-[10px] text-[#8C86A0]">{pl.songIds.length} tracks</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToPlaylist(pl.id)}
                  disabled={isAlreadyIn}
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                    isJustAdded
                      ? 'bg-emerald-500 text-white'
                      : isAlreadyIn
                        ? 'bg-white/10 text-[#8C86A0] cursor-default'
                        : 'bg-gradient-to-r from-[#FF4D8D] to-[#8B5CF6] text-white hover:scale-105 active:scale-95'
                  }`}
                >
                  {isJustAdded ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Added!</span>
                    </>
                  ) : isAlreadyIn ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>In Playlist</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Create New Playlist Toggle / Form */}
        {!isCreatingNew ? (
          <button
            type="button"
            onClick={() => setIsCreatingNew(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-colors"
          >
            <FolderPlus className="w-4 h-4 text-[#FF4D8D]" />
            <span>Create New Playlist</span>
          </button>
        ) : (
          <form onSubmit={handleCreateAndAdd} className="p-3 rounded-2xl bg-[#1B1826] border border-pink-500/30 flex flex-col gap-2.5 animate-pop-in">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF4D8D]" />
              New Playlist
            </span>

            <input
              type="text"
              required
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Playlist Title (e.g. 2 AM Stargazing)"
              className="w-full bg-[#14121C] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-[#8C86A0] focus:outline-none focus:border-[#FF4D8D]"
              maxLength={40}
            />

            <input
              type="text"
              value={newPlaylistDesc}
              onChange={(e) => setNewPlaylistDesc(e.target.value)}
              placeholder="Description (optional)"
              className="w-full bg-[#14121C] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-[#8C86A0] focus:outline-none focus:border-[#FF4D8D]"
              maxLength={70}
            />

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="px-3 py-1 rounded-lg text-xs text-[#8C86A0] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newPlaylistName.trim()}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#FF4D8D] to-[#8B5CF6] text-white text-xs font-bold shadow-md disabled:opacity-40"
              >
                Create & Add
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
