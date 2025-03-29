import React from 'react';
import { useTheme } from '../context/ThemeContext';
import ServicesComponent from '../components/Services';
import PageCarousel from '../components/PageCarousel';
import { motion, AnimatePresence } from 'framer-motion';

const serviceImages = [
  {
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Corporate Event Setup'
  },
  {
    url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Wedding Ceremony'
  },
  {
    url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Music Festival'
  }
];

const Services = () => {
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
            images={serviceImages}
            title="Our Services"
            description="Discover our comprehensive range of event management services designed to make your events extraordinary."
          />
        </motion.div>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative z-10"
        >
          <ServicesComponent />
        </motion.div>
      </motion.main>
    </AnimatePresence>
  );
};

export default Services;