import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react';

const faqCategories = [
  {
    title: 'Getting Started',
    faqs: [
      {
        question: 'How do I apply for a room?',
        answer: 'Simply browse our available rooms, select the one you like, and click "Apply Now". You\'ll need to provide basic information and complete a quick application form. Our team will review your application and get back to you within 24 hours.'
      },
      {
        question: 'What documents do I need to provide?',
        answer: 'You\'ll need a valid ID, proof of income (pay stubs, employment letter, or bank statements), and references. International students may need additional documentation like a visa or acceptance letter.'
      },
      {
        question: 'How long is the application process?',
        answer: 'Our application process is designed to be quick and efficient. Once you submit your application with all required documents, we typically approve applications within 24-48 hours.'
      }
    ]
  },
  {
    title: 'Living Experience',
    faqs: [
      {
        question: 'What is included in the rent?',
        answer: 'All our rooms come fully furnished with bed, desk, wardrobe, and all essential furniture. Rent includes utilities (electricity, water, gas), high-speed WiFi, cleaning of common areas, and access to all characteristics.'
      },
      {
        question: 'Can I choose my flatmates?',
        answer: 'While we can\'t guarantee specific flatmate choices, we do our best to match compatible residents based on lifestyle preferences, age, and interests. You can indicate preferences in your application.'
      },
      {
        question: 'Are pets allowed?',
        answer: 'Pet policies vary by property. Some of our locations are pet-friendly for small pets with additional deposit. Please check the specific property listing or contact us for details.'
      },
      {
        question: 'How often are common areas cleaned?',
        answer: 'Common areas are professionally cleaned weekly. This includes kitchens, bathrooms, living rooms, and any shared spaces. Personal rooms are the responsibility of individual residents.'
      }
    ]
  },
  {
    title: 'Pricing & Payments',
    faqs: [
      {
        question: 'Are there any hidden fees?',
        answer: 'No hidden fees! Our pricing is transparent. You pay monthly rent plus a refundable security deposit. Some properties may have optional services like parking or premium characteristics with additional charges.'
      },
      {
        question: 'How do I pay rent?',
        answer: 'Rent can be paid online through our secure portal using bank transfer, debit card, or credit card. Payments are due monthly in advance, and we send reminders before the due date.'
      },
      {
        question: 'Is there a security deposit?',
        answer: 'Yes, we require a security deposit equivalent to one month\'s rent. This is fully refundable at the end of your stay, provided there\'s no damage to the property.'
      }
    ]
  },
  {
    title: 'Flexibility & Terms',
    faqs: [
      {
        question: 'What are the minimum and maximum stay durations?',
        answer: 'We offer flexible stay options starting from 1 month up to 12 months or longer. Some properties offer week-to-week options for short-term stays.'
      },
      {
        question: 'Can I extend my stay?',
        answer: 'Absolutely! You can extend your stay subject to availability. We recommend discussing extension plans with our team at least 30 days before your current term ends.'
      },
      {
        question: 'What is the notice period for moving out?',
        answer: 'We require 30 days written notice for move-out. For stays shorter than 3 months, the notice period may be reduced to 14 days.'
      },
      {
        question: 'Can I switch to a different room or property?',
        answer: 'Yes! We offer internal transfers within our network based on availability. Transfer requests can be made through your resident portal or by contacting our team.'
      }
    ]
  },
  {
    title: 'Safety & Security',
    faqs: [
      {
        question: 'How secure are the properties?',
        answer: 'All our properties feature secure access with key cards or codes, CCTV in common areas, and secure mailbox systems. Many locations also have 24/7 security or concierge services.'
      },
      {
        question: 'What happens if I lose my keys?',
        answer: 'Contact our support team immediately. We can provide temporary access and arrange for new keys. There may be a replacement fee for lost key cards or fobs.'
      },
      {
        question: 'Is there 24/7 support available?',
        answer: 'We provide 24/7 emergency support for urgent issues like lockouts, heating/cooling problems, or safety concerns. For non-emergency matters, our team is available during business hours.'
      }
    ]
  }
];

const contactOptions = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Get instant answers to your questions',
    action: 'Start Chat'
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send us a detailed message',
    action: 'Send Email'
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak with our team directly',
    action: 'Call Now'
  }
];

const FAQs = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up">
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-up" style={{animationDelay: '0.1s'}}>
              Find answers to common questions about co-living with Anza Living
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <div 
                key={categoryIndex}
                className="mb-12 animate-fade-up"
                style={{animationDelay: `${categoryIndex * 0.1}s`}}
              >
                <h2 className="text-2xl font-bold mb-6 text-center">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="bg-card rounded-xl border border-border/50 px-6 shadow-soft hover:shadow-medium transition-smooth"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-6">
                        <span className="font-semibold text-card-foreground">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Our support team is here to help you with any questions not covered in our FAQ
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {contactOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div 
                    key={index}
                    className="bg-card rounded-2xl p-6 shadow-soft hover-lift border border-border/50 animate-fade-up"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{option.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      {option.action}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQs;