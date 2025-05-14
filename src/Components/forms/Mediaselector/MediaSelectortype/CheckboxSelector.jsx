import React from 'react';
import MusicSelector from '../MusicSelector/MusicSelector';
import PhotoUploader from '../Photouploader/PhotoUploader';
import './CheckboxSelector.css';

/**
 * Media selection component with checkboxes and file uploads
 * @param {Object} props - Component props
 * @param {Object} props.mediaState - Current media state
 * @param {Function} props.onMediaChange - Handler for state changes
 * @returns {JSX.Element} Media selection interface
 */
const CheckboxSelector = ({ mediaState, onMediaChange }) => {
  const { selectedOptions, photos, video, selectedMusic } = mediaState;

  const options = [
    { id: 'photos', label: 'Photos (3 max)', description: 'Upload up to 3 images' },
    { id: 'video', label: 'Video (max 15MB)', description: 'Upload a short video' },
    { id: 'music', label: 'Background music', description: 'Select from your library' }
  ];

  const handleOptionChange = (optionId) => {
    const newOptions = {
      ...selectedOptions,
      [optionId]: !selectedOptions[optionId]
    };
    onMediaChange({ 
      ...mediaState, 
      selectedOptions: newOptions 
    });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('Video file too large (max 15MB)');
      return;
    }
    onMediaChange({ 
      ...mediaState, 
      video: file 
    });
  };

  const handlePhotosChange = (newPhotos) => {
    onMediaChange({
      ...mediaState,
      photos: newPhotos
    });
  };

  const handleMusicSelect = (music) => {
    onMediaChange({
      ...mediaState,
      selectedMusic: music
    });
  };

  return (
    <div className="checkbox-selector">
      <h3>Select Media Type</h3>
      <div className="options-container">
        {options.map((option) => (
          <div 
            key={option.id}
            className={`option-card ${selectedOptions[option.id] ? 'selected' : ''}`}
            onClick={() => handleOptionChange(option.id)}
          >
            <div className="option-control">
              <input
                type="checkbox"
                id={option.id}
                name="mediaType"
                checked={selectedOptions[option.id]}
                onChange={(e) => {
                  e.stopPropagation();
                  handleOptionChange(option.id);
                }}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
            <p className="option-description">{option.description}</p>
          </div>
        ))}
      </div>

      {selectedOptions.photos && (
        <div className="media-details">
          <PhotoUploader 
            photos={photos} 
            onChange={handlePhotosChange} 
          />
        </div>
      )}

      {selectedOptions.video && (
        <div className="media-details">
          <h4>Upload Video (Max 15MB)</h4>
          <input 
            type="file" 
            accept="video/*" 
            onChange={handleVideoUpload}
            className="file-input"
          />
          {video && (
            <div className="video-preview">
              <p>Selected: {video.name}</p>
              <video controls src={URL.createObjectURL(video)}>
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      )}

      {selectedOptions.music && (
        <div className="media-details">
          <MusicSelector 
            selectedMusic={selectedMusic}
            onSelectMusic={handleMusicSelect} 
          />
        </div>
      )}
    </div>
  );
};

export default CheckboxSelector;