import React from 'react';
import { Song } from '../../types/music';

interface NowPlayingProps {
  song: Song;
}

export const NowPlaying: React.FC<NowPlayingProps> = ({ song }) => {
  return (
    <div className="flex items-center gap-4">
      <img
        src={song.coverUrl}
        alt={`${song.title} cover`}
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div>
        <h3 className="font-semibold text-gray-900">{song.title}</h3>
        <p className="text-sm text-gray-600">{song.artist}</p>
      </div>
    </div>
  );
};