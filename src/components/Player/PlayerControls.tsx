import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
}) => {
  return (
    <div className="flex items-center justify-center gap-6">
      <button
        onClick={onPrevious}
        className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <SkipBack size={24} />
      </button>
      
      <button
        onClick={onPlayPause}
        className="p-4 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      
      <button
        onClick={onNext}
        className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <SkipForward size={24} />
      </button>
      
      <div className="flex items-center gap-2 ml-6">
        <Volume2 size={20} className="text-gray-600" />
        <input
          type="range"
          min="0"
          max="100"
          className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};