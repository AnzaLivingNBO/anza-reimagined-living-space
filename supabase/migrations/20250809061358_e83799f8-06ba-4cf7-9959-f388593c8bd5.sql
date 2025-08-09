-- Add room images from Kentmere/BR1 folder to the specified room
INSERT INTO room_images (room_id, image_url, display_order, alt_text)
SELECT 
  '13948927-a0a6-44d2-8f68-f03deaf2c34f' as room_id,
  'https://hrtciuqexgybunnfjzsg.supabase.co/storage/v1/object/public/room-images/' || name as image_url,
  ROW_NUMBER() OVER (ORDER BY name) as display_order,
  'Kentmere BR1 - Image ' || ROW_NUMBER() OVER (ORDER BY name) as alt_text
FROM storage.objects 
WHERE bucket_id = 'room-images' 
  AND name LIKE 'Kentmere/BR1/%' 
  AND name NOT LIKE '%.emptyFolderPlaceholder';

-- Verify the insertion
SELECT 
  ri.room_id,
  ri.image_url,
  ri.display_order,
  ri.alt_text
FROM room_images ri
WHERE ri.room_id = '13948927-a0a6-44d2-8f68-f03deaf2c34f'
ORDER BY ri.display_order;