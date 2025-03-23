import React from 'react';
import { useTheme } from '../context/ThemeContext';
import PackagesComponent from '../components/Packages';
import PageCarousel from '../components/PageCarousel';

const packageImages = [
  {
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Luxury Wedding Setup'
  },
  {
    url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Corporate Event'
  },
  {
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Birthday Celebration'
  }
];

const Packages = () => {
  const { isDarkMode } = useTheme();

  return (
    <main>
      <PageCarousel
        images={packageImages}
        title="Our Packages"
        description="Choose from our carefully curated packages designed to meet your event needs and budget."
      />
      <PackagesComponent />
    </main>
  );
};

export default Packages;