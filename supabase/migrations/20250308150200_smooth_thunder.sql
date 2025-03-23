/*
  # Create storage bucket for avatars

  1. New Storage Bucket
    - Creates a new storage bucket named 'avatars' for storing user profile pictures
    - Enables RLS policies for secure access

  2. Security
    - Adds RLS policies to control access to the bucket:
      - Users can upload their own avatars
      - Anyone can view avatars
      - Users can only update/delete their own avatars
*/

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;

-- Create policies
CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (regexp_split_to_array(name, '/'))[1]
  );

CREATE POLICY "Anyone can view avatars" ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can update their own avatar" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (regexp_split_to_array(name, '/'))[1]
  );

CREATE POLICY "Users can delete their own avatar" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (regexp_split_to_array(name, '/'))[1]
  );