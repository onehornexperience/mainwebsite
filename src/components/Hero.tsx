import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const heroImages = [
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
];

const eventCategories = [
  { value: 'weddings', label: 'Weddings & Ceremonies' },
  { value: 'corporate', label: 'Corporate Events' },
  { value: 'birthdays', label: 'Birthday Celebrations' },
  { value: 'festivals', label: 'Music Festivals' },
  { value: 'launches', label: 'Product Launches' },
  { value: 'sports', label: 'Sports Events' },
  { value: 'social', label: 'Social Gatherings' },
  { value: 'custom', label: 'Custom Events' }
];

const locations = [
  { value: 'guwahati', label: 'Guwahati, Assam' },
  { value: 'dibrugarh', label: 'Dibrugarh, Assam' },
  { value: 'jorhat', label: 'Jorhat, Assam' },
  { value: 'silchar', label: 'Silchar, Assam' },
  { value: 'tezpur', label: 'Tezpur, Assam' },
  { value: 'mumbai', label: 'Mumbai, Maharashtra' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'bangalore', label: 'Bangalore, Karnataka' },
  { value: 'hyderabad', label: 'Hyderabad, Telangana' },
  { value: 'chennai', label: 'Chennai, Tamil Nadu' },
  { value: 'kolkata', label: 'Kolkata, West Bengal' },
  { value: 'pune', label: 'Pune, Maharashtra' },
  { value: 'ahmedabad', label: 'Ahmedabad, Gujarat' },
  { value: 'jaipur', label: 'Jaipur, Rajasthan' },
  { value: 'lucknow', label: 'Lucknow, Uttar Pradesh' }
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const taglines = [
    "Your Event, Your Way",
    "Turning Your Vision Into Unforgettable Events",
    "Creating Your Extraordinary Moments Together"
  ];

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(imageInterval);
  }, []);

  useEffect(() => {
    const taglineInterval = setInterval(() => {
      setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 5000);
    
    return () => clearInterval(taglineInterval);
  }, []);

  const handleSearch = () => {
    if (selectedCategory) {
      navigate(`/services/${selectedCategory}`);
    } else {
      navigate('/services');
    }
  };

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
            className="max-w-4xl mx-auto text-center"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-2 flex justify-center"
            >
              <img 
                src="/ohe-white2.0.png" 
                alt="One Horn Experience Logo" 
                className="h-32 md:h-40 w-auto object-contain"
              />
            </motion.div>
            
            {/* Animated Taglines */}
            <div className="h-20 md:h-24 mb-6 flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentTaglineIndex}
                  className="text-3xl md:text-5xl font-bold text-white text-center max-w-3xl mx-auto px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {taglines[currentTaglineIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>
            
            <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
              From corporate conferences to dream weddings, we create exceptional experiences 
              tailored to your unique needs. Let us handle the details while you enjoy the moment.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-2 max-w-3xl mx-auto mb-8">
              <div className="flex-1">
                <div className="relative">
                  <select 
                    className="appearance-none w-full p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded text-white cursor-pointer"
                    defaultValue=""
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="" disabled className="text-gray-800">Select Event Type</option>
                    {eventCategories.map((category) => (
                      <option key={category.value} value={category.value} className="text-gray-800">{category.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="relative">
                  <select 
                    className="appearance-none w-full p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded text-white cursor-pointer"
                    defaultValue=""
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="" disabled className="text-gray-800">Select Location</option>
                    {locations.map((location) => (
                      <option key={location.value} value={location.value} className="text-gray-800">{location.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleSearch}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Search
              </button>
            </div>
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