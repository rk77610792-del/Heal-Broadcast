import React, { useState, useEffect } from 'react';
import { 
  Music, 
  Search, 
  Play, 
  Pause, 
  Plus, 
  ListPlus, 
  Sparkles, 
  Heart, 
  Disc, 
  Trash2, 
  ArrowLeft,
  Volume2,
  FolderPlus,
  Radio,
  SlidersHorizontal,
  Loader2,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SongCard } from '../components/SongCard';
import { Song, Playlist } from '../types';
import { searchGlobalSongs } from '../services/musicApi';

export const MusicPage: React.FC = () => {
  const { 
    songs, 
    playlists, 
    playSong, 
    playPlaylist, 
    activeSong, 
    activePlaylist, 
    isPlaying, 
    activeMediaType, 
    createPlaylist, 
    removeSongFromPlaylist, 
    addNewCustomSong, 
    openAddToPlaylistModal 
  } = useApp();

  const [musicSearch, setMusicSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  // Global iTunes & Night Vault search state
  const [globalSearchResults, setGlobalSearchResults] = useState<Song[]>([]);
  const [isSearchingGlobal, setIsSearchingGlobal] = useState(false);

  // New Playlist form state
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [newPlTitle, setNewPlTitle] = useState('');
  const [newPlDesc, setNewPlDesc] = useState('');

  // Add Custom Song state (when searching any song)
  const [isAddingCustomSong, setIsAddingCustomSong] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customArtist, setCustomArtist] = useState('');

  const genres = ['All', 'Dream Pop', 'Indie Folk', 'R&B', 'Jazz', 'Lo-Fi', 'Acoustic'];

  // Filter local songs by search and genre
  const filteredLocalSongs = songs.filter((s) => {
    const matchesSearch = !musicSearch ||
      s.title.toLowerCase().includes(musicSearch.toLowerCase()) ||
      s.artist.toLowerCase().includes(musicSearch.toLowerCase()) ||
      s.genre.toLowerCase().includes(musicSearch.toLowerCase()) ||
      (s.mood && s.mood.toLowerCase().includes(musicSearch.toLowerCase()));

    const matchesGenre = selectedGenre === 'All' || s.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    return matchesSearch && matchesGenre;
  });

  // Debounced global search for any song via iTunes Search API
  useEffect(() => {
    const query = musicSearch.trim();
    if (!query) {
      setGlobalSearchResults([]);
      setIsSearchingGlobal(false);
      return;
    }

    setIsSearchingGlobal(true);
    const timeoutId = setTimeout(async () => {
      try {
        const results = await searchGlobalSongs(query);
        setGlobalSearchResults(results);
      } catch {
        setGlobalSearchResults([]);
      } finally {
        setIsSearchingGlobal(false);
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [musicSearch]);

  const displaySongs = musicSearch.trim()
    ? (globalSearchResults.length > 0 ? globalSearchResults : filteredLocalSongs)
    : filteredLocalSongs;

  const handleCreatePlaylistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlTitle.trim()) return;
    const pl = createPlaylist(newPlTitle, newPlDesc);
    setNewPlTitle('');
    setNewPlDesc('');
    setIsCreatingPlaylist(false);
    setSelectedPlaylist(pl);
  };

  const handleAddCustomSongSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !customArtist.trim()) return;

    addNewCustomSong({
      title: customTitle.trim(),
      artist: customArtist.trim(),
      genre: 'Custom Night Track',
      mood: 'Personal Resonance',
    });

    setCustomTitle('');
    setCustomArtist('');
    setIsAddingCustomSong(false);
  };

  // If a playlist is selected, render the playlist detail view
  if (selectedPlaylist) {
    const playlistSongs = selectedPlaylist.songIds
      .map(id => songs.find(s => s.id === id))
      .filter(Boolean) as Song[];

    const isCurrentPlaylistPlaying = activePlaylist?.id === selectedPlaylist.id && isPlaying;

    return (
      <div className="flex flex-col gap-6 pb-24 text-left">
        {/* Back Button */}
        <button
          onClick={() => setSelectedPlaylist(null)}
          className="flex items-center gap-2 text-xs font-semibold text-[#8C86A0] hover:text-white transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Music & Playlists</span>
        </button>

        {/* Playlist Header Banner */}
        <div className={`relative rounded-3xl bg-gradient-to-r ${selectedPlaylist.colorGradient} border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden shadow-2xl`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative z-10">
            <img 
              src={selectedPlaylist.coverImage} 
              alt={selectedPlaylist.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-2xl ring-2 ring-white/10 shrink-0" 
            />

            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-pink-300">
                PLAYLIST
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 mb-2">
                {selectedPlaylist.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#E8E4F0]/80 leading-relaxed max-w-lg mb-2">
                {selectedPlaylist.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-[#8C86A0]">
                <span>Curated by <strong className="text-white">{selectedPlaylist.createdBy}</strong></span>
                <span>•</span>
                <span>{playlistSongs.length} songs</span>
              </div>
            </div>
          </div>

          {/* Play All Button */}
          <div className="flex items-center gap-3 relative z-10 shrink-0">
            <button
              onClick={() => playPlaylist(selectedPlaylist)}
              disabled={playlistSongs.length === 0}
              className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF4D8D] to-[#8B5CF6] text-white font-bold text-xs sm:text-sm shadow-xl glow-pink-md hover:scale-105 active:scale-95 disabled:opacity-40 transition-all cursor-pointer"
            >
              {isCurrentPlaylistPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Pause Playlist</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                  <span>Play All Tracks</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Playlist Songs Table */}
        <div className="rounded-2xl bg-[#14121C] border border-white/6 overflow-hidden">
          <div className="p-4 border-b border-white/6 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Disc className="w-4 h-4 text-[#FF4D8D]" />
              Tracklist ({playlistSongs.length})
            </h3>
          </div>

          {playlistSongs.length > 0 ? (
            <div className="divide-y divide-white/5">
              {playlistSongs.map((song, index) => {
                const isThisPlaying = activeMediaType === 'song' && activeSong?.id === song.id && isPlaying;
                return (
                  <div 
                    key={song.id}
                    className={`flex items-center justify-between p-3.5 hover:bg-white/[0.03] transition-colors ${
                      isThisPlaying ? 'bg-pink-500/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <span className="text-xs text-[#8C86A0] font-mono w-5 text-right">
                        {index + 1}
                      </span>

                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        <img src={song.coverImage} alt={song.title} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => playSong(song, selectedPlaylist)}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
                        >
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </button>
                      </div>

                      <div className="min-w-0">
                        <h4 className={`text-xs sm:text-sm font-bold truncate ${isThisPlaying ? 'text-[#FF4D8D]' : 'text-white'}`}>
                          {song.title}
                        </h4>
                        <p className="text-[11px] text-[#8C86A0] truncate">
                          {song.artist} • {song.genre}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-xs text-[#8C86A0] font-mono">
                        {song.duration}
                      </span>

                      <button
                        type="button"
                        onClick={() => playSong(song, selectedPlaylist)}
                        className={`p-2 rounded-full transition-all ${
                          isThisPlaying ? 'bg-[#FF4D8D] text-white' : 'bg-white/5 text-[#8C86A0] hover:text-white'
                        }`}
                        title={isThisPlaying ? 'Playing' : 'Play song'}
                      >
                        {isThisPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                      </button>

                      {/* Remove from playlist if custom */}
                      <button
                        type="button"
                        onClick={() => removeSongFromPlaylist(selectedPlaylist.id, song.id)}
                        className="p-2 text-[#8C86A0] hover:text-rose-400 transition-colors"
                        title="Remove from playlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-[#8C86A0] flex flex-col items-center gap-2">
              <Music className="w-8 h-8 text-[#8C86A0]/40" />
              <span>This playlist is currently empty.</span>
              <button
                onClick={() => setSelectedPlaylist(null)}
                className="text-xs text-[#FF4D8D] font-bold hover:underline"
              >
                Browse songs to add to this playlist
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-24 text-left">
      {/* Top Banner & Search */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#1B1826] via-[#241731] to-[#1B1826] border border-white/10 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="max-w-2xl relative z-10">
          <div className="flex items-center gap-2 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Music className="w-4 h-4 text-[#FF4D8D]" />
            <span>Search & Play Any Song</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Songs, Playlists & Midnight Soundtracks
          </h1>
          <p className="text-xs sm:text-sm text-[#8C86A0] leading-relaxed mb-5">
            Search for any song title or artist in our night vault, play it with in-browser lofi synthesis, or create your own custom playlists.
          </p>

          {/* Search Input Bar */}
          <div className="relative w-full max-w-xl">
            <Search className="w-4 h-4 text-[#FF4D8D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={musicSearch}
              onChange={(e) => setMusicSearch(e.target.value)}
              placeholder="Search by song name, artist, genre (e.g. Cigarettes After Sex, Laufey, Frank Ocean)..."
              className="w-full pl-10 pr-24 py-3 rounded-2xl bg-[#14121C] border border-white/15 text-xs sm:text-sm text-white placeholder-[#8C86A0] focus:outline-none focus:border-[#FF4D8D] focus:ring-1 focus:ring-[#FF4D8D]/30 shadow-lg"
            />
            {musicSearch && (
              <button
                type="button"
                onClick={() => setMusicSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white hover:bg-white/20"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CURATED & CUSTOM PLAYLISTS SECTION */}
      <section aria-label="Playlists" className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListPlus className="w-5 h-5 text-[#FF4D8D]" />
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Curated & Custom Playlists
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsCreatingPlaylist(!isCreatingPlaylist)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-semibold transition-all cursor-pointer"
          >
            <FolderPlus className="w-3.5 h-3.5 text-[#FF4D8D]" />
            <span>Create Playlist</span>
          </button>
        </div>

        {/* Form to create new playlist */}
        {isCreatingPlaylist && (
          <form onSubmit={handleCreatePlaylistSubmit} className="p-4 rounded-2xl bg-[#14121C] border border-pink-500/30 flex flex-col sm:flex-row items-center gap-3 animate-pop-in">
            <input
              type="text"
              required
              value={newPlTitle}
              onChange={(e) => setNewPlTitle(e.target.value)}
              placeholder="Playlist Title (e.g. Stargazing at 2 AM)"
              className="w-full sm:w-1/3 bg-[#1B1826] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-[#8C86A0] focus:outline-none focus:border-[#FF4D8D]"
              maxLength={40}
            />
            <input
              type="text"
              value={newPlDesc}
              onChange={(e) => setNewPlDesc(e.target.value)}
              placeholder="Short Description (e.g. Atmospheric chords for late nights)"
              className="w-full sm:flex-1 bg-[#1B1826] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-[#8C86A0] focus:outline-none focus:border-[#FF4D8D]"
              maxLength={80}
            />
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsCreatingPlaylist(false)}
                className="px-3 py-2 rounded-xl text-xs text-[#8C86A0] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newPlTitle.trim()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF4D8D] to-[#8B5CF6] text-white text-xs font-bold shadow-md disabled:opacity-40"
              >
                Create
              </button>
            </div>
          </form>
        )}

        {/* Playlists Horizontal Slider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {playlists.map((pl) => (
            <div
              key={pl.id}
              onClick={() => setSelectedPlaylist(pl)}
              className="group cursor-pointer rounded-2xl bg-[#1B1826] border border-white/6 p-4 flex flex-col justify-between gap-3 hover:border-[#FF4D8D]/40 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/40">
                <img 
                  src={pl.coverImage} 
                  alt={pl.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playPlaylist(pl);
                  }}
                  className="absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full bg-[#FF4D8D] text-white flex items-center justify-center shadow-lg opacity-90 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all"
                  title="Play entire playlist"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-pink-300 transition-colors">
                  {pl.name}
                </h4>
                <p className="text-[11px] text-[#8C86A0] line-clamp-2 mt-0.5 leading-snug">
                  {pl.description}
                </p>
                <span className="text-[10px] text-pink-300/80 font-mono mt-1.5 block">
                  {pl.songIds.length} tracks
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ALL SONGS & LIVE SEARCH RESULTS */}
      <section aria-label="Songs Catalog" className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Disc className="w-5 h-5 text-[#FF4D8D]" />
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {musicSearch ? `Results for "${musicSearch}"` : 'All Tracks & Midnight Records'} ({displaySongs.length})
            </h2>
            {isSearchingGlobal && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-[11px] text-pink-300">
                <Loader2 className="w-3 h-3 animate-spin text-[#FF4D8D]" />
                <span>Searching Worldwide...</span>
              </span>
            )}
            {musicSearch && !isSearchingGlobal && globalSearchResults.length > 0 && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-[10px] text-purple-300">
                <Globe className="w-3 h-3" />
                <span>Global Catalog</span>
              </span>
            )}
          </div>

          {/* Quick Custom Song Adder if searching */}
          <button
            type="button"
            onClick={() => setIsAddingCustomSong(!isAddingCustomSong)}
            className="text-xs font-semibold text-[#FF4D8D] hover:underline flex items-center gap-1 w-fit cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Cannot find your song? Add & play any track</span>
          </button>
        </div>

        {/* Add custom song drawer */}
        {isAddingCustomSong && (
          <form onSubmit={handleAddCustomSongSubmit} className="p-4 rounded-2xl bg-[#14121C] border border-pink-500/30 flex flex-col sm:flex-row items-center gap-3 animate-pop-in">
            <input
              type="text"
              required
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Song Title (e.g. As It Was)"
              className="w-full sm:w-1/3 bg-[#1B1826] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-[#8C86A0] focus:outline-none focus:border-[#FF4D8D]"
              maxLength={40}
            />
            <input
              type="text"
              required
              value={customArtist}
              onChange={(e) => setCustomArtist(e.target.value)}
              placeholder="Artist Name (e.g. Harry Styles)"
              className="w-full sm:w-1/3 bg-[#1B1826] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-[#8C86A0] focus:outline-none focus:border-[#FF4D8D]"
              maxLength={40}
            />
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsAddingCustomSong(false)}
                className="px-3 py-2 rounded-xl text-xs text-[#8C86A0] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!customTitle.trim() || !customArtist.trim()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF4D8D] to-[#8B5CF6] text-white text-xs font-bold shadow-md disabled:opacity-40 cursor-pointer"
              >
                Play & Save
              </button>
            </div>
          </form>
        )}

        {/* Genre Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none bg-[#14121C] p-3 rounded-2xl border border-white/6">
          {genres.map((g) => {
            const isSelected = selectedGenre === g;
            return (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#FF4D8D] to-[#8B5CF6] text-white shadow-sm glow-pink-sm'
                    : 'bg-white/[0.03] text-[#8C86A0] hover:text-white hover:bg-white/5'
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>

        {/* Song Cards Grid */}
        {displaySongs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displaySongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl bg-[#14121C] border border-white/6 flex flex-col items-center justify-center gap-3">
            <Music className="w-10 h-10 text-[#8C86A0]/40" />
            <h3 className="text-base font-semibold text-white">
              No songs matched "{musicSearch}"
            </h3>
            <p className="text-xs text-[#8C86A0]">
              You can instantly add this song to the player and your playlists!
            </p>
            <button
              onClick={() => {
                setCustomTitle(musicSearch);
                setIsAddingCustomSong(true);
              }}
              className="mt-1 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF4D8D] to-[#8B5CF6] text-white text-xs font-bold cursor-pointer"
            >
              Add "{musicSearch}" as Custom Song
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
