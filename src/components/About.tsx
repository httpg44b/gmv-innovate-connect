import React, { useEffect, useRef } from 'react';
import { Target, Eye, Heart, CheckCircle, TrendingUp, Users, Cpu, Globe, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    elementsRef.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLElement | null, i: number) => { if (el) elementsRef.current[i] = el; };

  const differentials = [
    {
      icon: CheckCircle,
      title: t('about.card1.title'),
      description: t('about.card1.description'),
      color: '#3B82F6',
      delay: 0,
    },
    {
      icon: TrendingUp,
      title: t('about.card2.title'),
      description: t('about.card2.description'),
      color: '#06B6D4',
      delay: 100,
    },
    {
      icon: Users,
      title: t('about.card3.title'),
      description: t('about.card3.description'),
      color: '#8B5CF6',
      delay: 200,
    },
  ];

  const mvvItems = [
    {
      icon: Target,
      title: t('mvv.mission.title'),
      description: t('mvv.mission.description'),
      color: '#3B82F6',
    },
    {
      icon: Eye,
      title: t('mvv.vision.title'),
      description: t('mvv.vision.description'),
      color: '#06B6D4',
    },
    {
      icon: Heart,
      title: t('mvv.values.title'),
      description: t('mvv.values.list'),
      color: '#8B5CF6',
    },
  ];

  const founders = [
    { name: 'Gabriel', role: 'CEO & Tech Lead', icon: Cpu, color: '#3B82F6' },
    { name: 'Matheus', role: 'CTO & Developer', icon: Zap, color: '#06B6D4' },
    { name: 'Vinicyus', role: 'COO & Strategy', icon: Globe, color: '#8B5CF6' },
  ];

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(220 20% 7%) 0%, hsl(220 20% 9%) 100%)' }}
    >
      {/* Top border line */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(213 94% 50% / 0.5), transparent)' }} />

      {/* Animated bg orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-5 animate-morph" style={{ background: 'radial-gradient(circle, #3B82F6, transparent 70%)' }} />
      <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full opacity-5 animate-morph" style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)', animationDelay: '4s' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-primary text-sm mb-4"
            style={{ background: 'hsl(213 94% 50% / 0.1)', backdropFilter: 'blur(10px)' }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            À propos
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t('about.title')}</h2>
          <p className="text-xl text-blue-200/60">{t('about.subtitle')}</p>
        </div>

        {/* Company story */}
        <div className="grid md:grid-cols-2 gap-10 mb-20 items-center">
          {/* Text side */}
          <div
            ref={(el) => addRef(el, 0)}
            className="reveal-left space-y-6"
          >
            <p className="text-lg text-white/70 leading-relaxed">
              {t('about.description')}
            </p>

            {/* Differentials */}
            <div className="space-y-4">
              {differentials.map((card, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 cursor-default group"
                  style={{
                    background: `${card.color}08`,
                    borderColor: `${card.color}20`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${card.color}50`;
                    (e.currentTarget as HTMLElement).style.background = `${card.color}15`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(8px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${card.color}20`;
                    (e.currentTarget as HTMLElement).style.background = `${card.color}08`;
                    (e.currentTarget as HTMLElement).style.transform = '';
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${card.color}25`, border: `1px solid ${card.color}40` }}
                  >
                    <card.icon className="w-5 h-5" style={{ color: card.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{card.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Founders side */}
          <div
            ref={(el) => addRef(el, 1)}
            className="reveal-right"
          >
            <div
              className="rounded-2xl border border-primary/20 overflow-hidden p-6"
              style={{ background: 'hsl(213 94% 50% / 0.05)', backdropFilter: 'blur(10px)' }}
            >
              <h3 className="text-center text-white/80 font-semibold mb-6 text-sm uppercase tracking-widest">
                Les fondateurs
              </h3>
              <div className="space-y-4">
                {founders.map((founder, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group cursor-default"
                    style={{ background: `${founder.color}10`, border: `1px solid ${founder.color}25` }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = `${founder.color}20`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${founder.color}50`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = `${founder.color}10`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${founder.color}25`;
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${founder.color}30`, border: `2px solid ${founder.color}50`, boxShadow: `0 0 15px ${founder.color}30` }}
                    >
                      <founder.icon className="w-6 h-6" style={{ color: founder.color }} />
                    </div>
                    <div>
                      <div className="font-bold text-white">{founder.name}</div>
                      <div className="text-sm" style={{ color: founder.color }}>{founder.role}</div>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: founder.color }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* GMV Acronym */}
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <div className="flex justify-center gap-2 text-3xl font-black">
                  {['G', 'M', 'V'].map((letter, i) => (
                    <span
                      key={i}
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{
                        background: [founders[0].color, founders[1].color, founders[2].color][i] + '25',
                        color: [founders[0].color, founders[1].color, founders[2].color][i],
                        border: `1px solid ${[founders[0].color, founders[1].color, founders[2].color][i]}40`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
                <p className="text-white/40 text-xs mt-2">Generate · More · Value</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Vision Values */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t('mvv.title')}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {mvvItems.map((item, i) => (
              <div
                key={i}
                ref={(el) => addRef(el, i + 2)}
                className="reveal group cursor-default"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div
                  className="h-full p-6 rounded-2xl border transition-all duration-500 group-hover:-translate-y-3"
                  style={{
                    background: `${item.color}08`,
                    borderColor: `${item.color}25`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${item.color}25`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${item.color}50`;
                    (e.currentTarget as HTMLElement).style.background = `${item.color}12`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                    (e.currentTarget as HTMLElement).style.borderColor = `${item.color}25`;
                    (e.currentTarget as HTMLElement).style.background = `${item.color}08`;
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      background: `${item.color}25`,
                      border: `1px solid ${item.color}40`,
                      boxShadow: `0 0 20px ${item.color}20`,
                    }}
                  >
                    <item.icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
