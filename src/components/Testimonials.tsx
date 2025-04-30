import React from 'react';
import { Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type TestimonialSize = 'small' | 'medium' | 'large';

interface Testimonial {
  id: number;
  name: string;
  quote: string;
  description: string;
  image: string;
  rating: number;
  size: TestimonialSize;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Nicolas Freeman',
    quote: 'Thank you for managing everything on our behalf!',
    description: 'The Best Wedding Planner in the World is You. We Appreciate the Wonderful Surprises and the Decorations.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    size: 'medium'
  },
  {
    id: 2,
    name: 'Louisa Nelson',
    quote: 'Thank You Again for Making This Perfectionist Bride So Happy!',
    description: 'We Got So Much Praise From Everyone and We Enjoyed All the Details They Planned. The decorations were spectacular and the timing was perfect.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    size: 'large'
  },
  {
    id: 3,
    name: 'Joan Adams',
    quote: 'It Was Perfect! Thank You Again!',
    description: 'We Want to Say Thanks for Being Such a Coordinator!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    size: 'small'
  },
  {
    id: 4,
    name: 'Carmen Carpenter',
    quote: 'You Kept Us on Track in the Lead Up to the Wedding.',
    description: 'They Continued to Offer Support. They Offered Ideas Which Were Inspiring.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    size: 'medium'
  },
  {
    id: 5,
    name: 'Carmen Carpenter',
    quote: 'You Were and Are Fantastic!',
    description: 'We Couldn\'t Have Done It Without You. Thanks!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    size: 'small'
  },
  {
    id: 6,
    name: 'Carolyn Ford',
    quote: 'With These Wonderful People, You Can Picture a Stress-free Wedding Day!',
    description: 'It Looked Like Something Out of a Magazine, It Was Perfect! We Received So Many Compliments From Everyone.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    size: 'large'
  }
];

const Testimonials = () => {
  const { isDarkMode } = useTheme();
  
  // Helper function to determine card height class based on size
  const getCardHeightClass = (size: TestimonialSize): string => {
    switch (size) {
      case 'small': return 'h-full flex flex-col';
      case 'medium': return 'h-full flex flex-col';
      case 'large': return 'h-full flex flex-col';
      default: return 'h-full flex flex-col';
    }
  };

  return (
    <section id="testimonials" className={`py-16 ${isDarkMode ? 'bg-dark-bg' : 'bg-rose-50/30'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Client's Words
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className={`${isDarkMode ? 'bg-dark-bg-alt' : 'bg-white'} rounded-xl p-4 shadow-sm h-full`}
            >
              <div className={getCardHeightClass(testimonial.size)}>
                <div className="flex-grow">
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                    {testimonial.quote}
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm ${
                    testimonial.size === 'small' ? 'line-clamp-1' : 
                    testimonial.size === 'medium' ? 'line-clamp-2' : 
                    'line-clamp-3'
                  }`}>
                    {testimonial.description}
                  </p>
                </div>
                
                <div className="flex items-center mt-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <div>
                    <h4 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </h4>
                    <div className="flex mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-3 w-3 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;