import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
export const Hero = () => {
  return <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{
    backgroundImage: `url(${heroBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  }}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Find Your Home,{' '}
            <span className="bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              Build Your Community
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">We offer fully furnished rooms in vibrant shared flats, designed to give you everything you need - comfort, convenience, and a co-living community you'll love.</p>
          
          <div className="flex justify-center items-center pt-8">
            <Button size="lg" className="btn-primary text-lg px-10 py-4 hover:scale-105 transition-bounce" onClick={() => document.getElementById('rooms')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              Start Exploring
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </section>;
};