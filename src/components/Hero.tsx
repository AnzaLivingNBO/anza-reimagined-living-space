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
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fade-up">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight px-2">
            Find Your Home,<br />
            <span className="bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              Build Your Community
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4">We offer fully furnished rooms in vibrant shared flats across Nairobi, designed to give you everything you need - comfort, convenience, and a co-living community you'll love.</p>
          
          <div className="flex justify-center items-center pt-4 sm:pt-8">
            <Button size="lg" className="btn-primary text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 hover:scale-105 transition-bounce" onClick={() => document.getElementById('rooms')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              Start Exploring
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-smooth"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </section>;
};