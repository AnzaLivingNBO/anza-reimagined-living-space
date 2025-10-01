import { 
  Bed, 
  Armchair, 
  Lamp, 
  Monitor, 
  Tv,
  BookOpen,
  Shirt,
  Package,
  Sofa,
  DoorOpen,
  LucideIcon
} from 'lucide-react';

export const getFurnitureIcon = (furnitureName: string): LucideIcon => {
  const name = furnitureName.toLowerCase();
  
  // Bed-related
  if (name.includes('bed') || name.includes('mattress')) {
    return Bed;
  }
  
  // Seating
  if (name.includes('chair') || name.includes('seat')) {
    return Armchair;
  }
  if (name.includes('sofa') || name.includes('couch')) {
    return Sofa;
  }
  
  // Lighting
  if (name.includes('lamp') || name.includes('light')) {
    return Lamp;
  }
  
  // Desk/Work
  if (name.includes('desk') || name.includes('table')) {
    return Monitor;
  }
  
  // Entertainment
  if (name.includes('tv') || name.includes('television')) {
    return Tv;
  }
  
  // Storage
  if (name.includes('wardrobe') || name.includes('closet') || name.includes('cupboard')) {
    return Shirt;
  }
  if (name.includes('shelf') || name.includes('bookshelf')) {
    return BookOpen;
  }
  if (name.includes('drawer') || name.includes('cabinet') || name.includes('storage')) {
    return Package;
  }
  
  // Door/Room
  if (name.includes('door') || name.includes('entrance')) {
    return DoorOpen;
  }
  
  // Default icon for unmatched items
  return Package;
};
