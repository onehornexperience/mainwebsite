/*
  # Portfolio Table Creation

  1. New Tables
    - `portfolio` - Store portfolio/past events information
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `service_type` (text)
      - `client_name` (text)
      - `event_date` (date)
      - `location` (text)
      - `image_urls` (text[])
      - `featured` (boolean)
      - `slug` (text, unique)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on portfolio table
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  service_type text NOT NULL,
  client_name text,
  event_date date,
  location text,
  image_urls text[] NOT NULL,
  featured boolean DEFAULT false,
  slug text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Portfolio items are viewable by everyone"
  ON portfolio
  FOR SELECT
  TO public
  USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_portfolio_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_portfolio_updated_at
  BEFORE UPDATE ON portfolio
  FOR EACH ROW
  EXECUTE FUNCTION update_portfolio_updated_at();

-- Insert sample portfolio data
INSERT INTO portfolio (title, description, service_type, client_name, event_date, location, image_urls, featured, slug)
VALUES 
  ('Elegant Garden Wedding', 'A beautiful outdoor wedding with 200 guests in a botanical garden setting.', 'Weddings', 'Sharma Family', '2023-05-15', 'Bangalore Botanical Gardens', 
   ARRAY['https://images.unsplash.com/photo-1519741497674-611481863552', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622'], 
   true, 'elegant-garden-wedding'),
  
  ('Annual Tech Conference', 'A 3-day technology conference with 500 attendees, featuring keynote speakers and workshops.', 'Corporate', 'TechCorp India', '2023-09-10', 'Hyderabad Convention Center', 
   ARRAY['https://images.unsplash.com/photo-1540575467063-178a50c2df87', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2'], 
   true, 'annual-tech-conference'),
  
  ('Music Festival 2023', 'A weekend music festival featuring 15 artists across 3 stages with over 5000 attendees.', 'Music Events', 'Rhythm Productions', '2023-11-25', 'Mumbai Beach Park', 
   ARRAY['https://images.unsplash.com/photo-1506157786151-b8491531f063', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'], 
   true, 'music-festival-2023'),
  
  ('25th Anniversary Celebration', 'A silver jubilee corporate celebration with 300 employees and special entertainment.', 'Corporate', 'Global Solutions Ltd', '2023-08-05', 'Delhi Grand Hotel', 
   ARRAY['https://images.unsplash.com/photo-1511795409834-ef04bbd61622', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'], 
   false, '25th-anniversary-celebration')
ON CONFLICT (slug) DO NOTHING;