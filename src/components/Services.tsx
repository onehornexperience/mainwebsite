import React from 'react';
import { 
  Heart, 
  Briefcase, 
  Cake, 
  Music, 
  Rocket, 
  Trophy, 
  Users, 
  Sparkles 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    icon: <Heart className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
    title: 'Weddings & Marriage Ceremonies',
    description: 'Create the wedding of your dreams with our expert planning and execution services.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'weddings'
  },
  {
    icon: <Briefcase className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
    title: 'Corporate Events & Conferences',
    description: 'Impress your clients and team with professionally organized corporate events.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'corporate'
  },
  {
    icon: <Cake className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
    title: 'Birthday Celebrations',
    description: 'Make your special day memorable with our custom birthday planning services.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'birthdays'
  },
  {
    icon: <Music className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
    title: 'Music Festivals',
    description: 'Create an unforgettable musical experience with our festival management expertise.',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'festivals'
  },
  {
    icon: <Rocket className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
    title: 'Product Launch Events',
    description: 'Launch your product with impact through our strategic event planning services.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'launches'
  },
  {
    icon: <Trophy className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
    title: 'Sports Events',
    description: 'Organize successful sporting events with our comprehensive management solutions.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'sports'
  },
  {
    icon: <Users className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
    title: 'Social Gatherings',
    description: 'Host the perfect social event with our attention to detail and creative planning.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'social'
  },
  {
    icon: <Sparkles className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
    title: 'Custom Events',
    description: 'Whatever your vision, we can bring it to life with our bespoke event planning services.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'custom'
  }
];

const Services = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  return (
    <section id="services" className={`py-20 ${isDarkMode ? 'bg-dark-bg-alt' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`${isDarkMode ? 'bg-dark-bg' : 'bg-white'} rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 cursor-pointer`}
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
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{service.title}</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{service.description}</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/services/${service.id}`);
                  }}
                  className={`mt-4 ${isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'} font-medium transition-colors`}
                >
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;