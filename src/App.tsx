import React from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { SongCard } from './components/Cards/SongCard';
import { PlayerBar } from './components/Player/PlayerBar';
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
    handleSongSelect
  } = useAudioPlayer();

  const { isOpen, toggleSidebar } = useSidebar();

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
    </div>
  );
}

export default App;