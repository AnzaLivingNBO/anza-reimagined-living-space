import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Wifi, Car, Coffee, Star, Search, Filter } from 'lucide-react';
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
    rating: 4.9,
    features: ['WiFi', 'Parking', 'Kitchen Access', 'Laundry'],
    amenities: [Wifi, Car, Coffee],
    description: 'A beautiful private room in a modern shared apartment with all amenities included.',
    available: true,
    type: 'Private Room',
    city: 'Downtown'
  },
  {
    id: 2,
    title: 'Modern Shared Space',
    location: 'Tech District',
    price: 720,
    period: '/month',
    image: room2,
    rating: 4.8,
    features: ['WiFi', 'Shared Kitchen', 'Lounge Area', 'Study Room'],
    amenities: [Wifi, Coffee],
    description: 'Perfect for young professionals looking for a vibrant community atmosphere.',
    available: true,
    type: 'Shared Room',
    city: 'Tech District'
  },
  {
    id: 3,
    title: 'Luxury Co-Living',
    location: 'Riverside',
    price: 950,
    period: '/month',
    image: room3,
    rating: 5.0,
    features: ['WiFi', 'Parking', 'Gym Access', 'Rooftop', 'Concierge'],
    amenities: [Wifi, Car, Coffee],
    description: 'Premium co-living experience with stunning views and top-tier amenities.',
    available: false,
    type: 'Studio',
    city: 'Riverside'
  },
  {
    id: 4,
    title: 'Student Haven',
    location: 'University District',
    price: 650,
    period: '/month',
    image: room1,
    rating: 4.7,
    features: ['WiFi', 'Study Areas', 'Library Access', 'Events'],
    amenities: [Wifi, Coffee],
    description: 'Perfect for students with dedicated study spaces and social areas.',
    available: true,
    type: 'Shared Room',
    city: 'University'
  },
  {
    id: 5,
    title: 'Executive Suite',
    location: 'Business District',
    price: 1200,
    period: '/month',
    image: room2,
    rating: 4.9,
    features: ['WiFi', 'Parking', 'Office Space', 'Cleaning Service'],
    amenities: [Wifi, Car, Coffee],
    description: 'Premium accommodation for business professionals with executive amenities.',
    available: true,
    type: 'Private Room',
    city: 'Business'
  },
  {
    id: 6,
    title: 'Artist Loft',
    location: 'Creative Quarter',
    price: 800,
    period: '/month',
    image: room3,
    rating: 4.6,
    features: ['WiFi', 'Art Studio', 'Workshop Access', 'Gallery Space'],
    amenities: [Wifi],
    description: 'Inspiring space for creative professionals with dedicated studio areas.',
    available: true,
    type: 'Studio',
    city: 'Creative'
  }
];

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const filteredRooms = allRooms.filter(room => {
    const matchesSearch = room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'all' || room.city.toLowerCase().includes(selectedCity);
    const matchesType = selectedType === 'all' || room.type === selectedType;
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && room.price < 750) ||
                        (priceRange === 'medium' && room.price >= 750 && room.price < 1000) ||
                        (priceRange === 'high' && room.price >= 1000);
    
    return matchesSearch && matchesCity && matchesType && matchesPrice;
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
              
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="downtown">Downtown</SelectItem>
                  <SelectItem value="tech">Tech District</SelectItem>
                  <SelectItem value="riverside">Riverside</SelectItem>
                  <SelectItem value="university">University</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Private Room">Private Room</SelectItem>
                  <SelectItem value="Shared Room">Shared Room</SelectItem>
                  <SelectItem value="Studio">Studio</SelectItem>
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

      {/* Rooms Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing {filteredRooms.length} of {allRooms.length} rooms
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room, index) => (
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
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge 
                      variant={room.available ? "default" : "secondary"}
                      className={room.available ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
                    >
                      {room.available ? 'Available' : 'Coming Soon'}
                    </Badge>
                    <Badge variant="outline">
                      {room.type}
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
                    {room.features.slice(0, 3).map((feature, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {room.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{room.features.length - 3} more
                      </Badge>
                    )}
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
                  setSelectedCity('all');
                  setSelectedType('all');
                  setPriceRange('all');
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rooms;