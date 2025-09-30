import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { RoomApplicationForm } from '@/components/RoomApplicationForm';

export const Footer = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  return (
    <>
      <footer id="contact" className="bg-foreground text-background py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <img 
                  src="/lovable-uploads/ca558e70-1c78-43e1-901c-87c0aa75d21f.png" 
                  alt="Anza Living Logo" 
                  className="w-12 h-12 object-contain"
                />
              </Link>
              <p className="text-background/80 max-w-md mb-6 leading-relaxed">
                Creating vibrant co-living communities where comfort meets convenience. 
                Find your perfect home and build lasting connections.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  className="w-10 h-10 bg-background/10 hover:bg-primary rounded-lg flex items-center justify-center transition-smooth"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/anza_living/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-background/10 hover:bg-primary rounded-lg flex items-center justify-center transition-smooth"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About', href: '/about' },
                  { name: 'Flats', href: '/flats' },
                  { name: 'FAQs', href: '/faqs' },
                  { name: 'Contact', href: '/contact' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-background/80 hover:text-primary transition-smooth"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-background/80">+254 (0) 797758485</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-background/80">anzalivingnbo@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="border-t border-background/20 pt-6 sm:pt-8 mb-6 sm:mb-8">
            <div className="text-center px-4">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to Find Your Home?</h3>
              <p className="text-sm sm:text-base text-background/80 mb-4 sm:mb-6">Join our community today and discover co-living at its finest.</p>
              <Button 
                className="btn-primary w-full sm:w-auto"
                onClick={() => setShowApplicationForm(true)}
              >
                Apply For Room
              </Button>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-background/20 pt-6 sm:pt-8 text-center text-background/60">
            <p className="text-xs sm:text-sm">&copy; 2024 Anza Living. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {showApplicationForm && (
        <RoomApplicationForm onClose={() => setShowApplicationForm(false)} />
      )}
    </>
  );
};