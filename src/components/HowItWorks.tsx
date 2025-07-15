import { useState } from 'react';
import { Search, Calendar, Home, Users, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  {
    icon: Search,
    title: 'Explore Your Options',
    description: 'Browse our available fully furnished flats and pick the one that suits your style and needs.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Calendar,
    title: 'Book Your Room',
    description: 'Reserve your spot online quickly and easily. Flexible terms mean no hassle!',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Home,
    title: 'Move In Stress-Free',
    description: 'Just bring your suitcase—your room is ready with all the essentials waiting for you.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Users,
    title: 'Join the Community',
    description: 'Connect with like-minded flatmates and enjoy regular events designed to bring everyone together.',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: RefreshCw,
    title: 'Stay Flexible',
    description: 'Need a change? Enjoy short notice periods or switch flats within our network, based on availability.',
    color: 'from-pink-500 to-pink-600'
  }
];

export const HowItWorks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stepsToShow = 3;
  const maxIndex = steps.length - stepsToShow;

  const goToPrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const visibleSteps = steps.slice(currentIndex, currentIndex + stepsToShow);

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Flexibility at Its Best - Your journey to the perfect co-living experience in 5 simple steps
          </p>
        </div>
        
        {/* Navigation and Steps Container */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-8">
            {/* Left Arrow */}
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="flex-shrink-0 w-12 h-12 rounded-full shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            {/* Steps Container */}
            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-3 gap-8">
                {visibleSteps.map((step, index) => {
                  const Icon = step.icon;
                  const actualIndex = currentIndex + index;
                  
                  return (
                    <div 
                      key={actualIndex}
                      className="text-center animate-fade-up"
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      {/* Step Number and Icon */}
                      <div className="relative mb-6 flex justify-center">
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        {/* Step Number */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-gray-800 rounded-full flex items-center justify-center text-sm font-bold shadow-md border-2 border-gray-200">
                          {actualIndex + 1}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 hover-lift h-full">
                        <h3 className="text-xl font-bold mb-4 text-card-foreground">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Arrow */}
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              disabled={currentIndex === maxIndex}
              className="flex-shrink-0 w-12 h-12 rounded-full shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};