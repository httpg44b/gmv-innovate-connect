import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from './ui/card';
import majTechLogo from '@/assets/maj-tech-logo.jpg';

const Clients = () => {
  const { t } = useLanguage();

  return (
    <section id="clients" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t('clients.title')}
          </h2>
          <p className="text-xl text-muted-foreground">{t('clients.subtitle')}</p>
        </div>

        <Card className="max-w-3xl mx-auto p-8 bg-card/50 backdrop-blur-sm border-primary/10 hover:shadow-card transition-all duration-300">
          <Quote className="w-10 h-10 text-primary mb-6" />
          <blockquote className="text-lg italic text-muted-foreground mb-6">
            "{t('clients.testimonial')}"
          </blockquote>
          <div className="flex items-center gap-4">
            <img 
              src={majTechLogo} 
              alt="MAJ Tech Logo" 
              className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
            />
            <div>
              <p className="font-bold">MAJ Tech</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Clients;