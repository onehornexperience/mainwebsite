import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Heart, Briefcase, Cake, Music, Rocket, Trophy, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 1,
    title: 'WEDDINGS & CEREMONIES',
    icon: <Heart className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/services/weddings'
  },
  {
    id: 2,
    title: 'CORPORATE EVENTS',
    icon: <Briefcase className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/services/corporate'
  },
  {
    id: 3,
    title: 'BIRTHDAY CELEBRATIONS',
    icon: <Cake className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/services/birthdays'
  },
  {
    id: 4,
    title: 'MUSIC FESTIVALS',
    icon: <Music className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/services/festivals'
  },
  {
    id: 5,
    title: 'PRODUCT LAUNCHES',
    icon: <Rocket className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/services/launches'
  },
  {
    id: 6,
    title: 'SPORTS EVENTS',
    icon: <Trophy className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/services/sports'
  },
  {
    id: 7,
    title: 'SOCIAL GATHERINGS',
    icon: <Users className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/services/social'
  },
  {
    id: 8,
    title: 'CUSTOM EVENTS',
    icon: <Sparkles className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/services/custom'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

const ServicesPreview = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  // Display only first 4 categories on smaller screens, all 8 on larger screens
  const visibleCategories = categories.slice(0, 4);
  
  return (
    <section className={isDarkMode ? 'bg-dark-bg py-12' : 'bg-rose-50/30 py-12'}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Browse By Category
          </motion.h2>
          <Link 
            to="/services" 
            className={`text-sm ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            View All ({categories.length})
          </Link>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {visibleCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="block group cursor-pointer"
              onClick={() => navigate(category.link)}
            >
              <div className={`${isDarkMode ? 'bg-dark-bg-alt' : 'bg-white'} rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg transition-all duration-300`}>
                <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {category.icon}
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{category.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile pagination */}
        <div className="flex justify-center mt-8 md:hidden">
          <div className="flex items-center space-x-2">
            <button className={`w-7 h-7 flex items-center justify-center rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-700'}`}>
              <span>«</span>
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-indigo-600 text-white">
              1
            </button>
            <button className={`w-7 h-7 flex items-center justify-center rounded-full ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              2
            </button>
            <button className={`w-7 h-7 flex items-center justify-center rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-700'}`}>
              <span>»</span>
            </button>
          </div>
        </div>
        
        {/* View all button */}
        <div className="text-center mt-10">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => navigate('/services')}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded shadow-md hover:shadow-lg transition-all duration-300"
          >
            Explore All Services
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;