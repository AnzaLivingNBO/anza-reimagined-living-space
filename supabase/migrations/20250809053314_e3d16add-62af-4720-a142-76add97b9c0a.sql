-- Add images from kentmere/MBR folder to room 84122065-0993-48d8-ac82-fd2cf5c0c685
-- First, let's check what images exist in the storage bucket
-- Then insert them into room_images table

INSERT INTO room_images (room_id, image_url, alt_text, display_order)
SELECT 
  '84122065-0993-48d8-ac82-fd2cf5c0c685'::uuid as room_id,
  'https://hrtciuqexgybunnfjzsg.supabase.co/storage/v1/object/public/room-images/' || name as image_url,
  'Room image ' || ROW_NUMBER() OVER (ORDER BY name) as alt_text,
  ROW_NUMBER() OVER (ORDER BY name) as display_order
FROM storage.objects 
WHERE bucket_id = 'room-images' 
  AND name LIKE 'kentmere/MBR/%'
  AND name NOT LIKE '%/.emptyFolderPlaceholder';