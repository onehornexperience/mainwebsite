import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MessageSquare, UserPlus } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode } = useTheme();
  const { toggleChat } = useChat();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBackground = isScrolled || location.pathname !== '/'
    ? isDarkMode 
      ? 'bg-dark-bg shadow-md' 
      : 'bg-white shadow-md'
    : location.pathname === '/'
      ? 'bg-dark-bg bg-opacity-50'
      : 'bg-white';

  const textColor = location.pathname === '/' && !isScrolled
    ? 'text-white'
    : isDarkMode
      ? 'text-white'
      : 'text-gray-900';

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBackground} py-4`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <button 
            onClick={handleLogoClick}
            className="flex items-center"
          >
            <img 
              src="/OHE Logo2svg .svg"
              alt="One Horn Experience Logo"
              className="h-12 w-12 rounded-full object-cover mr-3"
            />
            <span className={`text-xl font-bold ${textColor}`}>One Horn Experience</span>
          </button>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={handleLogoClick}
              className={`font-medium ${textColor} hover:text-indigo-400 transition-colors`}
            >
              Home
            </button>
            <Link 
              to="/services" 
              className={`font-medium ${textColor} hover:text-indigo-400 transition-colors`}
            >
              Services
            </Link>
            <Link 
              to="/packages" 
              className={`font-medium ${textColor} hover:text-indigo-400 transition-colors`}
            >
              Packages
            </Link>
            <Link 
              to="/portfolio" 
              className={`font-medium ${textColor} hover:text-indigo-400 transition-colors`}
            >
              Portfolio
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium ${textColor} hover:text-indigo-400 transition-colors`}
            >
              Contact
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <button 
              onClick={toggleChat}
              className={`flex items-center font-medium ${textColor} hover:text-indigo-400 transition-colors`}
            >
              <MessageSquare className="h-5 w-5 mr-1" />
              <span>Live Chat</span>
            </button>
            {user ? (
              <Link 
                to="/profile" 
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                My Profile
              </Link>
            ) : (
              <button 
                onClick={() => navigate('/login', { state: { isSignUp: true } })}
                className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Sign Up
              </button>
            )}
          </div>
          
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={textColor}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className={`md:hidden ${isDarkMode ? 'bg-dark-bg' : 'bg-white'} shadow-lg mt-2 py-4 px-4 absolute w-full`}>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => {
                handleLogoClick();
                setIsOpen(false);
              }}
              className={`font-medium text-gray-500 hover:text-indigo-400 transition-colors text-left`}
            >
              Home
            </button>
            <Link 
              to="/services" 
              className={`font-medium text-gray-500 hover:text-indigo-400 transition-colors`}
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/packages" 
              className={`font-medium text-gray-500 hover:text-indigo-400 transition-colors`}
              onClick={() => setIsOpen(false)}
            >
              Packages
            </Link>
            <Link 
              to="/portfolio" 
              className={`font-medium text-gray-500 hover:text-indigo-400 transition-colors`}
              onClick={() => setIsOpen(false)}
            >
              Portfolio
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium text-gray-500 hover:text-indigo-400 transition-colors`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <button 
              onClick={() => {
                toggleChat();
                setIsOpen(false);
              }}
              className={`flex items-center font-medium text-gray-500 hover:text-indigo-400 transition-colors`}
            >
              <MessageSquare className="h-5 w-5 mr-1" />
              <span>Live Chat</span>
            </button>
            {user ? (
              <Link 
                to="/profile" 
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                My Profile
              </Link>
            ) : (
              <button 
                onClick={() => {
                  navigate('/login', { state: { isSignUp: true } });
                  setIsOpen(false);
                }}
                className="flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;