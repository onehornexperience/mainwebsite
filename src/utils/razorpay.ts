import { supabase } from './supabaseClient';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const initializeRazorpayPayment = async (
  amount: number,
  bookingId: string,
  stage: string,
  onSuccess: () => void,
  onError: (error: any) => void
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Get user profile for contact details
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, email, phone')
      .eq('id', user.id)
      .single();

    if (!profile) throw new Error('User profile not found');

    // Get payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('id')
      .eq('booking_id', bookingId)
      .eq('stage', stage)
      .single();

    if (paymentError) throw new Error('Payment record not found');

    // Initialize Razorpay payment
    const options = {
      key: 'rzp_test_GOD2MSnnwavv0I', // Replace with your actual Razorpay key
      amount: amount * 100, // Razorpay expects amount in smallest currency unit (paise)
      currency: 'INR',
      name: 'EventMaster',
      description: `Payment for ${stage} stage`,
      order_id: undefined, // This should come from your backend
      prefill: {
        name: profile.full_name,
        email: profile.email,
        contact: profile.phone
      },
      handler: async function (response: any) {
        try {
          // First verify the payment with Razorpay
          const verificationData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          };

          // Here you would typically verify the payment with your backend
          // For demo purposes, we'll assume the payment is verified

          // Update payment status
          const { error: updateError } = await supabase
            .from('payments')
            .update({
              status: 'paid',
              payment_date: new Date().toISOString(),
              payment_method: 'card',
              transaction_id: response.razorpay_payment_id
            })
            .eq('id', payment.id)
            .select()
            .single();

          if (updateError) throw updateError;

          // If this is the initial payment, update booking status
          if (stage === 'initial') {
            const { error: bookingError } = await supabase
              .from('bookings')
              .update({ status: 'confirmed' })
              .eq('id', bookingId);

            if (bookingError) throw bookingError;
          }

          // Create an audit log entry
          await supabase
            .from('payment_audit_log')
            .insert([{
              payment_id: payment.id,
              user_id: user.id,
              action: 'payment_success',
              details: {
                payment_method: 'card',
                transaction_id: response.razorpay_payment_id,
                amount: amount,
                stage: stage,
                verification: verificationData
              }
            }]);

          onSuccess();
        } catch (error) {
          console.error('Payment verification error:', error);
          // Create an audit log entry for failed verification
          await supabase
            .from('payment_audit_log')
            .insert([{
              payment_id: payment.id,
              user_id: user.id,
              action: 'payment_verification_failed',
              details: {
                error: error.message,
                payment_id: response.razorpay_payment_id
              }
            }]);
          onError(error);
        }
      },
      modal: {
        ondismiss: async function() {
          // Log payment cancellation
          await supabase
            .from('payment_audit_log')
            .insert([{
              payment_id: payment.id,
              user_id: user.id,
              action: 'payment_cancelled',
              details: {
                amount: amount,
                stage: stage
              }
            }]);
        }
      },
      theme: {
        color: '#4F46E5'
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('Payment initialization error:', error);
    onError(error);
  }
};