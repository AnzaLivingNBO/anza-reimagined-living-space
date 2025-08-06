-- Link existing characteristics to Kentmere Valley flat
INSERT INTO public.flat_characteristics (flat_id, characteristic_id)
SELECT 
  f.id as flat_id,
  c.characteristic_id::uuid
FROM 
  (SELECT id FROM public.flats WHERE name ILIKE '%kentmere valley%' LIMIT 1) f,
  (VALUES 
    ('00b60ab9-43d8-429c-b55e-5f8a611a75a5'),
    ('0bc5bcea-efa5-4443-910f-8c4777c56a5c'),
    ('3dc0d506-2e16-4478-9654-77b694b9e3c5'),
    ('54af1927-d260-49f1-86c7-3b5332d77924'),
    ('5737d267-0481-4904-9b99-2d26ca4d4526'),
    ('5e0ae334-edcd-48b7-8489-68222c754e20'),
    ('744bad2d-10c5-40dc-a35b-2b41502d5d93'),
    ('ab1732c2-51e8-480c-9b8c-b37710aca49b'),
    ('c939beb1-7f4f-4a81-bedb-96565c79507f'),
    ('e96af127-a3e3-46ff-8d0d-62252fb4813e'),
    ('ecdd3c62-0d41-4882-a01e-50d829790e92')
  ) c(characteristic_id);