import React, { useState } from 'react';
import './PhotoUploader.css';

const PhotoUploader = ({ onChange }) => {
  const [photos, setPhotos] = useState([]);

  const handlePhotoUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const totalFiles = photos.length + newFiles.length;

    if (totalFiles > 3) {
      alert('You can only upload up to 3 photos in total.');
      e.target.value = ''; // Reset input so same files can be selected again if needed
      return;
    }

    const updatedPhotos = [...photos, ...newFiles];
    setPhotos(updatedPhotos);
    if (onChange) onChange(updatedPhotos);

    e.target.value = ''; // Reset input again for future selections
  };

  const removePhoto = (indexToRemove) => {
    const updatedPhotos = photos.filter((_, index) => index !== indexToRemove);
    setPhotos(updatedPhotos);
    if (onChange) onChange(updatedPhotos);
  };

  return (
    <div className="photo-uploader">
      <h4>Upload Photos (Max 3)</h4>
      <input 
        type="file" 
        multiple 
        accept="image/*" 
        onChange={handlePhotoUpload} 
        className="file-input"
        disabled={photos.length >= 3}
      />

      {photos.length > 0 && (
        <div className="photo-preview-container">
          {photos.map((photo, index) => (
            <div key={index} className="photo-preview">
              <img 
                src={URL.createObjectURL(photo)} 
                alt={`Preview ${index + 1}`} 
              />
              <span>{photo.name}</span>
              <button 
                type="button" 
                className="remove-button" 
                onClick={() => removePhoto(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;
