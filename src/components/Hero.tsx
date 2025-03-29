import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <div className="relative h-screen overflow-hidden">
      {/* Background image slider */}
      {heroImages.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      
      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="flex items-center mb-6">
              <motion.img 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                src="/OHE Logo2svg .svg"
                alt="One Horn Experience Logo"
                className="h-24 w-24 rounded-full object-cover mr-4 shadow-lg"
              />
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-4xl md:text-5xl font-bold text-white tracking-tight"
              >
                One Horn Experience
              </motion.h1>
            </div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Turning Your Vision Into Unforgettable Events
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-xl text-gray-200 mb-8 max-w-2xl"
            >
              From corporate conferences to dream weddings, we create exceptional experiences 
              tailored to your unique needs. Let us handle the details while you enjoy the moment.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              onClick={() => navigate('/services')}
              className="group inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/30 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
            >
              Explore Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
        {heroImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'w-8 bg-white' 
                : 'w-4 bg-white/50 hover:bg-white/70'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;