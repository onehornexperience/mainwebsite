import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface CarouselImage {
  url: string;
  alt: string;
}

interface PageCarouselProps {
  images: CarouselImage[];
  title: string;
  description: string;
}

const PageCarousel: React.FC<PageCarouselProps> = ({ images, title, description }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-[400px] overflow-hidden">
      {/* Background images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image.url})` }}
          aria-hidden={index !== currentImageIndex}
        />
      ))}
      
      {/* Overlay */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/70' : 'bg-black/50'}`} />
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{title}</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">{description}</p>
        </div>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 w-8 rounded-full transition-colors ${
              index === currentImageIndex ? 'bg-indigo-600' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PageCarousel;