import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MapPin, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRooms } from '@/hooks/useRooms';
import { StatusBadge } from "@/utils/statusBadge";

export const FeaturedRooms = () => {
  const { rooms, loading, error } = useRooms();
  
  // Get the first 3 rooms for featured display
  const featuredRooms = rooms.slice(0, 3);

  if (loading) {
    return (
      <TooltipProvider>
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
      </TooltipProvider>
    );
  }

  if (error) {
    return (
      <TooltipProvider>
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
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRooms.map((room, index) => (
              <Card 
                key={room.id} 
                className="overflow-hidden hover:shadow-xl transition-smooth transform hover:scale-105 hover:-translate-y-1 border-2 border-transparent hover:border-primary/30 animate-fade-up"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="relative">
                  <img 
                    src={room.image} 
                    alt={room.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-smooth"></div>
                  <StatusBadge 
                    status={room.available ? 'available' : 'coming_soon'}
                    className="absolute top-2 right-2"
                  />
                </div>
                <CardContent className="p-6 bg-gradient-to-br from-background to-primary/5">
                  <h3 className="font-semibold mb-2 text-foreground">{room.title}</h3>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{room.location}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                    {room.description}
                  </p>
                  
                  {/* Characteristics - Show first 6 characteristics */}
                  <div className="flex items-center gap-2 mb-4 overflow-visible">
                    {room.characteristics.slice(0, 6).map((characteristic, i) => {
                      const Icon = characteristic.icon;
                      return (
                        <Tooltip key={i}>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg hover:bg-primary/20 transition-smooth cursor-help shrink-0 relative z-10">
                              <Icon className="w-4 h-4 text-muted-foreground hover:text-primary transition-smooth" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="z-50">
                            <p>{characteristic.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      KES {room.price.toLocaleString()}<span className="text-sm text-muted-foreground">/{room.period}</span>
                    </div>
                    <Link to={`/rooms/${room.id}`}>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-medium transition-smooth"
                        disabled={!room.available}
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/flats">
              <Button variant="outline" size="lg" className="px-8 py-3">
                View All Flats
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};