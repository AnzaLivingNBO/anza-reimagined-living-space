-- Link Brookside BR2 images from storage to room_images table
INSERT INTO room_images (room_id, image_url, alt_text, display_order)
VALUES 
  ('5d62dcfe-f581-424f-8525-456b89453ebe', 'https://hrtciuqexgybunnfjzsg.supabase.co/storage/v1/object/public/room-images/Brookside/BR2/IMG_5629.jpg', 'Brookside BR2 - Room View 1', 0),
  ('5d62dcfe-f581-424f-8525-456b89453ebe', 'https://hrtciuqexgybunnfjzsg.supabase.co/storage/v1/object/public/room-images/Brookside/BR2/IMG_9657.JPEG', 'Brookside BR2 - Room View 2', 1);