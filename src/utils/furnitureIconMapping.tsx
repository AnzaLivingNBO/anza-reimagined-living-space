import { 
  Bed, 
  Armchair, 
  Lamp, 
  Monitor, 
  Box,
  Sofa,
  Table,
  Utensils,
  Wind,
  Sparkles,
  LucideIcon
} from "lucide-react";

export const getFurnitureIcon = (furnitureName: string): LucideIcon => {
  const lowerName = furnitureName.toLowerCase();
  
  if (lowerName.includes('bed')) return Bed;
  if (lowerName.includes('chair') || lowerName.includes('seat')) return Armchair;
  if (lowerName.includes('desk')) return Table;
  if (lowerName.includes('table')) return Table;
  if (lowerName.includes('lamp') || lowerName.includes('light')) return Lamp;
  if (lowerName.includes('monitor') || lowerName.includes('screen') || lowerName.includes('tv')) return Monitor;
  if (lowerName.includes('sofa') || lowerName.includes('couch')) return Sofa;
  if (lowerName.includes('wardrobe') || lowerName.includes('closet') || lowerName.includes('storage')) return Box;
  if (lowerName.includes('fan')) return Wind;
  if (lowerName.includes('kitchen') || lowerName.includes('dining')) return Utensils;
  
  // Default icon for unmatched furniture
  return Sparkles;
};
