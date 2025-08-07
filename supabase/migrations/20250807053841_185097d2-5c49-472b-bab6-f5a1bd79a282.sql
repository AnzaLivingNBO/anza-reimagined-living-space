-- Delete existing characteristics for Shared House with Garden and link new ones
WITH shared_house_flat AS (
  SELECT id FROM public.flats WHERE name ILIKE '%shared house with garden%' LIMIT 1
)
-- First delete existing characteristics
DELETE FROM public.flat_characteristics 
WHERE flat_id = (SELECT id FROM shared_house_flat);

-- Then insert the new characteristics
INSERT INTO public.flat_characteristics (flat_id, characteristic_id)
SELECT 
  f.id as flat_id,
  c.characteristic_id::uuid
FROM 
  (SELECT id FROM public.flats WHERE name ILIKE '%shared house with garden%' LIMIT 1) f,
  (VALUES 
    ('0bc5bcea-efa5-4443-910f-8c4777c56a5c'),
    ('3dc0d506-2e16-4478-9654-77b694b9e3c5'),
    ('54af1927-d260-49f1-86c7-3b5332d77924'),
    ('5737d267-0481-4904-9b99-2d26ca4d4526'),
    ('e5ff2979-4d45-4119-ab61-2c8c42116b53'),
    ('e96af127-a3e3-46ff-8d0d-62252fb4813e'),
    ('ecdd3c62-0d41-4882-a01e-50d829790e92')
  ) c(characteristic_id);