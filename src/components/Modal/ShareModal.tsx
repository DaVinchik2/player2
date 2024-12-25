import React, { useState } from 'react';
import { Modal } from './Modal';
import { Copy, Check } from 'lucide-react';
import { Song } from '../../types/music';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, song }) => {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `${window.location.origin}/?song=${song.id}`;
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Поделиться">
      <div className="space-y-4">
        <p className="text-gray-300">
          Поделитесь этой песней с друзьями:
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 bg-[#383838] text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            {copied ? (
              <>
                <Check size={18} />
                <span>Скопировано</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                <span>Копировать</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};