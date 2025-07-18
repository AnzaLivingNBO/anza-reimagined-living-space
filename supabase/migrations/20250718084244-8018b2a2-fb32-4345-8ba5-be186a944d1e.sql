-- Rename the room_characteristics table to room_included
ALTER TABLE public.room_characteristics RENAME TO room_included;

-- Update the RLS policy name to match the new table name
DROP POLICY IF EXISTS "Room characteristics are publicly readable" ON public.room_included;

CREATE POLICY "Room included items are publicly readable" 
ON public.room_included 
FOR SELECT 
USING (true);