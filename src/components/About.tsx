import React from 'react';
import { Target, Eye, Heart, CheckCircle, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from './ui/card';
import gmvLogoFull from '@/assets/gmv-logo-full.png';
import aboutUs from '../images/aboutus.jpg';

const About = () => {
  const { t } = useLanguage();

  const differentialsCards = [
    {
      icon: CheckCircle,
      title: t('about.card1.title'),
      description: t('about.card1.description'),
    },
    {
      icon: TrendingUp,
      title: t('about.card2.title'),
      description: t('about.card2.description'),
    },
    {
      icon: Users,
      title: t('about.card3.title'),
      description: t('about.card3.description'),
    }
  ];

  const mvvItems = [
    {
      icon: Target,
      title: t('mvv.mission.title'),
      description: t('mvv.mission.description'),
      gradient: 'from-primary/20 to-primary/5'
    },
    {
      icon: Eye,
      title: t('mvv.vision.title'),
      description: t('mvv.vision.description'),
      gradient: 'from-secondary/20 to-secondary/5'
    },
    {
      icon: Heart,
      title: t('mvv.values.title'),
      description: t('mvv.values.list'),
      gradient: 'from-accent/20 to-accent/5'
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Qui sommes-nous Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('about.title')}</h2>
            <p className="text-xl text-muted-foreground mb-2">{t('about.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Description with Logo */}
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-background border-primary/20">
              <div className="flex justify-center mb-6">
                <img 
                  src={aboutUs} 
                  alt="GMV Solution" 
                  className="h-60 object-contain opacity-100"
                />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.description')}
              </p>
            </Card>

            {/* Differentials Cards */}
            <div className="space-y-4">
              {differentialsCards.map((card, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 bg-background/80 backdrop-blur-sm border-primary/10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <card.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                      <p className="text-sm text-muted-foreground">{card.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Mission, Vision, Values Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('mvv.title')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Logo on the right */}
            <div className="flex items-center justify-center order-2 md:order-1">
              <img 
                src={gmvLogoFull} 
                alt="GMV Solution" 
                className="h-32 object-contain opacity-80"
              />
            </div>

            {/* MVV Cards on the left */}
            <div className="space-y-6 order-1 md:order-2">
              {mvvItems.map((item, index) => (
                <Card
                  key={index}
                  className={`p-6 bg-gradient-to-br ${item.gradient} border-primary/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
