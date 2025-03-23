import React from 'react';
import { useTheme } from '../context/ThemeContext';
import ServicesComponent from '../components/Services';
import PageCarousel from '../components/PageCarousel';

const serviceImages = [
  {
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Corporate Event Setup'
  },
  {
    url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Wedding Ceremony'
  },
  {
    url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Music Festival'
  }
];

const Services = () => {
  const { isDarkMode } = useTheme();

  return (
    <main>
      <PageCarousel
        images={serviceImages}
        title="Our Services"
        description="Discover our comprehensive range of event management services designed to make your events extraordinary."
      />
      <ServicesComponent />
    </main>
  );
};

export default Services;