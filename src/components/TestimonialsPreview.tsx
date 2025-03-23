import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Star, ArrowRight } from 'lucide-react';

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

const TestimonialsPreview = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            What Our Clients Say
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Read about the experiences of our satisfied clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${isDarkMode ? 'bg-dark-bg-alt' : 'bg-gray-50'} rounded-lg p-8 shadow-lg`}
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {testimonial.name}
                  </h3>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{testimonial.role}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
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
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} italic`}>
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/testimonials"
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Read More Testimonials
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPreview;