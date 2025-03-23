import React, { useState } from 'react';
import { Phone, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CallUsButton = () => {
  const { isDarkMode } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center ${
        isExpanded ? 'translate-x-0' : 'translate-x-[calc(100%-3rem)]'
      } transition-transform duration-300`}
    >
      {/* Main Button */}
      <div 
        className={`flex items-center ${
          isDarkMode 
            ? 'bg-indigo-600 text-white' 
            : 'bg-indigo-600 text-white'
        } rounded-l-lg cursor-pointer shadow-lg overflow-hidden`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-3 hover:bg-indigo-700 transition-colors"
          aria-label={isExpanded ? 'Collapse call button' : 'Expand call button'}
        >
          {isExpanded ? (
            <X className="h-6 w-6" />
          ) : (
            <Phone className="h-6 w-6" />
          )}
        </button>
        <div 
          className={`py-3 px-4 ${isExpanded ? 'w-48' : 'w-0'} overflow-hidden transition-all duration-300 whitespace-nowrap`}
        >
          <div className="flex flex-col">
            <span className="font-medium">Call Us Now</span>
            <span className="text-sm opacity-90">+91 6002788139</span>
          </div>
        </div>
      </div>

      {/* Click to call link */}
      <a
        href="tel:+15551234567"
        className={`absolute left-0 top-0 w-full h-full opacity-0`}
        aria-label="Call +1 (555) 123-4567"
      />
    </div>
  );
};

export default CallUsButton;