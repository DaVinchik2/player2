import { useState, useEffect, useRef } from 'react';
import { Song } from '../types/music';
import { incrementPlayCount } from '../utils/storage';

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [volume, setVolume] = useState(1);
  const playStartTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
      
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
          
          if (
            playStartTimeRef.current && 
            audioRef.current.currentTime - playStartTimeRef.current >= 5 &&
            currentSong
          ) {
            incrementPlayCount(currentSong.id);
            playStartTimeRef.current = null;
          }
        }
      });

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
        playStartTimeRef.current = null;
      });

      audioRef.current.addEventListener('play', () => {
        playStartTimeRef.current = audioRef.current?.currentTime || 0;
      });

      audioRef.current.addEventListener('pause', () => {
        playStartTimeRef.current = null;
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.play().catch(() => setIsPlaying(false));
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