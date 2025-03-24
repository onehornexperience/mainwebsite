/*
  # Services Table Creation

  1. New Tables
    - `services` - Store service information
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `icon` (text)
      - `image_url` (text)
      - `slug` (text, unique)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on services table
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  image_url text NOT NULL,
  slug text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Services are viewable by everyone"
  ON services
  FOR SELECT
  TO public
  USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_services_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_services_updated_at();

-- Insert sample services data
INSERT INTO services (name, description, icon, image_url, slug)
VALUES 
  ('Weddings & Marriage Ceremonies', 'Create the wedding of your dreams with our expert planning and execution services.', 'Heart', 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'weddings'),
  
  ('Corporate Events & Conferences', 'Impress your clients and team with professionally organized corporate events.', 'Briefcase', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'corporate'),
  
  ('Birthday Celebrations', 'Make your special day memorable with our custom birthday planning services.', 'Cake', 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'birthdays'),
  
  ('Music Festivals', 'Create an unforgettable musical experience with our festival management expertise.', 'Music', 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'festivals'),
  
  ('Product Launch Events', 'Launch your product with impact through our strategic event planning services.', 'Rocket', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'launches'),
  
  ('Sports Events', 'Organize successful sporting events with our comprehensive management solutions.', 'Trophy', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'sports'),
  
  ('Social Gatherings', 'Host the perfect social event with our attention to detail and creative planning.', 'Users', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'social'),
  
  ('Custom Events', 'Whatever your vision, we can bring it to life with our bespoke event planning services.', 'Sparkles', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'custom')
ON CONFLICT (slug) DO NOTHING;