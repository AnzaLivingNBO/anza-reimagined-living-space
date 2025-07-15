import { Search, Calendar, Home, Users, RefreshCw } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Explore Your Options',
    description: 'Browse our available fully furnished flats and pick the one that suits your style and needs.',
    color: 'from-primary to-primary-glow'
  },
  {
    icon: Calendar,
    title: 'Book Your Room',
    description: 'Reserve your spot online quickly and easily. Flexible terms mean no hassle!',
    color: 'from-secondary to-secondary-glow'
  },
  {
    icon: Home,
    title: 'Move In Stress-Free',
    description: 'Just bring your suitcase—your room is ready with all the essentials waiting for you.',
    color: 'from-primary to-primary-glow'
  },
  {
    icon: Users,
    title: 'Join the Community',
    description: 'Connect with like-minded flatmates and enjoy regular events designed to bring everyone together.',
    color: 'from-secondary to-secondary-glow'
  },
  {
    icon: RefreshCw,
    title: 'Stay Flexible',
    description: 'Need a change? Enjoy short notice periods or switch flats within our network, based on availability.',
    color: 'from-primary to-primary-glow'
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="group relative bg-card rounded-2xl p-8 shadow-soft hover-lift border border-border/50"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-medium">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-bounce`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-4 text-card-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-smooth -z-10"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};