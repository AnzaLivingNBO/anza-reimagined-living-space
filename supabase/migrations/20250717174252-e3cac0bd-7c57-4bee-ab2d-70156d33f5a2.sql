-- Drop the enum if it exists to recreate it properly
DROP TYPE IF EXISTS availability_status_enum CASCADE;

-- Create the enum type for room availability status
CREATE TYPE availability_status_enum AS ENUM (
  'available',
  'becoming_available', 
  'unavailable',
  'reserved',
  'under_maintenance'
);

-- Update the column to use the enum type
ALTER TABLE rooms 
ALTER COLUMN availability_status TYPE availability_status_enum 
USING availability_status::availability_status_enum;

-- Set the default value using the enum
ALTER TABLE rooms 
ALTER COLUMN availability_status SET DEFAULT 'available'::availability_status_enum;