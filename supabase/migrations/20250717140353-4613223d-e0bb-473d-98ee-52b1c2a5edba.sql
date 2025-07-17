-- Add new parameters to rooms table
ALTER TABLE rooms 
ADD COLUMN deposit NUMERIC,
ADD COLUMN room_size NUMERIC, -- in square meters or square feet
ADD COLUMN max_occupancy INTEGER DEFAULT 1;