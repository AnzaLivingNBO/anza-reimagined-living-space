-- Create flats table for apartment information
CREATE TABLE public.flats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  neighborhood TEXT,
  about_description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rooms table for individual room information
CREATE TABLE public.rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  flat_id UUID NOT NULL REFERENCES public.flats(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  amenities TEXT[] DEFAULT '{}',
  availability_status TEXT NOT NULL DEFAULT 'available' CHECK (availability_status IN ('available', 'occupied', 'maintenance')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('room-images', 'room-images', true),
  ('flat-gallery', 'flat-gallery', true);

-- Create room images table
CREATE TABLE public.room_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create flat gallery images table  
CREATE TABLE public.flat_gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  flat_id UUID NOT NULL REFERENCES public.flats(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.flats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flat_gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is a rental listing site)
CREATE POLICY "Flats are publicly readable" ON public.flats FOR SELECT USING (true);
CREATE POLICY "Rooms are publicly readable" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Room images are publicly readable" ON public.room_images FOR SELECT USING (true);
CREATE POLICY "Flat gallery images are publicly readable" ON public.flat_gallery_images FOR SELECT USING (true);

-- Create storage policies for public access
CREATE POLICY "Room images are publicly accessible" ON storage.objects 
  FOR SELECT USING (bucket_id = 'room-images');

CREATE POLICY "Flat gallery images are publicly accessible" ON storage.objects 
  FOR SELECT USING (bucket_id = 'flat-gallery');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_flats_updated_at
  BEFORE UPDATE ON public.flats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rooms_updated_at
  BEFORE UPDATE ON public.rooms
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_rooms_flat_id ON public.rooms(flat_id);
CREATE INDEX idx_room_images_room_id ON public.room_images(room_id);
CREATE INDEX idx_flat_gallery_images_flat_id ON public.flat_gallery_images(flat_id);
CREATE INDEX idx_rooms_availability ON public.rooms(availability_status);