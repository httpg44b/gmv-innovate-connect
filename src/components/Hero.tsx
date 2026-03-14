import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Zap, Shield, Code2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';

const TYPING_STRINGS = [
  'Développement de logiciels',
  'Automatisation des processus',
  'Transformation digitale',
  'Sites Web sur mesure',
  'Solutions IA & Innovation',
];

const Hero = () => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const matrixRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [typingText, setTypingText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      mouseRef.current = { x, y };
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing effect
  useEffect(() => {
    const current = TYPING_STRINGS[typingIndex];
    const speed = isDeleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypingText(current.substring(0, charIndex + 1));
        setCharIndex((c) => c + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setTypingText(current.substring(0, charIndex - 1));
        setCharIndex((c) => c - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTypingIndex((i) => (i + 1) % TYPING_STRINGS.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, typingIndex]);

  // Matrix rain canvas
  useEffect(() => {
    const canvas = matrixRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()ΩΨΦΣΔΛαβγδεζηθ<>{}[]|/\\';
    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    let animId: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const progress = y / (canvas.height / fontSize);
        if (Math.random() < 0.1) {
          ctx.fillStyle = `rgba(147, 210, 255, ${0.9 - progress * 0.6})`;
        } else {
          ctx.fillStyle = `rgba(59, 130, 246, ${0.5 - progress * 0.3})`;
        }
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize); };
  }, []);

  // Particle network canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; opacity: number }> = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      particles.forEach((p) => {
        p.x += p.vx + mx * 0.008;
        p.y += p.vy + my * 0.008;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 179, 255, ${p.opacity})`;
        ctx.fill();
      });
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 179, 255, ${0.3 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize); };
  }, []);

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { value: '40%', label: 'Réduction des coûts', icon: Zap },
    { value: '60%', label: 'Gain de temps', icon: Shield },
    { value: '85%', label: 'Efficacité accrue', icon: Code2 },
    { value: '100%', label: 'Satisfaction client', icon: Sparkles },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, hsl(220 20% 5%), hsl(213 40% 10%), hsl(220 20% 7%))' }}
    >
      {/* Matrix rain */}
      <canvas ref={matrixRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.13 }} />
      {/* Particle network */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }} />

      {/* Animated gradient blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 animate-morph"
        style={{ background: 'radial-gradient(circle, hsl(213 94% 50%), transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 animate-morph"
        style={{ background: 'radial-gradient(circle, hsl(199 89% 48%), transparent 70%)', animationDelay: '4s' }}
      />

      {/* Scan line */}
      <div
        className="absolute left-0 w-full h-px opacity-20 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(213 94% 50%), transparent)',
          animation: 'scanLine 8s linear infinite',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(213 94% 50% / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(213 94% 50% / 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating tech icons */}
      <div className="absolute top-24 right-16 animate-float opacity-40 hidden md:block" style={{ animationDelay: '0s', transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.2}px)` }}>
        <div className="w-12 h-12 rounded-xl border border-primary/40 flex items-center justify-center glass-card">
          <Code2 className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="absolute top-44 left-14 animate-float opacity-40 hidden md:block" style={{ animationDelay: '1s', transform: `translate(${mousePos.x * -0.2}px, ${mousePos.y * 0.3}px)` }}>
        <div className="w-10 h-10 rounded-lg border border-accent/40 flex items-center justify-center glass-card">
          <Zap className="w-5 h-5 text-accent" />
        </div>
      </div>
      <div className="absolute bottom-36 left-20 animate-float opacity-40 hidden md:block" style={{ animationDelay: '2s', transform: `translate(${mousePos.x * 0.25}px, ${mousePos.y * -0.2}px)` }}>
        <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center glass-card">
          <Shield className="w-7 h-7 text-primary/80" />
        </div>
      </div>
      <div className="absolute bottom-44 right-24 animate-float opacity-40 hidden md:block" style={{ animationDelay: '0.5s', transform: `translate(${mousePos.x * -0.15}px, ${mousePos.y * 0.25}px)` }}>
        <div className="w-10 h-10 rounded-lg border border-accent/30 flex items-center justify-center glass-card">
          <Sparkles className="w-5 h-5 text-accent/80" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Logo */}
        <div className="mb-6 animate-scale-in">
          <img
            src="/lovable-uploads/e8062710-6da1-46b7-bd53-65b99f401879.png"
            alt="GMV Solution"
            className="h-48 md:h-60 lg:h-72 w-auto mx-auto"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.7)) drop-shadow(0 0 80px rgba(59, 130, 246, 0.3))',
              transform: `translate(${mousePos.x * 0.06}px, ${mousePos.y * 0.04}px)`,
              transition: 'transform 0.15s ease',
            }}
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="gradient-text-animated">{t('hero.title')}</span>
        </h1>

        {/* Typing subtitle */}
        <div className="text-lg md:text-2xl text-blue-200/80 mb-4 h-10 flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <span className="font-mono">
            <span className="text-accent">&gt; </span>
            <span>{typingText}</span>
            <span className="animate-pulse text-primary font-bold">|</span>
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-base md:text-xl text-blue-100/60 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          {t('hero.subtitle')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <Button
            onClick={() => scrollToSection('#contact')}
            size="lg"
            className="relative overflow-hidden group text-white font-semibold px-8 py-6 text-lg"
            style={{ background: 'linear-gradient(135deg, hsl(213 94% 50%), hsl(199 89% 48%))', boxShadow: '0 0 30px hsl(213 94% 50% / 0.4)' }}
          >
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            {t('hero.cta.primary')}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Button>
          <Button
            onClick={() => scrollToSection('#services')}
            variant="outline"
            size="lg"
            className="border-primary/40 text-blue-200 hover:bg-primary/10 hover:border-primary/70 backdrop-blur-sm px-8 py-6 text-lg transition-all duration-300"
            style={{ boxShadow: '0 0 15px hsl(213 94% 50% / 0.1)' }}
          >
            {t('hero.cta.secondary')}
          </Button>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card rounded-xl p-4 border border-primary/20 hover:border-primary/50 transition-all duration-300 group cursor-default"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-125 transition-transform" />
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-blue-200/50 mt-1 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float z-10">
        <div className="flex flex-col items-center gap-1 cursor-pointer group" onClick={() => scrollToSection('#about')}>
          <span className="text-xs text-blue-200/40 group-hover:text-blue-200/70 transition-colors">Scroll</span>
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full p-1 group-hover:border-primary/60 transition-colors">
            <div className="w-1.5 h-2.5 bg-primary rounded-full mx-auto" style={{ animation: 'float 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
