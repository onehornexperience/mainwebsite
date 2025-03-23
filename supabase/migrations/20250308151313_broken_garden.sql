/*
  # Storage and Profile Policies Setup

  1. Storage Setup
    - Create avatars bucket
    - Enable RLS on storage.objects
    - Add storage policies for user avatars
  
  2. Profile Policies
    - Add storage policies for profile management
*/

-- Create avatars bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', false)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects (idempotent operation)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Give users authenticated access to folder 1" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to upload avatar 1" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to update own avatar 1" ON storage.objects;

-- Create new storage policies
CREATE POLICY "Give users authenticated access to folder 1" ON storage.objects
FOR ALL USING (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow users to upload avatar 1" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Allow users to update own avatar 1" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Drop existing profile policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Create new profile policies
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (
  auth.uid() = id
);

CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (
  auth.uid() = id
);

CREATE POLICY "Users can insert own profile" ON public.profiles
FOR INSERT WITH CHECK (
  auth.uid() = id
);