import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { X, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const galleryImages = [
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding couple
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding venue
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding reception
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding decor
  'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding flowers
  'https://images.unsplash.com/photo-1507504031003-b417219a0fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding guests
  'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Wedding cake
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Elegant wedding
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const GalleryPreview = () => {
  const { isDarkMode } = useTheme();
  const [viewImage, setViewImage] = React.useState<string | null>(null);

  return (
    <section className={`py-12 ${isDarkMode ? 'bg-dark-bg-alt' : 'bg-rose-50/30'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Our Events Gallery
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative px-4 md:px-12 mb-8"
        >
          <div className="grid grid-cols-12 gap-3">
            {/* First column */}
            <motion.div 
              variants={itemVariants}
              className="col-span-12 sm:col-span-3 md:col-span-3"
            >
              <div className="grid gap-3">
                <div 
                  className="relative overflow-hidden rounded-lg h-48 md:h-56 group cursor-pointer" 
                  onClick={() => setViewImage(galleryImages[0])}
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={galleryImages[0]}
                    alt="Event photo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="px-6 py-2 rounded-full bg-black/70 text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View
                    </button>
                  </div>
                </div>
                <div 
                  className="relative overflow-hidden rounded-lg h-48 md:h-56 group cursor-pointer" 
                  onClick={() => setViewImage(galleryImages[3])}
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={galleryImages[3]}
                    alt="Event photo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="px-6 py-2 rounded-full bg-black/70 text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Second column - large central image */}
            <motion.div 
              variants={itemVariants}
              className="col-span-12 sm:col-span-5 md:col-span-5"
            >
              <div 
                className="relative overflow-hidden rounded-lg h-full min-h-[24rem] group cursor-pointer" 
                onClick={() => setViewImage(galleryImages[1])}
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={galleryImages[1]}
                  alt="Event photo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="px-6 py-2 rounded-full bg-black/70 text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Third column */}
            <motion.div 
              variants={itemVariants}
              className="col-span-12 sm:col-span-4 md:col-span-4"
            >
              <div className="grid gap-3">
                <div 
                  className="relative overflow-hidden rounded-lg h-48 md:h-56 group cursor-pointer" 
                  onClick={() => setViewImage(galleryImages[2])}
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={galleryImages[2]}
                    alt="Event photo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="px-6 py-2 rounded-full bg-black/70 text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View
                    </button>
                  </div>
                </div>
                <div 
                  className="relative overflow-hidden rounded-lg h-48 md:h-56 group cursor-pointer" 
                  onClick={() => setViewImage(galleryImages[4])}
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={galleryImages[4]}
                    alt="Event photo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="px-6 py-2 rounded-full bg-black/70 text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Bottom row - separate from main grid for better control */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-12 gap-3 mt-3"
          >
            <div className="col-span-12 sm:col-span-5 md:col-span-5">
              <div 
                className="relative overflow-hidden rounded-lg h-48 md:h-56 group cursor-pointer" 
                onClick={() => setViewImage(galleryImages[5])}
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={galleryImages[5]}
                  alt="Event photo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="px-6 py-2 rounded-full bg-black/70 text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-span-12 sm:col-span-3 md:col-span-3">
              <div 
                className="relative overflow-hidden rounded-lg h-48 md:h-56 group cursor-pointer" 
                onClick={() => setViewImage(galleryImages[6])}
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={galleryImages[6]}
                  alt="Event photo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="px-6 py-2 rounded-full bg-black/70 text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-span-12 sm:col-span-4 md:col-span-4">
              <div 
                className="relative overflow-hidden rounded-lg h-48 md:h-56 group cursor-pointer" 
                onClick={() => setViewImage(galleryImages[7])}
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={galleryImages[7]}
                  alt="Event photo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="px-6 py-2 rounded-full bg-black/70 text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex justify-center mt-8">
          <Link 
            to="/gallery" 
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Camera className="w-5 h-5 mr-2" />
            View Full Gallery
          </Link>
        </div>
      </div>
      
      {/* Image Modal */}
      {viewImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="max-w-5xl w-full max-h-[90vh] relative">
            <img 
              src={viewImage} 
              alt="Gallery view" 
              className="w-full h-full object-contain rounded-lg"
            />
            <button 
              onClick={() => setViewImage(null)}
              className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryPreview; 