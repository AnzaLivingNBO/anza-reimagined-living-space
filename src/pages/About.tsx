import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HowItWorks } from '@/components/HowItWorks';
import { Community } from '@/components/Community';
import { Users, Target, Heart, Award } from 'lucide-react';

const values = [
  {
    icon: Users,
    title: 'Community First',
    description: 'We believe that home is where community thrives. Every space we create is designed to foster meaningful connections between residents.'
  },
  {
    icon: Target,
    title: 'Quality Standards',
    description: 'From furniture selection to maintenance, we maintain the highest standards to ensure your living experience exceeds expectations.'
  },
  {
    icon: Heart,
    title: 'Genuine Care',
    description: 'Our dedicated team is committed to supporting residents throughout their journey, creating a true sense of belonging.'
  },
  {
    icon: Award,
    title: 'Innovation',
    description: 'We continuously evolve our offerings based on resident feedback and emerging trends in modern living.'
  }
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up">
              About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Anza Living</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-up" style={{animationDelay: '0.1s'}}>
              Redefining co-living through thoughtfully designed spaces, vibrant communities, 
              and unparalleled convenience for the modern lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-left">
                <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  At Anza Living, we're passionate about creating more than just living spaces. 
                  We craft communities where like-minded individuals can thrive, grow, and build 
                  lasting relationships while enjoying the flexibility and convenience of modern co-living.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded on the belief that everyone deserves a home that supports their lifestyle, 
                  we've reimagined what it means to live well in today's fast-paced world.
                </p>
              </div>
              <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">By the Numbers</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">500+</div>
                      <div className="text-white/80">Happy Residents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">50+</div>
                      <div className="text-white/80">Properties</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">15</div>
                      <div className="text-white/80">Cities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">98%</div>
                      <div className="text-white/80">Satisfaction Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Anza Living
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="bg-card rounded-2xl p-8 shadow-soft hover-lift border border-border/50 animate-fade-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Community */}
      <Community />

      <Footer />
    </div>
  );
};

export default About;