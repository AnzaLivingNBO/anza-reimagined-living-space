-- Create furniture table
CREATE TABLE public.furniture (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create room_furniture junction table to link rooms with furniture
CREATE TABLE public.room_furniture (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  furniture_id UUID NOT NULL REFERENCES public.furniture(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(room_id, furniture_id)
);

-- Enable Row Level Security
ALTER TABLE public.furniture ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_furniture ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (similar to other tables)
CREATE POLICY "Furniture is publicly readable" 
ON public.furniture 
FOR SELECT 
USING (true);

CREATE POLICY "Room furniture is publicly readable" 
ON public.room_furniture 
FOR SELECT 
USING (true);

-- Insert some sample furniture data
INSERT INTO public.furniture (name, category, description) VALUES
('Single Bed', 'Bedroom', 'Comfortable single bed with mattress'),
('Desk', 'Study', 'Study desk with storage'),
('Chair', 'Study', 'Ergonomic desk chair'),
('Wardrobe', 'Storage', 'Built-in wardrobe with hanging space'),
('Bedside Table', 'Bedroom', 'Small bedside table with drawer'),
('Bookshelf', 'Storage', 'Wall-mounted bookshelf'),
('Mirror', 'Bedroom', 'Full-length mirror'),
('Lamp', 'Lighting', 'Desk or bedside lamp'),
('Curtains', 'Window', 'Blackout curtains for privacy'),
('Rug', 'Comfort', 'Small area rug for warmth');