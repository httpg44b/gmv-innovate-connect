import React from 'react';
import { Code, Zap, Globe, Layers } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from './ui/card';
import softwareDevelopmentImg from '@/assets/software-development-service.jpg';
import automationImg from '@/assets/automation-service.jpg';
import websiteImg from '@/assets/website-service.jpg';
import digitalProjectsImg from '@/assets/digital-projects-service.jpg';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Code,
      title: t('services.software.title'),
      description: t('services.software.description'),
      image: softwareDevelopmentImg,
    },
    {
      icon: Zap,
      title: t('services.automation.title'),
      description: t('services.automation.description'),
      image: automationImg,
    },
    {
      icon: Globe,
      title: t('services.websites.title'),
      description: t('services.websites.description'),
      image: websiteImg,
    },
    {
      icon: Layers,
      title: t('services.digital.title'),
      description: t('services.digital.description'),
      image: digitalProjectsImg,
    },
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground">{t('services.subtitle')}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-background border-primary/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={String(service.title)}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;