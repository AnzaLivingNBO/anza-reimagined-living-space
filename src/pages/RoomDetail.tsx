import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RoomMap } from '@/components/RoomMap';
import { 
  MapPin, 
  Wifi, 
  Car, 
  Coffee, 
  ChevronLeft, 
  Calendar,
  Users,
  Home,
  Shield,
  Clock,
  Phone,
  MessageSquare,
  Heart,
  Share2,
  ChevronRight,
  ChevronLeft as PrevIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
    images: [room1, room2, room3],
    features: ['WiFi', 'Parking', 'Kitchen Access', 'Laundry', 'Air Conditioning', 'Balcony'],
    amenities: [
      { icon: Wifi, label: 'High-Speed WiFi' },
      { icon: Car, label: 'Parking Space' },
      { icon: Coffee, label: 'Kitchen Access' }
    ],
    description: 'A beautiful private room in a modern shared apartment with all amenities included. This spacious room features large windows with natural light, premium furnishing, and access to all common areas.',
    longDescription: 'Experience comfortable living in this thoughtfully designed private room located in the heart of downtown. The space features modern furnishing, ample storage, and large windows that flood the room with natural light. You\'ll have access to a fully equipped kitchen, comfortable living areas, and all essential amenities. The location offers easy access to public transportation, shopping centers, restaurants, and entertainment venues.',
    available: true,
    neighbourhood: 'Kileleshwa',
    roomSize: '15 sqm',
    maxOccupancy: 1,
    moveInDate: '2024-01-15',
    leaseTerm: 'Flexible (3-12 months)',
    deposit: 1700,
    included: ['Utilities', 'WiFi', 'Cleaning Service', 'Laundry', 'Kitchen Access'],
    houseRules: ['No smoking', 'No pets', 'Quiet hours 10PM-8AM', 'Keep common areas clean'],
    highlights: [
      'Prime downtown location',
      'Fully furnished room',
      '24/7 building security',
      'Weekly cleaning service',
      'Professional community'
    ]
  },
  {
    id: 2,
    title: 'Modern Shared Space',
    location: 'Tech District',
    price: 720,
    period: '/month',
    images: [room2, room3, room1],
    features: ['WiFi', 'Shared Kitchen', 'Lounge Area', 'Study Room', 'Gym Access'],
    amenities: [
      { icon: Wifi, label: 'High-Speed WiFi' },
      { icon: Coffee, label: 'Shared Kitchen' }
    ],
    description: 'Perfect for young professionals looking for a vibrant community atmosphere in a tech-focused environment.',
    longDescription: 'Join our vibrant community of young professionals and creatives in this modern shared living space. Located in the bustling tech district, this space offers everything you need for productive living and networking. The shared areas are designed for collaboration and socializing, while your private space provides comfort and privacy.',
    available: true,
    neighbourhood: 'Westlands',
    roomSize: '12 sqm',
    maxOccupancy: 1,
    moveInDate: '2024-02-01',
    leaseTerm: 'Flexible (1-12 months)',
    deposit: 1440,
    included: ['Utilities', 'WiFi', 'Gym Access', 'Coworking Space', 'Events'],
    houseRules: ['No smoking', 'Guests until 11PM', 'Clean after use', 'Respect community guidelines'],
    highlights: [
      'Tech district location',
      'Networking opportunities',
      'On-site gym',
      'Coworking spaces',
      'Regular community events'
    ]
  }
];

const RoomDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  const room = allRooms.find(r => r.id === parseInt(id || ''));

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Room not found</h1>
          <Link to="/rooms">
            <Button>Back to Rooms</Button>
          </Link>
        </div>
      </div>
    );
  }

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

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked ? "Room removed from your favorites." : "Room added to your favorites.",
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen">
        <Header />
        
        {/* Breadcrumb */}
        <section className="pt-24 pb-4 bg-muted/30">
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
                      src={room.images[currentImageIndex]} 
                      alt={`${room.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Navigation Arrows */}
                    {room.images.length > 1 && (
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
                      {currentImageIndex + 1} / {room.images.length}
                    </div>
                  </div>
                  
                  {/* Thumbnail Navigation */}
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {room.images.map((image, index) => (
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
                        <span>{room.location} • {room.neighbourhood}</span>
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
                    {room.longDescription}
                  </p>

                  {/* Key Features */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">What's Included</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {room.included.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Amenities</h3>
                    <div className="flex flex-wrap gap-4">
                      {room.amenities.map((amenity, i) => {
                        const Icon = amenity.icon;
                        return (
                          <Tooltip key={i}>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-3 bg-muted rounded-lg p-3 hover:bg-primary/10 transition-smooth cursor-help">
                                <Icon className="w-5 h-5 text-primary" />
                                <span className="text-sm font-medium">{amenity.label}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Available in this room</p>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </div>

                  {/* House Rules */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">House Rules</h3>
                    <ul className="space-y-2">
                      {room.houseRules.map((rule, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
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
                      <p className="text-sm text-muted-foreground">Security deposit: ${room.deposit}</p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Room Size:</span>
                        <span className="font-medium">{room.roomSize}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Max Occupancy:</span>
                        <span className="font-medium">{room.maxOccupancy} person</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Move-in Date:</span>
                        <span className="font-medium">{room.moveInDate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Lease Term:</span>
                        <span className="font-medium">{room.leaseTerm}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button className="w-full btn-primary" size="lg">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Viewing
                      </Button>
                      <Button variant="outline" className="w-full" size="lg">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Ask Questions
                      </Button>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={handleLike}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          {isLiked ? 'Liked' : 'Like'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={handleShare}
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Location Map */}
                <Card>
                  <CardContent className="p-0">
                    <div className="h-64">
                      <RoomMap 
                        location={room.location}
                        neighbourhood={room.neighbourhood}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2">Location</h3>
                      <p className="text-sm text-muted-foreground">
                        {room.location}, {room.neighbourhood}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4">Need Help?</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Call us: +1 (555) 123-4567
                      </Button>
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Live Chat Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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