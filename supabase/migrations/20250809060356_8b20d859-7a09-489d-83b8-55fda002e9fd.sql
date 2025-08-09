-- Add room images from Kentmere/MBR folder to the specified room
INSERT INTO room_images (room_id, image_url, display_order, alt_text)
SELECT 
  '84122065-0993-48d8-ac82-fd2cf5c0c685' as room_id,
  'https://hrtciuqexgybunnfjzsg.supabase.co/storage/v1/object/public/room-images/' || name as image_url,
  ROW_NUMBER() OVER (ORDER BY name) as display_order,
  'Kentmere Master Bedroom - Image ' || ROW_NUMBER() OVER (ORDER BY name) as alt_text
FROM storage.objects 
WHERE bucket_id = 'room-images' 
  AND name LIKE 'Kentmere/MBR/%' 
  AND name NOT LIKE '%.emptyFolderPlaceholder';

-- Verify the insertion
SELECT 
  ri.room_id,
  ri.image_url,
  ri.display_order,
  ri.alt_text
FROM room_images ri
WHERE ri.room_id = '84122065-0993-48d8-ac82-fd2cf5c0c685'
ORDER BY ri.display_order;