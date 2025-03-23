/*
  # Create Payment Audit Log Table

  1. New Tables
    - `payment_audit_log`
      - `id` (uuid, primary key)
      - `payment_id` (uuid, references payments.id)
      - `user_id` (uuid, references auth.users.id)
      - `action` (text)
      - `details` (jsonb)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on payment_audit_log table
    - Add policies for authenticated users
*/

-- Create payment audit log table
CREATE TABLE IF NOT EXISTS payment_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id uuid REFERENCES payments(id),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  action text NOT NULL,
  details jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE payment_audit_log ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert their own audit logs"
  ON payment_audit_log
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own audit logs"
  ON payment_audit_log
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);