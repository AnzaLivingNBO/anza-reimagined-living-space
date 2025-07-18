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
    description: 'Reserve your spot online quickly and easily. Flexible terms mean no hassle!',
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
        
        {/* All Steps Container */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
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
                  <div className="relative mb-6 flex justify-center">
                    <div className={`w-16 h-16 lg:w-18 lg:h-18 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 lg:w-9 lg:h-9 text-white" />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-white text-gray-800 rounded-full flex items-center justify-center text-sm font-bold shadow-md border-2 border-gray-200">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="bg-card rounded-2xl p-4 lg:p-5 shadow-soft border border-border/50 hover-lift h-full">
                    <h3 className="text-lg lg:text-xl font-bold mb-3 text-card-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
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