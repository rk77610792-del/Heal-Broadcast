import { Song } from '../types';
import { INITIAL_SONGS } from '../data/mockData';

interface ITunesTrack {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName?: string;
  artworkUrl100?: string;
  previewUrl?: string;
  trackTimeMillis?: number;
  primaryGenreName?: string;
  releaseDate?: string;
  trackViewUrl?: string;
}

interface ITunesSearchResponse {
  resultCount: number;
  results: ITunesTrack[];
}

/**
 * Searches songs from the global iTunes Search API (100% free, CORS-enabled, 100M+ real tracks with audio previews).
 * Gracefully merges with local curated tracks and handles offline/error states.
 */
export async function searchGlobalSongs(query: string): Promise<Song[]> {
  const cleanQuery = query.trim();
  if (!cleanQuery) return INITIAL_SONGS;

  // Search local songs first for instant matching
  const localMatches = INITIAL_SONGS.filter(s =>
    s.title.toLowerCase().includes(cleanQuery.toLowerCase()) ||
    s.artist.toLowerCase().includes(cleanQuery.toLowerCase()) ||
    (s.album && s.album.toLowerCase().includes(cleanQuery.toLowerCase())) ||
    s.genre.toLowerCase().includes(cleanQuery.toLowerCase())
  );

  try {
    const encoded = encodeURIComponent(cleanQuery);
    const url = `https://itunes.apple.com/search?term=${encoded}&entity=song&limit=25`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return localMatches.length > 0 ? localMatches : INITIAL_SONGS;
    }

    const data: ITunesSearchResponse = await response.json();
    if (!data.results || data.results.length === 0) {
      return localMatches;
    }

    const apiSongs: Song[] = data.results.map(track => {
      // High-resolution artwork replacement
      const highResArt = track.artworkUrl100
        ? track.artworkUrl100.replace('100x100bb', '600x600bb')
        : 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80';

      const durationSec = track.trackTimeMillis 
        ? Math.round(track.trackTimeMillis / 1000) 
        : 180;

      const mins = Math.floor(durationSec / 60);
      const secs = durationSec % 60;
      const durationStr = `${mins}:${secs.toString().padStart(2, '0')}`;

      const genre = track.primaryGenreName || 'Pop / Indie';
      const releaseYear = track.releaseDate ? track.releaseDate.substring(0, 4) : undefined;

      // Assign ambient audio theme based on genre
      let audioTheme: 'lofi' | 'ambient' | 'jazz' | 'rain' = 'lofi';
      const lowerGenre = genre.toLowerCase();
      if (lowerGenre.includes('jazz') || lowerGenre.includes('soul') || lowerGenre.includes('r&b')) {
        audioTheme = 'jazz';
      } else if (lowerGenre.includes('ambient') || lowerGenre.includes('classical') || lowerGenre.includes('electronic')) {
        audioTheme = 'ambient';
      } else if (lowerGenre.includes('acoustic') || lowerGenre.includes('folk')) {
        audioTheme = 'rain';
      }

      return {
        id: `itunes-${track.trackId}`,
        title: track.trackName,
        artist: track.artistName,
        album: track.collectionName || 'Single',
        coverImage: highResArt,
        duration: durationStr,
        durationSeconds: durationSec,
        genre: genre,
        mood: 'Nocturnal Resonance',
        audioTheme,
        audioUrl: track.previewUrl,
        previewUrl: track.previewUrl,
        externalUrl: track.trackViewUrl,
        releaseYear,
        plays: Math.floor(Math.random() * 800000) + 120000
      };
    });

    // Merge: unique by title + artist
    const seen = new Set<string>();
    const merged: Song[] = [];

    for (const song of [...localMatches, ...apiSongs]) {
      const key = `${song.title.toLowerCase()}___${song.artist.toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(song);
      }
    }

    return merged;
  } catch (err) {
    // Return local matches or default songs on network error/timeout
    return localMatches.length > 0 ? localMatches : INITIAL_SONGS;
  }
}
