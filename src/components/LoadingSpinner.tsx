import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium' }) => {
  const { isDarkMode } = useTheme();
  const [textIndex, setTextIndex] = useState(0);
  const loadingTexts = ['Planning', 'Creating', 'Delivery'];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    small: 'h-16 w-16',
    medium: 'h-24 w-24',
    large: 'h-32 w-32'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Elegant circular loader */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 rounded-full border-2 border-indigo-100 dark:border-indigo-900"></div>
          <div className="absolute inset-0 rounded-full border-t-2 border-indigo-600 animate-spin"
               style={{ animationDuration: '1s' }}></div>
        </div>

        {/* Inner rotating circles */}
        <div className="absolute inset-4">
          <div className="absolute inset-0 rounded-full border-2 border-purple-100 dark:border-purple-900"></div>
          <div className="absolute inset-0 rounded-full border-t-2 border-purple-600 animate-spin"
               style={{ animationDuration: '2s' }}></div>
        </div>

        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`h-10 w-10 rounded-lg ${isDarkMode ? 'bg-dark-bg' : 'bg-white'} shadow-lg flex items-center justify-center transform rotate-45`}>
            <Calendar className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} transform -rotate-45`} />
          </div>
        </div>

        {/* Decorative dots */}
        <div className="absolute inset-0">
          {[0, 90, 180, 270].map((rotation, index) => (
            <div
              key={rotation}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div 
                className={`h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse`}
                style={{ 
                  marginLeft: '50%',
                  transform: 'translateX(-50%)',
                  animationDelay: `${index * 0.2}s`
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Text */}
      <div className="mt-8 space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            One Horn Experience
          </div>
        </div>
        <div className="h-6 flex items-center justify-center">
          {loadingTexts.map((text, index) => (
            <div
              key={text}
              className={`absolute transition-all duration-500 ${
                index === textIndex
                  ? 'opacity-100 transform translate-y-0'
                  : 'opacity-0 transform translate-y-4'
              } ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}
            >
              {text}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className={`h-1 w-1 rounded-full bg-indigo-600 animate-pulse`}></div>
          <div className={`h-1 w-1 rounded-full bg-purple-600 animate-pulse`} style={{ animationDelay: '0.2s' }}></div>
          <div className={`h-1 w-1 rounded-full bg-indigo-600 animate-pulse`} style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;