import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Wifi, Car, Coffee, Star } from 'lucide-react';
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
    rating: 4.9,
    features: ['WiFi', 'Parking', 'Kitchen Access'],
    amenities: [Wifi, Car, Coffee],
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
    rating: 4.8,
    features: ['WiFi', 'Shared Kitchen', 'Lounge Area'],
    amenities: [Wifi, Coffee],
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
    rating: 5.0,
    features: ['WiFi', 'Parking', 'Gym Access', 'Rooftop'],
    amenities: [Wifi, Car, Coffee],
    description: 'Premium co-living experience with stunning views and top-tier amenities.',
    available: false
  }
];

export const FeaturedRooms = () => {
  return (
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
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{room.rating}</span>
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
                  {room.amenities.map((Amenity, i) => (
                    <div key={i} className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
                      <Amenity className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                
                {/* Features Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.features.map((feature, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
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
  );
};