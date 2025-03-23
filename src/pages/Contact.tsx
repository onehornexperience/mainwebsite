import React from 'react';
import { useTheme } from '../context/ThemeContext';
import ContactComponent from '../components/Contact';
import PageCarousel from '../components/PageCarousel';

const contactImages = [
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Office Meeting'
  },
  {
    url: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Event Planning'
  },
  {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    alt: 'Team Discussion'
  }
];

const Contact = () => {
  const { isDarkMode } = useTheme();

  return (
    <main>
      <PageCarousel
        images={contactImages}
        title="Contact Us"
        description="Get in touch with our team to start planning your next extraordinary event."
      />
      <ContactComponent />
    </main>
  );
};

export default Contact;