import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  ArrowRight 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer className={isDarkMode ? 'bg-black text-white' : 'bg-gray-900 text-white'}>
      <div className="container mx-auto px-4 md:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company info */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/ohe-white2.0.png"
                alt="One Horn Experience Logo"
                className="h-24 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 mb-6">
              Creating exceptional events and unforgettable experiences since 2025.
              Your vision, our expertise.
            </p>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
              <ThemeToggle />
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-400 hover:text-white transition-colors">Packages</Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Weddings</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Corporate Events</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Birthday Celebrations</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Music Festivals</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Product Launches</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Custom Events</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Stay updated with our latest events, offers, and planning tips.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2 rounded-l-md text-gray-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 px-4 py-2 rounded-r-md hover:bg-indigo-700 transition-colors"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </form>
            <p className="text-gray-500 text-sm">
              By subscribing, you agree to our <Link to="/privacy-policy" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</Link> and consent to receive updates from our company.
            </p>
          </div>
        </div>
        
        <hr className={isDarkMode ? 'border-gray-900 mb-8' : 'border-gray-800 mb-8'} />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} The One Horn Experience. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-gray-400 text-sm">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-gray-400 text-sm">Terms of Service</Link>
            <Link to="/cookie-policy" className="text-gray-500 hover:text-gray-400 text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;