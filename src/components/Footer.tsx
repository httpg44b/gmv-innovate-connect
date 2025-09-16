import React from 'react';
import { Linkedin, Instagram, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import gmvLogo from '@/assets/gmv-logo.png';

const Footer = () => {
  const { t } = useLanguage();
  const googleMapsUrl = "https://www.google.com/maps/search/GMV+Solution+France";

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="mb-8 text-center">
          <img 
            src={gmvLogo} 
            alt="GMV Solution" 
            className="h-20 mx-auto mb-4 object-contain"
          />
          <p className="text-sm opacity-80">{t('footer.tagline')}</p>
        </div>

        {/* Google Maps */}
        <div className="mb-8 max-w-2xl mx-auto">
          <a 
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
          >
            <div className="relative h-64 bg-muted">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292293!3d48.858611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f8f3049b%3A0x5c4f8f64e9f2e2a0!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1695915258949!5m2!1sen!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent pointer-events-none flex items-end justify-center pb-4">
                <div className="flex items-center gap-2 text-primary-foreground">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">Cliquez pour voir notre localisation</span>
                </div>
              </div>
            </div>
          </a>
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