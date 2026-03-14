import React, { useEffect, useRef, useState } from 'react';
import { TrendingDown, Clock, TrendingUp, Users, Award, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const useCountUp = (target: number, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

const Impact = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    cardsRef.current.forEach(el => { if (el) revealObserver.observe(el); });
    return () => revealObserver.disconnect();
  }, []);

  const c40 = useCountUp(40, 2000, started);
  const c60 = useCountUp(60, 2200, started);
  const c85 = useCountUp(85, 2400, started);
  const c100 = useCountUp(100, 2600, started);
  const cProjects = useCountUp(50, 2000, started);
  const cClients = useCountUp(20, 1800, started);

  const mainImpacts = [
    { icon: TrendingDown, value: c40, suffix: '%', label: t('impact.cost.title'), description: t('impact.cost.description'), color: '#3B82F6', progress: 40 },
    { icon: Clock, value: c60, suffix: '%', label: t('impact.time.title'), description: t('impact.time.description'), color: '#06B6D4', progress: 60 },
    { icon: TrendingUp, value: c85, suffix: '%', label: t('impact.efficiency.title'), description: t('impact.efficiency.description'), color: '#8B5CF6', progress: 85 },
    { icon: Award, value: c100, suffix: '%', label: 'Satisfaction client', description: 'Nos clients recommandent nos services', color: '#F59E0B', progress: 100 },
  ];

  const secondaryStats = [
    { icon: Globe, value: cProjects, suffix: '+', label: 'Projets livrés', color: '#3B82F6' },
    { icon: Users, value: cClients, suffix: '+', label: 'Clients actifs', color: '#06B6D4' },
    { icon: Award, value: 3, suffix: ' ans', label: "D'expertise", color: '#8B5CF6' },
  ];

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(220 20% 5%) 0%, hsl(220 20% 8%) 100%)' }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(213 94% 50% / 0.6) 1px, transparent 1px), linear-gradient(90deg, hsl(213 94% 50% / 0.6) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-primary text-sm mb-4"
            style={{ background: 'hsl(213 94% 50% / 0.1)', backdropFilter: 'blur(10px)' }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Résultats mesurables
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('impact.title')}
          </h2>
          <p className="text-lg text-blue-200/60 max-w-2xl mx-auto">
            Des chiffres qui parlent d'eux-mêmes — chaque projet est optimisé pour maximiser votre retour sur investissement.
          </p>
        </div>

        {/* Main impact cards with progress rings */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mainImpacts.map((impact, i) => (
            <div
              key={i}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="reveal group"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                className="p-6 rounded-2xl border text-center transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 cursor-default"
                style={{
                  background: `${impact.color}0A`,
                  borderColor: `${impact.color}25`,
                  boxShadow: `0 4px 20px ${impact.color}10`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${impact.color}30`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${impact.color}50`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${impact.color}10`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${impact.color}25`;
                }}
              >
                {/* Circular progress */}
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="40" fill="none" stroke={`${impact.color}20`} strokeWidth="6" />
                    <circle
                      cx="48" cy="48" r="40" fill="none"
                      stroke={impact.color} strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - (started ? impact.progress : 0) / 100)}`}
                      style={{ transition: 'stroke-dashoffset 2s ease-out' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <impact.icon className="w-7 h-7" style={{ color: impact.color }} />
                  </div>
                </div>

                <div className="text-4xl md:text-5xl font-bold mb-1" style={{ color: impact.color }}>
                  {impact.value}{impact.suffix}
                </div>
                <h3 className="text-sm font-semibold text-white/80 mb-2">{impact.label}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{impact.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary stats row */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {secondaryStats.map((stat, i) => (
            <div
              key={i}
              ref={(el) => { if (el) cardsRef.current[i + 4] = el; }}
              className="reveal text-center p-4 rounded-xl border border-white/10 glass-card"
              style={{ transitionDelay: `${(i + 4) * 0.1}s` }}
            >
              <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color }} />
              <div className="text-3xl font-bold" style={{ color: stat.color }}>
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
