import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample gallery images - in a real app, these would come from an API or CMS
const galleryImages = [
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding couple
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding venue
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding reception
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding decor
  'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding flowers
  'https://images.unsplash.com/photo-1507504031003-b417219a0fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding guests
  'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding cake
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Elegant wedding
  'https://images.unsplash.com/photo-1550005809-91ad75fb315f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding ring
  'https://images.unsplash.com/photo-1455156218388-5e61b526818b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding dance
  'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Party setup
  'https://images.unsplash.com/photo-1548695607-9c73430ba065?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding dinner
  'https://images.unsplash.com/photo-1579089872170-71da6508ed1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Corporate event
  'https://images.unsplash.com/photo-1475721071548-07edb8d4e28a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding flowers
  'https://images.unsplash.com/photo-1529636798458-92182e662485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Outdoor wedding
  'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Elegant table setup
  'https://images.unsplash.com/photo-1478146059778-26028b07395a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding bouquet
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding couple 2
  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding party
  'https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding ceremony
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};

const Gallery = () => {
  const { isDarkMode } = useTheme();
  const [viewImage, setViewImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleImageClick = (image: string, index: number) => {
    setViewImage(image);
    setCurrentIndex(index);
  };

  const handlePrevImage = () => {
    const newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(newIndex);
    setViewImage(galleryImages[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(newIndex);
    setViewImage(galleryImages[newIndex]);
  };

  // Handle keyboard navigation when modal is open
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!viewImage) return;
      
      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'Escape') {
        setViewImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewImage, currentIndex]);

  return (
    <main className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Our Photo Gallery
          </h1>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Explore our collection of stunning moments captured at various events. From intimate gatherings to grand celebrations, each image tells a unique story.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="aspect-square overflow-hidden rounded-2xl cursor-pointer group relative"
              onClick={() => handleImageClick(image, index)}
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="px-6 py-2 rounded-full bg-black/70 text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  View
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Image Modal with navigation */}
      {viewImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
          <div className="max-w-6xl w-full max-h-[90vh] relative">
            <img 
              src={viewImage} 
              alt={`Gallery view ${currentIndex + 1}`} 
              className="w-full h-full object-contain rounded-2xl"
            />
            
            <button 
              onClick={handlePrevImage}
              className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 bg-black/50 text-white rounded-full p-3 hover:bg-black/80 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              onClick={handleNextImage}
              className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 bg-black/50 text-white rounded-full p-3 hover:bg-black/80 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            <button 
              onClick={() => setViewImage(null)}
              className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="absolute bottom-6 left-0 right-0 text-center text-white text-sm">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery; 