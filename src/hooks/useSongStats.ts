import { useState, useEffect } from 'react';
import { Song } from '../types/music';
import { 
  isLikedSong, 
  toggleLikedSong, 
  getPlayCount, 
  incrementPlayCount 
} from '../utils/storage';

export const useSongStats = (song: Song) => {
  const [isLiked, setIsLiked] = useState(false);
  const [localPlays, setLocalPlays] = useState(0);

  useEffect(() => {
    setIsLiked(isLikedSong(song.id));
    setLocalPlays(getPlayCount(song.id));
  }, [song.id]);

  const handleLike = () => {
    const newLikedState = toggleLikedSong(song.id);
    setIsLiked(newLikedState);
  };

  const handlePlay = () => {
    incrementPlayCount(song.id);
    setLocalPlays(getPlayCount(song.id));
  };

  const totalPlays = song.plays + localPlays;
  const totalLikes = song.likes + (isLiked ? 1 : 0);

  return {
    isLiked,
    totalPlays,
    totalLikes,
    handleLike,
    handlePlay
  };
};