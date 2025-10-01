import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Filter, X } from "lucide-react";
import { getFurnitureIcon } from "@/utils/furnitureIconMapping";
import { getStatusConfig } from "@/utils/statusBadge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Room {
  id: string;
  title: string;
  description: string | null;
  price: number;
  lease_term: string | null;
  room_size: number | null;
  max_occupancy: number | null;
  deposit: number | null;
  availability_status: string;
  flats: {
    id: string;
    name: string;
    location: string;
    neighborhood: string | null;
  };
  room_images: Array<{
    id: string;
    image_url: string;
    alt_text: string | null;
    display_order: number;
  }>;
  room_furniture: Array<{
    id: string;
    quantity: number;
    furniture: {
      id: string;
      name: string;
      description: string | null;
    };
  }>;
}

const Rooms = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<{ [key: string]: number }>({});
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [roomSizeFilter, setRoomSizeFilter] = useState<string>("all");
  const [occupancyFilter, setOccupancyFilter] = useState<string>("all");

  const { data: rooms, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      // Get rooms with flats and images
      const { data: roomsData, error: roomsError } = await supabase
        .from("rooms")
        .select(`
          *,
          flats(id, name, location, neighborhood),
          room_images(*)
        `)
        .order("created_at", { ascending: false });

      if (roomsError) throw roomsError;

      // Get furniture data
      const { data: furniture, error: furnitureError } = await supabase
        .from("furniture")
        .select("id, name, description");

      if (furnitureError) throw furnitureError;

      const { data: roomFurniture, error: rfError } = await supabase
        .from("room_furniture")
        .select("id, room_id, furniture_id, quantity");

      if (rfError) throw rfError;

      // Combine the data
      const roomsWithFurniture = roomsData?.map(room => ({
        ...room,
        room_furniture: roomFurniture?.filter(rf => rf.room_id === room.id).map(rf => ({
          id: rf.id,
          quantity: rf.quantity,
          furniture: furniture?.find(f => f.id === rf.furniture_id) || { id: '', name: '', description: null }
        })) || []
      }));

      return roomsWithFurniture as Room[];
    },
  });

  const { data: locations } = useQuery({
    queryKey: ["room-locations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("flats")
        .select("location")
        .order("location");

      if (error) throw error;
      return [...new Set(data.map(item => item.location))];
    },
  });

  const handleImageChange = (roomId: string, direction: 'next' | 'prev', totalImages: number) => {
    setSelectedImageIndex(prev => {
      const currentIndex = prev[roomId] || 0;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
      } else {
        newIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
      }
      
      return { ...prev, [roomId]: newIndex };
    });
  };

  // Filter rooms based on selected filters
  const filteredRooms = rooms?.filter(room => {
    // Availability filter
    if (availabilityFilter !== "all" && room.availability_status !== availabilityFilter) {
      return false;
    }
    
    // Location filter
    if (locationFilter !== "all" && room.flats.location !== locationFilter) {
      return false;
    }
    
    // Price filter
    if (priceFilter !== "all") {
      const price = Number(room.price);
      switch (priceFilter) {
        case "under-15000":
          if (price >= 15000) return false;
          break;
        case "15000-25000":
          if (price < 15000 || price > 25000) return false;
          break;
        case "25000-35000":
          if (price < 25000 || price > 35000) return false;
          break;
        case "over-35000":
          if (price <= 35000) return false;
          break;
      }
    }

    // Room Size filter
    if (roomSizeFilter !== "all" && room.room_size) {
      const size = Number(room.room_size);
      switch (roomSizeFilter) {
        case "small":
          if (size >= 300) return false;
          break;
        case "medium":
          if (size < 300 || size >= 500) return false;
          break;
        case "large":
          if (size < 500) return false;
          break;
      }
    }

    // Occupancy filter
    if (occupancyFilter !== "all" && room.max_occupancy) {
      const occupancy = Number(room.max_occupancy);
      switch (occupancyFilter) {
        case "single":
          if (occupancy !== 1) return false;
          break;
        case "double":
          if (occupancy !== 2) return false;
          break;
        case "multiple":
          if (occupancy <= 2) return false;
          break;
      }
    }
    
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading rooms...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/5 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Available Rooms
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find your perfect room in Nairobi's most desirable neighborhoods
            </p>
          </div>

          {/* Filters Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card/50 p-4 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Filter className="w-4 h-4" />
                Filter by:
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {/* Location Filter */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">Location</label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All locations</SelectItem>
                      {locations?.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Filter */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">Price Range</label>
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="All prices" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All prices</SelectItem>
                      <SelectItem value="under-15000">Under 15K</SelectItem>
                      <SelectItem value="15000-25000">15K - 25K</SelectItem>
                      <SelectItem value="25000-35000">25K - 35K</SelectItem>
                      <SelectItem value="over-35000">Over 35K</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Room Size Filter */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">Room Size</label>
                  <Select value={roomSizeFilter} onValueChange={setRoomSizeFilter}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="All sizes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All sizes</SelectItem>
                      <SelectItem value="small">Small (&lt;300 sq ft)</SelectItem>
                      <SelectItem value="medium">Medium (300-499 sq ft)</SelectItem>
                      <SelectItem value="large">Large (500+ sq ft)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Occupancy Filter */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">Occupancy</label>
                  <Select value={occupancyFilter} onValueChange={setOccupancyFilter}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="All occupancy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All occupancy</SelectItem>
                      <SelectItem value="single">Single person</SelectItem>
                      <SelectItem value="double">Double occupancy</SelectItem>
                      <SelectItem value="multiple">Multiple (3+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Availability Filter */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">Availability</label>
                  <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="All rooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All rooms</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="becoming_available">Becoming Available</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                {(availabilityFilter !== "all" || locationFilter !== "all" || priceFilter !== "all" || roomSizeFilter !== "all" || occupancyFilter !== "all") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setAvailabilityFilter("all");
                      setLocationFilter("all");
                      setPriceFilter("all");
                      setRoomSizeFilter("all");
                      setOccupancyFilter("all");
                    }}
                    className="flex items-center gap-2 mt-4 sm:mt-6"
                  >
                    <X className="w-3 h-3" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {filteredRooms?.map((room, index) => {
              const currentImageIndex = selectedImageIndex[room.id] || 0;
              const images = room.room_images?.sort((a, b) => a.display_order - b.display_order) || [];
              const furniture = room.room_furniture || [];
              const statusConfig = getStatusConfig(room.availability_status);

              return (
                <Card key={room.id} className="overflow-hidden backdrop-blur-sm bg-card/80 border-border/50 hover:shadow-xl transition-all duration-300 w-full animate-fade-up" style={{
                  animationDelay: `${index * 0.1}s`
                }}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 w-full">
                    {/* Image Section */}
                    <div className="relative lg:col-span-1 w-full">
                      {images.length > 0 ? (
                        <div className="relative h-56 sm:h-64 lg:h-80 group w-full">
                          <img
                            src={images[currentImageIndex]?.image_url}
                            alt={images[currentImageIndex]?.alt_text || `${room.title} photo`}
                            className="w-full h-full object-contain bg-muted/50"
                          />
                          
                          {/* Image Navigation */}
                          {images.length > 1 && (
                            <>
                              <button
                                onClick={() => handleImageChange(room.id, 'prev', images.length)}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Previous image"
                              >
                                ←
                              </button>
                              <button
                                onClick={() => handleImageChange(room.id, 'next', images.length)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Next image"
                              >
                                →
                              </button>
                              
                              {/* Image Indicators */}
                              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                                {images.map((_, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => setSelectedImageIndex(prev => ({ ...prev, [room.id]: idx }))}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                      idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                    }`}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                          
                          {/* Availability Badge */}
                          <Badge className={`${statusConfig.className} absolute top-2 right-2`}>
                            {statusConfig.label}
                          </Badge>
                        </div>
                      ) : (
                        <div className="h-56 sm:h-64 lg:h-80 bg-muted flex items-center justify-center w-full">
                          <span className="text-muted-foreground">No images available</span>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-2 p-4 sm:p-5 lg:p-6 w-full">
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 truncate">{room.title}</h2>
                          <div className="flex items-center text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="text-sm truncate">{room.flats.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Furniture */}
                      {furniture.length > 0 && (
                        <div className="mb-4 w-full overflow-hidden">
                          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                            {furniture.map((item) => {
                              const Icon = getFurnitureIcon(item.furniture.name);
                              return (
                                <Badge key={item.id} variant="secondary" className="flex items-center gap-1 whitespace-nowrap flex-shrink-0">
                                  <Icon className="w-3 h-3" />
                                  <span className="text-xs">{item.furniture.name}</span>
                                  {item.quantity > 1 && <span className="text-xs">({item.quantity})</span>}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <Link to={`/rooms/${room.id}`} className="block">
                        <Button 
                          className="w-full sm:w-full lg:w-auto"
                          disabled={room.availability_status === 'unavailable'}
                        >
                          View Room
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredRooms?.length === 0 && rooms && rooms.length > 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No rooms match your filters</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          )}

          {rooms?.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No rooms available</h3>
              <p className="text-muted-foreground">Check back soon for new listings!</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Rooms;