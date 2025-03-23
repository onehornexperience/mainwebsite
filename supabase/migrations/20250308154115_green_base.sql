/*
  # Remove avatar upload functionality

  1. Changes
    - Drop avatar_url column from profiles table
    - Remove avatar storage policies
    - Clean up storage objects and bucket

  This migration removes the avatar upload functionality and cleans up related database objects.
  The operations are performed in a safe order to avoid foreign key constraint violations.
*/

-- Remove avatar_url column from profiles table
ALTER TABLE public.profiles DROP COLUMN IF EXISTS avatar_url;

-- Remove avatar storage policies
DROP POLICY IF EXISTS "Anyone can read avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;

-- Clean up storage objects and bucket
DO $$
BEGIN
  -- Delete all objects in the avatars bucket first
  DELETE FROM storage.objects WHERE bucket_id = 'avatars';
  
  -- Then delete the bucket
  DELETE FROM storage.buckets WHERE id = 'avatars';
END $$;