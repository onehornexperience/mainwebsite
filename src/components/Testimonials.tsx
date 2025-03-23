import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const testimonials = [
  {
    id: 1,
    name: 'Jennifer & Robert',
    role: 'Wedding Clients',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    quote: 'EventMaster transformed our wedding day into something truly magical. Their attention to detail and creative vision exceeded our expectations. Every moment was perfect!',
    rating: 5,
    eventType: 'Wedding'
  },
  {
    id: 2,
    name: 'Mark Thompson',
    role: 'Marketing Director, TechCorp',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    quote: 'Our annual conference was flawlessly executed thanks to the EventMaster team. From the initial planning stages to the day-of coordination, they were professional and detail-oriented.',
    rating: 5,
    eventType: 'Corporate Conference'
  },
  {
    id: 3,
    name: 'Sophia Rodriguez',
    role: 'Birthday Celebration',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    quote: 'I wanted my 30th birthday to be special, and EventMaster delivered beyond my wildest dreams. The custom theme they created was absolutely stunning!',
    rating: 5,
    eventType: 'Birthday Party'
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'CEO, Innovate Products',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    quote: 'Our product launch event was critical for our business, and EventMaster understood exactly what we needed. The media coverage and attendee feedback were exceptional.',
    rating: 5,
    eventType: 'Product Launch'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isDarkMode } = useTheme();
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className={`py-20 ${isDarkMode ? 'bg-dark-bg' : 'bg-white'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Client Testimonials</h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Don't just take our word for it. Here's what our clients have to say about their experience working with us.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial cards */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className={`${isDarkMode ? 'bg-dark-bg-alt' : 'bg-gray-50'} rounded-lg p-8 shadow-lg`}>
                      <div className="flex items-center mb-6">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</h3>
                          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{testimonial.role}</p>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} italic mb-4`}>"{testimonial.quote}"</p>
                      <p className="text-indigo-600 dark:text-indigo-400 font-medium">Event: {testimonial.eventType}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation buttons */}
            <button 
              onClick={prevTestimonial}
              className={`absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 ${isDarkMode ? 'bg-dark-bg-alt' : 'bg-white'} rounded-full p-2 shadow-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className={`h-6 w-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
            </button>
            <button 
              onClick={nextTestimonial}
              className={`absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 ${isDarkMode ? 'bg-dark-bg-alt' : 'bg-white'} rounded-full p-2 shadow-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
              aria-label="Next testimonial"
            >
              <ChevronRight className={`h-6 w-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
            </button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-8 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-indigo-600' : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;