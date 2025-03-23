import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Calendar, Users, MapPin, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import LoadingSpinner from '../components/LoadingSpinner';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  guestCount: string;
  location: string;
  eventDuration: string;
  specialRequirements: string;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

const calculatePaymentStages = (price: number) => {
  return {
    initial: price * 0.1,    // 10% initial payment
    progress: price * 0.7,   // 70% progress payment
    final: price * 0.2      // 20% final payment
  };
};

const PackageBooking = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { packageDetails } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    guestCount: '',
    location: '',
    eventDuration: '',
    specialRequirements: ''
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login', { state: { from: '/package-booking', packageDetails } });
      return;
    }

    try {
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
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Create booking record
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: user.id,
            package_name: packageDetails.name,
            total_amount: packageDetails.price,
            event_date: formData.eventDate,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (bookingError) throw bookingError;
      if (!booking) throw new Error('Failed to create booking');

      // Create initial payment record (10%)
      const initialPaymentAmount = packageDetails.price * 0.1;
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert([
          {
            booking_id: booking.id,
            amount: initialPaymentAmount,
            stage: 'initial',
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (paymentError) throw paymentError;
      if (!payment) throw new Error('Failed to create payment record');

      // Create audit log entry
      await supabase
        .from('payment_audit_log')
        .insert([{
          payment_id: payment.id,
          user_id: user.id,
          action: 'booking_created',
          details: {
            booking_id: booking.id,
            package_name: packageDetails.name,
            amount: initialPaymentAmount,
            stage: 'initial'
          }
        }]);

      // Navigate to payment page
      navigate('/payment', {
        state: {
          bookingId: booking.id,
          amount: initialPaymentAmount,
          stage: 'initial',
          packageName: packageDetails.name
        }
      });
    } catch (error: any) {
      console.error('Error creating booking:', error);
      setError(error.message || 'Failed to create booking. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!packageDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            No package selected. Please select a package first.
          </p>
          <button
            onClick={() => navigate('/packages')}
            className="mt-4 text-indigo-600 hover:text-indigo-500"
          >
            View Packages
          </button>
        </div>
      </div>
    );
  }

  const paymentStages = calculatePaymentStages(packageDetails.price);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-50'} py-20`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`max-w-4xl mx-auto ${isDarkMode ? 'bg-dark-bg-alt' : 'bg-white'} rounded-lg shadow-lg p-8`}>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Book {packageDetails.name} Package
          </h2>
          
          <div className={`mb-8 p-4 rounded-lg ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-50'}`}>
            <div className="flex justify-between items-center">
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Package Details
              </h3>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatPrice(packageDetails.price)}
              </p>
            </div>
            <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {packageDetails.description}
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center p-4 rounded-md bg-red-50 border border-red-200">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
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
                  Event Date *
                </label>
                <div className="relative">
                  <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="date"
                    name="eventDate"
                    required
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
                  Event Location *
                </label>
                <div className="relative">
                  <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    name="location"
                    required
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
                  Event Duration *
                </label>
                <div className="relative">
                  <Clock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    name="eventDuration"
                    required
                    placeholder="e.g., 4 hours, Full day"
                    value={formData.eventDuration}
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

            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Special Requirements or Notes
              </label>
              <textarea
                name="specialRequirements"
                rows={4}
                value={formData.specialRequirements}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'bg-dark-bg border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                placeholder="Any specific requirements or special requests for your event..."
              />
            </div>

            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-50'}`}>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Payment Schedule
              </h4>
              <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• Initial Payment (10%): {formatPrice(paymentStages.initial)}</li>
                <li>• Progress Payment (70%): {formatPrice(paymentStages.progress)}</li>
                <li>• Final Payment (20%): {formatPrice(paymentStages.final)}</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Processing...' : `Proceed to Payment (10% - ${formatPrice(paymentStages.initial)})`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PackageBooking;