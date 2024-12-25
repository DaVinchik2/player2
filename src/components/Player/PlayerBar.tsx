import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Volume1, VolumeX, Share2 } from 'lucide-react';
import { Song } from '../../types/music';
import { formatDuration } from '../../utils/format';
import { useSongStats } from '../../hooks/useSongStats';
import { ShareModal } from '../Modal/ShareModal';

interface PlayerBarProps {
  song: Song;
  isPlaying: boolean;
  currentTime: number;
  volume?: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onVolumeChange?: (volume: number) => void;
}

export const PlayerBar: React.FC<PlayerBarProps> = ({
  song,
  isPlaying,
  currentTime,
  volume = 1,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange
}) => {
  const { isLiked, handleLike } = useSongStats(song);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] px-4 md:pl-64">
        {/* Desktop Version */}
        <div className="hidden md:flex max-w-screen-2xl mx-auto h-20 items-center justify-between">
          <div className="flex items-center gap-4 w-[30%]">
            <img
              src={song.coverUrl}
              alt={song.title}
              className="w-14 h-14 rounded object-cover"
            />
            <div>
              <h4 className="text-white font-medium">{song.title}</h4>
              <p className="text-sm text-gray-400">{song.artist}</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                className={`text-gray-400 hover:text-white transition-colors ${isLiked ? 'text-green-500' : ''}`}
                onClick={handleLike}
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowShareModal(true)}
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center w-[40%]">
            <div className="flex items-center gap-6 mb-2">
              <button
                onClick={onPrevious}
                className="text-gray-400 hover:text-white"
              >
                <SkipBack size={20} />
              </button>
              <button
                onClick={onPlayPause}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
              </button>
              <button
                onClick={onNext}
                className="text-gray-400 hover:text-white"
              >
                <SkipForward size={20} />
              </button>
            </div>
            
            <div className="flex items-center gap-2 w-full">
              <span className="text-xs text-gray-400 min-w-[40px]">
                {formatDuration(currentTime)}
              </span>
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max={song.duration}
                  value={currentTime}
                  onChange={(e) => onSeek(Number(e.target.value))}
                  className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
              </div>
              <span className="text-xs text-gray-400 min-w-[40px]">
                {formatDuration(song.duration)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 w-[30%]">
            <button
              onClick={() => setShowVolumeControl(!showVolumeControl)}
              className="text-gray-400 hover:text-white"
            >
              <VolumeIcon />
            </button>
            <div className="w-24">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => onVolumeChange?.(Number(e.target.value))}
                className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Mobile Version */}
        <div className="md:hidden flex flex-col py-2">
          <div className="flex items-center justify-between px-2 mb-2">
            <div className="flex-1">
              <h4 className="text-white font-medium text-sm truncate">{song.title}</h4>
              <p className="text-xs text-gray-400 truncate">{song.artist}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                className={`text-gray-400 hover:text-white transition-colors ${isLiked ? 'text-green-500' : ''}`}
                onClick={handleLike}
              >
                <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowShareModal(true)}
              >
                <Share2 size={18} />
              </button>
              <button
                onClick={() => setShowVolumeControl(!showVolumeControl)}
                className="text-gray-400 hover:text-white"
              >
                <VolumeIcon />
              </button>
            </div>
          </div>

          {showVolumeControl && (
            <div className="px-4 py-2 flex items-center gap-2">
              <VolumeX size={16} className="text-gray-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => onVolumeChange?.(Number(e.target.value))}
                className="flex-1 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
              <Volume2 size={16} className="text-gray-400" />
            </div>
          )}

          <div className="flex items-center justify-center gap-4 mb-2">
            <button
              onClick={onPrevious}
              className="text-gray-400 hover:text-white p-2"
            >
              <SkipBack size={22} />
            </button>
            <button
              onClick={onPlayPause}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
            </button>
            <button
              onClick={onNext}
              className="text-gray-400 hover:text-white p-2"
            >
              <SkipForward size={22} />
            </button>
          </div>

          <div className="flex items-center gap-2 px-2">
            <span className="text-xs text-gray-400 min-w-[35px]">
              {formatDuration(currentTime)}
            </span>
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max={song.duration}
                value={currentTime}
                onChange={(e) => onSeek(Number(e.target.value))}
                className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>
            <span className="text-xs text-gray-400 min-w-[35px]">
              {formatDuration(song.duration)}
            </span>
          </div>
        </div>
      </div>

      <ShareModal 
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        song={song}
      />
    </>
  );
};