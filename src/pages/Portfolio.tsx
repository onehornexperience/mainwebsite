import React from 'react';
import { useTheme } from '../context/ThemeContext';
import PortfolioComponent from '../components/Portfolio';
import PageCarousel from '../components/PageCarousel';

const portfolioImages = [
  {
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Wedding Event'
  },
  {
    url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Conference Setup'
  },
  {
    url: 'https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Birthday Party'
  }
];

const Portfolio = () => {
  const { isDarkMode } = useTheme();

  return (
    <main>
      <PageCarousel
        images={portfolioImages}
        title="Our Portfolio"
        description="Explore our collection of successful events and memorable experiences."
      />
      <PortfolioComponent />
    </main>
  );
};

export default Portfolio;