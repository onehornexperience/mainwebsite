/*
  # Add user deletion functionality

  1. New Functions
    - Creates a function to safely delete a user and all related data
    - Handles cascading deletion of related records

  2. Security
    - Adds RLS policies to allow users to delete their own accounts
    - Ensures proper cleanup of all user data
*/

-- Create function to handle user deletion
CREATE OR REPLACE FUNCTION delete_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete user's payments
  DELETE FROM payments
  WHERE booking_id IN (
    SELECT id FROM bookings WHERE user_id = auth.uid()
  );

  -- Delete user's bookings
  DELETE FROM bookings
  WHERE user_id = auth.uid();

  -- Delete user's audit logs
  DELETE FROM auth_audit_log
  WHERE user_id = auth.uid();

  -- Delete user's profile
  DELETE FROM profiles
  WHERE id = auth.uid();

  -- Delete user's avatar from storage
  DELETE FROM storage.objects
  WHERE bucket_id = 'avatars' 
  AND auth.uid()::text = (regexp_split_to_array(name, '/'))[1];
END;
$$;

-- Add RLS policies for user deletion
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can delete their own profile"
ON profiles
FOR DELETE
TO authenticated
USING (id = auth.uid());

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION delete_user() TO authenticated;