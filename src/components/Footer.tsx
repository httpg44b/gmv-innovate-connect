import React from 'react';
import { Linkedin, Instagram, MapPin, Mail, ArrowUp, ExternalLink, Code2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import gmvLogoFull from '@/assets/gmv-logo-full.png';

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { href: '#home', label: 'Accueil' },
    { href: '#about', label: 'À propos' },
    { href: '#services', label: 'Services' },
    { href: '#techstack', label: 'Technologies' },
    { href: '#clients', label: 'Clients' },
    { href: '#contact', label: 'Contact' },
  ];

  const services = [
    'Développement logiciel',
    'Automatisation',
    'Sites Web',
    'Projets digitaux',
    'Conseil IT',
    'Formation tech',
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(220 20% 4%) 0%, hsl(220 20% 3%) 100%)' }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(213 94% 50% / 0.6), transparent)' }} />

      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-3"
        style={{
          backgroundImage: `linear-gradient(hsl(213 94% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(213 94% 50% / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(213 94% 50% / 0.08), transparent 70%)' }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main grid */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <img src={gmvLogoFull} alt="GMV Solution" className="h-14 mb-4 object-contain" />
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Nous transformons vos défis technologiques en opportunités de croissance.
            </p>
            <div className="flex items-center gap-1 text-xs text-white/30 mb-4">
              <Code2 className="w-3 h-3" />
              <span>Développé avec passion à Paris</span>
            </div>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/gmv-solution"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 hover:scale-110"
                style={{ background: '#0A66C220', borderColor: '#0A66C230' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#0A66C240'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px #0A66C230'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#0A66C220'; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
              >
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
              </a>
              <a
                href="https://www.instagram.com/gmv.solution.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 hover:scale-110"
                style={{ background: '#E1306C20', borderColor: '#E1306C30' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#E1306C40'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px #E1306C30'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#E1306C20'; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
              >
                <Instagram className="w-4 h-4 text-[#E1306C]" />
              </a>
              <a
                href="mailto:contact@gmvsolution.fr"
                className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 hover:scale-110"
                style={{ background: '#3B82F620', borderColor: '#3B82F630' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F640'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px #3B82F630'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F620'; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
              >
                <Mail className="w-4 h-4 text-[#3B82F6]" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white/80 font-semibold mb-4 text-sm uppercase tracking-widest">Navigation</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/40 hover:text-primary text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white/80 font-semibold mb-4 text-sm uppercase tracking-widest">Services</h3>
            <ul className="space-y-2">
              {services.map((service, i) => (
                <li key={i}>
                  <span className="text-white/40 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & map */}
          <div>
            <h3 className="text-white/80 font-semibold mb-4 text-sm uppercase tracking-widest">Localisation</h3>
            <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Paris, France</span>
            </div>
            <a
              href="mailto:contact@gmvsolution.fr"
              className="flex items-center gap-2 text-white/40 hover:text-primary text-sm transition-colors mb-4"
            >
              <Mail className="w-4 h-4" />
              contact@gmvsolution.fr
            </a>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-primary/10 h-28 relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292293!3d48.858611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f8f3049b%3A0x5c4f8f64e9f2e2a0!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1695915258949!5m2!1sen!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale group-hover:grayscale-0 transition-all duration-500 opacity-50 group-hover:opacity-100"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-6" style={{ background: 'linear-gradient(90deg, transparent, hsl(213 94% 50% / 0.3), transparent)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">{t('footer.rights')}</p>
          <p className="text-white/20 text-xs font-mono">{t('footer.tagline')}</p>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-primary/30 transition-all duration-300 hover:scale-110 hover:border-primary/60"
            style={{ background: 'hsl(213 94% 50% / 0.1)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px hsl(213 94% 50% / 0.3)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
            title="Retour en haut"
          >
            <ArrowUp className="w-4 h-4 text-primary" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
