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

function App() {
  const { isDarkMode } = useTheme();
  const { hideLoading } = useLoading();

  useEffect(() => {
    window.addEventListener('load', hideLoading);
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
    });

    return () => {
      window.removeEventListener('load', hideLoading);
      window.removeEventListener('error', () => {});
    };
  }, [hideLoading]);
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'} transition-colors duration-200`}>
      <ScrollToTop />
      <Navbar />
      <CallUsButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceId" element={<ServiceDetails />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/portfolio" element={<Portfolio />} />
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
      </Routes>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;