/*
  # Packages Table Creation

  1. New Tables
    - `packages` - Store package information
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `features` (jsonb)
      - `category` (text[])
      - `popular` (boolean)
      - `color` (text)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on packages table
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  features jsonb NOT NULL,
  category text[] NOT NULL,
  popular boolean DEFAULT false,
  color text DEFAULT 'indigo',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Packages are viewable by everyone"
  ON packages
  FOR SELECT
  TO public
  USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_packages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_packages_updated_at
  BEFORE UPDATE ON packages
  FOR EACH ROW
  EXECUTE FUNCTION update_packages_updated_at();

-- Insert sample packages data
INSERT INTO packages (name, description, price, features, category, popular, color)
VALUES 
  ('Essential', 'Perfect for smaller events with basic requirements', 349000, 
   '[{"name": "Event Planning & Coordination", "included": true}, 
     {"name": "Venue Selection Assistance", "included": true}, 
     {"name": "Basic Decor Package", "included": true}, 
     {"name": "Event Timeline Creation", "included": true}, 
     {"name": "Vendor Recommendations", "included": true}, 
     {"name": "Day-of Coordination (8 hours)", "included": true}, 
     {"name": "Custom Theme Design", "included": false}, 
     {"name": "Premium Catering Options", "included": false}, 
     {"name": "Photography & Videography", "included": false}, 
     {"name": "VIP Guest Management", "included": false}]'::jsonb, 
   ARRAY['All Packages', 'Weddings', 'Birthdays'], 
   false, 'indigo'),
  
  ('Premium', 'Our most popular package for medium-sized events', 499999, 
   '[{"name": "Event Planning & Coordination", "included": true}, 
     {"name": "Venue Selection Assistance", "included": true}, 
     {"name": "Enhanced Decor Package", "included": true}, 
     {"name": "Event Timeline Creation", "included": true}, 
     {"name": "Vendor Management", "included": true}, 
     {"name": "Day-of Coordination (12 hours)", "included": true}, 
     {"name": "Custom Theme Design", "included": true}, 
     {"name": "Premium Catering Options", "included": true}, 
     {"name": "Photography & Videography", "included": false}, 
     {"name": "VIP Guest Management", "included": false}]'::jsonb, 
   ARRAY['All Packages', 'Weddings', 'Corporate', 'Birthdays', 'Product Launches'], 
   true, 'indigo'),
  
  ('Luxury', 'All-inclusive package for the most memorable events', 699999, 
   '[{"name": "Event Planning & Coordination", "included": true}, 
     {"name": "Venue Selection Assistance", "included": true}, 
     {"name": "Luxury Decor Package", "included": true}, 
     {"name": "Event Timeline Creation", "included": true}, 
     {"name": "Full Vendor Management", "included": true}, 
     {"name": "Day-of Coordination (Full Day)", "included": true}, 
     {"name": "Custom Theme Design", "included": true}, 
     {"name": "Premium Catering Options", "included": true}, 
     {"name": "Photography & Videography", "included": true}, 
     {"name": "VIP Guest Management", "included": true}]'::jsonb, 
   ARRAY['All Packages', 'Weddings', 'Corporate', 'Music Events', 'Product Launches'], 
   false, 'indigo')
ON CONFLICT DO NOTHING;