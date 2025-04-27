import React from 'react';
import Hero from '../components/Hero';
import ServicesPreview from '../components/ServicesPreview';
import FeaturedPortfolio from '../components/FeaturedPortfolio';
import TestimonialsPreview from '../components/TestimonialsPreview';
import GalleryPreview from '../components/GalleryPreview';

const Home = () => {
  return (
    <main>
      <Hero />
      <ServicesPreview />
      <FeaturedPortfolio />
      <GalleryPreview />
      <TestimonialsPreview />
    </main>
  );
};

export default Home;