import React from 'react';
import { Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-primary-foreground font-bold text-xl">G</span>
          </div>
          <p className="text-sm opacity-80">{t('footer.tagline')}</p>
        </div>
        
        {/* Social Media Links */}
        <div className="flex justify-center gap-4 mb-6">
          <a 
            href="https://www.linkedin.com/company/gmv-solution" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-primary" />
          </a>
          <a 
            href="https://www.instagram.com/gmvsolution" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5 text-primary" />
          </a>
        </div>
        
        <p className="text-sm opacity-60">{t('footer.rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;