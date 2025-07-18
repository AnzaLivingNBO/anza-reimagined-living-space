-- Rename the room_characteristics_types table to included
ALTER TABLE public.room_characteristics_types RENAME TO included;

-- Update the RLS policy name to match the new table name
DROP POLICY IF EXISTS "Room characteristics types are publicly readable" ON public.included;

CREATE POLICY "Included items are publicly readable" 
ON public.included 
FOR SELECT 
USING (true);