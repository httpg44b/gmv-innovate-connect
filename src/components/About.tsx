import React from 'react';
import { Users, Target, Eye, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from './ui/card';
import teamCollaboration from '@/assets/team-collaboration.jpg';

const About = () => {
  const { t } = useLanguage();

  const mvvItems = [
    {
      icon: Target,
      title: t('mvv.mission.title'),
      description: t('mvv.mission.description'),
      color: 'from-primary to-primary-light',
    },
    {
      icon: Eye,
      title: t('mvv.vision.title'),
      description: t('mvv.vision.description'),
      color: 'from-accent to-accent-glow',
    },
    {
      icon: Heart,
      title: t('mvv.values.title'),
      description: t('mvv.values.list'),
      color: 'from-primary-dark to-primary',
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t('about.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Company Introduction */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16 items-center">
          <div className="order-2 lg:order-1">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/10 hover:shadow-card transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">GMV Solution</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.description')}
                  </p>
                </div>
              </div>
              
              <div className="border-t border-border pt-6">
                <h4 className="text-lg font-semibold mb-2">{t('about.founders')}</h4>
                <p className="text-muted-foreground">
                  {t('about.founders.description')}
                </p>
              </div>
            </Card>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src={teamCollaboration} 
                alt="GMV Solution Team" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {mvvItems.map((item, index) => (
            <Card
              key={index}
              className="group relative p-8 bg-card/50 backdrop-blur-sm border-primary/10 hover:shadow-card transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
              
              {/* Decorative Element */}
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;