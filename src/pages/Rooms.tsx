import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MapPin, Filter, X, ChevronDown } from "lucide-react";
import { getFurnitureIcon } from "@/utils/furnitureIconMapping";
import { RoomMap } from "@/components/RoomMap";
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
    latitude: number | null;
    longitude: number | null;
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
  const [selectedFurniture, setSelectedFurniture] = useState<string[]>([]);
  const [selectedBathroom, setSelectedBathroom] = useState<string[]>([]);
  const [capacityFilter, setCapacityFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [furnitureOpen, setFurnitureOpen] = useState(false);
  const [bathroomOpen, setBathroomOpen] = useState(false);

  const { data: rooms, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      // Get rooms with flats and images
      const { data: roomsData, error: roomsError } = await supabase
        .from("rooms")
        .select(`
          *,
          flats(id, name, location, neighborhood, latitude, longitude),
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

  const { data: furnitureOptions = [] } = useQuery({
    queryKey: ["furniture"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("furniture")
        .select("id, name")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  const bathroomItems = furnitureOptions.filter(item => 
    item.name.toLowerCase().includes('bathroom')
  );
  const regularFurniture = furnitureOptions.filter(item => 
    !item.name.toLowerCase().includes('bathroom')
  );

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
    
    // Capacity filter
    if (capacityFilter !== "all") {
      const capacity = room.max_occupancy || 1;
      if (capacityFilter === "1" && capacity !== 1) return false;
      if (capacityFilter === "2" && capacity !== 2) return false;
      if (capacityFilter === "3+" && capacity < 3) return false;
    }
    
    // Price filter
    if (priceFilter !== "all") {
      const price = Number(room.price);
      if (priceFilter === "under-20k" && price >= 20000) return false;
      if (priceFilter === "20k-30k" && (price < 20000 || price >= 30000)) return false;
      if (priceFilter === "30k-40k" && (price < 30000 || price >= 40000)) return false;
      if (priceFilter === "40k+" && price < 40000) return false;
    }
    
    // Furniture filter - room must have ALL selected furniture items
    if (selectedFurniture.length > 0) {
      const roomFurnitureIds = room.room_furniture.map(rf => rf.furniture.id);
      const hasAllFurniture = selectedFurniture.every(furnitureId => 
        roomFurnitureIds.includes(furnitureId)
      );
      if (!hasAllFurniture) return false;
    }

    // Bathroom filter - room must have ALL selected bathroom items
    if (selectedBathroom.length > 0) {
      const roomFurnitureIds = room.room_furniture.map(rf => rf.furniture.id);
      const hasAllBathroom = selectedBathroom.every(bathroomId => 
        roomFurnitureIds.includes(bathroomId)
      );
      if (!hasAllBathroom) return false;
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
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-6 text-lg font-semibold">
                <Filter className="w-5 h-5" />
                Filter Rooms
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Location Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Location</Label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations?.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Availability Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Availability</Label>
                  <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="becoming_available">Becoming Available</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                      <SelectItem value="under_maintenance">Under Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Capacity Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Capacity</Label>
                  <Select value={capacityFilter} onValueChange={setCapacityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="1">1 Person</SelectItem>
                      <SelectItem value="2">2 People</SelectItem>
                      <SelectItem value="3+">3+ People</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Price Range</Label>
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="under-20k">Under KES 20,000</SelectItem>
                      <SelectItem value="20k-30k">KES 20,000 - 30,000</SelectItem>
                      <SelectItem value="30k-40k">KES 30,000 - 40,000</SelectItem>
                      <SelectItem value="40k+">KES 40,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Furniture Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Furniture</Label>
                  <Collapsible open={furnitureOpen} onOpenChange={setFurnitureOpen}>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        <span>{selectedFurniture.length > 0 ? `${selectedFurniture.length} selected` : 'Select furniture'}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${furnitureOpen ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <div className="border border-border rounded-lg p-3 max-h-48 overflow-y-auto bg-background">
                        {regularFurniture.length > 0 ? (
                          regularFurniture.map((furniture) => (
                            <div key={furniture.id} className="flex items-center space-x-2 mb-2">
                              <Checkbox
                                id={`furniture-${furniture.id}`}
                                checked={selectedFurniture.includes(furniture.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedFurniture([...selectedFurniture, furniture.id]);
                                  } else {
                                    setSelectedFurniture(selectedFurniture.filter(id => id !== furniture.id));
                                  }
                                }}
                              />
                              <Label
                                htmlFor={`furniture-${furniture.id}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {furniture.name}
                              </Label>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No furniture options</p>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                {/* Bathroom Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Bathroom</Label>
                  <Collapsible open={bathroomOpen} onOpenChange={setBathroomOpen}>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        <span>{selectedBathroom.length > 0 ? `${selectedBathroom.length} selected` : 'Select bathroom features'}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${bathroomOpen ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <div className="border border-border rounded-lg p-3 max-h-48 overflow-y-auto bg-background">
                        {bathroomItems.length > 0 ? (
                          bathroomItems.map((item) => (
                            <div key={item.id} className="flex items-center space-x-2 mb-2">
                              <Checkbox
                                id={`bathroom-${item.id}`}
                                checked={selectedBathroom.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedBathroom([...selectedBathroom, item.id]);
                                  } else {
                                    setSelectedBathroom(selectedBathroom.filter(id => id !== item.id));
                                  }
                                }}
                              />
                              <Label
                                htmlFor={`bathroom-${item.id}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {item.name}
                              </Label>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No bathroom options</p>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>

              {/* Clear Filters Button */}
              {(availabilityFilter !== "all" || locationFilter !== "all" || capacityFilter !== "all" || priceFilter !== "all" || selectedFurniture.length > 0 || selectedBathroom.length > 0) && (
                <div className="mt-6 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAvailabilityFilter("all");
                      setLocationFilter("all");
                      setCapacityFilter("all");
                      setPriceFilter("all");
                      setSelectedFurniture([]);
                      setSelectedBathroom([]);
                    }}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {filteredRooms?.map((room, index) => {
              const currentImageIndex = selectedImageIndex[room.id] || 0;
              const images = room.room_images?.sort((a, b) => a.display_order - b.display_order) || [];
              const furniture = room.room_furniture || [];
              const statusConfig = getStatusConfig(room.availability_status);

              return (
                <Card key={room.id} className="overflow-hidden backdrop-blur-sm bg-card/80 border-border/50 hover:shadow-xl transition-all duration-300 w-full animate-fade-up relative" style={{
                  animationDelay: `${index * 0.1}s`
                }}>
                  {/* Availability Badge - Top Left Corner */}
                  <Badge className={`${statusConfig.className} absolute top-4 left-4 z-10`}>
                    {statusConfig.label}
                  </Badge>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 w-full">
                    {/* Image Section */}
                    <div className="relative lg:col-span-1 w-full">
                      {images.length > 0 ? (
                        <div className="relative h-56 sm:h-64 lg:h-80 group w-full">
                          <img
                            src={images[currentImageIndex]?.image_url}
                            alt={images[currentImageIndex]?.alt_text || `${room.title} photo`}
                            className="w-full h-full object-cover"
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
                        </div>
                      ) : (
                        <div className="h-56 sm:h-64 lg:h-80 bg-muted flex items-center justify-center w-full">
                          <span className="text-muted-foreground">No images available</span>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-1 p-4 sm:p-5 lg:p-6 w-full">
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

                    {/* Map Section */}
                    <div className="lg:col-span-1 h-56 sm:h-64 lg:h-80 w-full">
                      <RoomMap 
                        location={room.flats.location}
                        neighbourhood={room.flats.neighborhood || room.flats.location}
                        latitude={room.flats.latitude ? Number(room.flats.latitude) : undefined}
                        longitude={room.flats.longitude ? Number(room.flats.longitude) : undefined}
                      />
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