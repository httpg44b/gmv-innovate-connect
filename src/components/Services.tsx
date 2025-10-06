import React from 'react';
import { Building2, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from './ui/card';
import softwareDevelopment from '@/assets/software-development.jpg';

const Services = () => {
  const { t } = useLanguage();

  const enterprises = [
    t('services.enterprises.item1'),
    t('services.enterprises.item2'),
    t('services.enterprises.item3'),
    t('services.enterprises.item4'),
  ];

  const individuals = [
    t('services.individuals.item1'),
    t('services.individuals.item2'),
    t('services.individuals.item3'),
    t('services.individuals.item4'),
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
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="relative rounded-xl overflow-hidden shadow-xl group order-2 md:order-1">
            <img 
              src={softwareDevelopment} 
              alt="Software Development" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-60"></div>
          </div>

          {/* Services Cards */}
          <div className="flex flex-col gap-6 order-1 md:order-2">
            {/* Entreprises Card */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-background/80 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">{t('services.enterprises.title')}</h3>
              </div>
              <ul className="space-y-2">
                {enterprises.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Particuliers Card */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-background/80 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">{t('services.individuals.title')}</h3>
              </div>
              <ul className="space-y-2">
                {individuals.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;