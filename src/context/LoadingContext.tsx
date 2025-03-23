import React, { createContext, useContext, useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useTheme } from './ThemeContext';

interface LoadingContextType {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {isLoading && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center ${
            isDarkMode ? 'bg-black/60' : 'bg-white/60'
          } backdrop-blur-sm transition-opacity duration-300`}
        >
          <div className="transform transition-transform duration-300 scale-100">
            <LoadingSpinner size="large" />
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};