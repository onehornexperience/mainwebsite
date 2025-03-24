/*
  # Event Details Table Creation

  1. New Tables
    - `event_details` - Store additional event information for bookings
      - `id` (uuid, primary key)
      - `booking_id` (uuid, references bookings)
      - `guest_count` (integer)
      - `event_duration` (text)
      - `location` (text)
      - `special_requirements` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on event_details table
    - Add policies for authenticated users to manage their event details
*/

-- Create event_details table
CREATE TABLE IF NOT EXISTS event_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings NOT NULL,
  guest_count integer,
  event_duration text,
  location text,
  special_requirements text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE event_details ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own event details"
  ON event_details
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = event_details.booking_id
      AND bookings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own event details"
  ON event_details
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = event_details.booking_id
      AND bookings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own event details"
  ON event_details
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = event_details.booking_id
      AND bookings.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = event_details.booking_id
      AND bookings.user_id = auth.uid()
    )
  );

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_event_details_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_event_details_updated_at
  BEFORE UPDATE ON event_details
  FOR EACH ROW
  EXECUTE FUNCTION update_event_details_updated_at();