import React from 'react';
import { Code, Cpu, Link, Lightbulb, Network, Binary, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from './ui/card';
import softwareDevelopment from '@/assets/software-development.jpg';
import automationTechnology from '@/assets/automation-technology.jpg';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Code,
      title: t('services.development.title'),
      description: t('services.development.description'),
    },
    {
      icon: Cpu,
      title: t('services.automation.title'),
      description: t('services.automation.description'),
    },
    {
      icon: Link,
      title: t('services.integration.title'),
      description: t('services.integration.description'),
    },
    {
      icon: Lightbulb,
      title: t('services.consulting.title'),
      description: t('services.consulting.description'),
    },
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Floating binary code background */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-primary font-mono text-2xl animate-slide-in-down"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationIterationCount: 'infinite'
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Network className="w-10 h-10 text-primary animate-pulse-glow" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
              {t('services.title')}
            </h2>
            <Binary className="w-10 h-10 text-primary animate-pulse-glow" style={{animationDelay: '0.5s'}} />
          </div>
          <p className="text-xl text-muted-foreground animate-fade-in-up">{t('services.subtitle')}</p>
        </div>
        
        {/* Images Gallery */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="relative rounded-xl overflow-hidden shadow-xl group">
            <img 
              src={softwareDevelopment} 
              alt="Software Development" 
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-60"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-2xl font-bold">{t('services.development.title')}</h3>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden shadow-xl group">
            <img 
              src={automationTechnology} 
              alt="Automation Technology" 
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-60"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-2xl font-bold">{t('services.automation.title')}</h3>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group p-6 bg-card/50 backdrop-blur-sm border-primary/10 hover:shadow-card transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Holographic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-tech opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              
              {/* Sparkle effect on hover */}
              <Sparkles className="absolute top-2 right-2 w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow" />
              
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative z-10">
                <service.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2 relative z-10">{service.title}</h3>
              <p className="text-muted-foreground text-sm relative z-10">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;