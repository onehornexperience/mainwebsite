/*
  # Create custom quotes table

  1. New Tables
    - `custom_quotes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `event_type` (text)
      - `custom_event_type` (text, nullable)
      - `event_date` (timestamptz)
      - `guest_count` (integer)
      - `budget` (numeric)
      - `location` (text)
      - `venue_type` (text)
      - `duration` (text)
      - `services` (text[])
      - `additional_requirements` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `custom_quotes` table
    - Add policies for authenticated users to manage their quotes
    - Add policies for admins to view all quotes
*/

-- Create custom quotes table
CREATE TABLE IF NOT EXISTS custom_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  event_type text NOT NULL,
  custom_event_type text,
  event_date timestamptz,
  guest_count integer,
  budget text,
  location text,
  venue_type text,
  duration text,
  services text[],
  additional_requirements text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add status check constraint
ALTER TABLE custom_quotes
  ADD CONSTRAINT valid_status CHECK (status IN ('pending', 'reviewing', 'quoted', 'accepted', 'rejected'));

-- Enable RLS
ALTER TABLE custom_quotes ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users
CREATE POLICY "Users can create their own quotes"
  ON custom_quotes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own quotes"
  ON custom_quotes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own quotes"
  ON custom_quotes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER update_custom_quotes_updated_at
  BEFORE UPDATE ON custom_quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();