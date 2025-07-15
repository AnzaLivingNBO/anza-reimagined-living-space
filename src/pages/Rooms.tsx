import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RoomMap } from '@/components/RoomMap';
import { MapPin, Wifi, Car, Coffee, Search, Filter, AlertCircle } from 'lucide-react';
import room1 from '@/assets/room-1.jpg';
import room2 from '@/assets/room-2.jpg';
import room3 from '@/assets/room-3.jpg';

const allRooms = [
  {
    id: 1,
    title: 'Cozy Private Room',
    location: 'Central Downtown',
    price: 850,
    period: '/month',
    image: room1,
    features: ['WiFi', 'Parking', 'Kitchen Access', 'Laundry'],
    amenities: [
      { icon: Wifi, label: 'WiFi' },
      { icon: Car, label: 'Parking' },
      { icon: Coffee, label: 'Kitchen Access' }
    ],
    description: 'A beautiful private room in a modern shared apartment with all amenities included.',
    available: true,
    neighbourhood: 'Kileleshwa'
  },
  {
    id: 2,
    title: 'Modern Shared Space',
    location: 'Tech District',
    price: 720,
    period: '/month',
    image: room2,
    features: ['WiFi', 'Shared Kitchen', 'Lounge Area', 'Study Room'],
    amenities: [
      { icon: Wifi, label: 'WiFi' },
      { icon: Coffee, label: 'Shared Kitchen' }
    ],
    description: 'Perfect for young professionals looking for a vibrant community atmosphere.',
    available: true,
    neighbourhood: 'Westlands'
  },
  {
    id: 3,
    title: 'Luxury Co-Living',
    location: 'Riverside',
    price: 950,
    period: '/month',
    image: room3,
    features: ['WiFi', 'Parking', 'Gym Access', 'Rooftop', 'Concierge'],
    amenities: [
      { icon: Wifi, label: 'WiFi' },
      { icon: Car, label: 'Parking' },
      { icon: Coffee, label: 'Gym Access' }
    ],
    description: 'Premium co-living experience with stunning views and top-tier amenities.',
    available: false,
    neighbourhood: 'Lavington'
  },
  {
    id: 4,
    title: 'Student Haven',
    location: 'University District',
    price: 650,
    period: '/month',
    image: room1,
    features: ['WiFi', 'Study Areas', 'Library Access', 'Events'],
    amenities: [
      { icon: Wifi, label: 'WiFi' },
      { icon: Coffee, label: 'Study Areas' }
    ],
    description: 'Perfect for students with dedicated study spaces and social areas.',
    available: true,
    neighbourhood: 'Parklands'
  },
  {
    id: 5,
    title: 'Executive Suite',
    location: 'Business District',
    price: 1200,
    period: '/month',
    image: room2,
    features: ['WiFi', 'Parking', 'Office Space', 'Cleaning Service'],
    amenities: [
      { icon: Wifi, label: 'WiFi' },
      { icon: Car, label: 'Parking' },
      { icon: Coffee, label: 'Office Space' }
    ],
    description: 'Premium accommodation for business professionals with executive amenities.',
    available: true,
    neighbourhood: 'Westlands'
  },
  {
    id: 6,
    title: 'Artist Loft',
    location: 'Creative Quarter',
    price: 800,
    period: '/month',
    image: room3,
    features: ['WiFi', 'Art Studio', 'Workshop Access', 'Gallery Space'],
    amenities: [
      { icon: Wifi, label: 'WiFi' }
    ],
    description: 'Inspiring space for creative professionals with dedicated studio areas.',
    available: true,
    neighbourhood: 'Kileleshwa'
  }
];

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [mapboxToken, setMapboxToken] = useState('');

  const filteredRooms = allRooms.filter(room => {
    const matchesSearch = room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNeighbourhood = selectedNeighbourhood === 'all' || room.neighbourhood.toLowerCase().includes(selectedNeighbourhood);
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && room.price < 750) ||
                        (priceRange === 'medium' && room.price >= 750 && room.price < 1000) ||
                        (priceRange === 'high' && room.price >= 1000);
    
    return matchesSearch && matchesNeighbourhood && matchesPrice;
  });

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up">
              Find Your Perfect{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Room
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-up" style={{animationDelay: '0.1s'}}>
              Browse our collection of fully furnished rooms in prime locations across the city
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search rooms or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              
              <Select value={selectedNeighbourhood} onValueChange={setSelectedNeighbourhood}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Neighbourhood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Neighbourhoods</SelectItem>
                  <SelectItem value="kileleshwa">Kileleshwa</SelectItem>
                  <SelectItem value="lavington">Lavington</SelectItem>
                  <SelectItem value="parklands">Parklands</SelectItem>
                  <SelectItem value="westlands">Westlands</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="low">Under $750</SelectItem>
                  <SelectItem value="medium">$750 - $1000</SelectItem>
                  <SelectItem value="high">$1000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Mapbox Token Input */}
      {!mapboxToken && (
        <section className="py-4 bg-yellow-50 border-b border-yellow-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 max-w-2xl mx-auto">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-yellow-700 mb-2">
                  To enable maps, please enter your Mapbox public token. Get it from{' '}
                  <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">
                    mapbox.com
                  </a>
                </p>
                <Input
                  placeholder="Enter your Mapbox public token (pk.xxx...)"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Rooms List */}
      <TooltipProvider>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <p className="text-muted-foreground">
                Showing {filteredRooms.length} of {allRooms.length} rooms
              </p>
            </div>
            
            <div className="space-y-8">
              {filteredRooms.map((room, index) => (
                <div 
                  key={room.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-soft hover-lift border border-border/50 animate-fade-up"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="flex h-80">
                    {/* Image Section */}
                    <div className="relative w-1/3 h-full overflow-hidden">
                      <img 
                        src={room.image} 
                        alt={room.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
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
                    
                    {/* Content Section */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2 text-card-foreground">
                              {room.title}
                            </h3>
                            <div className="flex items-center text-muted-foreground mb-3">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span className="text-sm">{room.location} • {room.neighbourhood}</span>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-3xl font-bold text-primary">
                              ${room.price}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {room.period}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {room.description}
                        </p>
                        
                        {/* Amenities */}
                        <div className="flex items-center space-x-4 mb-6">
                          {room.amenities.map((amenity, i) => {
                            const Icon = amenity.icon;
                            return (
                              <Tooltip key={i}>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-lg hover:bg-primary/20 transition-smooth cursor-help">
                                    <Icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-smooth" />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{amenity.label}</p>
                                </TooltipContent>
                              </Tooltip>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className="flex items-end justify-between">
                        {room.available ? (
                          <Link to={`/rooms/${room.id}`}>
                            <Button className="btn-primary">
                              View Details
                            </Button>
                          </Link>
                        ) : (
                          <Button className="btn-secondary opacity-50 cursor-not-allowed" disabled>
                            Notify When Available
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {/* Map Section */}
                    <div className="w-1/3 h-full">
                      <RoomMap 
                        location={room.location}
                        neighbourhood={room.neighbourhood}
                        mapboxToken={mapboxToken}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredRooms.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No rooms found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedNeighbourhood('all');
                    setPriceRange('all');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </TooltipProvider>

      <Footer />
    </div>
  );
};

export default Rooms;