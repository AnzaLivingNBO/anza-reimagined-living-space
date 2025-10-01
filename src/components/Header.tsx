import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Users, MapPin, HelpCircle, Phone, Facebook, Instagram, Building2, Bed } from 'lucide-react';
import { RoomApplicationForm } from '@/components/RoomApplicationForm';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Users },
    { name: 'Rooms', href: '/rooms', icon: Bed },
    { name: 'For Landlords', href: '/landlords', icon: Building2 },
    { name: 'FAQs', href: '/faqs', icon: HelpCircle },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container mx-auto px-4 py-2.5 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/4a1a548f-b5b3-41e8-9963-49d8f9258482.png" 
              alt="Anza Living Logo" 
              className="w-10 h-10 hover:scale-105 transition-smooth"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-smooth ${
                  isActiveRoute(item.href) 
                    ? 'text-primary' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Social Links & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://facebook.com"
              className="text-muted-foreground hover:text-primary transition-smooth"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/anza_living/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-smooth"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <Button 
              className="btn-primary"
              onClick={() => setShowApplicationForm(true)}
            >
              Apply For Room
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-b border-border">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 transition-smooth py-2 ${
                      isActiveRoute(item.href) 
                        ? 'text-primary font-medium' 
                        : 'text-foreground hover:text-primary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="flex items-center space-x-4 pt-4">
                <a
                  href="https://facebook.com"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/anza_living/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <Button 
                  className="btn-primary flex-1"
                  onClick={() => {
                    setShowApplicationForm(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Apply For Room
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {showApplicationForm && (
        <RoomApplicationForm onClose={() => setShowApplicationForm(false)} />
      )}
    </>
  );
};