import React, { useState } from 'react';
import { assets } from '../assets/assets';

const ImageSwitcher = ({ images = [assets.Wanner1, assets.Wanner2, assets.Wanner3, assets.Wanner4], width = "80%", height = "500px" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 text-gray-500 rounded-md"
        style={{ width, height }}
      >
        No images available
      </div>
    );
  }

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div
      className="relative cursor-pointer m-auto"
      style={{ width, height }}
      onClick={handleNextImage}
    >
      <img
        src={images[currentIndex]}
        alt={`image-${currentIndex}`}
        className="w-full h-full object-cover rounded-md shadow-lg transition-transform duration-300 hover:scale-105"
      />
      {/* <p className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
        {currentIndex + 1} / {images.length}
      </p> */}
    </div>
  );
};

export default ImageSwitcher;
