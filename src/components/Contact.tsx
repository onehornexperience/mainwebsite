import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  MessageSquare 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useChat } from '../context/ChatContext';
import { useLocation } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: ''
  });
  
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const { toggleChat } = useChat();
  
  
  useEffect(() => {
    // Handle pre-filled data from navigation
    if (location.state?.prefilledData) {
      setFormData(prev => ({
        ...prev,
        ...location.state.prefilledData
      }));
    }

    // Scroll to form if requested
    if (location.state?.scrollToForm) {
      const formElement = document.getElementById('contact-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will contact you shortly.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      guestCount: '',
      message: ''
    });
  };

  return (
    <section className={`py-24 ${isDarkMode ? 'bg-dark-bg' : 'bg-rose-50/30'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact information */}
          <div className="space-y-8">
            <div className={`${isDarkMode ? 'bg-dark-bg' : 'bg-white'} rounded-2xl shadow-xl p-8 border border-white/10 backdrop-blur-sm`}>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-8`}>Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-indigo-500/10' : 'bg-indigo-50'} mr-4 group-hover:bg-indigo-500/20 transition-colors duration-200`}>
                    <MapPin className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  </div>
                  <div>
                    <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Our Location</h4>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                      Tezpur, Assam, India.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-indigo-500/10' : 'bg-indigo-50'} mr-4 group-hover:bg-indigo-500/20 transition-colors duration-200`}>
                    <Phone className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  </div>
                  <div>
                    <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Phone</h4>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                      +91 6002788139
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-indigo-500/10' : 'bg-indigo-50'} mr-4 group-hover:bg-indigo-500/20 transition-colors duration-200`}>
                    <Mail className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  </div>
                  <div>
                    <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Email</h4>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                      onehornexperience@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`${isDarkMode ? 'bg-dark-bg' : 'bg-white'} rounded-2xl shadow-xl p-8 border border-white/10 backdrop-blur-sm`}>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-8`}>Business Hours</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Monday - Friday</span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Saturday</span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Sunday</span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Closed</span>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>Need immediate assistance?</p>
                <button 
                  onClick={toggleChat} 
                  className={`flex items-center px-4 py-2.5 rounded-xl ${
                    isDarkMode 
                      ? 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300' 
                      : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700'
                  } transition-colors duration-200`}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span>Start Live Chat</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div id="contact-form" className={`${isDarkMode ? 'bg-dark-bg' : 'bg-white'} rounded-2xl shadow-xl p-8 border border-white/10 backdrop-blur-sm`}>
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-8`}>Event Inquiry</h3>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Your Name *
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl ${
                        isDarkMode 
                          ? 'bg-dark-bg-alt border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      } transition-all duration-200`}
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Email Address *
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl ${
                        isDarkMode 
                          ? 'bg-dark-bg-alt border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      } transition-all duration-200`}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Phone Number
                  </label>
                  <div className="relative group">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl ${
                        isDarkMode 
                          ? 'bg-dark-bg-alt border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      } transition-all duration-200`}
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="eventType" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Event Type *
                  </label>
                  <div className="relative group">
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl ${
                        isDarkMode 
                          ? 'bg-dark-bg-alt border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      } transition-all duration-200`}
                    >
                      <option value="">Select Event Type</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Corporate">Corporate Event</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Festival">Music Festival</option>
                      <option value="ProductLaunch">Product Launch</option>
                      <option value="Sports">Sports Event</option>
                      <option value="Social">Social Gathering</option>
                      <option value="Custom">Custom Event</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="eventDate" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Event Date
                  </label>
                  <div className="relative group">
                    <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      <Calendar className="h-5 w-5" />
                    </div>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className={`w-full pl-10 px-4 py-3 rounded-xl ${
                        isDarkMode 
                          ? 'bg-dark-bg-alt border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      } transition-all duration-200`}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="guestCount" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Number of Guests
                  </label>
                  <div className="relative group">
                    <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      <Users className="h-5 w-5" />
                    </div>
                    <input
                      type="number"
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      min="1"
                      className={`w-full pl-10 px-4 py-3 rounded-xl ${
                        isDarkMode 
                          ? 'bg-dark-bg-alt border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      } transition-all duration-200`}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Event Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl ${
                    isDarkMode 
                      ? 'bg-dark-bg-alt border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  } transition-all duration-200`}
                  placeholder="Please share any specific requirements or questions you have about your event."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 active:bg-indigo-800 transition-all duration-200 font-medium"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;