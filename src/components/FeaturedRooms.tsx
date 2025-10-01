import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MapPin, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAllRoomsWithFlats } from '@/hooks/useAllRoomsWithFlats';
import { StatusBadge } from "@/utils/statusBadge";
export const FeaturedRooms = () => {
  const {
    data: rooms,
    isLoading: loading,
    error
  } = useAllRoomsWithFlats();

  // Prioritize rooms by availability status: available > becoming_available > others
  const featuredRooms = (() => {
    if (!rooms) return [];
    const available = rooms.filter(room => room.availability_status === 'available');
    const becomingAvailable = rooms.filter(room => room.availability_status === 'becoming_available');
    const others = rooms.filter(room => !['available', 'becoming_available'].includes(room.availability_status));

    // Take up to 3 rooms, prioritizing available first
    const prioritized = [...available, ...becomingAvailable, ...others];
    return prioritized.slice(0, 3);
  })();
  if (loading) {
    return <TooltipProvider>
        <section id="rooms" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Featured Furnished Rooms
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Browse our carefully curated selection of fully furnished rooms in prime locations
              </p>
            </div>
            
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading rooms...</span>
            </div>
          </div>
        </section>
      </TooltipProvider>;
  }
  if (error) {
    return <TooltipProvider>
        <section id="rooms" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Featured Furnished Rooms
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Browse our carefully curated selection of fully furnished rooms in prime locations
              </p>
            </div>
            
            <div className="text-center py-12">
              <p className="text-muted-foreground">Unable to load rooms. Please try again later.</p>
            </div>
          </div>
        </section>
      </TooltipProvider>;
  }
  return <TooltipProvider>
      <section id="rooms" className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14 md:mb-16 animate-fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">
              Featured Furnished Rooms
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">Browse our selection of fully furnished rooms in prime locations</p>
          </div>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredRooms.map((room, index) => <Card key={room.id} className="overflow-hidden hover:shadow-xl transition-smooth transform hover:scale-105 hover:-translate-y-1 border-2 border-transparent hover:border-primary/30 animate-fade-up" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="relative">
                  <img src={room.room_images?.[0]?.image_url || "/placeholder.svg"} alt={room.title} className="w-full h-44 sm:h-48 object-cover" loading="eager" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-smooth"></div>
                  <StatusBadge status={room.availability_status} className="absolute top-2 right-2" />
                </div>
                <CardContent className="p-4 sm:p-6 bg-gradient-to-br from-background to-primary/5">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-foreground">{room.title}</h3>
                  <div className="flex items-center text-muted-foreground mb-3 sm:mb-2">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="text-sm">{room.flats.location}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2">
                    <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      KES {room.price.toLocaleString()}<span className="text-xs sm:text-sm text-muted-foreground">/month</span>
                    </div>
                    <Link to={`/rooms/${room.id}`} className="w-full sm:w-auto">
                      <Button size="sm" className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-medium transition-smooth w-full sm:w-auto" disabled={room.availability_status === 'unavailable'}>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>)}
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Link to="/rooms">
              <Button variant="outline" size="lg" className="px-6 sm:px-8 py-2.5 sm:py-3 text-emerald-500 w-full sm:w-auto">
                View All Rooms
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </TooltipProvider>;
};