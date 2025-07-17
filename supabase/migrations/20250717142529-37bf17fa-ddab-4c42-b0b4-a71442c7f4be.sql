-- Add lease_term column to rooms table
ALTER TABLE public.rooms 
ADD COLUMN lease_term TEXT DEFAULT 'Flexible (1+ months)';

-- Update existing rooms to have the default lease term
UPDATE public.rooms 
SET lease_term = 'Flexible (1+ months)' 
WHERE lease_term IS NULL;