-- Link Brookside BR1 images from storage to room_images table
INSERT INTO room_images (room_id, image_url, alt_text, display_order)
VALUES 
  ('4290a305-de75-467d-ab1f-87205a92b0a8', 'https://hrtciuqexgybunnfjzsg.supabase.co/storage/v1/object/public/room-images/Brookside/BR1/IMG_5629.jpg', 'Brookside BR1 - Room View 1', 0),
  ('4290a305-de75-467d-ab1f-87205a92b0a8', 'https://hrtciuqexgybunnfjzsg.supabase.co/storage/v1/object/public/room-images/Brookside/BR1/IMG_9657.JPEG', 'Brookside BR1 - Room View 2', 1);