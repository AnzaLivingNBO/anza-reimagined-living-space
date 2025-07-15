-- Create characteristics reference table
CREATE TABLE public.characteristics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  importance_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert the characteristics ordered by importance
INSERT INTO public.characteristics (name, importance_order) VALUES
  ('Wifi', 1),
  ('24/7 Security', 2),
  ('Cleaning', 3),
  ('UN Approved', 4),
  ('Parking', 5),
  ('Balcony', 6),
  ('Roof Terrace', 7),
  ('Pool', 8),
  ('Gym', 9);

-- Create junction table for room characteristics
CREATE TABLE public.room_characteristics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  characteristic_id UUID NOT NULL REFERENCES public.characteristics(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(room_id, characteristic_id)
);

-- Enable RLS on new tables
ALTER TABLE public.characteristics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_characteristics ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Characteristics are publicly readable" ON public.characteristics FOR SELECT USING (true);
CREATE POLICY "Room characteristics are publicly readable" ON public.room_characteristics FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX idx_room_characteristics_room_id ON public.room_characteristics(room_id);
CREATE INDEX idx_room_characteristics_characteristic_id ON public.room_characteristics(characteristic_id);
CREATE INDEX idx_characteristics_importance ON public.characteristics(importance_order);

-- Remove the old amenities column from rooms table
ALTER TABLE public.rooms DROP COLUMN amenities;