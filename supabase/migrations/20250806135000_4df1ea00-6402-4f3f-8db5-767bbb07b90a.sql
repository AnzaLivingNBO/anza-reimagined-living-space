-- Delete existing characteristics for Brookside Pear and link new ones
WITH brookside_flat AS (
  SELECT id FROM public.flats WHERE name ILIKE '%brookside pear%' LIMIT 1
)
-- First delete existing characteristics
DELETE FROM public.flat_characteristics 
WHERE flat_id = (SELECT id FROM brookside_flat);

-- Then insert the new characteristics
INSERT INTO public.flat_characteristics (flat_id, characteristic_id)
SELECT 
  f.id as flat_id,
  c.characteristic_id::uuid
FROM 
  (SELECT id FROM public.flats WHERE name ILIKE '%brookside pear%' LIMIT 1) f,
  (VALUES 
    ('0bc5bcea-efa5-4443-910f-8c4777c56a5c'),
    ('13e95a6e-0cbc-404d-ab4d-ddcc08a2ebfc'),
    ('3dc0d506-2e16-4478-9654-77b694b9e3c5'),
    ('5737d267-0481-4904-9b99-2d26ca4d4526'),
    ('5e0ae334-edcd-48b7-8489-68222c754e20'),
    ('744bad2d-10c5-40dc-a35b-2b41502d5d93'),
    ('ab1732c2-51e8-480c-9b8c-b37710aca49b'),
    ('ae234d43-0117-4eac-8925-e609e4e5f196'),
    ('e96af127-a3e3-46ff-8d0d-62252fb4813e'),
    ('ecdd3c62-0d41-4882-a01e-50d829790e92')
  ) c(characteristic_id);