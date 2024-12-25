import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle } from 'lucide-react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Внимание">
      <div className="flex flex-col items-center gap-4 text-center">
        <AlertTriangle className="w-12 h-12 text-yellow-500" />
        <p className="text-gray-300">
          Есть вероятность с проблемой воспроизведения данного трека. Если у вас наблюдаются проблемы с воспроизведением, воспользуйтесь VPN
        </p>
      </div>
    </Modal>
  );
};