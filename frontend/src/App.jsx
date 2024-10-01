import React, { useState, useRef } from 'react';
import './App.css';
import ImagePopup from './ImagePopup';

function App() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result); // Set the uploaded image
        setPopupOpen(true); // Open the popup after uploading
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleSelectImage = (image) => {
    setSelectedImage(image); // Set the selected image for display
    setUploadedImage(image); // Update uploadedImage with the selected image
    setPopupOpen(false); // Close the popup after selecting
  };

  const handleChooseFromDevice = () => {
    fileInputRef.current.click(); // Programmatically click the file input
  };

  return (
    <div className="container">
      <header className="header">
        <button className="back-button" onClick={() => window.history.back()}>
          &#8592;
        </button>
        <h4>Add Images/Icons</h4>
      </header>

      <main className="main-content">
        <div className="upload-container">
          <div>
            <h4>Upload image</h4>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange} 
              className="upload-input"
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <button className="upload-button" onClick={handleChooseFromDevice}>
              Choose from device
            </button>
          </div>
        </div>

        {/* Display the uploaded image */}
        {uploadedImage && (
          <div className="uploaded-image-container">
            <h4>Uploaded Image:</h4>
            <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
          </div>
        )}
      </main>

      <footer className="footer">
      <p>Made by @<a href='https://github.com/flixusk' className='footer-color'>https://github.com/flixusk</a></p>
      </footer>

      {/* div popup section */}
      <ImagePopup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onSelectImage={handleSelectImage}
        uploadedImage={uploadedImage}
      />
    </div>
  );
}

export default App;
