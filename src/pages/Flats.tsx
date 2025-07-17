import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, MapPin } from "lucide-react";
import { getCharacteristicIcon } from "@/utils/iconMapping";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";

interface Flat {
  id: string;
  name: string;
  location: string;
  about_description: string;
  available_rooms: number;
  total_rooms: number;
  flat_gallery_images: Array<{
    id: string;
    image_url: string;
    alt_text: string;
    display_order: number;
  }>;
  flat_characteristics: Array<{
    id: string;
    characteristics: {
      id: string;
      name: string;
    };
  }>;
}

const Flats = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<{ [key: string]: number }>({});

  const { data: flats, isLoading } = useQuery({
    queryKey: ["flats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("flats")
        .select(`
          *,
          flat_gallery_images(*),
          flat_characteristics(*, characteristics(*))
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Flat[];
    },
  });

  const handleImageChange = (flatId: string, direction: 'next' | 'prev', totalImages: number) => {
    setSelectedImageIndex(prev => {
      const currentIndex = prev[flatId] || 0;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
      } else {
        newIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
      }
      
      return { ...prev, [flatId]: newIndex };
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading flats...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/5 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Available Flats
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our collection of premium flats across Nairobi's most desirable neighborhoods
          </p>
        </div>

        <div className="space-y-8">
          {flats?.map((flat) => {
            const currentImageIndex = selectedImageIndex[flat.id] || 0;
            const images = flat.flat_gallery_images?.sort((a, b) => a.display_order - b.display_order) || [];
            const characteristics = flat.flat_characteristics || [];

            return (
              <Card key={flat.id} className="overflow-hidden backdrop-blur-sm bg-card/80 border-border/50 hover:shadow-xl transition-all duration-300">
                <div className="grid lg:grid-cols-3 gap-0">
                  {/* Image Section */}
                  <div className="relative lg:col-span-1">
                    {images.length > 0 ? (
                      <div className="relative h-64 lg:h-80 group">
                        <img
                          src={images[currentImageIndex]?.image_url}
                          alt={images[currentImageIndex]?.alt_text || `${flat.name} photo`}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Image Navigation */}
                        {images.length > 1 && (
                          <>
                            <button
                              onClick={() => handleImageChange(flat.id, 'prev', images.length)}
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label="Previous image"
                            >
                              ←
                            </button>
                            <button
                              onClick={() => handleImageChange(flat.id, 'next', images.length)}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label="Next image"
                            >
                              →
                            </button>
                            
                            {/* Image Indicators */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                              {images.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => setSelectedImageIndex(prev => ({ ...prev, [flat.id]: index }))}
                                  className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="h-64 lg:h-80 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No images available</span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="lg:col-span-1 p-6 lg:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold mb-2">{flat.name}</h2>
                        <div className="flex items-center text-muted-foreground mb-3">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{flat.location}</span>
                        </div>
                      </div>
                      
                      {/* Room Availability Badge */}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge 
                              variant="outline" 
                              className="flex items-center gap-2 px-3 py-1 hover:bg-primary/5 transition-colors cursor-help"
                            >
                              <Home className="w-4 h-4" />
                              <span className="font-medium">{flat.available_rooms}/{flat.total_rooms}</span>
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm">{flat.available_rooms}/{flat.total_rooms} rooms available from next month onwards</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2">
                      {flat.about_description}
                    </p>

                    {/* Characteristics */}
                    {characteristics.length > 0 && (
                      <div className="mb-6">
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                          {characteristics.map((char) => {
                            const Icon = getCharacteristicIcon(char.characteristics.name);
                            return (
                              <Badge key={char.id} variant="secondary" className="flex items-center gap-1 whitespace-nowrap flex-shrink-0">
                                <Icon className="w-3 h-3" />
                                <span className="text-xs">{char.characteristics.name}</span>
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <Link to={`/flats/${flat.id}`}>
                      <Button className="w-full lg:w-auto">
                        View Flat
                      </Button>
                    </Link>
                  </div>

                  {/* Map Section */}
                  <div className="lg:col-span-1 h-64 lg:h-80 bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Map integration coming soon</p>
                      <p className="text-xs">{flat.location}</p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {flats?.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No flats available</h3>
            <p className="text-muted-foreground">Check back soon for new listings!</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Flats;