import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const featuredTestimonials = [
  {
    name: 'Jennifer & Robert',
    role: 'Wedding Clients',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    quote: 'EventMaster transformed our wedding day into something truly magical. Their attention to detail was exceptional!',
    rating: 5
  },
  {
    name: 'Mark Thompson',
    role: 'Marketing Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    quote: "Our annual conference was flawlessly executed. The team's professionalism was outstanding.",
    rating: 5
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

const TestimonialsPreview = () => {
  const { isDarkMode } = useTheme();

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
            What Our Clients Say
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Read about the experiences of our satisfied clients
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {featuredTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`${isDarkMode ? 'bg-dark-bg-alt' : 'bg-gray-50'} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-8">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover shadow-lg"
                  />
                </motion.div>
                <div className="ml-6">
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {testimonial.name}
                  </h3>
                  <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {testimonial.role}
                  </p>
                  <div className="flex mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : isDarkMode
                            ? 'text-gray-600'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <motion.p 
                className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} italic leading-relaxed`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                "{testimonial.quote}"
              </motion.p>
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
            to="/testimonials"
            className="inline-flex items-center bg-indigo-600 text-white px-8 py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            Read More Testimonials
            <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsPreview;