import React, { useState } from 'react';
import { Modal } from './Modal';
import { genres } from '../../data/genres';
import { Copy, Check } from 'lucide-react';

interface GenresModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GenresModal: React.FC<GenresModalProps> = ({ isOpen, onClose }) => {
  const [copiedGenre, setCopiedGenre] = useState<string | null>(null);

  const handleCopyGenre = async (genre: string) => {
    try {
      await navigator.clipboard.writeText(genre);
      setCopiedGenre(genre);
      setTimeout(() => setCopiedGenre(null), 2000);
    } catch (err) {
      console.error('Failed to copy genre:', err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Стили и жанры">
      <div className="text-gray-300 space-y-6 max-h-[70vh] overflow-y-auto pr-2">
        {genres.map((category) => (
          <div key={category.name} className="space-y-2">
            <h3 className="text-white font-semibold text-lg">{category.name}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {category.items.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleCopyGenre(genre)}
                  className="flex items-center justify-between gap-2 p-2 text-sm bg-[#282828] hover:bg-[#383838] rounded-lg transition-colors text-left"
                >
                  <span className="truncate">{genre}</span>
                  {copiedGenre === genre ? (
                    <Check size={16} className="text-green-500 flex-shrink-0" />
                  ) : (
                    <Copy size={16} className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};