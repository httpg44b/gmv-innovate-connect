import React, { useEffect, useRef, useState } from 'react';
import { Code, Zap, Globe, Layers, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import softwareDevelopmentImg from '@/assets/software-development-service.jpg';
import automationImg from '@/assets/automation-service.jpg';
import websiteImg from '@/assets/website-service.jpg';
import digitalProjectsImg from '@/assets/digital-projects-service.jpg';

const Services = () => {
  const { t } = useLanguage();
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    cardsRef.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Code,
      title: t('services.software.title'),
      description: t('services.software.description'),
      image: softwareDevelopmentImg,
      color: '#3B82F6',
      features: ['Applications web & mobile', 'APIs & microservices', 'Architecture cloud', 'Tests automatisés'],
      badge: 'Populaire',
    },
    {
      icon: Zap,
      title: t('services.automation.title'),
      description: t('services.automation.description'),
      image: automationImg,
      color: '#F59E0B',
      features: ['Workflows automatisés', 'Intégration systèmes', 'RPA & bots', 'Monitoring en temps réel'],
      badge: 'ROI rapide',
    },
    {
      icon: Globe,
      title: t('services.websites.title'),
      description: t('services.websites.description'),
      image: websiteImg,
      color: '#06B6D4',
      features: ['Design UI/UX moderne', 'SEO optimisé', 'Performance maximale', 'Responsive & accessible'],
      badge: 'Tendance',
    },
    {
      icon: Layers,
      title: t('services.digital.title'),
      description: t('services.digital.description'),
      image: digitalProjectsImg,
      color: '#8B5CF6',
      features: ['Conseil stratégique', 'Transformation digitale', 'Formation équipes', 'Support continu'],
      badge: 'Sur mesure',
    },
  ];

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="services"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(220 20% 8%) 0%, hsl(220 20% 6%) 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(213 94% 50% / 0.5), transparent)' }} />
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(213 94% 50% / 0.5), transparent)' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-primary text-sm mb-4"
            style={{ background: 'hsl(213 94% 50% / 0.1)', backdropFilter: 'blur(10px)' }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Nos services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('services.title')}
          </h2>
          <p className="text-xl text-blue-200/60">{t('services.subtitle')}</p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeCard === index;
            return (
              <div
                key={index}
                ref={(el) => { if (el) cardsRef.current[index] = el; }}
                className="reveal group cursor-pointer"
                style={{ transitionDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div
                  className="relative rounded-2xl border overflow-hidden transition-all duration-500"
                  style={{
                    borderColor: isActive ? `${service.color}50` : `${service.color}20`,
                    background: `${service.color}05`,
                    boxShadow: isActive ? `0 20px 60px ${service.color}25, 0 0 40px ${service.color}10` : '0 4px 20px rgba(0,0,0,0.2)',
                    transform: isActive ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
                  }}
                >
                  {/* Image with overlay */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={service.image}
                      alt={String(service.title)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(to bottom, ${service.color}20, hsl(220 20% 7%))` }}
                    />
                    {/* Badge */}
                    <div
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ background: service.color, boxShadow: `0 0 15px ${service.color}60` }}
                    >
                      {service.badge}
                    </div>
                    {/* Icon */}
                    <div
                      className="absolute bottom-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${service.color}30`,
                        border: `1px solid ${service.color}50`,
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: service.color }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                    <p className="text-white/50 text-sm mb-4 leading-relaxed">{service.description}</p>

                    {/* Features list */}
                    <ul className="space-y-2 mb-5">
                      {service.features.map((feature, fi) => (
                        <li key={fi} className="flex items-center gap-2 text-sm text-white/60">
                          <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: service.color }} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={scrollToContact}
                      className="flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/btn"
                      style={{ color: service.color }}
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>

                  {/* Animated border glow */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `inset 0 0 30px ${service.color}10` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, hsl(213 94% 50%), hsl(199 89% 48%))',
              boxShadow: '0 0 30px hsl(213 94% 50% / 0.4)',
            }}
          >
            Démarrer un projet
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
