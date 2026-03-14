import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Determine active section
      const sections = ['home', 'about', 'services', 'techstack', 'solutions', 'clients', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: t('nav.home'), id: 'home' },
    { href: '#about', label: t('nav.about'), id: 'about' },
    { href: '#services', label: t('nav.services'), id: 'services' },
    { href: '#solutions', label: t('nav.solutions'), id: 'solutions' },
    { href: '#clients', label: t('nav.clients'), id: 'clients' },
  ];

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-500"
      style={{
        background: isScrolled
          ? 'rgba(10, 14, 26, 0.92)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(59, 130, 246, 0.15)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.3)' : 'none',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 py-2">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
            className="group flex items-center"
          >
            <img
              src="/lovable-uploads/e8062710-6da1-46b7-bd53-65b99f401879.png"
              alt="GMV Solution"
              className="h-16 w-auto transition-all duration-300 group-hover:scale-105"
              style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.4))' }}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg group"
                style={{
                  color: activeSection === item.id ? '#3B82F6' : 'rgba(255,255,255,0.65)',
                  background: activeSection === item.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id) {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ background: '#3B82F6', boxShadow: '0 0 8px #3B82F6' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white/90 hover:bg-white/5 transition-all duration-200"
                >
                  <Globe className="w-4 h-4" />
                  <span className="font-medium">{language.toUpperCase()}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                style={{ background: 'hsl(220 20% 12%)', border: '1px solid rgba(59,130,246,0.2)' }}
              >
                {[['fr', 'Français 🇫🇷'], ['en', 'English 🇬🇧'], ['pt', 'Português 🇧🇷']].map(([code, label]) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => setLanguage(code as 'fr' | 'en' | 'pt')}
                    className="text-white/70 hover:text-white focus:text-white cursor-pointer"
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => scrollToSection('#contact')}
              className="px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, hsl(213 94% 50%), hsl(199 89% 48%))',
                boxShadow: '0 0 20px hsl(213 94% 50% / 0.3)',
              }}
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: isMobileMenuOpen ? '400px' : '0',
          background: 'rgba(10, 14, 26, 0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: isMobileMenuOpen ? '1px solid rgba(59, 130, 246, 0.15)' : 'none',
        }}
      >
        <div className="container mx-auto px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left py-3 px-4 rounded-xl text-sm transition-all duration-200"
              style={{
                color: activeSection === item.id ? '#3B82F6' : 'rgba(255,255,255,0.65)',
                background: activeSection === item.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              }}
            >
              {item.label}
            </button>
          ))}

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex gap-2">
              {[['fr', 'FR 🇫🇷'], ['en', 'EN 🇬🇧'], ['pt', 'PT 🇧🇷']].map(([code, label]) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code as 'fr' | 'en' | 'pt')}
                  className="px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
                  style={{
                    background: language === code ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.05)',
                    color: language === code ? '#3B82F6' : 'rgba(255,255,255,0.5)',
                    border: language === code ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-4 py-2 rounded-xl text-white text-sm font-semibold"
              style={{ background: 'linear-gradient(135deg, hsl(213 94% 50%), hsl(199 89% 48%))' }}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
