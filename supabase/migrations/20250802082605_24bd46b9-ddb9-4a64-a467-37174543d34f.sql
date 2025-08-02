-- Add latitude and longitude columns to flats table for exact map positioning
ALTER TABLE public.flats 
ADD COLUMN latitude DECIMAL(10, 8),
ADD COLUMN longitude DECIMAL(11, 8);

-- Add a comment to explain the coordinate system
COMMENT ON COLUMN public.flats.latitude IS 'Latitude coordinate for map display (WGS84)';
COMMENT ON COLUMN public.flats.longitude IS 'Longitude coordinate for map display (WGS84)';