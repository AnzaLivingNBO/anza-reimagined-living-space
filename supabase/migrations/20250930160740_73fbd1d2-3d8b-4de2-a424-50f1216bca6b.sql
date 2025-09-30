-- Link Prelax BR1 images from storage to room_images table
INSERT INTO room_images (room_id, image_url, alt_text, display_order)
VALUES 
  ('c62f9cb5-f857-4e55-97f0-aad79c243a57', 'https://hrtciuqexgybunnfjzsg.supabase.co/storage/v1/object/public/room-images/Prelax/BR1/IMG_2455.jpg', 'Prelax BR1 - Room View 1', 0),
  ('c62f9cb5-f857-4e55-97f0-aad79c243a57', 'https://hrtciuqexgybunnfjzsg.supabase.co/storage/v1/object/public/room-images/Prelax/BR1/IMG_2460.jpg', 'Prelax BR1 - Room View 2', 1),
  ('c62f9cb5-f857-4e55-97f0-aad79c243a57', 'https://hrtciuqexgybunnfjzsg.supabase.co/storage/v1/object/public/room-images/Prelax/BR1/IMG_2464.jpg', 'Prelax BR1 - Room View 3', 2);