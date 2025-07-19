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
  'Gym': Dumbbell,
  'Parking': Car,
  'Balcony': Home,
  'Roof Terrace': Mountain,
  'UN Approved': CheckCircle,
};

// Get icon for a characteristic name, fallback to CheckCircle
export const getCharacteristicIcon = (name: string): LucideIcon => {
  return iconMapping[name] || CheckCircle;
};