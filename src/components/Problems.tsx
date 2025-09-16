import React from 'react';
import { Clock, DollarSign, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from './ui/card';
import businessGrowth from '@/assets/business-growth.jpg';
import confusionImage from '@/assets/confusion-image.jpg';

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
    <section id="solutions" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t('problems.title')}
          </h2>
        </div>
        
        {/* Feature Image */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl mb-12 max-w-4xl mx-auto">
          <img 
            src={businessGrowth} 
            alt="Business Growth and Solutions" 
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-accent/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white text-center px-4">
              {t('problems.subtitle') || 'Solutions qui transforment votre entreprise'}
            </h3>
          </div>
        </div>

        {/* Confusion Image */}
        <div className="mb-12 max-w-5xl mx-auto">
          <img 
            src={confusionImage} 
            alt="Business challenges and solutions" 
            className="w-full rounded-xl shadow-2xl"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card
              key={index}
              className="p-8 bg-card/50 backdrop-blur-sm border-primary/10 hover:shadow-card transition-all duration-500 hover:-translate-y-2"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${problem.color} rounded-xl flex items-center justify-center mb-6`}>
                <problem.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;