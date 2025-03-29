import React from 'react';
import { useTheme } from '../context/ThemeContext';
import PackagesComponent from '../components/Packages';
import PageCarousel from '../components/PageCarousel';
import { motion, AnimatePresence } from 'framer-motion';

const packageImages = [
  {
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Luxury Wedding Setup'
  },
  {
    url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Corporate Event'
  },
  {
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Birthday Celebration'
  }
];

const Packages = () => {
  const { isDarkMode } = useTheme();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative z-10"
        >
          <PageCarousel
            images={packageImages}
            title="Our Packages"
            description="Choose from our carefully curated packages designed to meet your event needs and budget."
          />
        </motion.div>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative z-10"
        >
          <PackagesComponent />
        </motion.div>
      </motion.main>
    </AnimatePresence>
  );
};

export default Packages;