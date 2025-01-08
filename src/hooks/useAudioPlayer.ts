import { useState, useEffect, useRef } from 'react';
import { Song } from '../types/music';
import { incrementPlayCount } from '../utils/storage';
import { songs } from '../data/songs';

// Helper function to get a random song excluding the current one
const getRandomSong = (currentSongId: string | null): Song => {
  const highestId = Math.max(...songs.map(song => parseInt(song.id)));
  let nextSong: Song | null = null;

  do {
    const randomId = Math.floor(Math.random() * highestId) + 1;
    nextSong = songs.find(song => song.id === randomId.toString()) || null;
  } while (nextSong?.id === currentSongId || !nextSong);

  return nextSong;
};

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [volume, setVolume] = useState(1);
  const playStartTimeRef = useRef<number | null>(null);

  // Handle automatic song switching
  const handleSongEnd = () => {
    if (currentSong) {
      const nextSong = getRandomSong(currentSong.id);
      setCurrentSong(nextSong);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
    }

    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
        
        // Check for play count increment
        if (
          playStartTimeRef.current && 
          audio.currentTime - playStartTimeRef.current >= 5 &&
          currentSong
        ) {
          incrementPlayCount(currentSong.id);
          playStartTimeRef.current = null;
        }
      }
    };

    const handleEnded = () => {
      handleSongEnd();
    };

    const handlePlay = () => {
      playStartTimeRef.current = audio.currentTime;
      setIsPlaying(true);
    };

    const handlePause = () => {
      playStartTimeRef.current = null;
      setIsPlaying(false);
    };

    // Add event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      // Remove event listeners
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [currentSong]); // Add currentSong to dependencies

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.audioUrl;
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
  };

  const handleSongSelect = (song: Song) => {
    if (currentSong?.id === song.id) {
      handlePlayPause();
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const playSelectedSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  };

  return {
    isPlaying,
    currentTime,
    currentSong,
    volume,
    handlePlayPause,
    handleSeek,
    handleVolumeChange,
    handleSongSelect,
    playSelectedSong
  };
};