import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Users, MapPin, HelpCircle, Phone, Facebook, Instagram } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: Users },
    { name: 'Rooms', href: '#rooms', icon: MapPin },
    { name: 'FAQs', href: '#faqs', icon: HelpCircle },
    { name: 'Contact', href: '#contact', icon: Phone },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">A</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Anza Living
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              {item.name}
            </a>
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
            href="https://instagram.com"
            className="text-muted-foreground hover:text-primary transition-smooth"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <Button className="btn-primary">
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
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 text-foreground hover:text-primary transition-smooth py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </a>
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
                href="https://instagram.com"
                className="text-muted-foreground hover:text-primary transition-smooth"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <Button className="btn-primary flex-1">
                Apply For Room
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};