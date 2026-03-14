import React, { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import majTechLogo from '@/assets/maj-tech-logo-new.jpg';
import hotelDanube from '@/assets/hotel-danube.png';
import hotelLutece from '@/assets/hotel-lutece.png';
import hotelSaintGermain from '@/assets/hotel-saint-germain.png';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  logo: string;
  text: React.ReactNode;
  rating: number;
  color: string;
};

const Clients = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "MAJ Tech",
      role: "Gestionnaire de services hôteliers",
      logo: majTechLogo,
      text: (
        <>
          En peu de temps, ils ont créé une plateforme complète pour la gestion de mes services dans 4 hôtels à Paris.{' '}
          <a href="https://www.majdesk.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline font-semibold transition-colors">
            Voir la plateforme →
          </a>
        </>
      ),
      rating: 5,
      color: '#3B82F6',
    },
    {
      id: 2,
      name: "Hôtel du Danube",
      role: "Direction générale",
      logo: hotelDanube,
      text: "La plateforme a révolutionné notre gestion quotidienne. Interface intuitive et résultats immédiats. Nous économisons des heures chaque semaine!",
      rating: 5,
      color: '#06B6D4',
    },
    {
      id: 3,
      name: "Hôtel de Lutèce",
      role: "Responsable opérationnel",
      logo: hotelLutece,
      text: "Une solution pratique et efficace qui nous fait gagner un temps précieux. Nous recommandons vivement l'équipe GMV Solution!",
      rating: 5,
      color: '#8B5CF6',
    },
    {
      id: 4,
      name: "HVSG Paris",
      role: "Manager de l'établissement",
      logo: hotelSaintGermain,
      text: "Simplicité et performance au rendez-vous. La meilleure décision que nous ayons prise pour notre établissement. Équipe réactive et professionnelle.",
      rating: 5,
      color: '#F59E0B',
    },
  ];

  const logos = [majTechLogo, hotelDanube, hotelLutece, hotelSaintGermain];

  return (
    <section
      id="clients"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(220 20% 6%) 0%, hsl(220 20% 8%) 100%)' }}
    >
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(213 94% 50% / 0.5), transparent)' }} />

      {/* Floating sparkles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float pointer-events-none"
          style={{
            left: `${(i * 8.3) % 100}%`,
            top: `${(i * 13.7) % 100}%`,
            width: `${4 + (i % 3) * 3}px`,
            height: `${4 + (i % 3) * 3}px`,
            background: `hsl(213 94% 50% / ${0.1 + (i % 4) * 0.05})`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${4 + (i % 3)}s`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="reveal text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-primary text-sm mb-4"
            style={{ background: 'hsl(213 94% 50% / 0.1)', backdropFilter: 'blur(10px)' }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Témoignages clients
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t('clients.title')}</h2>
          <p className="text-xl text-blue-200/60">{t('clients.subtitle')}</p>
        </div>

        {/* Logo bar */}
        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="w-16 h-16 rounded-full border overflow-hidden transition-all duration-300 hover:scale-110"
              style={{ borderColor: 'rgba(59, 130, 246, 0.2)', background: 'rgba(255,255,255,0.05)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59, 130, 246, 0.5)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.2)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59, 130, 246, 0.2)'; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
            >
              <img src={logo} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Testimonials carousel */}
        <Carousel className="max-w-3xl mx-auto" opts={{ loop: true }}>
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <div
                  className="p-8 rounded-2xl border relative overflow-hidden"
                  style={{
                    background: `${testimonial.color}08`,
                    borderColor: `${testimonial.color}25`,
                  }}
                >
                  {/* Quote icon */}
                  <Quote
                    className="w-10 h-10 mb-5 opacity-60"
                    style={{ color: testimonial.color }}
                  />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <blockquote className="text-lg text-white/75 italic leading-relaxed mb-6">
                    {testimonial.text}
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-full border-2 overflow-hidden flex-shrink-0"
                      style={{ borderColor: `${testimonial.color}40`, boxShadow: `0 0 15px ${testimonial.color}30` }}
                    >
                      <img src={testimonial.logo} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{testimonial.name}</p>
                      <p className="text-sm" style={{ color: testimonial.color }}>{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Glow effect */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${testimonial.color}15, transparent 70%)` }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="text-primary border-primary/30 hover:border-primary/60 transition-colors"
            style={{ background: 'rgba(59, 130, 246, 0.1)' }}
          />
          <CarouselNext
            className="text-primary border-primary/30 hover:border-primary/60 transition-colors"
            style={{ background: 'rgba(59, 130, 246, 0.1)' }}
          />
        </Carousel>
      </div>
    </section>
  );
};

export default Clients;
