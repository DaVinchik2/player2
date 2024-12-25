import React, { useState } from 'react';
import { Play, Pause, Heart, Share2, AlertCircle } from 'lucide-react';
import { Song } from '../../types/music';
import { formatDuration, formatNumber } from '../../utils/format';
import { useSongStats } from '../../hooks/useSongStats';
import { ShareModal } from '../Modal/ShareModal';
import { AlertModal } from '../Modal/AlertModal';

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
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  return (
    <>
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
            <div className="absolute top-4 right-4 flex items-center gap-2">
              {song.alert && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAlertModal(true);
                  }}
                  className="p-2 rounded-full bg-black/20 backdrop-blur-sm text-red-500"
                >
                  <AlertCircle size={20} />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
                className={`p-2 rounded-full bg-black/20 backdrop-blur-sm ${
                  isLiked ? 'text-green-500' : 'text-white'
                }`}
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowShareModal(true);
                }}
                className="p-2 rounded-full bg-black/20 backdrop-blur-sm text-white"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{formatDuration(song.duration)}</span>
            {song.alert && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAlertModal(true);
                }}
                className="text-red-500 hover:text-red-400"
              >
                <AlertCircle size={16} />
              </button>
            )}
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

      <ShareModal 
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        song={song}
      />

      <AlertModal
        isOpen={showAlertModal}
        onClose={() => setShowAlertModal(false)}
      />
    </>
  );
};