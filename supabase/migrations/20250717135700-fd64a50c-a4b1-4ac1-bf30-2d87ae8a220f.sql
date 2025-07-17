-- Create the enum type for room availability status
CREATE TYPE availability_status_enum AS ENUM (
  'available',
  'becoming_available', 
  'unavailable',
  'reserved',
  'under_maintenance'
);

-- First, remove the default value
ALTER TABLE rooms ALTER COLUMN availability_status DROP DEFAULT;

-- Update the column to use the enum
ALTER TABLE rooms 
ALTER COLUMN availability_status TYPE availability_status_enum 
USING availability_status::availability_status_enum;

-- Add back the default value with proper enum casting
ALTER TABLE rooms 
ALTER COLUMN availability_status SET DEFAULT 'available'::availability_status_enum;