import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Heart, Briefcase, Cake, Music } from 'lucide-react';
import { motion } from 'framer-motion';

const featuredServices = [
  {
    icon: <Heart className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
    title: 'Weddings',
    description: 'Create the wedding of your dreams with our expert planning.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'weddings'
  },
  {
    icon: <Briefcase className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
    title: 'Corporate Events',
    description: 'Professional corporate event planning and execution.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'corporate'
  },
  {
    icon: <Cake className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
    title: 'Celebrations',
    description: 'Make your special day truly memorable.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'birthdays'
  },
  {
    icon: <Music className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
    title: 'Festivals',
    description: 'Create unforgettable musical experiences.',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'festivals'
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
  
  return (
    <section className={`py-24 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Featured Services
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Explore our most popular event management services
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {featuredServices.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`${isDarkMode ? 'bg-dark-bg-alt' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer group`}
              onClick={() => navigate(`/services/${service.id}`)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-56 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-8">
                <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                  {service.title}
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                  {service.description}
                </p>
                <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                  Learn more
                  <svg className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link
            to="/services"
            className="inline-flex items-center bg-indigo-600 text-white px-8 py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            View All Services
            <svg className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;