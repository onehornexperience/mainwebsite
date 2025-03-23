import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { CreditCard, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import { loadRazorpayScript, initializeRazorpayPayment } from '../utils/razorpay';
import LoadingSpinner from '../components/LoadingSpinner';

type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed';

const Payment = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, amount, stage, packageName } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('pending');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    if (!bookingId || !amount || !stage) {
      navigate('/dashboard');
      return;
    }

    loadRazorpayScript().then(setRazorpayLoaded);
  }, [bookingId, amount, stage, navigate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkPaymentStatus = async () => {
      try {
        const { data: payment, error } = await supabase
          .from('payments')
          .select('status')
          .eq('booking_id', bookingId)
          .eq('stage', stage)
          .maybeSingle();

        if (error) {
          console.error('Error checking payment status:', error);
          return;
        }

        if (payment?.status === 'paid') {
          setPaymentStatus('success');
          clearInterval(interval);
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };

    if (paymentStatus === 'processing') {
      // Check immediately
      checkPaymentStatus();
      // Then check every 5 seconds
      interval = setInterval(checkPaymentStatus, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [paymentStatus, bookingId, stage, navigate]);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      setError('Payment gateway is not loaded. Please try again.');
      return;
    }

    if (!user) {
      setError('Please log in to continue.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      setPaymentStatus('processing');

      // Create or update payment record
      const { data: existingPayment, error: checkError } = await supabase
        .from('payments')
        .select('id')
        .eq('booking_id', bookingId)
        .eq('stage', stage)
        .maybeSingle();

      if (checkError) throw checkError;

      if (!existingPayment) {
        const { error: createError } = await supabase
          .from('payments')
          .insert([{
            booking_id: bookingId,
            amount: amount,
            stage: stage,
            status: 'pending'
          }]);

        if (createError) throw createError;
      }

      await initializeRazorpayPayment(
        amount,
        bookingId,
        stage,
        () => {
          setPaymentStatus('success');
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        },
        (error) => {
          console.error('Payment failed:', error);
          setError('Payment failed. Please try again.');
          setPaymentStatus('failed');
        }
      );
    } catch (error: any) {
      console.error('Payment initialization error:', error);
      setError(error.message || 'Failed to initialize payment');
      setPaymentStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  if (!bookingId || !amount || !stage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Invalid payment details. Please try again.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 text-indigo-600 hover:text-indigo-500"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'processing') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mt-8`}>
            Processing Payment
          </h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Please wait while we verify your payment...
          </p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Payment Successful!
          </h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Thank you for your payment. You will be redirected to your dashboard shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-50'} py-20`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`max-w-2xl mx-auto ${isDarkMode ? 'bg-dark-bg-alt' : 'bg-white'} rounded-lg shadow-lg p-8`}>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Payment Details
          </h2>

          <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-50'}`}>
            <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Payment Summary
            </h3>
            <div className={`space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="flex justify-between">
                <span>Package:</span>
                <span className="font-medium">{packageName}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Stage:</span>
                <span className="font-medium">
                  {stage === 'initial' ? 'Initial Booking (30%)' : 
                   stage === 'progress' ? 'Progress Payment (50%)' : 
                   'Final Payment (20%)'}
                </span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Amount:</span>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  ${amount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center p-4 rounded-md bg-red-50 border border-red-200 mb-6">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-50'} mb-6`}>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              You will be redirected to our secure payment gateway to complete your payment.
              We accept various payment methods including credit/debit cards, UPI, and net banking.
            </p>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading || !razorpayLoaded}
            className={`w-full flex items-center justify-center bg-indigo-600 text-white py-4 rounded-md text-lg transition-colors ${
              loading || !razorpayLoaded ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-5 w-5 mr-2" />
                Pay ${amount.toFixed(2)}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;