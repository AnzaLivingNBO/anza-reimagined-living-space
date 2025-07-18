-- Create a new characteristics table specifically for rooms
CREATE TABLE public.room_characteristics_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.room_characteristics_types ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Room characteristics types are publicly readable" 
ON public.room_characteristics_types 
FOR SELECT 
USING (true);

-- Update the room_characteristics table to reference the new table
-- First, drop the existing foreign key constraint
ALTER TABLE public.room_characteristics 
DROP CONSTRAINT IF EXISTS room_characteristics_characteristic_id_fkey;

-- Add new foreign key constraint to the room-specific characteristics table
ALTER TABLE public.room_characteristics 
ADD CONSTRAINT room_characteristics_characteristic_id_fkey 
FOREIGN KEY (characteristic_id) 
REFERENCES public.room_characteristics_types(id) 
ON DELETE CASCADE;

-- Insert sample room characteristics
INSERT INTO public.room_characteristics_types (name) VALUES
  ('Air Conditioning'),
  ('Heating'),
  ('Desk & Chair'),
  ('Wardrobe'),
  ('Private Bathroom'),
  ('Shared Bathroom'),
  ('Balcony Access'),
  ('Window'),
  ('Blackout Curtains'),
  ('Reading Light'),
  ('Power Outlets'),
  ('Storage Space'),
  ('Mirror'),
  ('Carpet'),
  ('Hardwood Floor'),
  ('Tile Floor');

-- The original characteristics table will now be used only for flats
-- Let's also add some sample flat characteristics if the table is empty
INSERT INTO public.characteristics (name) 
SELECT * FROM (VALUES 
  ('Parking Available'),
  ('Elevator'),
  ('Gym Access'),
  ('Rooftop Terrace'),
  ('Garden'),
  ('Security System'),
  ('Intercom'),
  ('Laundry Room'),
  ('Common Kitchen'),
  ('WiFi Included'),
  ('Utilities Included'),
  ('Cleaning Service'),
  ('24/7 Security'),
  ('Pet Friendly'),
  ('Furnished Common Areas'),
  ('Study Room')
) AS new_characteristics(name)
WHERE NOT EXISTS (SELECT 1 FROM public.characteristics LIMIT 1);