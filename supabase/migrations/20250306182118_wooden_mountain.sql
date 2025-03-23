/*
  # Fix Booking RLS Policies

  1. Changes
    - Update RLS policy for bookings table to allow authenticated users to create bookings
    - Add policy for authenticated users to read their own bookings
    - Add policy for authenticated users to update their own bookings

  2. Security
    - Enable RLS on bookings table
    - Add policies for CRUD operations
*/

-- Update the bookings table RLS policies
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can create their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;

-- Create new policies
CREATE POLICY "Users can create their own bookings"
ON bookings FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own bookings"
ON bookings FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
ON bookings FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);