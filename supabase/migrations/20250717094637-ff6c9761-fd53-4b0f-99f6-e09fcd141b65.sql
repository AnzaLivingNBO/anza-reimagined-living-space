-- Add room availability fields to flats table
ALTER TABLE public.flats 
ADD COLUMN available_rooms INTEGER NOT NULL DEFAULT 0,
ADD COLUMN total_rooms INTEGER NOT NULL DEFAULT 0;

-- Create junction table for flat characteristics (similar to room_characteristics)
CREATE TABLE public.flat_characteristics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  flat_id UUID NOT NULL REFERENCES public.flats(id) ON DELETE CASCADE,
  characteristic_id UUID NOT NULL REFERENCES public.characteristics(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(flat_id, characteristic_id)
);

-- Enable RLS on flat_characteristics table
ALTER TABLE public.flat_characteristics ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Flat characteristics are publicly readable" ON public.flat_characteristics FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX idx_flat_characteristics_flat_id ON public.flat_characteristics(flat_id);
CREATE INDEX idx_flat_characteristics_characteristic_id ON public.flat_characteristics(characteristic_id);

-- Get the flat ID for Brookside Pearl and characteristic IDs
-- First, let's add the characteristics to Brookside Pearl
INSERT INTO public.flat_characteristics (flat_id, characteristic_id)
SELECT 
  f.id as flat_id,
  c.id as characteristic_id
FROM public.flats f
CROSS JOIN public.characteristics c
WHERE f.name = 'Brookside Pearl'
AND c.name IN ('UN Approved', 'Pool', 'Roof Terrace');

-- Update room counts for existing flats (you can adjust these values as needed)
UPDATE public.flats 
SET available_rooms = 2, total_rooms = 4 
WHERE name = 'Brookside Pearl';

UPDATE public.flats 
SET available_rooms = 1, total_rooms = 2 
WHERE name = 'Prelax Appartments';