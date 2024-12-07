// Utility functions for managing local storage
export const STORAGE_KEYS = {
  LIKED_SONGS: 'liked_songs',
  PLAY_COUNTS: 'play_counts'
} as const;

export const getLikedSongs = (): string[] => {
  const liked = localStorage.getItem(STORAGE_KEYS.LIKED_SONGS);
  return liked ? JSON.parse(liked) : [];
};

export const toggleLikedSong = (songId: string): boolean => {
  const likedSongs = getLikedSongs();
  const isLiked = likedSongs.includes(songId);
  
  if (isLiked) {
    const updated = likedSongs.filter(id => id !== songId);
    localStorage.setItem(STORAGE_KEYS.LIKED_SONGS, JSON.stringify(updated));
    return false;
  } else {
    likedSongs.push(songId);
    localStorage.setItem(STORAGE_KEYS.LIKED_SONGS, JSON.stringify(likedSongs));
    return true;
  }
};

export const isLikedSong = (songId: string): boolean => {
  const likedSongs = getLikedSongs();
  return likedSongs.includes(songId);
};

export const getPlayCount = (songId: string): number => {
  const counts = localStorage.getItem(STORAGE_KEYS.PLAY_COUNTS);
  const playCounts = counts ? JSON.parse(counts) : {};
  return playCounts[songId] || 0;
};

export const incrementPlayCount = (songId: string): void => {
  const counts = localStorage.getItem(STORAGE_KEYS.PLAY_COUNTS);
  const playCounts = counts ? JSON.parse(counts) : {};
  playCounts[songId] = (playCounts[songId] || 0) + 1;
  localStorage.setItem(STORAGE_KEYS.PLAY_COUNTS, JSON.stringify(playCounts));
};