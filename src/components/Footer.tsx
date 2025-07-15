import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <span className="text-2xl font-bold">Anza Living</span>
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
                href="https://instagram.com"
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
                { name: 'Rooms', href: '/rooms' },
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
                <span className="text-background/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-background/80">hello@anzaliving.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-background/80">
                  123 Co-living Street<br />
                  Downtown, City 12345
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Find Your Home?</h3>
            <p className="text-background/80 mb-6">Join our community today and discover co-living at its finest.</p>
            <Link to="/contact">
              <Button className="btn-primary">
                Apply For Room
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-background/20 pt-8 text-center text-background/60">
          <p>&copy; 2024 Anza Living. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};