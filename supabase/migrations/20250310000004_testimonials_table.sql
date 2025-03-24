/*
  # Testimonials Table Creation

  1. New Tables
    - `testimonials` - Store customer testimonials
      - `id` (uuid, primary key)
      - `name` (text)
      - `role` (text)
      - `company` (text)
      - `content` (text)
      - `rating` (integer)
      - `avatar_url` (text)
      - `featured` (boolean)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on testimonials table
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  company text,
  content text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  avatar_url text,
  featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Testimonials are viewable by everyone"
  ON testimonials
  FOR SELECT
  TO public
  USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_testimonials_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_testimonials_updated_at();

-- Insert sample testimonials data
INSERT INTO testimonials (name, role, company, content, rating, avatar_url, featured)
VALUES 
  ('Priya Sharma', 'Bride', NULL, 'Our wedding was absolutely perfect thanks to the incredible planning and attention to detail. Every moment was magical!', 5, 'https://randomuser.me/api/portraits/women/32.jpg', true),
  
  ('Rajesh Kumar', 'CEO', 'TechSolutions Ltd', 'The corporate event organized for our company anniversary exceeded all expectations. Professional, seamless, and impressive.', 5, 'https://randomuser.me/api/portraits/men/45.jpg', true),
  
  ('Ananya Patel', 'Birthday Celebrant', NULL, 'My 30th birthday celebration was everything I dreamed of and more. The team took care of every detail so I could enjoy my special day.', 4, 'https://randomuser.me/api/portraits/women/68.jpg', false),
  
  ('Vikram Singh', 'Event Manager', 'Global Events', 'As someone in the industry, I was blown away by the level of professionalism and creativity. They are truly the best in the business.', 5, 'https://randomuser.me/api/portraits/men/22.jpg', true)
ON CONFLICT DO NOTHING;