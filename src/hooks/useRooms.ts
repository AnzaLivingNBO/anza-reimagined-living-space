import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getCharacteristicIcon } from '@/utils/iconMapping';
import type { Tables } from '@/integrations/supabase/types';

type RoomWithDetails = Tables<'rooms'> & {
  flats: Tables<'flats'> | null;
  room_images: Tables<'room_images'>[];
  room_characteristics: (Tables<'room_characteristics'> & {
    characteristics: Tables<'characteristics'> | null;
  })[];
};

export type Room = {
  id: string;
  title: string;
  description: string;
  price: number;
  period: string;
  location: string;
  neighbourhood: string;
  image: string;
  available: boolean;
  characteristics: Array<{
    label: string;
    icon: any;
  }>;
};

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        
        const { data, error: supabaseError } = await supabase
          .from('rooms')
          .select(`
            *,
            flats (
              *
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
          .order('created_at', { ascending: false });

        if (supabaseError) {
          throw supabaseError;
        }

        const transformedRooms: Room[] = (data as RoomWithDetails[]).map((room) => ({
          id: room.id,
          title: room.title,
          description: room.description || '',
          price: Number(room.price),
          period: '/month',
          location: room.flats?.location || '',
          neighbourhood: room.flats?.location || '',
          image: room.room_images[0]?.image_url || '/placeholder.svg',
          available: room.availability_status === 'available',
          characteristics: room.room_characteristics
            .filter(rc => rc.characteristics)
            .map(rc => ({
              label: rc.characteristics!.name,
              icon: getCharacteristicIcon(rc.characteristics!.name)
            }))
        }));

        setRooms(transformedRooms);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return { rooms, loading, error };
};