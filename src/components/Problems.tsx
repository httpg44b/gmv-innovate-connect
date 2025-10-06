import React from 'react';
import { Clock, DollarSign, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from './ui/card';
import gmvLogoFull from '@/assets/gmv-logo-full.png';

const Problems = () => {
  const { t } = useLanguage();

  const problems = [
    {
      icon: Clock,
      title: t('problems.time.title'),
      description: t('problems.time.description'),
      color: 'from-primary to-accent',
    },
    {
      icon: DollarSign,
      title: t('problems.cost.title'),
      description: t('problems.cost.description'),
      color: 'from-accent to-primary-light',
    },
    {
      icon: TrendingDown,
      title: t('problems.efficiency.title'),
      description: t('problems.efficiency.description'),
      color: 'from-primary-dark to-primary',
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('problems.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
          {/* Logo */}
          <div className="flex justify-center order-1 md:order-1">
            <img 
              src={gmvLogoFull} 
              alt="GMV Solution" 
              className="h-24 object-contain opacity-80"
            />
          </div>

          {/* Problems Cards */}
          <div className="space-y-6 order-2 md:order-2">
            {problems.map((problem, index) => (
              <Card
                key={index}
                className="p-6 bg-background/80 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${problem.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <problem.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{problem.title}</h3>
                    <p className="text-sm text-muted-foreground">{problem.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
