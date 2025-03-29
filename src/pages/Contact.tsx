import React from 'react';
import { useTheme } from '../context/ThemeContext';
import ContactComponent from '../components/Contact';
import PageCarousel from '../components/PageCarousel';
import { motion, AnimatePresence } from 'framer-motion';

const contactImages = [
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Office Meeting'
  },
  {
    url: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Event Planning'
  },
  {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Team Discussion'
  }
];

const Contact = () => {
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
            images={contactImages}
            title="Contact Us"
            description="Get in touch with our team to start planning your next extraordinary event."
          />
        </motion.div>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative z-10"
        >
          <ContactComponent />
        </motion.div>
      </motion.main>
    </AnimatePresence>
  );
};

export default Contact;