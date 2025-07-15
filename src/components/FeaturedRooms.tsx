import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MapPin, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRooms } from '@/hooks/useRooms';

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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room, index) => (
              <div 
                key={room.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-soft hover-lift border border-border/50 animate-fade-up"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-smooth"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant={room.available ? "default" : "secondary"}
                      className={room.available ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
                    >
                      {room.available ? 'Available' : 'Coming Soon'}
                    </Badge>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-card-foreground">
                        {room.title}
                      </h3>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{room.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ${room.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {room.period}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {room.description}
                  </p>
                  
                   {/* Characteristics - Show first 6 characteristics */}
                   <div className="flex items-center gap-2 mb-6 overflow-x-auto">
                     {room.characteristics.slice(0, 6).map((characteristic, i) => {
                       const Icon = characteristic.icon;
                      return (
                        <Tooltip key={i}>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg hover:bg-primary/20 transition-smooth cursor-help shrink-0">
                              <Icon className="w-4 h-4 text-muted-foreground hover:text-primary transition-smooth" />
                            </div>
                           </TooltipTrigger>
                           <TooltipContent>
                             <p>{characteristic.label}</p>
                           </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                  
                  <Link to={`/rooms/${room.id}`}>
                    <Button 
                      className={`w-full ${room.available ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'}`}
                      disabled={!room.available}
                    >
                      {room.available ? 'View Details' : 'Notify When Available'}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/rooms">
              <Button variant="outline" size="lg" className="px-8 py-3">
                View All Rooms
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};