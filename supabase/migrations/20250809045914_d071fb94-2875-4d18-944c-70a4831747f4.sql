-- Update the flat_gallery_images to use full Supabase storage URLs
UPDATE public.flat_gallery_images 
SET image_url = CONCAT('https://hrtciuqexgybunnfjzsg.supabase.co/storage/v1/object/public/flat-gallery/', image_url)
WHERE flat_id = '20f22ec5-424e-4ec7-9f4f-19492afa406e' 
AND image_url NOT LIKE 'https://%';