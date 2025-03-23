/*
  # Fix profiles and audit log tables

  1. Changes
    - Add missing columns to profiles table
    - Add RLS policies for auth_audit_log table
    - Fix existing RLS policies

  2. Security
    - Enable RLS on auth_audit_log table
    - Add policies for authenticated users
*/

-- Add missing columns to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS terms_accepted boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS terms_accepted_at timestamptz;

-- Fix auth_audit_log table security
ALTER TABLE auth_audit_log ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can insert their own audit logs" ON auth_audit_log;
DROP POLICY IF EXISTS "Users can view their own audit logs" ON auth_audit_log;

-- Create new policies for auth_audit_log
CREATE POLICY "Users can insert their own audit logs"
ON auth_audit_log
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own audit logs"
ON auth_audit_log
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Ensure profiles policies are correct
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can insert their own profile"
ON profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);