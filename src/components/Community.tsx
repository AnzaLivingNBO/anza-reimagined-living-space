import { Users, Calendar, Coffee, Gamepad2 } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Like-minded Community',
    description: 'Connect with professionals, students, and creatives who share your values and interests.'
  },
  {
    icon: Calendar,
    title: 'Regular Events',
    description: 'Join our community dinners, game nights, and social events to build lasting friendships.'
  },
  {
    icon: Coffee,
    title: 'Shared Spaces',
    description: 'Enjoy beautifully designed common areas perfect for working, relaxing, or socializing.'
  },
  {
    icon: Gamepad2,
    title: 'Fun Activities',
    description: 'From movie nights to skill-sharing sessions, there\'s always something exciting happening.'
  }
];

export const Community = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              More Than Just a Room
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join a vibrant community where lasting friendships are made and every day brings new opportunities to connect.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group flex items-start space-x-4 p-6 rounded-2xl bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-smooth animate-slide-in-left"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-bounce">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-full px-6 py-3 border border-border">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Join 500+ happy residents</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};