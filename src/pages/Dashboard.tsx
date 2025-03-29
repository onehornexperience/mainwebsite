import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../utils/supabaseClient';
import { Calendar, DollarSign, Clock, CheckCircle, UserCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Booking {
  id: string;
  package_name: string;
  total_amount: number;
  event_date: string;
  status: string;
  created_at: string;
  payments?: Payment[];
}

interface Payment {
  id: string;
  amount: number;
  stage: string;
  status: string;
  payment_date: string | null;
}

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
    fetchBookings();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login', { state: { from: '/dashboard' } });
    }
  };

  const fetchBookings = async () => {
    try {
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          payments (*)
        `)
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleMakePayment = (bookingId: string, stage: string, amount: number, packageName: string) => {
    navigate('/payment', {
      state: {
        bookingId,
        stage,
        amount,
        packageName
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading your events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-50'} py-20`}>
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              My Events
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your event bookings and payments
            </p>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <UserCircle className="h-5 w-5 mr-2" />
            View Profile
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg mb-8 flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        <div className="grid gap-8">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className={`${isDarkMode ? 'bg-dark-bg-alt' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden`}
            >
              {/* Booking Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                      {booking.package_name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center">
                        <Calendar className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-3`} />
                        <span className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {format(new Date(booking.event_date), 'MMMM dd, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-3`} />
                        <span className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          ₹{booking.total_amount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-3`} />
                        <span className={`text-lg capitalize px-3 py-1 rounded-full ${
                          booking.status === 'completed' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                            : booking.status === 'in progress'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Schedule */}
              <div className="p-6">
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                  Payment Schedule
                </h3>
                <div className="space-y-6">
                  {['initial', 'progress', 'completion'].map((stage) => {
                    const payment = booking.payments?.find(p => p.stage === stage);
                    const amount = booking.total_amount * (
                      stage === 'initial' ? 0.1 : // 10% for initial
                      stage === 'progress' ? 0.7 : // 70% for progress
                      0.2 // 20% for completion
                    );
                    
                    return (
                      <div 
                        key={stage} 
                        className={`flex items-center justify-between p-4 rounded-xl ${
                          isDarkMode ? 'bg-dark-bg' : 'bg-gray-50'
                        }`}
                      >
                        <div className="space-y-1">
                          <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {stage === 'initial' ? 'Initial Payment (10%)' :
                             stage === 'progress' ? 'Progress Payment (70%)' :
                             'Final Payment (20%)'}
                          </p>
                          <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            ₹{amount.toLocaleString('en-IN')}
                          </p>
                        </div>
                        {payment?.status === 'paid' ? (
                          <div className="flex items-center text-green-500 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            <span className="font-medium">Paid</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleMakePayment(booking.id, stage, amount, booking.package_name)}
                            className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                          >
                            Make Payment
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}

          {bookings.length === 0 && (
            <div className={`text-center py-16 ${isDarkMode ? 'bg-dark-bg-alt' : 'bg-white'} rounded-2xl shadow-xl`}>
              <div className="max-w-md mx-auto">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <Calendar className={`h-8 w-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                  No Bookings Yet
                </h3>
                <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
                  Start your journey by booking an event package!
                </p>
                <button
                  onClick={() => navigate('/packages')}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                >
                  Browse Packages
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;