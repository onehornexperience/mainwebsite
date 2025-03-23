/*
  # Add address column to profiles table

  1. Changes
    - Add address column to profiles table
    - Make it nullable since some existing users might not have an address
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'address'
  ) THEN
    ALTER TABLE profiles ADD COLUMN address text;
  END IF;
END $$;