-- Remove the available_rooms column from flats table since we'll calculate it dynamically
ALTER TABLE public.flats DROP COLUMN available_rooms;