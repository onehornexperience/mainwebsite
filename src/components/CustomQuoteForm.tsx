import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Calendar, Users, Clock, DollarSign, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

const services = [
  'Venue Selection',
  'Catering',
  'Decoration',
  'Entertainment',
  'Photography',
  'Videography',
  'Transportation',
  'Accommodation',
  'Security',
  'Technical Support'
];

const venueTypes = [
  'Indoor',
  'Outdoor',
  'Hotel',
  'Restaurant',
  'Beach',
  'Garden',
  'Historic Venue',
  'Conference Center',
  'Private Estate',
  'Other'
];

const CustomQuoteForm = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    customEventType: '',
    eventDate: '',
    guestCount: '',
    budget: '',
    location: '',
    venueType: '',
    duration: '',
    services: [] as string[],
    additionalRequirements: ''
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile) {
          setFormData(prev => ({
            ...prev,
            name: profile.full_name || '',
            email: profile.email || '',
            phone: profile.phone || ''
          }));
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const updatedServices = checkbox.checked
        ? [...formData.services, value]
        : formData.services.filter(service => service !== value);
      
      setFormData(prev => ({
        ...prev,
        services: updatedServices
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const quoteData = {
        user_id: user?.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        event_type: formData.eventType,
        custom_event_type: formData.customEventType,
        event_date: formData.eventDate,
        guest_count: parseInt(formData.guestCount),
        budget: formData.budget,
        location: formData.location,
        venue_type: formData.venueType,
        duration: formData.duration,
        services: formData.services,
        additional_requirements: formData.additionalRequirements,
        status: 'pending'
      };

      const { error: quoteError } = await supabase
        .from('custom_quotes')
        .insert([quoteData]);

      if (quoteError) throw quoteError;

      setSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          customEventType: '',
          eventDate: '',
          guestCount: '',
          budget: '',
          location: '',
          venueType: '',
          duration: '',
          services: [],
          additionalRequirements: ''
        });
        setSuccess(false);
        navigate('/dashboard');
      }, 3000);
    } catch (error: any) {
      console.error('Error submitting quote:', error);
      setError(error.message || 'Failed to submit quote request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-dark-bg' : 'bg-white'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`max-w-4xl mx-auto ${isDarkMode ? 'bg-dark-bg-alt' : 'bg-white'} rounded-lg shadow-lg p-8`}>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Custom Quote Request
          </h2>

          {error && (
            <div className="bg-red-100 dark:bg-red-900 p-4 rounded-md mb-6">
              <p className={`text-red-700 dark:text-red-200`}>{error}</p>
            </div>
          )}

          {success ? (
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-md mb-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <p className={`text-green-700 dark:text-green-200`}>
                  Thank you for your request! We'll get back to you within 24 hours with a customized quote.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md ${
                      isDarkMode 
                        ? 'bg-dark-bg border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md ${
                      isDarkMode 
                        ? 'bg-dark-bg border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                  />
                </div>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Event Type *
                  </label>
                  <select
                    name="eventType"
                    required
                    value={formData.eventType}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md ${
                      isDarkMode 
                        ? 'bg-dark-bg border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                  >
                    <option value="">Select Event Type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate Event</option>
                    <option value="Birthday">Birthday Celebration</option>
                    <option value="Conference">Conference</option>
                    <option value="Festival">Festival</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {formData.eventType === 'Other' && (
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Specify Event Type *
                    </label>
                    <input
                      type="text"
                      name="customEventType"
                      required
                      value={formData.customEventType}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-md ${
                        isDarkMode 
                          ? 'bg-dark-bg border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                    />
                  </div>
                )}

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Event Date
                  </label>
                  <div className="relative">
                    <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className={`w-full pl-10 px-4 py-2 rounded-md ${
                        isDarkMode 
                          ? 'bg-dark-bg border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Number of Guests *
                  </label>
                  <div className="relative">
                    <Users className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="number"
                      name="guestCount"
                      required
                      min="1"
                      value={formData.guestCount}
                      onChange={handleChange}
                      className={`w-full pl-10 px-4 py-2 rounded-md ${
                        isDarkMode 
                          ? 'bg-dark-bg border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Event Duration
                  </label>
                  <div className="relative">
                    <Clock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      name="duration"
                      placeholder="e.g., 4 hours, Full day"
                      value={formData.duration}
                      onChange={handleChange}
                      className={`w-full pl-10 px-4 py-2 rounded-md ${
                        isDarkMode 
                          ? 'bg-dark-bg border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Budget Range
                  </label>
                  <div className="relative">
                    <DollarSign className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      name="budget"
                      placeholder="e.g., ₹50,000 - ₹100,000"
                      value={formData.budget}
                      onChange={handleChange}
                      className={`w-full pl-10 px-4 py-2 rounded-md ${
                        isDarkMode 
                          ? 'bg-dark-bg border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Event Location
                  </label>
                  <div className="relative">
                    <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      name="location"
                      placeholder="City, State or Venue Name"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full pl-10 px-4 py-2 rounded-md ${
                        isDarkMode 
                          ? 'bg-dark-bg border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Preferred Venue Type
                  </label>
                  <select
                    name="venueType"
                    value={formData.venueType}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md ${
                      isDarkMode 
                        ? 'bg-dark-bg border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                  >
                    <option value="">Select Venue Type</option>
                    {venueTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Services Required */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Services Required
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <div key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        id={service}
                        name="services"
                        value={service}
                        checked={formData.services.includes(service)}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={service}
                        className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Requirements */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Additional Requirements or Special Requests
                </label>
                <textarea
                  name="additionalRequirements"
                  rows={4}
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md ${
                    isDarkMode 
                      ? 'bg-dark-bg border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                  placeholder="Please share any specific requirements, preferences, or special requests for your event..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Submitting...' : 'Submit Quote Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomQuoteForm;