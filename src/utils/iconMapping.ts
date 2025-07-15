import { 
  Wifi, 
  Sparkles, 
  Shield, 
  Waves, 
  Dumbbell, 
  Car, 
  Building, 
  Sunrise,
  CheckCircle,
  type LucideIcon 
} from 'lucide-react';

// Map characteristic names to their corresponding icons
export const iconMapping: Record<string, LucideIcon> = {
  'Wifi': Wifi,
  'Cleaning': Sparkles,
  '24/7 Security': Shield,
  'Pool': Waves,
  'Gym': Dumbbell,
  'Parking': Car,
  'Balcony': Building,
  'Roof Terrace': Sunrise,
  'UN Approved': CheckCircle,
};

// Get icon for a characteristic name, fallback to CheckCircle
export const getCharacteristicIcon = (name: string): LucideIcon => {
  return iconMapping[name] || CheckCircle;
};