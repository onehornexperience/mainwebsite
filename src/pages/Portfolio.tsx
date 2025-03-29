import React from 'react';
import { useTheme } from '../context/ThemeContext';
import PortfolioComponent from '../components/Portfolio';
import PageCarousel from '../components/PageCarousel';
import { motion, AnimatePresence } from 'framer-motion';

const portfolioImages = [
  {
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Wedding Event'
  },
  {
    url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Conference Setup'
  },
  {
    url: 'https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Birthday Party'
  }
];

const Portfolio = () => {
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
            images={portfolioImages}
            title="Our Portfolio"
            description="Explore our collection of successful events and memorable experiences."
          />
        </motion.div>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative z-10"
        >
          <PortfolioComponent />
        </motion.div>
      </motion.main>
    </AnimatePresence>
  );
};

export default Portfolio;