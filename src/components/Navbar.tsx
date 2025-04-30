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

  const navBackground = isDarkMode
    ? isScrolled
      ? 'bg-dark-bg shadow-md'
      : 'bg-dark-bg bg-opacity-90'
    : isScrolled
      ? 'bg-white shadow-md'
      : 'bg-white';

  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  
  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBackground} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="w-1/4">
            <button 
              onClick={handleLogoClick}
              className="font-bold text-xl flex items-center"
            >
              <img 
                src="/ohe-white2.0.png"
                alt="One Horn Experience Logo"
                className="h-14 w-auto object-contain -my-2"
              />
            </button>
          </div>
          
          {/* Centered Navigation Links */}
          <div className="hidden md:flex items-center justify-center w-2/4">
            <div className="flex items-center space-x-8">
              <button 
                onClick={handleLogoClick}
                className={`font-medium ${textColor} hover:text-indigo-600 ${location.pathname === '/' ? 'border-b-2 border-indigo-600' : ''}`}
              >
                Home
              </button>
              <Link 
                to="/services" 
                className={`font-medium ${textColor} hover:text-indigo-600 ${location.pathname === '/services' ? 'border-b-2 border-indigo-600' : ''}`}
              >
                Services
              </Link>
              <Link 
                to="/packages" 
                className={`font-medium ${textColor} hover:text-indigo-600 ${location.pathname === '/packages' ? 'border-b-2 border-indigo-600' : ''}`}
              >
                Packages
              </Link>
              <Link 
                to="/portfolio" 
                className={`font-medium ${textColor} hover:text-indigo-600 ${location.pathname === '/portfolio' ? 'border-b-2 border-indigo-600' : ''}`}
              >
                Portfolio
              </Link>
              <Link 
                to="/contact" 
                className={`font-medium ${textColor} hover:text-indigo-600 ${location.pathname === '/contact' ? 'border-b-2 border-indigo-600' : ''}`}
              >
                Contact
              </Link>
            </div>
          </div>
          
          {/* Right side buttons */}
          <div className="hidden md:flex items-center justify-end w-1/4 space-x-4">
            <ThemeToggle />
            <button 
              onClick={toggleChat}
              className={`font-medium ${textColor} hover:text-indigo-600`}
            >
              <MessageSquare className="h-5 w-5 mr-1 inline" />
              <span>Live Chat</span>
            </button>
            
            {user ? (
              <Link 
                to="/profile" 
                className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                MY PROFILE
              </Link>
            ) : (
              <button 
                onClick={() => navigate('/login', { state: { isSignUp: true } })}
                className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                SIGNUP
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className={textColor}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className={`md:hidden ${isDarkMode ? 'bg-dark-bg' : 'bg-white'} shadow-lg py-4 px-4 absolute w-full`}>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => {
                handleLogoClick();
                setIsOpen(false);
              }}
              className={`font-medium ${textColor} hover:text-indigo-600 text-left`}
            >
              Home
            </button>
            <Link 
              to="/services" 
              className={`font-medium ${textColor} hover:text-indigo-600`}
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/packages" 
              className={`font-medium ${textColor} hover:text-indigo-600`}
              onClick={() => setIsOpen(false)}
            >
              Packages
            </Link>
            <Link 
              to="/portfolio" 
              className={`font-medium ${textColor} hover:text-indigo-600`}
              onClick={() => setIsOpen(false)}
            >
              Portfolio
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium ${textColor} hover:text-indigo-600`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <button 
              onClick={() => {
                toggleChat();
                setIsOpen(false);
              }}
              className={`flex items-center font-medium ${textColor} hover:text-indigo-600`}
            >
              <MessageSquare className="h-5 w-5 mr-1" />
              <span>Live Chat</span>
            </button>
            {user ? (
              <Link 
                to="/profile" 
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors text-center"
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
                className="flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
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