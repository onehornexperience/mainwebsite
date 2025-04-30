import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Extended venues data to demonstrate pagination
const allVenues = [
  {
    id: 1,
    name: 'LUXURY RESORT MALDIVES',
    description: 'Perfect for exclusive events and retreats',
    image: 'https://images.unsplash.com/photo-1602002418082-dd4a8f7d85d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/venues/maldives'
  },
  {
    id: 2,
    name: 'ROYAL PALACE INDIA',
    description: 'Elegant setting for corporate events and celebrations',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/venues/india'
  },
  {
    id: 3,
    name: 'DESERT OASIS ABU DHABI',
    description: 'Spectacular backdrop for festivals and gatherings',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/venues/abu-dhabi'
  },
  {
    id: 4,
    name: 'SKYLINE TOWER DUBAI',
    description: 'Modern venue for product launches and conferences',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/venues/dubai'
  },
  {
    id: 5,
    name: 'BEACHFRONT VILLA BALI',
    description: 'Intimate setting for exclusive celebrations',
    image: 'https://images.unsplash.com/photo-1511452885600-a3d2c9148ae7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/venues/bali'
  },
  {
    id: 6,
    name: 'MOUNTAIN LODGE NEPAL',
    description: 'Breathtaking backdrop for corporate retreats',
    image: 'https://images.unsplash.com/photo-1494257610566-24a76f53ce54?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/venues/nepal'
  },
  {
    id: 7,
    name: 'LAKESIDE CHATEAU SWITZERLAND',
    description: 'Elegant venue for premium events',
    image: 'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/venues/switzerland'
  },
  {
    id: 8,
    name: 'CITY ROOFTOP NEW YORK',
    description: 'Urban setting for modern celebrations',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/venues/new-york'
  },
  {
    id: 9,
    name: 'RAINFOREST RETREAT COSTA RICA',
    description: 'Unique outdoor events in natural setting',
    image: 'https://images.unsplash.com/photo-1534085762202-69c461f3b3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/venues/costa-rica'
  },
  {
    id: 10,
    name: 'VINEYARD ESTATE TUSCANY',
    description: 'Rustic charm for elegant gatherings',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/venues/tuscany'
  },
  {
    id: 11,
    name: 'ISLAND PARADISE SEYCHELLES',
    description: 'Secluded location for exclusive events',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/venues/seychelles'
  },
  {
    id: 12,
    name: 'HISTORIC CASTLE SCOTLAND',
    description: 'Traditional setting with royal ambiance',
    image: 'https://images.unsplash.com/photo-1534239143101-dd76dc7fb8f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/venues/scotland'
  }
];

const VENUES_PER_PAGE = 4;

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

const FeaturedPortfolio = () => {
  const { isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(allVenues.length / VENUES_PER_PAGE);
  const startIndex = (currentPage - 1) * VENUES_PER_PAGE;
  const visibleVenues = allVenues.slice(startIndex, startIndex + VENUES_PER_PAGE);
  
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  
  return (
    <section className={`py-12 ${isDarkMode ? 'bg-dark-bg-alt' : 'bg-rose-50/30'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Popular Venues
          </motion.h2>
          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            View All ({allVenues.length})
          </div>
        </div>

        <motion.div
          key={`venue-page-${currentPage}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {visibleVenues.map((venue) => (
            <motion.div 
              key={venue.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`${isDarkMode ? 'bg-dark-bg' : 'bg-white'} rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300`}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={venue.image} 
                  alt={venue.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className={`font-medium text-sm text-center ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{venue.name}</h3>
                <p className={`text-xs text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>{venue.description}</p>
                <div className="text-center">
                  <Link 
                    to={venue.link} 
                    className="inline-block text-xs px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors duration-300"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-7 h-7 flex items-center justify-center rounded-full 
                ${currentPage === 1 
                  ? 'cursor-not-allowed opacity-50' 
                  : 'cursor-pointer'} 
                ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              <span>«</span>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-7 h-7 flex items-center justify-center rounded-full ${
                  page === currentPage 
                  ? 'bg-indigo-600 text-white' 
                  : isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'
                } transition-colors`}
              >
                {page}
              </button>
            ))}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-7 h-7 flex items-center justify-center rounded-full 
                ${currentPage === totalPages 
                  ? 'cursor-not-allowed opacity-50' 
                  : 'cursor-pointer'} 
                ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              <span>»</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPortfolio;