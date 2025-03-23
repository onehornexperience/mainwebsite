import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const heroImages = [
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen">
      {/* Background image slider */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      
      {/* Overlay */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-50'}`} />
      
      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="flex items-center mb-4">
              <img 
                src="/OHE Logo2svg .svg"
                alt="One Horn Experience Logo"
                className="h-20 w-20 rounded-full object-cover mr-4"
              />
              <h1 className="text-3xl md:text-4xl font-bold text-white">One Horn Experience</h1>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Turning Your Vision Into Unforgettable Events
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              From corporate conferences to dream weddings, we create exceptional experiences 
              tailored to your unique needs. Let us handle the details while you enjoy the moment.
            </p>
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center bg-white bg-opacity-20 text-white px-8 py-3 rounded-md hover:bg-opacity-30 transition-colors cursor-pointer"
            >
              Explore Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 w-8 rounded-full transition-colors ${
              index === currentImageIndex ? 'bg-indigo-600' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;