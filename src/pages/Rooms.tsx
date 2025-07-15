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
import { MapPin, Search, Filter, AlertCircle, Loader2 } from 'lucide-react';
import { useRooms } from '@/hooks/useRooms';


const Rooms = () => {
  const { rooms, loading, error } = useRooms();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [mapboxToken, setMapboxToken] = useState('');

  const filteredRooms = rooms.filter(room => {
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
                Showing {filteredRooms.length} of {rooms.length} rooms
              </p>
            </div>
            
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading rooms...</span>
              </div>
            )}
            
            {error && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Unable to load rooms. Please try again later.</p>
              </div>
            )}
            
            {!loading && !error && (
            
            <div className="space-y-8">
              {filteredRooms.map((room, index) => (
                <Link 
                  key={room.id} 
                  to={`/rooms/${room.id}`}
                  className="block group bg-card rounded-2xl overflow-hidden shadow-soft hover-lift border border-border/50 animate-fade-up transition-smooth"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="flex flex-col lg:flex-row h-auto lg:h-80">
                    {/* Image Section */}
                    <div className="relative w-full lg:w-1/2 h-64 lg:h-full overflow-hidden">
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
                    <div className="flex-1 p-4 lg:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                          <div className="flex-1 mb-3 sm:mb-0">
                            <h3 className="text-xl lg:text-2xl font-bold mb-2 text-card-foreground">
                              {room.title}
                            </h3>
                            <div className="flex items-center text-muted-foreground mb-3">
                              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="text-sm">{room.location} • {room.neighbourhood}</span>
                            </div>
                          </div>
                          <div className="text-left sm:text-right sm:ml-4">
                            <div className="text-2xl lg:text-3xl font-bold text-primary">
                              ${room.price}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {room.period}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
                          {room.description.length > 140 ? `${room.description.substring(0, 140)}...` : room.description}
                        </p>
                        
                         {/* Characteristics */}
                         <div className="overflow-x-auto scrollbar-hide mb-4 lg:mb-6">
                           <div className="flex items-center gap-2 lg:gap-3 pb-2 min-w-max">
                             {room.characteristics.map((characteristic, i) => {
                               const Icon = characteristic.icon;
                              return (
                                <Tooltip key={i}>
                                  <TooltipTrigger asChild>
                                    <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-muted rounded-lg hover:bg-primary/20 transition-smooth cursor-help flex-shrink-0">
                                      <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground hover:text-primary transition-smooth" />
                                    </div>
                                   </TooltipTrigger>
                                   <TooltipContent>
                                     <p>{characteristic.label}</p>
                                   </TooltipContent>
                                </Tooltip>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-end justify-between">
                        {room.available ? (
                          <Link to={`/rooms/${room.id}`}>
                            <Button className="btn-primary" size="sm">
                              View Details
                            </Button>
                          </Link>
                        ) : (
                          <Button className="btn-secondary opacity-50 cursor-not-allowed" disabled size="sm">
                            Notify When Available
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {/* Map Section */}
                    <div className="w-full lg:w-1/3 h-48 lg:h-full">
                      <RoomMap 
                        location={room.location}
                        neighbourhood={room.neighbourhood}
                        mapboxToken={mapboxToken}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            )}
            
            {!loading && !error && filteredRooms.length === 0 && (
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