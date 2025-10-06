import React from 'react';
import { TrendingDown, Clock, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from './ui/card';
import gmvLogoFull from '@/assets/gmv-logo-full.png';

const Impact = () => {
  const { t } = useLanguage();

  const impacts = [
    {
      icon: TrendingDown,
      value: t('impact.cost.value'),
      title: t('impact.cost.title'),
      description: t('impact.cost.description'),
      color: 'from-primary/20 to-primary/5'
    },
    {
      icon: Clock,
      value: t('impact.time.value'),
      title: t('impact.time.title'),
      description: t('impact.time.description'),
      color: 'from-secondary/20 to-secondary/5'
    },
    {
      icon: TrendingUp,
      value: t('impact.efficiency.value'),
      title: t('impact.efficiency.title'),
      description: t('impact.efficiency.description'),
      color: 'from-accent/20 to-accent/5'
    }
  ];

  return (
    <section id="impact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('impact.title')}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {impacts.map((impact, index) => (
            <Card
              key={index}
              className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-background to-muted/50"
            >
              <impact.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
              <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                {impact.value}
              </div>
              <h3 className="text-xl font-bold mb-3">{impact.title}</h3>
              <p className="text-muted-foreground text-sm">{impact.description}</p>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <img 
            src={gmvLogoFull} 
            alt="GMV Solution" 
            className="h-20 object-contain opacity-80"
          />
        </div>
      </div>
    </section>
  );
};

export default Impact;
