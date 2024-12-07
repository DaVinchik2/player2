import React from 'react';
import { Play } from 'lucide-react';
import { Song } from '../../types/music';

interface PlaylistItemProps {
  song: Song;
  isActive: boolean;
  onPlay: () => void;
}

export const PlaylistItem: React.FC<PlaylistItemProps> = ({
  song,
  isActive,
  onPlay,
}) => {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer ${
        isActive ? 'bg-gray-50' : ''
      }`}
      onClick={onPlay}
    >
      <img
        src={song.coverUrl}
        alt={`${song.title} cover`}
        className="w-12 h-12 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className={`font-medium ${isActive ? 'text-indigo-600' : 'text-gray-900'}`}>
          {song.title}
        </h3>
        <p className="text-sm text-gray-600">{song.artist}</p>
      </div>
      <button
        className={`p-2 rounded-full ${
          isActive ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
        }`}
      >
        <Play size={16} />
      </button>
    </div>
  );
};