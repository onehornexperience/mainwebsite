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
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-50'} py-20`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            My Events
          </h1>
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            <UserCircle className="h-5 w-5 mr-2" />
            View Profile
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className={`${isDarkMode ? 'bg-dark-bg-alt' : 'bg-white'} rounded-lg shadow-lg p-6`}
            >
              <div className="flex flex-wrap justify-between items-start mb-6">
                <div>
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    {booking.package_name}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-2`} />
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        {format(new Date(booking.event_date), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-2`} />
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        ₹{booking.total_amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-2`} />
                      <span className={`capitalize ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-50'}`}>
                  <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Payment Schedule
                  </h3>
                  <div className="space-y-4">
                    {['initial', 'progress', 'completion'].map((stage) => {
                      const payment = booking.payments?.find(p => p.stage === stage);
                      const amount = booking.total_amount * (
                        stage === 'initial' ? 0.1 : // 10% for initial
                        stage === 'progress' ? 0.7 : // 70% for progress
                        0.2 // 20% for completion
                      );
                      
                      return (
                        <div key={stage} className="flex items-center justify-between">
                          <div>
                            <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {stage === 'initial' ? 'Initial Payment (10%)' :
                               stage === 'progress' ? 'Progress Payment (70%)' :
                               'Final Payment (20%)'}
                            </p>
                            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                              ₹{amount.toLocaleString('en-IN')}
                            </p>
                          </div>
                          {payment?.status === 'paid' ? (
                            <div className="flex items-center text-green-500">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              <span>Paid</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleMakePayment(booking.id, stage, amount, booking.package_name)}
                              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
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
            </div>
          ))}

          {bookings.length === 0 && (
            <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No bookings found. Start by booking an event package!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;