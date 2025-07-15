import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { FeaturedRooms } from '@/components/FeaturedRooms';
import { Community } from '@/components/Community';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <FeaturedRooms />
      <Community />
      <Footer />
    </div>
  );
};

export default Index;
