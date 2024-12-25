import React from 'react';
import { Modal } from './Modal';
import { Play } from 'lucide-react';
import { Song } from '../../types/music';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song;
  onPlay: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ 
  isOpen, 
  onClose, 
  song,
  onPlay
}) => {
  const handlePlay = () => {
    onPlay();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Воспроизвести трек">
      <div className="flex flex-col items-center space-y-6 py-4">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-48 h-48 rounded-lg object-cover shadow-lg"
        />
        
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-1">{song.title}</h3>
          <p className="text-gray-400">{song.artist}</p>
        </div>

        <button
          onClick={handlePlay}
          className="flex items-center justify-center gap-3 w-full max-w-xs px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors text-lg font-medium"
        >
          <Play size={24} fill="currentColor" />
          <span>Воспроизвести</span>
        </button>
      </div>
    </Modal>
  );
};