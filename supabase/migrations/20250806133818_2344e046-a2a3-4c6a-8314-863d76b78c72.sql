-- Link existing characteristics to Prelax flat
INSERT INTO public.flat_characteristics (flat_id, characteristic_id)
SELECT 
  f.id as flat_id,
  c.characteristic_id
FROM 
  (SELECT id FROM public.flats WHERE name ILIKE '%prelax%' LIMIT 1) f,
  (VALUES 
    ('0bc5bcea-efa5-4443-910f-8c4777c56a5c'),
    ('3dc0d506-2e16-4478-9654-77b694b9e3c5'),
    ('5737d267-0481-4904-9b99-2d26ca4d4526'),
    ('5e0ae334-edcd-48b7-8489-68222c754e20'),
    ('c939beb1-7f4f-4a81-bedb-96565c79507f'),
    ('e96af127-a3e3-46ff-8d0d-62252fb4813e')
  ) c(characteristic_id);