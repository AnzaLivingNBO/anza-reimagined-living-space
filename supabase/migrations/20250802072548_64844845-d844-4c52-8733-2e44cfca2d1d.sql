-- Add available_from column to rooms table
ALTER TABLE public.rooms 
ADD COLUMN available_from DATE;

-- Create validation function for available_from requirement
CREATE OR REPLACE FUNCTION validate_available_from()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if availability_status is 'becoming_available' and available_from is null
  IF NEW.availability_status = 'becoming_available' AND NEW.available_from IS NULL THEN
    RAISE EXCEPTION 'available_from is required when availability_status is becoming_available';
  END IF;
  
  -- Check if availability_status is not 'becoming_available' but available_from is set
  -- (Optional: clear available_from when not needed)
  IF NEW.availability_status != 'becoming_available' AND NEW.available_from IS NOT NULL THEN
    NEW.available_from = NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to validate available_from
CREATE TRIGGER validate_available_from_trigger
  BEFORE INSERT OR UPDATE ON public.rooms
  FOR EACH ROW
  EXECUTE FUNCTION validate_available_from();