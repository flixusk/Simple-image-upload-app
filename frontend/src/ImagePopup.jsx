// ImagePopup.jsx
import React, { useState } from 'react';
import './ImagePopup.css';
import defaultImage1 from "./assets/user_image_frame_1.png";
import defaultImage2 from "./assets/user_image_frame_2.png";
import defaultImage3 from "./assets/user_image_frame_3.png";
import defaultImage4 from "./assets/user_image_frame_4.png";

const ImagePopup = ({ isOpen, onClose, onSelectImage, uploadedImage }) => {
  const defaultImages = [
    defaultImage1,
    defaultImage2,
    defaultImage3,
    defaultImage4,
  ];

  // State to keep track of the currently selected image
  const [currentSelection, setCurrentSelection] = useState(null);

  if (!isOpen) return null;

  // Handle selecting an image (both uploaded and default)
  const handleImageSelect = (image) => {
    setCurrentSelection(image);
  };

  // Handle confirming the selected image
  const handleConfirmSelection = () => {
    if (currentSelection) {
      onSelectImage(currentSelection);
      onClose();
    }
  };

  return (
    <div className="popup">
      <h4>Select an Image</h4>

      <div className="image-preview-container">
        {/* Preview of currently selected image */}
        {currentSelection && (
          <div className="selected-preview">
            <h5>Preview:</h5>
            <img src={currentSelection} alt="Selected" className="preview-image" />
          </div>
        )}

        <div className="default-images-container">
          <div className="uploaded-image-container">
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Uploaded"
                className={`popup-image ${currentSelection === uploadedImage ? 'selected' : ''}`}
                onClick={() => handleImageSelect(uploadedImage)}
              />
            )}
          </div>

          <div className="default-images">
            <h5>Default Images:</h5>
            <div className="preview-container">
              {defaultImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`default ${index + 1}`}
                  className={`popup-image ${currentSelection === src ? 'selected' : ''}`}
                  onClick={() => handleImageSelect(src)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <button className="use-image-button" onClick={handleConfirmSelection}>
        Use this Image
      </button>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ImagePopup;
