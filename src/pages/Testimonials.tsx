import React from 'react';
import { useTheme } from '../context/ThemeContext';
import TestimonialsComponent from '../components/Testimonials';
import PageCarousel from '../components/PageCarousel';

const testimonialImages = [
  {
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Happy Couple'
  },
  {
    url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Corporate Event'
  },
  {
    url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Festival Event'
  }
];

const Testimonials = () => {
  const { isDarkMode } = useTheme();

  return (
    <main>
      <PageCarousel
        images={testimonialImages}
        title="Client Testimonials"
        description="Read what our clients have to say about their experience working with us."
      />
      <TestimonialsComponent />
    </main>
  );
};

export default Testimonials;