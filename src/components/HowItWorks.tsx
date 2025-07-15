import { Search, Calendar, Home, Users, RefreshCw, ArrowRight } from 'lucide-react';

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
        
        {/* Journey Flow Layout */}
        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={index}
                className="relative flex items-center mb-16 last:mb-0"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                {/* Timeline Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-24 w-0.5 h-16 bg-gradient-to-b from-gray-300 to-gray-200 transform -translate-x-1/2 z-0"></div>
                )}
                
                {/* Step Content */}
                <div className={`flex w-full items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
                  {/* Content Side */}
                  <div className={`flex-1 ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover-lift animate-fade-up">
                      <h3 className="text-2xl font-bold mb-4 text-card-foreground">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Central Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg border-4 border-white`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-gray-800 rounded-full flex items-center justify-center text-sm font-bold shadow-md border-2 border-gray-200">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Arrow Connector */}
                  {index < steps.length - 1 && (
                    <div className={`flex-1 ${isEven ? 'text-left pl-8' : 'text-right pr-8'}`}>
                      <div className="flex items-center justify-center">
                        <ArrowRight className={`w-8 h-8 text-gray-400 ${isEven ? '' : 'rotate-180'}`} />
                      </div>
                    </div>
                  )}
                  
                  {/* Empty Space on Opposite Side */}
                  {index === steps.length - 1 && (
                    <div className="flex-1"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};