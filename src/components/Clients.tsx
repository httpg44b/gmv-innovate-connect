import React from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from './ui/card';
import majTechLogo from '@/assets/maj-tech-logo.jpg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// opcional: tipagem para evitar erro quando text for JSX
type Testimonial = {
  id: number;
  name: string;
  logo: string;
  text: React.ReactNode; // <-- aceita string ou JSX
  rating: number;
};

const Clients = () => {
  const { t } = useLanguage();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "MAJ Tech",
      logo: majTechLogo,
      text: t('clients.testimonial'), // pode ser JSX
      rating: 5
    },
    {
      id: 2,
      name: "Digital Innovations",
      logo: majTechLogo,
      text: "Une équipe exceptionnelle qui a transformé notre vision en réalité.",
      rating: 5
    },
    {
      id: 3,
      name: "Tech Solutions Inc",
      logo: majTechLogo,
      text: "Le meilleur partenaire technologique que nous ayons eu.",
      rating: 5
    }
  ];

  return (
    <section id="clients" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          >
            <Sparkles className="w-4 h-4 text-primary/20" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
            {t('clients.title')}
          </h2>
          <p className="text-xl text-muted-foreground animate-fade-in-up">{t('clients.subtitle')}</p>
        </div>

        <Carousel className="max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/10 hover:shadow-card transition-all duration-300 relative overflow-hidden group">
                  {/* Holographic effect on hover - evita bloquear clique */}
                  <div className="absolute inset-0 bg-gradient-tech opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

                  <Quote className="w-10 h-10 text-primary mb-6 animate-pulse-glow" />

                  {/* ✅ Sem aspas envolvendo o JSX */}
                  <blockquote className="text-lg italic text-muted-foreground mb-6">
                    {/* Se quiser aspas visuais, use caracteres separadamente */}
                    <span aria-hidden>“</span>
                    {testimonial.text}
                    <span aria-hidden>”</span>
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse pointer-events-none" />
                      <img
                        src={testimonial.logo}
                        alt={`${testimonial.name} Logo`}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/20 relative z-10"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-primary text-primary animate-pulse-glow"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-primary/10 hover:bg-primary/20 border-primary/30 text-primary" />
          <CarouselNext className="bg-primary/10 hover:bg-primary/20 border-primary/30 text-primary" />
        </Carousel>
      </div>
    </section>
  );
};

export default Clients;
