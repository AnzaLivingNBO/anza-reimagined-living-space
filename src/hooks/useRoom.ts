import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getCharacteristicIcon } from '@/utils/iconMapping';
import type { Tables } from '@/integrations/supabase/types';
import type { Room } from './useRooms';

type RoomWithFullDetails = Tables<'rooms'> & {
  flats: (Tables<'flats'> & {
    flat_gallery_images: Tables<'flat_gallery_images'>[];
  }) | null;
  room_images: Tables<'room_images'>[];
  room_characteristics: (Tables<'room_characteristics'> & {
    characteristics: Tables<'characteristics'> | null;
  })[];
};

export type RoomDetail = Room & {
  roomImages: string[];
  flatGalleryImages: string[];
  flatDescription: string;
};

export const useRoom = (id: string) => {
  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        const { data, error: supabaseError } = await supabase
          .from('rooms')
          .select(`
            *,
            flats (
              *,
              flat_gallery_images (
                *
              )
            ),
            room_images (
              *
            ),
            room_characteristics (
              *,
              characteristics (
                *
              )
            )
          `)
          .eq('id', id)
          .single();

        if (supabaseError) {
          throw supabaseError;
        }

        const roomData = data as RoomWithFullDetails;
        
        const transformedRoom: RoomDetail = {
          id: roomData.id,
          title: roomData.title,
          description: roomData.description || '',
          price: Number(roomData.price),
          period: '/month',
          location: roomData.flats?.location || '',
          neighbourhood: roomData.flats?.location || '',
          image: roomData.room_images[0]?.image_url || '/placeholder.svg',
          available: roomData.availability_status === 'available',
          characteristics: roomData.room_characteristics
            .filter(rc => rc.characteristics)
            .sort((a, b) => (a.characteristics?.importance_order || 0) - (b.characteristics?.importance_order || 0))
            .map(rc => ({
              label: rc.characteristics!.name,
              icon: getCharacteristicIcon(rc.characteristics!.name)
            })),
          roomImages: roomData.room_images
            .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
            .map(img => img.image_url),
          flatGalleryImages: roomData.flats?.flat_gallery_images
            ?.sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
            .map(img => img.image_url) || [],
          flatDescription: roomData.flats?.about_description || ''
        };

        setRoom(transformedRoom);
      } catch (err) {
        console.error('Error fetching room:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch room');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  return { room, loading, error };
};