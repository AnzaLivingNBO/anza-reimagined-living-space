import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MapPin, Wifi, Car, Coffee } from 'lucide-react';
import room1 from '@/assets/room-1.jpg';
import room2 from '@/assets/room-2.jpg';
import room3 from '@/assets/room-3.jpg';

const rooms = [
  {
    id: 1,
    title: 'Cozy Private Room',
    location: 'Central Downtown',
    price: '$850',
    period: '/month',
    image: room1,
    amenities: [
      { icon: Wifi, label: 'WiFi' },
      { icon: Car, label: 'Parking' },
      { icon: Coffee, label: 'Kitchen Access' }
    ],
    description: 'A beautiful private room in a modern shared apartment with all amenities included.',
    available: true
  },
  {
    id: 2,
    title: 'Modern Shared Space',
    location: 'Tech District',
    price: '$720',
    period: '/month',
    image: room2,
    amenities: [
      { icon: Wifi, label: 'WiFi' },
      { icon: Coffee, label: 'Shared Kitchen' }
    ],
    description: 'Perfect for young professionals looking for a vibrant community atmosphere.',
    available: true
  },
  {
    id: 3,
    title: 'Luxury Co-Living',
    location: 'Riverside',
    price: '$950',
    period: '/month',
    image: room3,
    amenities: [
      { icon: Wifi, label: 'WiFi' },
      { icon: Car, label: 'Parking' },
      { icon: Coffee, label: 'Gym Access' }
    ],
    description: 'Premium co-living experience with stunning views and top-tier amenities.',
    available: false
  }
];

export const FeaturedRooms = () => {
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
            {rooms.map((room, index) => (
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
                        {room.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {room.period}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {room.description}
                  </p>
                  
                  {/* Amenities */}
                  <div className="flex items-center space-x-4 mb-6">
                    {room.amenities.map((amenity, i) => {
                      const Icon = amenity.icon;
                      return (
                        <Tooltip key={i}>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg hover:bg-primary/20 transition-smooth cursor-help">
                              <Icon className="w-4 h-4 text-muted-foreground hover:text-primary transition-smooth" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{amenity.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                  
                  <Button 
                    className={`w-full ${room.available ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'}`}
                    disabled={!room.available}
                  >
                    {room.available ? 'View Details' : 'Notify When Available'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8 py-3">
              View All Rooms
            </Button>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};