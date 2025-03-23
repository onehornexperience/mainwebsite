import React from 'react';
import { useTheme } from '../context/ThemeContext';
import PageCarousel from '../components/PageCarousel';
import CustomQuoteForm from '../components/CustomQuoteForm';

const quoteImages = [
  {
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Event Planning'
  },
  {
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Corporate Event'
  },
  {
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Custom Event'
  }
];

const CustomQuote = () => {
  return (
    <main>
      <PageCarousel
        images={quoteImages}
        title="Request Custom Quote"
        description="Tell us about your dream event, and we'll create a tailored package just for you."
      />
      <CustomQuoteForm />
    </main>
  );
};

export default CustomQuote;