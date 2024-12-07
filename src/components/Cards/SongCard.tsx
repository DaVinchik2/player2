import React from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { Song } from '../../types/music';
import { formatDuration, formatNumber } from '../../utils/format';
import { useSongStats } from '../../hooks/useSongStats';

interface SongCardProps {
  song: Song;
  isPlaying?: boolean;
  isCurrentSong?: boolean;
  onPlay: () => void;
}

export const SongCard: React.FC<SongCardProps> = ({ 
  song, 
  isPlaying = false,
  isCurrentSong = false,
  onPlay 
}) => {
  const { isLiked, totalPlays, totalLikes, handleLike } = useSongStats(song);

  return (
    <div 
      className="relative group cursor-pointer"
      onClick={onPlay}
    >
      <div className="aspect-square overflow-hidden rounded-lg">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            className={`absolute top-4 right-4 p-2 rounded-full ${
              isLiked ? 'text-green-500' : 'text-white'
            }`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
      
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">{formatDuration(song.duration)}</span>
        </div>
        <h3 className={`font-medium truncate ${isCurrentSong ? 'text-green-500' : 'text-white'}`}>
          {song.title}
        </h3>
        <p className="text-sm text-gray-400">{song.genre}</p>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Play size={14} />
            <span>{formatNumber(totalPlays)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={14} />
            <span>{formatNumber(totalLikes)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};