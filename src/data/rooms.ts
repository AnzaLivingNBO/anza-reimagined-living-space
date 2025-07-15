import { Waves, Dumbbell, Shield, Building, Sunrise, Users, Zap, Droplets, Wifi, Receipt, Sparkles } from 'lucide-react';
import room1 from '@/assets/room-1.jpg';
import room2 from '@/assets/room-2.jpg';
import room3 from '@/assets/room-3.jpg';

export interface Room {
  id: number;
  title: string;
  location: string;
  price: number;
  period: string;
  image: string;
  features: string[];
  amenities: Array<{ icon: any; label: string }>;
  description: string;
  available: boolean;
  neighbourhood: string;
}

export const allRooms: Room[] = [
  {
    id: 1,
    title: 'Cozy Private Room',
    location: 'Sunrise Heights, Kileleshwa',
    price: 450,
    period: '/month',
    image: room1,
    features: ['WiFi', 'Parking', 'Kitchen Access', 'Laundry'],
    amenities: [
      { icon: Waves, label: 'Compound Pool' },
      { icon: Dumbbell, label: 'Compound Gym' },
      { icon: Shield, label: 'UN Approved' },
      { icon: Building, label: 'Balcony' },
      { icon: Sunrise, label: 'Compound Roof Terrace' },
      { icon: Zap, label: 'Electricity' },
      { icon: Droplets, label: 'Water' },
      { icon: Shield, label: '24/7 Security' },
      { icon: Receipt, label: 'Service Charge' },
      { icon: Sparkles, label: 'Cleaning and Housekeeping' },
      { icon: Wifi, label: 'WiFi' }
    ],
    description: 'A beautiful private room in a modern shared apartment with all amenities included.',
    available: true,
    neighbourhood: 'Kileleshwa'
  },
  {
    id: 2,
    title: 'Modern Shared Space',
    location: 'Urban Residences, Kileleshwa',
    price: 525,
    period: '/month',
    image: room2,
    features: ['WiFi', 'Shared Kitchen', 'Lounge Area', 'Study Room'],
    amenities: [
      { icon: Waves, label: 'Compound Pool' },
      { icon: Dumbbell, label: 'Compound Gym' },
      { icon: Shield, label: 'UN Approved' },
      { icon: Building, label: 'Balcony' },
      { icon: Sunrise, label: 'Compound Roof Terrace' },
      { icon: Zap, label: 'Electricity' },
      { icon: Droplets, label: 'Water' },
      { icon: Shield, label: '24/7 Security' },
      { icon: Receipt, label: 'Service Charge' },
      { icon: Sparkles, label: 'Cleaning and Housekeeping' },
      { icon: Wifi, label: 'WiFi' }
    ],
    description: 'Perfect for young professionals looking for a vibrant community atmosphere.',
    available: true,
    neighbourhood: 'Kileleshwa'
  },
  {
    id: 3,
    title: 'Luxury Co-Living',
    location: 'Metro Apartments, Kileleshwa',
    price: 600,
    period: '/month',
    image: room3,
    features: ['WiFi', 'Parking', 'Gym Access', 'Rooftop', 'Concierge'],
    amenities: [
      { icon: Waves, label: 'Compound Pool' },
      { icon: Dumbbell, label: 'Compound Gym' },
      { icon: Shield, label: 'UN Approved' },
      { icon: Building, label: 'Balcony' },
      { icon: Sunrise, label: 'Compound Roof Terrace' },
      { icon: Zap, label: 'Electricity' },
      { icon: Droplets, label: 'Water' },
      { icon: Shield, label: '24/7 Security' },
      { icon: Receipt, label: 'Service Charge' },
      { icon: Sparkles, label: 'Cleaning and Housekeeping' },
      { icon: Wifi, label: 'WiFi' }
    ],
    description: 'Premium co-living experience with stunning views and top-tier amenities.',
    available: false,
    neighbourhood: 'Kileleshwa'
  },
  {
    id: 4,
    title: 'Student-Friendly Space',
    location: 'Student Haven, Kileleshwa',
    price: 400,
    period: '/month',
    image: room1,
    features: ['WiFi', 'Study Area', 'Shared Kitchen', 'Social Lounge'],
    amenities: [
      { icon: Waves, label: 'Compound Pool' },
      { icon: Dumbbell, label: 'Compound Gym' },
      { icon: Shield, label: 'UN Approved' },
      { icon: Building, label: 'Balcony' },
      { icon: Sunrise, label: 'Compound Roof Terrace' },
      { icon: Zap, label: 'Electricity' },
      { icon: Droplets, label: 'Water' },
      { icon: Shield, label: '24/7 Security' },
      { icon: Receipt, label: 'Service Charge' },
      { icon: Sparkles, label: 'Cleaning and Housekeeping' },
      { icon: Wifi, label: 'WiFi' }
    ],
    description: 'Perfect for students with dedicated study spaces and social areas.',
    available: true,
    neighbourhood: 'Kileleshwa'
  },
  {
    id: 5,
    title: 'Executive Suite',
    location: 'Executive Suites, Kileleshwa',
    price: 750,
    period: '/month',
    image: room2,
    features: ['WiFi', 'Private Bathroom', 'Work Desk', 'Premium Amenities'],
    amenities: [
      { icon: Waves, label: 'Compound Pool' },
      { icon: Dumbbell, label: 'Compound Gym' },
      { icon: Shield, label: 'UN Approved' },
      { icon: Building, label: 'Balcony' },
      { icon: Sunrise, label: 'Compound Roof Terrace' },
      { icon: Zap, label: 'Electricity' },
      { icon: Droplets, label: 'Water' },
      { icon: Shield, label: '24/7 Security' },
      { icon: Receipt, label: 'Service Charge' },
      { icon: Sparkles, label: 'Cleaning and Housekeeping' },
      { icon: Wifi, label: 'WiFi' }
    ],
    description: 'Premium accommodation for business professionals with executive amenities.',
    available: true,
    neighbourhood: 'Kileleshwa'
  },
  {
    id: 6,
    title: 'Creative Hub',
    location: 'Creative Spaces, Kileleshwa',
    price: 500,
    period: '/month',
    image: room3,
    features: ['WiFi', 'Art Studio', 'Creative Workspace', 'Collaboration Areas'],
    amenities: [
      { icon: Waves, label: 'Compound Pool' },
      { icon: Dumbbell, label: 'Compound Gym' },
      { icon: Shield, label: 'UN Approved' },
      { icon: Building, label: 'Balcony' },
      { icon: Sunrise, label: 'Compound Roof Terrace' },
      { icon: Zap, label: 'Electricity' },
      { icon: Droplets, label: 'Water' },
      { icon: Shield, label: '24/7 Security' },
      { icon: Receipt, label: 'Service Charge' },
      { icon: Sparkles, label: 'Cleaning and Housekeeping' },
      { icon: Wifi, label: 'WiFi' }
    ],
    description: 'Inspiring space for creative professionals with dedicated studio areas.',
    available: true,
    neighbourhood: 'Kileleshwa'
  }
];