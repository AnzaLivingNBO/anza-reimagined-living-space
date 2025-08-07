import { 
  Wifi, 
  SprayCan, 
  Shield, 
  Waves, 
  Dumbbell, 
  Car, 
  Home, 
  Mountain,
  Droplets,
  Zap,
  CheckCircle,
  Tv,
  WashingMachine,
  Armchair,
  TreePine,
  Heart,
  Battery,
  ParkingMeter,
  type LucideIcon 
} from 'lucide-react';

// Map characteristic names to their corresponding icons
export const iconMapping: Record<string, LucideIcon> = {
  'Wifi': Wifi,
  'Cleaning': SprayCan,
  'Cleaning 3x/Week': SprayCan,
  'Water': Droplets,
  'Electricity': Zap,
  '24/7 Security': Shield,
  'Pool': Waves,
  'Pool Access': Waves,
  'Gym': Dumbbell,
  'Gym Access': Dumbbell,
  'Parking': Car,
  'Parking Available': ParkingMeter,
  'Balcony': Home,
  'Roof Terrace': Mountain,
  'UN Approved': CheckCircle,
  'TV': Tv,
  'Washing Machine': WashingMachine,
  'Fully Furnished': Armchair,
  'Garden': TreePine,
  'Pet Friendly': Heart,
  'Backup Generator': Battery,
};

// Get icon for a characteristic name, fallback to CheckCircle
export const getCharacteristicIcon = (name: string): LucideIcon => {
  return iconMapping[name] || CheckCircle;
};