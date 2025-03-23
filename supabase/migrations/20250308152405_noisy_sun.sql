/*
  # Storage and Profile Avatar Setup

  1. Storage Configuration
    - Create avatars bucket for storing profile pictures
    - Enable RLS on storage.objects
    - Set up storage policies for avatar management

  2. Profile Updates
    - Add avatar_url column to profiles table
    - Ensure proper access control
*/

-- Create avatars bucket if it doesn't exist
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('avatars', 'avatars', true)
  ON CONFLICT (id) DO NOTHING;
END $$;

-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DO $$
BEGIN
  DROP POLICY IF EXISTS "Give users authenticated access to folder 1" ON storage.objects;
  DROP POLICY IF EXISTS "Allow users to upload avatar 1" ON storage.objects;
  DROP POLICY IF EXISTS "Allow users to update own avatar 1" ON storage.objects;
  DROP POLICY IF EXISTS "Anyone can read avatars" ON storage.objects;
  DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
  DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
END $$;

-- Create new storage policies
CREATE POLICY "Anyone can read avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (SPLIT_PART(name, '/', 1))
);

CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (SPLIT_PART(name, '/', 1))
);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (SPLIT_PART(name, '/', 1))
);

-- Add avatar_url column to profiles if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles'
    AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE public.profiles
    ADD COLUMN avatar_url text;
  END IF;
END $$;