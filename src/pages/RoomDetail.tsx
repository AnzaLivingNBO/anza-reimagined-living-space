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

const RoomDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { room, loading, error } = useRoom(id || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [mapboxToken, setMapboxToken] = useState('');
  
  const roomImages = room ? [room.image, ...room.roomImages] : [];
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
            <Link to="/rooms">
              <Button>Back to Rooms</Button>
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
        <section className="pt-6 pb-4 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
              <span>/</span>
              <Link to="/rooms" className="hover:text-primary transition-smooth">Rooms</Link>
              <span>/</span>
              <span className="text-foreground">{room.title}</span>
            </div>
          </div>
        </section>

        {/* Back Button */}
        <section className="pb-4 bg-muted/30">
          <div className="container mx-auto px-4">
            <Link to="/rooms">
              <Button variant="outline" size="sm" className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Back to Rooms
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
                  
                  {/* Thumbnail Navigation */}
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {roomImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-smooth ${
                          index === currentImageIndex ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
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
                      <Badge 
                        variant={room.available ? "default" : "secondary"}
                        className={room.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                      >
                        {room.available ? 'Available Now' : 'Coming Soon'}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {room.description}
                  </p>

                   {/* Characteristics & What's Included */}
                   <div>
                     <h3 className="text-xl font-bold mb-4">Characteristics & What's Included</h3>
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                       {room.characteristics.map((characteristic, i) => {
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
                              <p>Included with this room</p>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </div>

                  {/* Location Map */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Location</h3>
                    <div className="space-y-4">
                      <div className="h-48 rounded-lg overflow-hidden border border-border">
                        <RoomMap 
                          location={room.location}
                          neighbourhood={room.neighbourhood}
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

              {/* Right Column - Booking & Info */}
              <div className="space-y-6">
                
                {/* Pricing Card */}
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-primary mb-1">
                        ${room.price}
                        <span className="text-lg text-muted-foreground">{room.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Security deposit: ${room.price * 2}</p>
                    </div>

                     <div className="space-y-4 mb-6">
                       <div className="flex justify-between text-sm">
                         <span className="text-muted-foreground">Room Size:</span>
                         <span className="font-medium">12-15 sqm</span>
                       </div>
                       <div className="flex justify-between text-sm">
                         <span className="text-muted-foreground">Max Occupancy:</span>
                         <span className="font-medium">1 person</span>
                       </div>
                       <div className="flex justify-between text-sm">
                         <span className="text-muted-foreground">Move-in Date:</span>
                         <span className="font-medium">Available now</span>
                       </div>
                       <div className="flex justify-between text-sm">
                         <span className="text-muted-foreground">Lease Term:</span>
                         <span className="font-medium">Flexible (3-12 months)</span>
                       </div>
                     </div>

                    <div className="space-y-3">
                      <Button className="w-full btn-primary" size="lg">
                        <Home className="w-4 h-4 mr-2" />
                        Start Room Application
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

            {/* About the Flat & Images Section */}
            <div className="grid lg:grid-cols-2 gap-8 mt-16 pt-16 border-t border-border">
              
              {/* Left Column - About the Flat */}
              <div className="space-y-6">
                 <div>
                   <h2 className="text-3xl font-bold mb-6">About the Flat</h2>
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
                   </div>
                 ) : (
                   <div className="h-80 rounded-lg bg-muted flex items-center justify-center">
                     <p className="text-muted-foreground">No gallery images available</p>
                   </div>
                 )}
               </div>
              
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </TooltipProvider>
  );
};

export default RoomDetail;