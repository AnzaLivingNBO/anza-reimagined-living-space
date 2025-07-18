import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface RoomWithFlat {
  id: string;
  title: string;
  price: number;
  availability_status: string;
  flat: {
    id: string;
    name: string;
    location: string;
  };
}

export const useAllRoomsWithFlats = () => {
  return useQuery({
    queryKey: ["rooms-with-flats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select(`
          id,
          title,
          price,
          availability_status,
          flats!inner (
            id,
            name,
            location
          )
        `)
        .order("title");

      if (error) {
        console.error("Error fetching rooms with flats:", error);
        throw error;
      }

      return data as (Omit<RoomWithFlat, 'flat'> & { flats: RoomWithFlat['flat'] })[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};