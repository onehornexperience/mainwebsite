import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Heart, Briefcase, Cake, Music } from 'lucide-react';

const featuredServices = [
  {
    icon: <Heart className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
    title: 'Weddings',
    description: 'Create the wedding of your dreams with our expert planning.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'weddings'
  },
  {
    icon: <Briefcase className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
    title: 'Corporate Events',
    description: 'Professional corporate event planning and execution.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'corporate'
  },
  {
    icon: <Cake className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
    title: 'Celebrations',
    description: 'Make your special day truly memorable.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'birthdays'
  },
  {
    icon: <Music className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
    title: 'Festivals',
    description: 'Create unforgettable musical experiences.',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'festivals'
  }
];

const ServicesPreview = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  return (
    <section className={`py-20 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Featured Services
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Explore our most popular event management services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredServices.map((service, index) => (
            <div 
              key={index} 
              className={`${isDarkMode ? 'bg-dark-bg-alt' : 'bg-white'} rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 cursor-pointer`}
              onClick={() => navigate(`/services/${service.id}`)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="mb-4">{service.icon}</div>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {service.title}
                </h3>
                <p className={isDarkMode ? 'text-gray-300 mb-4' : 'text-gray-600 mb-4'}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;