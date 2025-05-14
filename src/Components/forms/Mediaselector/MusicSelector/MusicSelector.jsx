import React, { useState, useEffect, useRef } from 'react';
import musicLibrary from '../../../data/musicLibrary';
import './Musicselectorstyle.css';

const MusicSelector = ({ onSelectMusic }) => {
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // Funções de atualização extraídas para reutilização
  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const updateDuration = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  useEffect(() => {
    const currentAudio = audioRef.current;
    
    return () => {
      // Limpeza quando o componente é desmontado
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.removeEventListener('timeupdate', updateTime);
        currentAudio.removeEventListener('loadedmetadata', updateDuration);
      }
    };
  }, []);

  useEffect(() => {
    const currentAudio = audioRef.current;
    if (!currentAudio) return;

    currentAudio.addEventListener('timeupdate', updateTime);
    currentAudio.addEventListener('loadedmetadata', updateDuration);
    
    return () => {
      currentAudio.removeEventListener('timeupdate', updateTime);
      currentAudio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [selectedMusic]);

  const handleMusicSelect = (music) => {
    // Pausar e limpar o áudio atual
    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.removeEventListener('timeupdate', updateTime);
      currentAudio.removeEventListener('loadedmetadata', updateDuration);
    }

    setSelectedMusic(music);
    onSelectMusic(music);
    setIsPlaying(false);
    setIsOpen(false);
    setCurrentTime(0);

    const newAudio = new Audio(music.path);
    audioRef.current = newAudio;
    
    newAudio.addEventListener('loadedmetadata', updateDuration);
    newAudio.addEventListener('timeupdate', updateTime);
  };

  const togglePlayPause = () => {
    const currentAudio = audioRef.current;
    if (!selectedMusic || !currentAudio) return;

    if (isPlaying) {
      currentAudio.pause();
    } else {
      currentAudio.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time) => {
    const currentAudio = audioRef.current;
    if (!currentAudio) return;
    
    currentAudio.currentTime = time;
    setCurrentTime(time);
  };

  const skipForward = () => {
    const currentAudio = audioRef.current;
    if (!currentAudio) return;
    
    currentAudio.currentTime = Math.min(
      currentAudio.currentTime + 10,
      currentAudio.duration
    );
  };

  const skipBackward = () => {
    const currentAudio = audioRef.current;
    if (!currentAudio) return;
    
    currentAudio.currentTime = Math.max(
      currentAudio.currentTime - 10,
      0
    );
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="music-selector-container">
      <h4>Select Background Music</h4>
      
      {/* Dropdown para seleção de música */}
      <div className="music-dropdown">
        <div 
          className="dropdown-header"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedMusic ? selectedMusic.title : "Select a song"}
          <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </div>
        
        {isOpen && (
          <div className="dropdown-options">
            {musicLibrary.map((music) => (
              <div
                key={music.id}
                className={`dropdown-option ${selectedMusic?.id === music.id ? 'selected' : ''}`}
                onClick={() => handleMusicSelect(music)}
              >
                {music.title} - {music.artist}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Player de música estilizado */}
      {selectedMusic && (
        <div className="music-player">
          <div className="player-info">
            <img 
              src={selectedMusic.cover} 
              alt={`${selectedMusic.title} cover`} 
              className="album-cover"
            />
            <div className="track-info">
              <h5>{selectedMusic.title}</h5>
              <p>{selectedMusic.artist}</p>
              <span className="duration">{selectedMusic.duration}</span>
            </div>
          </div>
          
          <div className="player-controls">
            <div className="control-buttons">
              <button 
                className="skip-button"
                onClick={skipBackward}
                title="Skip Backward 10s"
              >
                ⏪
              </button>
              <button 
                className={`play-button ${isPlaying ? 'playing' : ''}`}
                onClick={togglePlayPause}
              >
                {isPlaying ? '❚❚' : '▶'}
              </button>
              <button 
                className="skip-button"
                onClick={skipForward}
                title="Skip Forward 10s"
              >
                ⏩
              </button>
            </div>
            
            <div className="progress-container">
              <span className="time-display">{formatTime(currentTime)}</span>
              <div 
                className="progress-bar"
                onClick={(e) => {
                  const rect = e.target.getBoundingClientRect();
                  const seekTime = (e.clientX - rect.left) / rect.width * duration;
                  handleSeek(seekTime);
                }}
              >
                <div 
                  className="progress" 
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
              <span className="time-display">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicSelector;