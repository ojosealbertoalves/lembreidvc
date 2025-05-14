// src/components/ui/AudioPlayer/AudioPlayer.jsx
import React from 'react';
import './AudioPlayer.css';

const AudioPlayer = ({ audioSrc }) => {
  return (
    <div className="audio-player">
      <audio controls src={audioSrc}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;