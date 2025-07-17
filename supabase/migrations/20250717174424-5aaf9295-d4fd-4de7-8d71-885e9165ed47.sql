-- Create the enum type for room availability status
DO $$ 
BEGIN
    -- Drop the enum if it exists
    DROP TYPE IF EXISTS availability_status_enum CASCADE;
    
    -- Create the enum
    CREATE TYPE availability_status_enum AS ENUM (
      'available',
      'becoming_available', 
      'unavailable',
      'reserved',
      'under_maintenance'
    );
END $$;

-- Add a new temporary column with the enum type
ALTER TABLE rooms ADD COLUMN availability_status_temp availability_status_enum;

-- Copy data from old column to new column
UPDATE rooms SET availability_status_temp = availability_status::availability_status_enum;

-- Drop the old column
ALTER TABLE rooms DROP COLUMN availability_status;

-- Rename the new column to the original name
ALTER TABLE rooms RENAME COLUMN availability_status_temp TO availability_status;

-- Set the default value
ALTER TABLE rooms ALTER COLUMN availability_status SET DEFAULT 'available'::availability_status_enum;