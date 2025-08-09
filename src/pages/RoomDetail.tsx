import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RoomMap } from '@/components/RoomMap';
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
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRoom } from '@/hooks/useRoom';
import { RoomApplicationForm } from '@/components/RoomApplicationForm';
import { StatusBadge } from '@/utils/statusBadge';

const RoomDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { room, loading, error } = useRoom(id || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  
  const roomImages = room ? (room.roomImages.length > 0 ? room.roomImages : [room.image]) : [];
  const galleryImages = room ? room.flatGalleryImages : [];

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading room details...</span>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {error ? 'Error loading room' : 'Room not found'}
            </h1>
            <p className="text-muted-foreground mb-4">
              {error || 'The room you are looking for does not exist.'}
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
    setCurrentImageIndex((prev) => (prev + 1) % roomImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + roomImages.length) % roomImages.length);
  };


  const nextGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: room.title,
        text: room.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Room link has been copied to your clipboard.",
      });
    }
  };

  const prevGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen">
        <Header />
        
        {/* Mapbox Token Input */}
        {!mapboxToken && (
          <section className="py-4 bg-yellow-50 border-b border-yellow-200">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-4 max-w-2xl mx-auto">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-yellow-700 mb-2">
                    To enable interactive maps, please enter your Mapbox public token. Get it from{' '}
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

        {/* Breadcrumb */}
        <section className="pt-20 pb-4 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
              <span>/</span>
              <Link to="/flats" className="hover:text-primary transition-smooth">Flats</Link>
              <span>/</span>
              <Link to={`/flats/${room.flatId}`} className="hover:text-primary transition-smooth">Flat Details</Link>
              <span>/</span>
              <span className="text-foreground">{room.title}</span>
            </div>
          </div>
        </section>

        {/* Back Button */}
        <section className="pb-4 bg-muted/30">
          <div className="container mx-auto px-4">
            <Link to={`/flats/${room.flatId}`}>
              <Button variant="outline" size="sm" className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Back to Flat Details
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
                <div className="relative">
                  <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
                     <img 
                       src={roomImages[currentImageIndex]} 
                       alt={`${room.title} - Image ${currentImageIndex + 1}`}
                       className="w-full h-full object-cover"
                       loading="eager"
                     />
                    
                    {/* Navigation Arrows */}
                    {roomImages.length > 1 && (
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
                      {currentImageIndex + 1} / {roomImages.length}
                    </div>
                  </div>
                  
                   {/* Image Grid Navigation - Full Size Previews */}
                   <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mt-4">
                     {roomImages.map((image, index) => (
                       <button
                         key={index}
                         onClick={() => setCurrentImageIndex(index)}
                         className={`aspect-square rounded-lg overflow-hidden border-2 transition-smooth hover:shadow-md ${
                           index === currentImageIndex ? 'border-primary shadow-lg' : 'border-border hover:border-primary/50'
                         }`}
                       >
                         <img 
                           src={image} 
                           alt={`Room view ${index + 1}`}
                           className="w-full h-full object-cover hover:scale-110 transition-smooth"
                           loading="lazy"
                         />
                       </button>
                     ))}
                   </div>
                </div>

                {/* Room Details */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{room.title}</h1>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span>{room.location}</span>
                      </div>
                      <StatusBadge 
                        status={room.availabilityStatus}
                        className=""
                      />
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {room.description}
                  </p>

                  {/* Room Setup - Furniture Section */}
                  {room.furniture.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Room Setup</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                         {room.furniture.map((item, i) => {
                          const colors = [
                            'bg-primary/20 border-primary/30',
                            'bg-blue-400/20 border-blue-400/30'
                          ];
                          const colorClass = colors[i % 2];
                          
                          return (
                            <div key={i} className={`${colorClass} rounded-xl p-4 border-2 transition-smooth hover:scale-105`}>
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-sm">{item.name}</h4>
                                {item.quantity > 1 && (
                                  <Badge variant="secondary" className="text-xs">
                                    {item.quantity}x
                                  </Badge>
                                )}
                              </div>
                              {item.description && (
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Location Map & Key Takeaways */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Location</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Neighborhood Information */}
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-3 text-primary">Neighborhood</h4>
                          <div className="text-sm text-muted-foreground leading-relaxed">
                            {room.neighbourhood ? (
                              <p>{room.neighbourhood}</p>
                            ) : (
                              <p>No neighborhood information available.</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Map - Now on the right */}
                      <div className="space-y-2">
                        <div className="h-32 rounded-lg overflow-hidden border border-border">
                          <RoomMap 
                            location={room.location}
                            neighbourhood={room.neighbourhood}
                            latitude={room.latitude}
                            longitude={room.longitude}
                            mapboxToken={mapboxToken}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          📍 {room.location}, {room.neighbourhood}
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
              </div>

              {/* Right Column - Booking & Info */}
              <div className="space-y-6">
                
                {/* Enhanced Info Card */}
                <Card className="sticky top-24 overflow-hidden border-0 shadow-xl bg-gradient-to-br from-background via-background to-primary/5">
                  {/* Header Section */}
                  <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">
                        KES {room.price.toLocaleString()}
                        <span className="text-lg opacity-90">{room.period}</span>
                      </div>
                      <p className="text-sm opacity-80">Security deposit: KES {room.deposit.toLocaleString()}</p>
                    </div>
                  </div>

                  <CardContent className="p-0">
                    {/* Room Details */}
                    <div className="px-6 py-4 space-y-3 border-b border-border/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Room Size</span>
                        <span className="font-medium">{room.roomSize} sqm</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Availability</span>
                        <span className="font-medium">
                          {room.availabilityStatus === 'becoming_available' && room.availableFrom 
                            ? new Date(room.availableFrom).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                            : room.availabilityStatus === 'available' 
                              ? 'Available now'
                              : 'Unavailable'
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Lease Term</span>
                        <span className="font-medium">{room.leaseTerm}</span>
                      </div>
                    </div>

                    {/* What's Included Section */}
                    {room.characteristics.length > 0 && (
                      <div className="px-6 py-4 border-b border-border/50 overflow-visible">
                        <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">What's Included</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {room.characteristics.map((characteristic, i) => {
                            const Icon = characteristic.icon;
                            return (
                              <Tooltip key={i}>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg hover:bg-primary/10 transition-smooth cursor-help relative z-10">
                                    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                                    <span className="text-xs font-medium truncate">{characteristic.label}</span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="z-50">
                                  <p>Included with this room</p>
                                </TooltipContent>
                              </Tooltip>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="p-6 space-y-3">
                      <Button 
                        className="w-full btn-primary" 
                        size="lg"
                        onClick={() => setShowApplicationForm(true)}
                      >
                        <Home className="w-4 h-4 mr-2" />
                        Start Room Application
                      </Button>
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          className="flex-1" 
                          size="lg"
                          asChild
                        >
                          <Link to="/contact">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Ask Question
                          </Link>
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

            {/* About the Flat & Images Section */}
            <div className="mt-16 pt-16 border-t border-border">
              
              {/* Enhanced Section Header with Gradient Background */}
              <div className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-2xl p-8 mb-8 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-xl"></div>
                
                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                      About the Flat
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Discover more about this premium flat including all amenities, 
                      shared spaces, and available rooms in the building.
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Link to={`/flats/${room.flatId}`}>
                      <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-3">
                        <Home className="w-5 h-5 mr-3" />
                        <span className="font-semibold">Explore Full Flat</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                
                {/* Left Column - Description & Characteristics */}
                <div className="space-y-8">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Description</h3>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      {room.flatDescription ? (
                        <p>{room.flatDescription}</p>
                      ) : (
                        <>
                          <p>
                            This beautiful apartment complex offers modern living with premium characteristics in one of Nairobi's most desirable neighborhoods. 
                            The building features contemporary architecture with thoughtfully designed spaces that promote both comfort and community.
                          </p>
                          <p>
                            Located in a secure compound with 24/7 security, residents enjoy peace of mind along with access to exceptional facilities 
                            including a swimming pool, fully equipped gym, and a stunning rooftop terrace with panoramic city views.
                          </p>
                          <p>
                            The strategic location provides easy access to major business districts, shopping centers, restaurants, and public transportation. 
                            UN approved status ensures international standards of safety and quality throughout the property.
                          </p>
                          <p>
                            Each unit comes fully furnished with modern appliances and fixtures, offering a hassle-free move-in experience. 
                            Professional cleaning and housekeeping services maintain the highest standards of cleanliness and comfort.
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Flat Characteristics */}
                  {room.flatCharacteristics.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Flat Features & Amenities</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {room.flatCharacteristics.map((characteristic, i) => {
                          const Icon = characteristic.icon;
                          return (
                            <Tooltip key={i}>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-3 bg-muted rounded-lg p-3 hover:bg-primary/10 transition-smooth cursor-help">
                                  <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                                  <span className="text-sm font-medium">{characteristic.label}</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Flat amenity</p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Images */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold mb-4">Property Gallery</h3>
                  {galleryImages.length > 0 ? (
                    <div className="relative">
                      <div className="relative h-80 rounded-lg overflow-hidden">
                        <img 
                          src={galleryImages[currentGalleryIndex]} 
                          alt={`Property gallery image ${currentGalleryIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Navigation Arrows */}
                        {galleryImages.length > 1 && (
                          <>
                            <button
                              onClick={prevGalleryImage}
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-smooth"
                            >
                              <PrevIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={nextGalleryImage}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-smooth"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        
                        {/* Image Counter */}
                        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                          {currentGalleryIndex + 1} / {galleryImages.length}
                        </div>
                      </div>
                      
                      {/* Thumbnail Navigation */}
                      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                        {galleryImages.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentGalleryIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-smooth ${
                              index === currentGalleryIndex ? 'border-primary' : 'border-transparent'
                            }`}
                          >
                            <img 
                              src={image} 
                              alt={`Gallery thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-80 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                      <p>No images available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />

        {showApplicationForm && (
          <RoomApplicationForm 
            onClose={() => setShowApplicationForm(false)} 
            preSelectedRoomId={room.id}
          />
        )}
      </div>
    </TooltipProvider>
  );
};

export default RoomDetail;