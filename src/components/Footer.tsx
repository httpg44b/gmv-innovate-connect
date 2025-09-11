import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-primary-foreground font-bold text-xl">G</span>
          </div>
          <p className="text-sm opacity-80">{t('footer.tagline')}</p>
        </div>
        <p className="text-sm opacity-60">{t('footer.rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;