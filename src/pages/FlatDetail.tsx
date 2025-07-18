import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  MapPin, 
  ChevronLeft, 
  Home,
  MessageSquare,
  Share2,
  ChevronRight,
  ChevronLeft as PrevIcon,
  AlertCircle,
  Loader2,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getCharacteristicIcon } from "@/utils/iconMapping";
import { StatusBadge } from "@/utils/statusBadge";

interface Flat {
  id: string;
  name: string;
  location: string;
  neighborhood?: string;
  about_description: string;
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
  rooms: Array<{
    id: string;
    title: string;
    price: number;
    availability_status: string;
    room_images: Array<{
      id: string;
      image_url: string;
      alt_text: string;
      display_order: number;
    }>;
  }>;
}

const FlatDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mapboxToken, setMapboxToken] = useState('');
  
  const { data: flat, isLoading, error } = useQuery({
    queryKey: ["flat", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("flats")
        .select(`
          *,
          flat_gallery_images(*),
          flat_characteristics(*, characteristics(*)),
          rooms(*, room_images(*))
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Flat;
    },
    enabled: !!id,
  });

  const flatImages = flat ? flat.flat_gallery_images?.sort((a, b) => a.display_order - b.display_order) || [] : [];
  const characteristics = flat ? flat.flat_characteristics || [] : [];
  const allRooms = flat ? flat.rooms || [] : [];
  const availableRooms = flat ? flat.rooms?.filter(room => room.availability_status === 'available').length || 0 : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading flat details...</span>
        </div>
      </div>
    );
  }

  if (error || !flat) {
    return (
      <div className="min-h-screen pt-20">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {error ? 'Error loading flat' : 'Flat not found'}
            </h1>
            <p className="text-muted-foreground mb-4">
              {error ? 'There was an error loading the flat details.' : 'The flat you are looking for does not exist.'}
            </p>
            <Link to="/flats">
              <Button>Back to Flats</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % flatImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + flatImages.length) % flatImages.length);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: flat.name,
        text: flat.about_description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Flat link has been copied to your clipboard.",
      });
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen pt-20">
        <Header />
        
        {/* Mapbox Token Input */}
        {!mapboxToken && (
          <section className="py-4 bg-muted/50 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-4 max-w-2xl mx-auto">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">
                    To enable interactive maps, please enter your Mapbox public token. Get it from{' '}
                    <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80">
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

        {/* Breadcrumb */}
        <section className="pt-6 pb-4 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
              <span>/</span>
              <Link to="/flats" className="hover:text-primary transition-smooth">Flats</Link>
              <span>/</span>
              <span className="text-foreground">{flat.name}</span>
            </div>
          </div>
        </section>

        {/* Back Button */}
        <section className="pb-4 bg-muted/30">
          <div className="container mx-auto px-4">
            <Link to="/flats">
              <Button variant="outline" size="sm" className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Back to Flats
              </Button>
            </Link>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Left Column - Images & Details */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Image Gallery */}
                {flatImages.length > 0 && (
                  <div className="relative">
                    <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
                      <img 
                        src={flatImages[currentImageIndex]?.image_url} 
                        alt={flatImages[currentImageIndex]?.alt_text || `${flat.name} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Navigation Arrows */}
                      {flatImages.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-smooth"
                          >
                            <PrevIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-smooth"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {flatImages.length}
                      </div>
                    </div>
                    
                    {/* Thumbnail Navigation */}
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                      {flatImages.map((image, index) => (
                        <button
                          key={image.id}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-smooth ${
                            index === currentImageIndex ? 'border-primary' : 'border-transparent'
                          }`}
                        >
                          <img 
                            src={image.image_url} 
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Flat Details */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{flat.name}</h1>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{flat.location}</span>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {flat.about_description}
                  </p>

                  {/* Neighborhood */}
                  {flat.neighborhood && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-2">Neighborhood</h3>
                      <p className="text-muted-foreground">{flat.neighborhood}</p>
                    </div>
                  )}

                 {/* Location Map */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Location</h3>
                    <div className="space-y-4">
                      <div className="h-48 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <MapPin className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm">Map integration coming soon</p>
                          <p className="text-xs">{flat.location}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        📍 {flat.location}
                      </p>
                      {!mapboxToken && (
                        <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                          Add Mapbox token to enable interactive map
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column - Booking & Info */}
              <div className="space-y-6">
                
                {/* Flat Info Card */}
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {flat.name}
                      </div>
                      <p className="text-sm text-muted-foreground">{flat.location}</p>
                    </div>

                     <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Available Rooms:</span>
                          <span className="font-medium">{availableRooms} of {flat.total_rooms}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Building Type:</span>
                          <span className="font-medium">Apartment Complex</span>
                        </div>
                      </div>

                      {/* Characteristics Section */}
                      {characteristics.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Features</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {characteristics.map((char) => {
                              const Icon = getCharacteristicIcon(char.characteristics.name);
                              return (
                                <Tooltip key={char.id}>
                                  <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg hover:bg-primary/10 transition-smooth cursor-help">
                                      <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                                      <span className="text-xs font-medium truncate">{char.characteristics.name}</span>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Available in this flat</p>
                                  </TooltipContent>
                                </Tooltip>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    <div className="space-y-3">
                      <Button className="w-full btn-primary" size="lg">
                        <Home className="w-4 h-4 mr-2" />
                        View Available Rooms
                      </Button>
                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1" size="lg">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Ask Question
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1" 
                          size="lg"
                          onClick={handleShare}
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>

            {/* All Rooms Section */}
            {allRooms.length > 0 && (
              <div className="mt-16 pt-16 border-t border-border">
                <h2 className="text-3xl font-bold mb-8">Rooms</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allRooms.map((room) => (
                    <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        {room.room_images.length > 0 && (
                          <img 
                            src={room.room_images[0]?.image_url} 
                            alt={room.room_images[0]?.alt_text || room.title}
                            className="w-full h-48 object-cover"
                          />
                        )}
                        <StatusBadge 
                          status={room.availability_status}
                          className="absolute top-2 right-2"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{room.title}</h3>
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-primary">
                            KES {room.price.toLocaleString()}<span className="text-sm text-muted-foreground">/month</span>
                          </div>
                          <Link to={`/rooms/${room.id}`}>
                            <Button size="sm">View Details</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>

        <Footer />
      </div>
    </TooltipProvider>
  );
};

export default FlatDetail;