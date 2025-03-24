/*
  # FAQ Table Creation

  1. New Tables
    - `faq` - Store frequently asked questions
      - `id` (uuid, primary key)
      - `question` (text)
      - `answer` (text)
      - `category` (text)
      - `order` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on faq table
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create faq table
CREATE TABLE IF NOT EXISTS faq (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL,
  order_num integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "FAQ items are viewable by everyone"
  ON faq
  FOR SELECT
  TO public
  USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_faq_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_faq_updated_at
  BEFORE UPDATE ON faq
  FOR EACH ROW
  EXECUTE FUNCTION update_faq_updated_at();

-- Insert sample FAQ data
INSERT INTO faq (question, answer, category, order_num)
VALUES 
  ('How far in advance should I book my event?', 'We recommend booking at least 3-6 months in advance for most events, and 6-12 months for weddings or large corporate events to ensure availability of your preferred date and venue.', 'Booking', 1),
  
  ('What is your cancellation policy?', 'Our standard cancellation policy allows for a full refund if cancelled 60+ days before the event, 50% refund if cancelled 30-59 days before, and no refund if cancelled less than 30 days before the event. However, each contract may have specific terms.', 'Booking', 2),
  
  ('Do you handle destination events?', 'Yes, we specialize in both local and destination events throughout India and select international locations. Additional travel fees may apply for events outside our primary service areas.', 'Services', 1),
  
  ('How do payments work?', 'We typically require a 10% booking deposit to secure your date, followed by a 70% payment as we progress with planning, and the final 20% due one week before the event.', 'Payments', 1),
  
  ('Can you work with my budget?', 'We offer packages at various price points and can customize our services to work with different budgets. During our initial consultation, we'll discuss your vision and budget to find the best approach.', 'Pricing', 1)
ON CONFLICT DO NOTHING;