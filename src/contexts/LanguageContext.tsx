import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'Qui sommes-nous',
    'nav.services': 'Services',
    'nav.solutions': 'Solutions',
    'nav.clients': 'Nos clients',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Technologie qui transforme le temps en résultats',
    'hero.subtitle': 'Solutions innovantes pour optimiser vos processus et augmenter votre efficacité',
    'hero.cta.primary': 'Commencer maintenant',
    'hero.cta.secondary': 'Découvrir nos services',
    
    // About Section
    'about.title': 'Qui sommes-nous',
    'about.subtitle': 'Une équipe passionnée par l\'innovation',
    'about.description': 'GMV Solution est née de l\'union de trois esprits innovateurs - Gabriel, Matheus et Vinícius. Notre mission est de transformer les défis technologiques en opportunités de croissance pour nos clients.',
    'about.founders': 'Fondateurs',
    'about.founders.description': 'Trois experts en technologie unis par une vision commune : démocratiser l\'accès aux solutions technologiques de pointe.',
    
    // Mission Vision Values
    'mvv.mission.title': 'Mission',
    'mvv.mission.description': 'Proporcionar soluções tecnológicas que otimizem processos e melhorem vidas',
    'mvv.vision.title': 'Vision',
    'mvv.vision.description': 'Être la référence en innovation pratique et accessible en France et au-delà',
    'mvv.values.title': 'Valeurs',
    'mvv.values.list': 'Innovation • Engagement • Confiance • Efficacité • Proximité',
    
    // Services
    'services.title': 'Nos Services',
    'services.subtitle': 'Solutions technologiques sur mesure',
    'services.development.title': 'Développement sur mesure',
    'services.development.description': 'Systèmes personnalisés adaptés à vos besoins spécifiques',
    'services.automation.title': 'Automatisation',
    'services.automation.description': 'Optimisation de vos processus pour gagner du temps et réduire les coûts',
    'services.integration.title': 'Intégrations',
    'services.integration.description': 'Connexion transparente entre vos différentes plateformes',
    'services.consulting.title': 'Consulting',
    'services.consulting.description': 'Expertise et accompagnement pour votre transformation digitale',
    
    // Problems
    'problems.title': 'Problèmes que nous résolvons',
    'problems.time.title': 'Manque de temps',
    'problems.time.description': 'Automatisation des tâches répétitives et chronophages',
    'problems.cost.title': 'Coûts excessifs',
    'problems.cost.description': 'Optimisation des processus pour réduire vos dépenses',
    'problems.efficiency.title': 'Inefficacité',
    'problems.efficiency.description': 'Solutions pratiques et accessibles pour améliorer votre productivité',
    
    // Differentials
    'differentials.title': 'Nos différentiels',
    'differentials.personalized': 'Accompagnement personnalisé',
    'differentials.roi': 'Focus sur le ROI',
    'differentials.team': 'Équipe jeune et créative',
    'differentials.support': 'Support continu',
    
    // Clients
    'clients.title': 'Nos clients témoignent',
    'clients.subtitle': 'La satisfaction de nos partenaires est notre priorité',
    'clients.testimonial': 'En peu de temps, ils ont créé une plateforme complète pour la gestion de mes services.',
    
    // Contact
    'contact.title': 'Parlons de votre projet',
    'contact.subtitle': 'Transformez vos idées en réalité',
    'contact.form.name': 'Nom complet',
    'contact.form.email': 'Email',
    'contact.form.company': 'Entreprise',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Envoyer le message',
    'contact.form.success': 'Message envoyé avec succès!',
    'contact.form.error': 'Erreur lors de l\'envoi. Veuillez réessayer.',
    'contact.email': 'contato@gmvsolution.fr',
    'contact.cta': 'Commencez votre transformation digitale aujourd\'hui',
    
    // Footer
    'footer.rights': '© 2024 GMV Solution. Tous droits réservés.',
    'footer.tagline': 'Innovation • Technologie • Résultats',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.solutions': 'Solutions',
    'nav.clients': 'Our Clients',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Technology that transforms time into results',
    'hero.subtitle': 'Innovative solutions to optimize your processes and increase your efficiency',
    'hero.cta.primary': 'Get Started',
    'hero.cta.secondary': 'Explore Our Services',
    
    // About Section
    'about.title': 'About Us',
    'about.subtitle': 'A team passionate about innovation',
    'about.description': 'GMV Solution was born from the union of three innovative minds - Gabriel, Matheus and Vinícius. Our mission is to transform technological challenges into growth opportunities for our clients.',
    'about.founders': 'Founders',
    'about.founders.description': 'Three technology experts united by a common vision: democratizing access to cutting-edge technological solutions.',
    
    // Mission Vision Values
    'mvv.mission.title': 'Mission',
    'mvv.mission.description': 'Provide technological solutions that optimize processes and improve lives',
    'mvv.vision.title': 'Vision',
    'mvv.vision.description': 'To be the reference in practical and accessible innovation in France and beyond',
    'mvv.values.title': 'Values',
    'mvv.values.list': 'Innovation • Commitment • Trust • Efficiency • Proximity',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Tailor-made technological solutions',
    'services.development.title': 'Custom Development',
    'services.development.description': 'Personalized systems adapted to your specific needs',
    'services.automation.title': 'Automation',
    'services.automation.description': 'Process optimization to save time and reduce costs',
    'services.integration.title': 'Integrations',
    'services.integration.description': 'Seamless connection between your different platforms',
    'services.consulting.title': 'Consulting',
    'services.consulting.description': 'Expertise and support for your digital transformation',
    
    // Problems
    'problems.title': 'Problems We Solve',
    'problems.time.title': 'Lack of Time',
    'problems.time.description': 'Automation of repetitive and time-consuming tasks',
    'problems.cost.title': 'Excessive Costs',
    'problems.cost.description': 'Process optimization to reduce your expenses',
    'problems.efficiency.title': 'Inefficiency',
    'problems.efficiency.description': 'Practical and accessible solutions to improve your productivity',
    
    // Differentials
    'differentials.title': 'Our Differentials',
    'differentials.personalized': 'Personalized Support',
    'differentials.roi': 'Focus on ROI',
    'differentials.team': 'Young and Creative Team',
    'differentials.support': 'Continuous Support',
    
    // Clients
    'clients.title': 'Our Clients Testify',
    'clients.subtitle': 'Our partners\' satisfaction is our priority',
    'clients.testimonial': 'In a short time, they created a complete platform for managing my services.',
    
    // Contact
    'contact.title': 'Let\'s Talk About Your Project',
    'contact.subtitle': 'Transform your ideas into reality',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.company': 'Company',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.success': 'Message sent successfully!',
    'contact.form.error': 'Error sending. Please try again.',
    'contact.email': 'contato@gmvsolution.fr',
    'contact.cta': 'Start your digital transformation today',
    
    // Footer
    'footer.rights': '© 2024 GMV Solution. All rights reserved.',
    'footer.tagline': 'Innovation • Technology • Results',
  },
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.about': 'Quem Somos',
    'nav.services': 'Serviços',
    'nav.solutions': 'Soluções',
    'nav.clients': 'Nossos Clientes',
    'nav.contact': 'Contato',
    
    // Hero Section
    'hero.title': 'Tecnologia que transforma tempo em resultados',
    'hero.subtitle': 'Soluções inovadoras para otimizar seus processos e aumentar sua eficiência',
    'hero.cta.primary': 'Começar Agora',
    'hero.cta.secondary': 'Conhecer Nossos Serviços',
    
    // About Section
    'about.title': 'Quem Somos',
    'about.subtitle': 'Uma equipe apaixonada por inovação',
    'about.description': 'A GMV Solution nasceu da união de três mentes inovadoras - Gabriel, Matheus e Vinícius. Nossa missão é transformar desafios tecnológicos em oportunidades de crescimento para nossos clientes.',
    'about.founders': 'Fundadores',
    'about.founders.description': 'Três especialistas em tecnologia unidos por uma visão comum: democratizar o acesso a soluções tecnológicas de ponta.',
    
    // Mission Vision Values
    'mvv.mission.title': 'Missão',
    'mvv.mission.description': 'Proporcionar soluções tecnológicas que otimizem processos e melhorem vidas',
    'mvv.vision.title': 'Visão',
    'mvv.vision.description': 'Ser referência em inovação prática e acessível no Brasil e além',
    'mvv.values.title': 'Valores',
    'mvv.values.list': 'Inovação • Compromisso • Confiança • Eficiência • Proximidade',
    
    // Services
    'services.title': 'Nossos Serviços',
    'services.subtitle': 'Soluções tecnológicas sob medida',
    'services.development.title': 'Desenvolvimento Personalizado',
    'services.development.description': 'Sistemas personalizados adaptados às suas necessidades específicas',
    'services.automation.title': 'Automatização',
    'services.automation.description': 'Otimização de processos para economizar tempo e reduzir custos',
    'services.integration.title': 'Integrações',
    'services.integration.description': 'Conexão transparente entre suas diferentes plataformas',
    'services.consulting.title': 'Consultoria',
    'services.consulting.description': 'Expertise e acompanhamento para sua transformação digital',
    
    // Problems
    'problems.title': 'Problemas que Resolvemos',
    'problems.time.title': 'Falta de Tempo',
    'problems.time.description': 'Automatização de tarefas repetitivas e demoradas',
    'problems.cost.title': 'Custos Excessivos',
    'problems.cost.description': 'Otimização de processos para reduzir suas despesas',
    'problems.efficiency.title': 'Ineficiência',
    'problems.efficiency.description': 'Soluções práticas e acessíveis para melhorar sua produtividade',
    
    // Differentials
    'differentials.title': 'Nossos Diferenciais',
    'differentials.personalized': 'Atendimento Personalizado',
    'differentials.roi': 'Foco em ROI',
    'differentials.team': 'Equipe Jovem e Criativa',
    'differentials.support': 'Suporte Contínuo',
    
    // Clients
    'clients.title': 'Nossos Clientes Testemunham',
    'clients.subtitle': 'A satisfação de nossos parceiros é nossa prioridade',
    'clients.testimonial': 'Em pouco tempo eles fizeram uma plataforma completa para o gerenciamento de meus serviços.',
    
    // Contact
    'contact.title': 'Vamos Falar Sobre Seu Projeto',
    'contact.subtitle': 'Transforme suas ideias em realidade',
    'contact.form.name': 'Nome Completo',
    'contact.form.email': 'Email',
    'contact.form.company': 'Empresa',
    'contact.form.message': 'Mensagem',
    'contact.form.submit': 'Enviar Mensagem',
    'contact.form.success': 'Mensagem enviada com sucesso!',
    'contact.form.error': 'Erro ao enviar. Por favor, tente novamente.',
    'contact.email': 'contato@gmvsolution.fr',
    'contact.cta': 'Comece sua transformação digital hoje',
    
    // Footer
    'footer.rights': '© 2024 GMV Solution. Todos os direitos reservados.',
    'footer.tagline': 'Inovação • Tecnologia • Resultados',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en' || savedLanguage === 'pt')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};