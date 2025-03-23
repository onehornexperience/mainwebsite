/*
  # Booking and Payment System

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `package_name` (text)
      - `total_amount` (numeric)
      - `event_date` (timestamptz)
      - `status` (text)
      - `created_at` (timestamptz)
      
    - `payments`
      - `id` (uuid, primary key)
      - `booking_id` (uuid, references bookings)
      - `amount` (numeric)
      - `stage` (text) - initial(30%), progress(50%), completion(20%)
      - `status` (text)
      - `payment_date` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their bookings and payments
*/

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  package_name text NOT NULL,
  total_amount numeric NOT NULL,
  event_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled'))
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings NOT NULL,
  amount numeric NOT NULL,
  stage text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  payment_date timestamptz,
  created_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_stage CHECK (stage IN ('initial', 'progress', 'completion')),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'paid', 'failed', 'refunded'))
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policies for bookings
CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for payments
CREATE POLICY "Users can view payments for their bookings"
  ON payments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE bookings.id = payments.booking_id 
      AND bookings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create payments for their bookings"
  ON payments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE bookings.id = payments.booking_id 
      AND bookings.user_id = auth.uid()
    )
  );