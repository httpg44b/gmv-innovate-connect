import React, { useEffect, useRef } from 'react';
import { Clock, DollarSign, TrendingDown, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Problems = () => {
  const { t } = useLanguage();
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    elementsRef.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const problems = [
    {
      icon: Clock,
      title: t('problems.time.title'),
      description: t('problems.time.description'),
      solution: 'Automatisation complète des tâches répétitives',
      color: '#F59E0B',
    },
    {
      icon: DollarSign,
      title: t('problems.cost.title'),
      description: t('problems.cost.description'),
      solution: 'Réduction moyenne de 40% des coûts opérationnels',
      color: '#EF4444',
    },
    {
      icon: TrendingDown,
      title: t('problems.efficiency.title'),
      description: t('problems.efficiency.description'),
      solution: 'Intégration de systèmes unifiés et performants',
      color: '#8B5CF6',
    },
  ];

  return (
    <section
      id="solutions"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(220 20% 8%) 0%, hsl(220 20% 6%) 100%)' }}
    >
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(213 94% 50% / 0.5), transparent)' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-primary text-sm mb-4"
            style={{ background: 'hsl(213 94% 50% / 0.1)', backdropFilter: 'blur(10px)' }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Problèmes & Solutions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t('problems.title')}</h2>
          <p className="text-lg text-blue-200/60 max-w-2xl mx-auto">
            Nous identifions vos blocages et y apportons des solutions technologiques concrètes.
          </p>
        </div>

        {/* Problems with before/after layout */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {problems.map((problem, i) => (
            <div
              key={i}
              ref={(el) => { if (el) elementsRef.current[i] = el as HTMLElement; }}
              className="reveal grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border"
              style={{
                borderColor: `${problem.color}25`,
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {/* Problem side */}
              <div
                className="p-6 relative"
                style={{ background: `${problem.color}08` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${problem.color}25`, border: `1px solid ${problem.color}40` }}
                  >
                    <problem.icon className="w-4 h-4" style={{ color: problem.color }} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: problem.color }}>
                    Problème
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{problem.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{problem.description}</p>
              </div>

              {/* Divider arrow */}
              <div className="relative flex items-center justify-center md:hidden py-2" style={{ background: 'hsl(220 20% 10%)' }}>
                <ArrowRight className="w-5 h-5" style={{ color: problem.color }} />
              </div>

              {/* Solution side */}
              <div
                className="p-6 relative"
                style={{ background: `hsl(213 94% 50% / 0.05)` }}
              >
                <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center border"
                    style={{ background: 'hsl(220 20% 8%)', borderColor: `${problem.color}40` }}
                  >
                    <ArrowRight className="w-4 h-4" style={{ color: problem.color }} />
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#22C55E25', border: '1px solid #22C55E40' }}>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-green-400">
                    Notre Solution
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">GMV Solution</h3>
                <p className="text-sm text-green-400/80 leading-relaxed font-medium">{problem.solution}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          ref={(el) => { if (el) elementsRef.current[3] = el as HTMLElement; }}
          className="reveal text-center mt-12"
          style={{ transitionDelay: '0.4s' }}
        >
          <div
            className="inline-block p-8 rounded-2xl border border-primary/20 max-w-2xl"
            style={{ background: 'hsl(213 94% 50% / 0.05)' }}
          >
            <h3 className="text-2xl font-bold text-white mb-3">
              Prêt à résoudre ces défis ?
            </h3>
            <p className="text-white/50 mb-6">
              Parlons de vos besoins spécifiques et construisons ensemble la solution idéale.
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, hsl(213 94% 50%), hsl(199 89% 48%))', boxShadow: '0 0 20px hsl(213 94% 50% / 0.4)' }}
            >
              Obtenir une consultation gratuite
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
