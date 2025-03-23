/*
  # Authentication and User Profile System

  1. New Tables
    - `profiles` - Extended user information
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `phone` (text)
      - `address` (text)
      - `avatar_url` (text)
      - `email_verified` (boolean)
      - `terms_accepted` (boolean)
      - `terms_accepted_at` (timestamptz)
      - `two_factor_enabled` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `auth_audit_log` - Security audit logging
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `event_type` (text)
      - `ip_address` (text)
      - `user_agent` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for user data access
    - Create update trigger for timestamps
*/

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  address text,
  avatar_url text,
  email_verified boolean DEFAULT false,
  terms_accepted boolean DEFAULT false,
  terms_accepted_at timestamptz,
  two_factor_enabled boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
  DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
END $$;

-- Create policies
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

-- Create or replace function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop and recreate trigger
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create audit log table if it doesn't exist
CREATE TABLE IF NOT EXISTS auth_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  event_type text NOT NULL,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE auth_audit_log ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists and recreate it
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view their own audit log" ON auth_audit_log;
END $$;

-- Create policy for audit log
CREATE POLICY "Users can view their own audit log"
ON auth_audit_log FOR SELECT
TO authenticated
USING (user_id = auth.uid());