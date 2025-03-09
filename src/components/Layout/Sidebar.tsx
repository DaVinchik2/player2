import React from 'react';
import { Home, Library, MessageCircle, Menu, ChevronLeft, Music2 } from 'lucide-react';
import { Modal } from '../Modal/Modal';
import { GenresModal } from '../Modal/GenresModal';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isGenresModalOpen, setIsGenresModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-black/50 text-white md:hidden flex items-center gap-2"
      >
        {isOpen ? null : (
          <>
            <Menu size={24} />
            <span className="text-sm font-medium">Открыть меню</span>
          </>
        )}
      </button>

      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-black transform transition-transform duration-300 ease-in-out md:relative ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-6 flex flex-col h-full">
          {isOpen && (
            <button
              onClick={onToggle}
              className="absolute top-4 right-4 p-2 rounded-lg bg-gray-800 text-white md:hidden flex items-center gap-2"
            >
              <ChevronLeft size={20} />
              <span className="text-sm font-medium">Закрыть</span>
            </button>
          )}

          <a href="/" className="flex items-center gap-2 mb-12 mt-12 md:mt-0">
            <span className="text-2xl font-bold text-white">MusCreator</span>
          </a>

          <nav className="flex-1">
            <div className="space-y-2">
              <a href="/" className="flex items-center gap-3 text-gray-400 hover:text-white py-2">
                <Home size={20} />
                <span>Главная</span>
              </a>
              <button 
                onClick={() => setIsInfoModalOpen(true)}
                className="w-full flex items-center gap-3 text-gray-400 hover:text-white py-2 whitespace-nowrap"
              >
                <Library size={20} />
                <span>Информация для заказа</span>
              </button>
              <button 
                onClick={() => setIsGenresModalOpen(true)}
                className="w-full flex items-center gap-3 text-gray-400 hover:text-white py-2"
              >
                <Music2 size={20} />
                <span>Стили и жанры</span>
              </button>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="w-full flex items-center gap-3 text-gray-400 hover:text-white py-2"
              >
                <MessageCircle size={20} />
                <span>Связаться</span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      <Modal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title="Информация для заказа"
      >
        <div className="text-gray-300 space-y-4">
          <p>
            Мы предлагаем уникальную возможность создания эксклюзивной музыки только для Вас.
          </p>
          <div className="space-y-2">
            <h3 className="text-white font-semibold">Как это работает:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Выберите желаемый жанр и стиль музыки</li>
              <li>Опишите настроение и атмосферу трека</li>
              <li>Укажите референсы или примеры похожих композиций</li>
              <li>Получите готовый трек в оговоренное время</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-white font-semibold">Стоимость:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Работа "под ключ" - мы пишем и стих и музыку: 5000 рублей</li>
              <li>Оживить Ваш стих - вы даете текст, а мы пишем музыку: 3000 рублей</li>
              <li>Музыка для вашего проекта - музыка без авторского права: 8000 рублей</li>
            </ul>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Связаться с нами"
      >
        <div className="text-gray-300 space-y-4">
          <p className="text-center">
            Вы можете связаться с нами через телеграм:
          </p>
          <div className="flex justify-center">
            <a
              href="https://t.me/San4os_Alehander"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0088cc] hover:bg-[#0099dd] text-white rounded-lg transition-colors text-lg font-medium w-full max-w-md"
            >
              <MessageCircle size={24} />
              @MusCreator
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-4 text-center">
            Мы обычно отвечаем в течение нескольких часов. Будем рады помочь вам с созданием уникальной музыки!
          </p>
        </div>
      </Modal>

      <GenresModal 
        isOpen={isGenresModalOpen}
        onClose={() => setIsGenresModalOpen(false)}
      />
    </>
  );
};