import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const technologies = [
  { name: 'React', color: '#61DAFB', icon: '⚛️', category: 'Frontend' },
  { name: 'TypeScript', color: '#3178C6', icon: '📘', category: 'Language' },
  { name: 'Node.js', color: '#339933', icon: '🟢', category: 'Backend' },
  { name: 'Python', color: '#3776AB', icon: '🐍', category: 'AI & Data' },
  { name: 'PostgreSQL', color: '#336791', icon: '🐘', category: 'Database' },
  { name: 'Docker', color: '#2496ED', icon: '🐳', category: 'DevOps' },
  { name: 'AWS', color: '#FF9900', icon: '☁️', category: 'Cloud' },
  { name: 'Next.js', color: '#FFFFFF', icon: '▲', category: 'Frontend' },
  { name: 'MongoDB', color: '#47A248', icon: '🍃', category: 'Database' },
  { name: 'Redis', color: '#DC382D', icon: '⚡', category: 'Cache' },
  { name: 'GraphQL', color: '#E10098', icon: '◈', category: 'API' },
  { name: 'Tailwind', color: '#06B6D4', icon: '🎨', category: 'Styling' },
];

const orbitalTechs = [
  { name: 'React', color: '#61DAFB', angle: 0 },
  { name: 'Node.js', color: '#339933', angle: 60 },
  { name: 'Python', color: '#3776AB', angle: 120 },
  { name: 'Docker', color: '#2496ED', angle: 180 },
  { name: 'AWS', color: '#FF9900', angle: 240 },
  { name: 'TypeScript', color: '#3178C6', angle: 300 },
];

const TechStack = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="techstack"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(220 20% 7%) 0%, hsl(220 20% 5%) 100%)' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(213 94% 50% / 0.6) 1px, transparent 1px), linear-gradient(90deg, hsl(213 94% 50% / 0.6) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow blob center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(213 94% 50% / 0.08), transparent 70%)' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-primary text-sm mb-4"
            style={{ background: 'hsl(213 94% 50% / 0.1)', backdropFilter: 'blur(10px)' }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Stack Technologique
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Technologies que nous{' '}
            <span className="gradient-text-animated">maîtrisons</span>
          </h2>
          <p className="text-lg text-blue-200/60 max-w-2xl mx-auto">
            Nous utilisons les technologies les plus modernes pour construire des solutions robustes, scalables et performantes.
          </p>
        </div>

        {/* Orbital animation */}
        <div className="relative flex items-center justify-center mb-20 h-64 md:h-80">
          {/* Center core */}
          <div className="absolute z-10 w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, hsl(213 94% 50%), hsl(199 89% 48%))',
              boxShadow: '0 0 40px hsl(213 94% 50% / 0.6), 0 0 80px hsl(213 94% 50% / 0.3)',
            }}
          >
            <span className="text-white font-bold text-lg">GMV</span>
          </div>

          {/* Orbit rings */}
          <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full border border-primary/20 animate-spin-slow" />
          <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-primary/10 animate-spin-reverse" />

          {/* Orbiting tech dots */}
          {orbitalTechs.map((tech, i) => (
            <div
              key={i}
              className="absolute w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white border border-white/20"
              style={{
                background: `${tech.color}22`,
                border: `1px solid ${tech.color}55`,
                boxShadow: `0 0 10px ${tech.color}44`,
                animation: `orbit ${10 + i * 1.5}s linear infinite`,
                animationDelay: `${-i * (10 / 6)}s`,
              }}
              title={tech.name}
            >
              <span style={{ color: tech.color, fontSize: '9px', fontWeight: 700 }}>
                {tech.name.slice(0, 3).toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {/* Tech grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {technologies.map((tech, i) => (
            <div
              key={i}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="reveal group cursor-default"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div
                className="p-4 rounded-xl border text-center transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1"
                style={{
                  background: `${tech.color}08`,
                  borderColor: `${tech.color}25`,
                  boxShadow: `0 0 0 0 ${tech.color}40`,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${tech.color}30, 0 0 40px ${tech.color}15`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${tech.color}60`;
                  (e.currentTarget as HTMLElement).style.background = `${tech.color}15`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                  (e.currentTarget as HTMLElement).style.borderColor = `${tech.color}25`;
                  (e.currentTarget as HTMLElement).style.background = `${tech.color}08`;
                }}
              >
                <div className="text-3xl mb-2">{tech.icon}</div>
                <div className="text-sm font-semibold text-white/90">{tech.name}</div>
                <div
                  className="text-xs mt-1 px-2 py-0.5 rounded-full inline-block"
                  style={{ color: tech.color, background: `${tech.color}15` }}
                >
                  {tech.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Code window decoration */}
        <div className="mt-16 max-w-2xl mx-auto reveal">
          <div
            className="rounded-2xl border border-primary/20 overflow-hidden"
            style={{ background: 'hsl(220 20% 8%)', boxShadow: '0 20px 60px hsl(213 94% 50% / 0.15)' }}
          >
            {/* Window bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10" style={{ background: 'hsl(220 20% 11%)' }}>
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-white/30 font-mono">gmv-solution.ts</span>
            </div>
            {/* Code content */}
            <div className="p-6 font-mono text-sm">
              <div><span className="text-purple-400">const</span> <span className="text-blue-300">gmvSolution</span> <span className="text-white/60">=</span> <span className="text-yellow-300">{'{'}</span></div>
              <div className="ml-4"><span className="text-green-300">mission</span><span className="text-white/60">:</span> <span className="text-orange-300">'Generate More Value'</span><span className="text-white/60">,</span></div>
              <div className="ml-4"><span className="text-green-300">location</span><span className="text-white/60">:</span> <span className="text-orange-300">'Paris, France'</span><span className="text-white/60">,</span></div>
              <div className="ml-4"><span className="text-green-300">founders</span><span className="text-white/60">:</span> <span className="text-cyan-300">['Gabriel', 'Matheus', 'Vinicyus']</span><span className="text-white/60">,</span></div>
              <div className="ml-4"><span className="text-green-300">expertise</span><span className="text-white/60">:</span> <span className="text-cyan-300">['Software', 'Automation', 'AI']</span><span className="text-white/60">,</span></div>
              <div className="ml-4">
                <span className="text-green-300">transform</span><span className="text-white/60">: </span>
                <span className="text-purple-400">async</span>
                <span className="text-white/60">(</span>
                <span className="text-blue-200">yourBusiness</span>
                <span className="text-white/60">)</span>
                <span className="text-white/60"> =&gt; </span>
                <span className="text-yellow-300">{'{'}</span>
              </div>
              <div className="ml-8">
                <span className="text-purple-400">return</span>
                <span className="text-white/60"> await </span>
                <span className="text-blue-300">generateMoreValue</span>
                <span className="text-white/60">(</span>
                <span className="text-blue-200">yourBusiness</span>
                <span className="text-white/60">);</span>
              </div>
              <div className="ml-4"><span className="text-yellow-300">{'}'}</span></div>
              <div><span className="text-yellow-300">{'}'}</span><span className="text-white/60">;</span></div>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-white/20 text-xs">// Running...</span>
                <span className="w-2 h-4 bg-primary/80 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
