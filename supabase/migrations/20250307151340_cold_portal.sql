/*
  # Fix RLS Policies

  1. Security Updates
    - Add RLS policies for profiles table
    - Add RLS policies for bookings table
    - Add RLS policies for payments table
    - Fix insert permissions for authenticated users

  2. Changes
    - Update existing policies
    - Add new policies for authenticated users
    - Ensure proper access control
*/

-- Enable RLS on all tables if not already enabled
DO $$ 
BEGIN
  ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS bookings ENABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS payments ENABLE ROW LEVEL SECURITY;
END $$;

-- Drop existing policies to avoid conflicts
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
  DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
  
  DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;
  DROP POLICY IF EXISTS "Users can insert own bookings" ON bookings;
  DROP POLICY IF EXISTS "Users can update own bookings" ON bookings;
  
  DROP POLICY IF EXISTS "Users can view payments for their bookings" ON payments;
  DROP POLICY IF EXISTS "Users can insert payments for their bookings" ON payments;
  DROP POLICY IF EXISTS "Users can update their own payments" ON payments;
END $$;

-- Recreate policies for profiles table
CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
TO public
USING (true);

CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Recreate policies for bookings table
CREATE POLICY "Users can view own bookings"
ON bookings FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings"
ON bookings FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
ON bookings FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Recreate policies for payments table
CREATE POLICY "Users can view payments for their bookings"
ON payments FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = payments.booking_id
    AND bookings.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert payments for their bookings"
ON payments FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = payments.booking_id
    AND bookings.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own payments"
ON payments FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = payments.booking_id
    AND bookings.user_id = auth.uid()
  )
);