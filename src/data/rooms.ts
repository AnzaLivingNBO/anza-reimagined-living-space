import { Waves, Dumbbell, Shield, Home, Mountain, Users, Zap, Droplets, Wifi, Receipt, SprayCan } from 'lucide-react';
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
  characteristics: Array<{ icon: any; label: string }>;
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
    characteristics: [
      { icon: Wifi, label: 'Wifi' },
      { icon: Shield, label: '24/7 Security' },
      { icon: SprayCan, label: 'Cleaning' },
      { icon: Shield, label: 'UN Approved' },
      { icon: Waves, label: 'Pool' },
      { icon: Dumbbell, label: 'Gym' },
      { icon: Home, label: 'Balcony' },
      { icon: Mountain, label: 'Roof Terrace' }
    ],
    description: 'A beautiful private room in a modern shared apartment with all characteristics included.',
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
    characteristics: [
      { icon: Wifi, label: 'Wifi' },
      { icon: Shield, label: '24/7 Security' },
      { icon: SprayCan, label: 'Cleaning' },
      { icon: Shield, label: 'UN Approved' },
      { icon: Waves, label: 'Pool' },
      { icon: Dumbbell, label: 'Gym' },
      { icon: Home, label: 'Balcony' },
      { icon: Mountain, label: 'Roof Terrace' }
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
    characteristics: [
      { icon: Wifi, label: 'Wifi' },
      { icon: Shield, label: '24/7 Security' },
      { icon: SprayCan, label: 'Cleaning' },
      { icon: Shield, label: 'UN Approved' },
      { icon: Waves, label: 'Pool' },
      { icon: Dumbbell, label: 'Gym' },
      { icon: Home, label: 'Balcony' },
      { icon: Mountain, label: 'Roof Terrace' }
    ],
    description: 'Premium co-living experience with stunning views and top-tier characteristics.',
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
    characteristics: [
      { icon: Wifi, label: 'Wifi' },
      { icon: Shield, label: '24/7 Security' },
      { icon: SprayCan, label: 'Cleaning' },
      { icon: Shield, label: 'UN Approved' },
      { icon: Waves, label: 'Pool' },
      { icon: Dumbbell, label: 'Gym' },
      { icon: Home, label: 'Balcony' },
      { icon: Mountain, label: 'Roof Terrace' }
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
    features: ['WiFi', 'Private Bathroom', 'Work Desk', 'Premium Characteristics'],
    characteristics: [
      { icon: Wifi, label: 'Wifi' },
      { icon: Shield, label: '24/7 Security' },
      { icon: SprayCan, label: 'Cleaning' },
      { icon: Shield, label: 'UN Approved' },
      { icon: Waves, label: 'Pool' },
      { icon: Dumbbell, label: 'Gym' },
      { icon: Home, label: 'Balcony' },
      { icon: Mountain, label: 'Roof Terrace' }
    ],
    description: 'Premium accommodation for business professionals with executive characteristics.',
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
    characteristics: [
      { icon: Wifi, label: 'Wifi' },
      { icon: Shield, label: '24/7 Security' },
      { icon: SprayCan, label: 'Cleaning' },
      { icon: Shield, label: 'UN Approved' },
      { icon: Waves, label: 'Pool' },
      { icon: Dumbbell, label: 'Gym' },
      { icon: Home, label: 'Balcony' },
      { icon: Mountain, label: 'Roof Terrace' }
    ],
    description: 'Inspiring space for creative professionals with dedicated studio areas.',
    available: true,
    neighbourhood: 'Kileleshwa'
  }
];