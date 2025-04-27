import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import { useLoading } from './context/LoadingContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Packages from './pages/Packages';
import Portfolio from './pages/Portfolio';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import CustomQuote from './pages/CustomQuote';
import PackageBooking from './pages/PackageBooking';
import Payment from './pages/Payment';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import ChatWidget from './components/ChatWidget';
import CallUsButton from './components/CallUsButton';
import PrivateRoute from './components/PrivateRoute';
import Gallery from './pages/Gallery';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  const { isDarkMode } = useTheme();
  const { hideLoading } = useLoading();

  useEffect(() => {
    // Hide loading when window loads
    window.addEventListener('load', hideLoading);
    
    // Handle global errors
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      hideLoading(); // Ensure loading is hidden even when errors occur
    });

    // Handle navigation completion
    const handleNavigation = () => {
      hideLoading();
    };
    window.addEventListener('DOMContentLoaded', handleNavigation);

    return () => {
      window.removeEventListener('load', hideLoading);
      window.removeEventListener('DOMContentLoaded', handleNavigation);
      window.removeEventListener('error', () => {});
    };
  }, [hideLoading]);
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-dark-bg text-dark-text' : 'bg-rose-50/30 text-light-text'} transition-colors duration-200`}>
      <ScrollToTop />
      <Navbar />
      <CallUsButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceId" element={<ServiceDetails />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/custom-quote" element={<CustomQuote />} />
        <Route path="/package-booking" element={
          <PrivateRoute>
            <PackageBooking />
          </PrivateRoute>
        } />
        <Route path="/payment" element={
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Auth />} />
        <Route path="/profile" element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        } />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;