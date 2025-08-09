-- Get all images from the Prelax folder in flat-gallery bucket and add them to flat_gallery_images
-- First, let's see what storage objects exist in the flat-gallery bucket for Prelax
DO $$
DECLARE
    flat_uuid UUID := '20f22ec5-424e-4ec7-9f4f-19492afa406e';
    img_record RECORD;
    counter INTEGER := 1;
BEGIN
    -- Insert images from storage.objects where the name starts with 'Prelax/'
    FOR img_record IN 
        SELECT name, id, bucket_id
        FROM storage.objects 
        WHERE bucket_id = 'flat-gallery' 
        AND name LIKE 'Prelax/%'
        AND name NOT LIKE '%/'  -- Exclude folder entries
    LOOP
        INSERT INTO public.flat_gallery_images (
            flat_id,
            image_url,
            alt_text,
            display_order
        ) VALUES (
            flat_uuid,
            img_record.name,
            'Prelax Appartments gallery image',
            counter
        );
        
        counter := counter + 1;
        
        RAISE NOTICE 'Added image: %', img_record.name;
    END LOOP;
    
    RAISE NOTICE 'Total images added: %', counter - 1;
END $$;