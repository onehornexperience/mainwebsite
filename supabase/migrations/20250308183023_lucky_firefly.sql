/*
  # Add payment method tracking

  1. Changes
    - Add payment_method column to payments table
    - Add transaction_id column to payments table
    - Add default value for payment_method

  2. Security
    - No changes to RLS policies needed
*/

-- Add payment_method column with validation
ALTER TABLE payments 
ADD COLUMN IF NOT EXISTS payment_method text DEFAULT 'card'
CHECK (payment_method IN ('card', 'upi', 'qr'));

-- Add transaction_id column for UPI/QR payments
ALTER TABLE payments 
ADD COLUMN IF NOT EXISTS transaction_id text;

-- Add comment to explain payment_method values
COMMENT ON COLUMN payments.payment_method IS 'Payment method used: card, upi, or qr';