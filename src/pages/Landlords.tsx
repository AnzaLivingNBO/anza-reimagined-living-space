import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, HandshakeIcon, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Landlords = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Thank you for your interest!",
        description: "We'll get back to you within 24 hours to discuss partnership opportunities.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: "Guaranteed Income",
      description: "Secure monthly rental income with professional tenant management"
    },
    {
      icon: Users,
      title: "Vetted Tenants",
      description: "All our tenants are thoroughly screened and professionally managed"
    },
    {
      icon: Building2,
      title: "Property Care",
      description: "We maintain your property to the highest standards"
    },
    {
      icon: HandshakeIcon,
      title: "Flexible Partnerships",
      description: "Customized agreements that work for your specific needs"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Partner With <span className="text-primary">Anza Living</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join our network of trusted landlords and maximize your property's potential. 
                We handle everything from tenant management to property maintenance, ensuring 
                you get guaranteed returns with zero hassle.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="w-5 h-5" />
                  <span>No Vacancy Periods</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="w-5 h-5" />
                  <span>Professional Management</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="w-5 h-5" />
                  <span>Guaranteed Income</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What We Do for Landlords
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We specialize in creating premium co-living spaces that attract quality tenants 
                while maximizing your rental income. Our comprehensive approach ensures your 
                property is always occupied and well-maintained.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-smooth">
                    <CardHeader>
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {benefit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                <strong>We're always looking to partner with landlords and increase our offering.</strong> 
                Whether you have a single property or a portfolio, we can create customized agreements 
                that work for your specific situation and goals.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Get In Touch
                </h2>
                <p className="text-lg text-muted-foreground">
                  Interested in partnership opportunities? We'd love to hear from you! 
                  Tell us about your property and what you're looking for.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                  <CardDescription>
                    Please provide information about your apartment and what partnership 
                    opportunities you're interested in exploring with us.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Property Information & Partnership Interest</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Please tell us about your property (location, size, type) and what kind of partnership arrangement you're interested in. Include any specific requirements or questions you might have."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landlords;