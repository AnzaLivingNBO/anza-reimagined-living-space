import { Search, Calendar, Home, Users, RefreshCw } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Explore Your Options',
    description: 'Browse our available fully furnished flats and pick the one that suits your style and needs.',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    icon: Calendar,
    title: 'Book Your Room',
    description: 'Apply online in just a few clicks, then connect with our team and meet your potential future roommates.',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    icon: Home,
    title: 'Move In Stress-Free',
    description: 'Just bring your suitcase—your room is ready with all the essentials waiting for you.',
    color: 'from-violet-400 to-purple-500'
  },
  {
    icon: Users,
    title: 'Join the Community',
    description: 'Connect with like-minded flatmates and enjoy regular events designed to bring everyone together.',
    color: 'from-orange-400 to-amber-500'
  },
  {
    icon: RefreshCw,
    title: 'Stay Flexible',
    description: 'Need a change? Enjoy short notice periods or switch flats within our network, based on availability.',
    color: 'from-rose-400 to-pink-500'
  }
];

export const HowItWorks = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 md:mb-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">
            How It Works
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Flexibility at Its Best - Your journey to the perfect co-living experience in 5 simple steps
          </p>
        </div>
        
        {/* All Steps Container */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-5 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <div 
                  key={index}
                  className="text-center animate-fade-up"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Step Number and Icon */}
                  <div className="relative mb-4 sm:mb-6 flex justify-center">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-white" />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-7 sm:h-7 bg-white text-gray-800 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-md border-2 border-gray-200">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-soft border border-border/50 hover-lift h-full">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 text-card-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};