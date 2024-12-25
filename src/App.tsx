import React, { useEffect, useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { SongCard } from './components/Cards/SongCard';
import { PlayerBar } from './components/Player/PlayerBar';
import { WelcomeModal } from './components/Modal/WelcomeModal';
import { songs } from './data/songs';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useSidebar } from './hooks/useSidebar';

function App() {
  const {
    isPlaying,
    currentTime,
    currentSong,
    volume,
    handlePlayPause,
    handleSeek,
    handleVolumeChange,
    handleSongSelect,
    playSelectedSong
  } = useAudioPlayer();

  const { isOpen, toggleSidebar } = useSidebar();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [sharedSong, setSharedSong] = useState<typeof songs[0] | null>(null);

  // Handle shared song from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedSongId = params.get('song');
    
    if (sharedSongId) {
      const songToPlay = songs.find(song => song.id === sharedSongId);
      if (songToPlay) {
        setSharedSong(songToPlay);
        setShowWelcomeModal(true);
        handleSongSelect(songToPlay);
      }
      // Clean up URL without reloading the page
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleNext = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    handleSongSelect(songs[nextIndex]);
  };

  const handlePrevious = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    handleSongSelect(songs[previousIndex]);
  };

  return (
    <div className="flex h-screen bg-[#121212]">
      <Sidebar isOpen={isOpen} onToggle={toggleSidebar} />
      
      <main className="flex-1 overflow-auto p-8 pb-28">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white">Примеры наших работ</h1>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {songs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                isPlaying={isPlaying}
                isCurrentSong={song.id === currentSong?.id}
                onPlay={() => handleSongSelect(song)}
              />
            ))}
          </div>
        </div>
      </main>

      {currentSong && (
        <PlayerBar
          song={currentSong}
          isPlaying={isPlaying}
          currentTime={currentTime}
          volume={volume}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
        />
      )}

      {sharedSong && (
        <WelcomeModal
          isOpen={showWelcomeModal}
          onClose={() => setShowWelcomeModal(false)}
          song={sharedSong}
          onPlay={() => {
            playSelectedSong(sharedSong);
          }}
        />
      )}
    </div>
  );
}

export default App;