/*
  # Fix Avatar Storage Migration

  1. Changes
    - Delete objects in avatars bucket first
    - Remove avatars bucket
    - Remove avatar_url column from profiles table
    - Remove storage policies

  This migration safely removes avatar-related storage and columns.
*/

-- First delete all objects in the avatars bucket
DELETE FROM storage.objects WHERE bucket_id = 'avatars';

-- Remove avatars bucket
DELETE FROM storage.buckets WHERE id = 'avatars';

-- Remove avatar_url column from profiles table
ALTER TABLE public.profiles DROP COLUMN IF EXISTS avatar_url;

-- Remove storage policies
DROP POLICY IF EXISTS "Anyone can read avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;