import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => React.ReactNode; // <-- agora pode retornar JSX
}

/** Objeto com links reutilizáveis (retorna JSX) */
const links = {
  majdesk: (
    <a
      href="https://www.majdesk.fr/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
    >
      https://www.majdesk.fr/
    </a>
  ),
};

/** Tipo de traduções: cada chave pode ser string OU função que retorna JSX */
type TranslationValue = string | (() => React.ReactNode);
type Translations = Record<Language, Record<string, TranslationValue>>;

const translations: Translations = {
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
    'hero.subtitle':
      'Solutions innovantes pour optimiser vos processus et augmenter votre efficacité',
    'hero.cta.primary': 'Commencer maintenant',
    'hero.cta.secondary': 'Découvrir nos services',

    // About Section
    'about.title': 'Qui sommes-nous ?',
    'about.subtitle': 'Solutions sur mesure',
    'about.description':
      "GMV Solution est née de la vision commune de trois entrepreneurs passionnés par la technologie: Gabriel, Matheus et Vinicius. Ils sont unis par la conviction que l'innovation peut résoudre les défis les plus complexes du quotidien. Le nom de l'entreprise est un acronyme de notre mission principale: GENERATE MORE VALUE.",
    'about.card1.title': 'Solutions sur mesure',
    'about.card1.description':
      'Chaque client a des besoins différents, nous ne faisons pas du "copie-collé". Nous créons des stratégies adaptées à leur secteur, budget et objectifs spécifiques.',
    'about.card2.title': 'ROI first (Retour sur investissement)',
    'about.card2.description':
      'Toutes nos actions sont pensées en fonction du ROI. Pas de vanity metrics : ce qui compte, ce sont les ventes, les leads qualifiés et la rentabilité.',
    'about.card3.title': 'Approche collaborative',
    'about.card3.description':
      "Nous travaillons main dans la main avec le client, en gardant une communication fluide et transparente pour qu'il ait toujours de la visibilité sur l'avancement et les résultats.",

    // Mission Vision Values
    'mvv.title': 'Notre mission, vision et valeurs',
    'mvv.mission.title': 'Mission',
    'mvv.mission.description':
      "Fournir aux entreprises et aux particuliers des solutions technologiques innovantes qui simplifient les processus, réduisent les coûts et optimisent l'efficacité opérationnelle.",
    'mvv.vision.title': 'Vision',
    'mvv.vision.description':
      'Être la référence à Paris en matière de transformation numérique, en créant un avenir où la technologie est véritablement au service des personnes et des organisations.',
    'mvv.values.title': 'Valeurs',
    'mvv.values.list':
      'Innovation constante • Confiance mutuelle • Excellence technique • Engagement envers les résultats',

    // Services / Transform
    'services.title': 'Comment nous transformons votre entreprise',
    'services.subtitle': 'Nos expertises plus demandé par le marché',
    'services.enterprises.title': 'Entreprises',
    'services.enterprises.item1': 'Automatisation des processus critiques',
    'services.enterprises.item2': 'Intégration des systèmes existants',
    'services.enterprises.item3': 'Analyse des données en temps réel',
    'services.enterprises.item4': 'Optimisation de la chaîne de valeur',
    'services.individuals.title': 'Particuliers',
    'services.individuals.item1': 'Solutions domotiques intelligentes',
    'services.individuals.item2': 'Applications mobiles personnalisées',
    'services.individuals.item3': 'Gestion numérique simplifiée',
    'services.individuals.item4': 'Assistance technique spécialisée',

    // Impact
    'impact.title': 'Impact mesurable',
    'impact.cost.value': '40%',
    'impact.cost.title': 'Réduction des coûts',
    'impact.cost.description': 'Économies moyennes réalisées par nos clients',
    'impact.time.value': '60%',
    'impact.time.title': 'Gain de temps',
    'impact.time.description': 'Temps gagné grâce aux processus automatisés',
    'impact.efficiency.value': '85%',
    'impact.efficiency.title': "Augmentation de l'efficacité",
    'impact.efficiency.description':
      'Amélioration de la productivité opérationnelle',

    // Problems / Challenges
    'problems.title': "Les défis d'aujourd'hui",
    'problems.time.title': 'Perte de temps inutile',
    'problems.time.description':
      "Les processus manuels et répétitifs prennent un temps précieux qui pourrait être consacré à la croissance et à l'innovation.",
    'problems.cost.title': "Coûts d'exploitation élevés",
    'problems.cost.description':
      'Les inefficacités systémiques épuisent les ressources financières, affectant la compétitivité et la durabilité des entreprises.',
    'problems.efficiency.title': 'Faible efficacité opérationnelle',
    'problems.efficiency.description':
      "Le manque d'intégration entre les systèmes et les processus entraîne des erreurs, des retouches et des opportunités manquées.",

    // Differentials
    'differentials.title': 'Nos différentiels',
    'differentials.personalized': 'Accompagnement personnalisé',
    'differentials.roi': 'Focus sur le ROI',
    'differentials.team': 'Équipe jeune et créative',
    'differentials.support': 'Support continu',

    // Clients
    'clients.title': 'Nos clients témoignent',
    'clients.subtitle': 'La satisfaction de nos partenaires est notre priorité',
    'clients.testimonial': () => (
      <>
        En peu de temps, ils ont créé une plateforme complète pour la
        gestion de mes services dans 4 hôtels à Paris.{''}
        Lien vers la plateforme : {links.majdesk}
      </>
    ),

    // Contact
    'contact.title': 'Parlons de votre projet',
    'contact.subtitle': 'Transformez vos idées en réalité',
    'contact.form.name': 'Nom complet',
    'contact.form.email': 'Email',
    'contact.form.company': 'Entreprise',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Envoyer le message',
    'contact.form.success': 'Message envoyé avec succès!',
    'contact.form.error': "Erreur lors de l'envoi. Veuillez réessayer.",
    'contact.email': 'contact@gmvsolution.fr',
    'contact.cta': "Commencez votre transformation digitale aujourd'hui",

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
    'hero.subtitle':
      'Innovative solutions to optimize your processes and increase your efficiency',
    'hero.cta.primary': 'Get Started',
    'hero.cta.secondary': 'Explore Our Services',

    // About Section
    'about.title': 'Who are we?',
    'about.subtitle': 'Customized solutions',
    'about.description':
      'GMV Solution was born from the common vision of three entrepreneurs passionate about technology: Gabriel, Matheus and Vinicius. They are united by the belief that innovation can solve the most complex everyday challenges. The company name is an acronym for our main mission: GENERATE MORE VALUE.',
    'about.card1.title': 'Customized solutions',
    'about.card1.description':
      `Each client has different needs, we don't do "copy-paste". We create strategies adapted to their sector, budget and specific objectives.`,
    'about.card2.title': 'ROI first (Return on investment)',
    'about.card2.description':
      'All our actions are designed based on ROI. No vanity metrics: what counts are sales, qualified leads and profitability.',
    'about.card3.title': 'Collaborative approach',
    'about.card3.description':
      'We work hand in hand with the client, maintaining fluid and transparent communication so they always have visibility on progress and results.',

    // Mission Vision Values
    'mvv.title': 'Our mission, vision and values',
    'mvv.mission.title': 'Mission',
    'mvv.mission.description':
      'Provide businesses and individuals with innovative technological solutions that simplify processes, reduce costs and optimize operational efficiency.',
    'mvv.vision.title': 'Vision',
    'mvv.vision.description':
      'To be the reference in Paris for digital transformation, creating a future where technology truly serves people and organizations.',
    'mvv.values.title': 'Values',
    'mvv.values.list':
      'Constant innovation • Mutual trust • Technical excellence • Commitment to results',

    // Services / Transform
    'services.title': 'How we transform your business',
    'services.subtitle': 'Our most demanded expertise in the market',
    'services.enterprises.title': 'Enterprises',
    'services.enterprises.item1': 'Automation of critical processes',
    'services.enterprises.item2': 'Integration of existing systems',
    'services.enterprises.item3': 'Real-time data analysis',
    'services.enterprises.item4': 'Value chain optimization',
    'services.individuals.title': 'Individuals',
    'services.individuals.item1': 'Smart home solutions',
    'services.individuals.item2': 'Personalized mobile applications',
    'services.individuals.item3': 'Simplified digital management',
    'services.individuals.item4': 'Specialized technical assistance',

    // Impact
    'impact.title': 'Measurable impact',
    'impact.cost.value': '40%',
    'impact.cost.title': 'Cost reduction',
    'impact.cost.description': 'Average savings achieved by our clients',
    'impact.time.value': '60%',
    'impact.time.title': 'Time savings',
    'impact.time.description': 'Time saved through automated processes',
    'impact.efficiency.value': '85%',
    'impact.efficiency.title': 'Increased efficiency',
    'impact.efficiency.description': 'Improvement in operational productivity',

    // Problems / Challenges
    'problems.title': "Today's challenges",
    'problems.time.title': 'Wasted time',
    'problems.time.description':
      'Manual and repetitive processes take up valuable time that could be devoted to growth and innovation.',
    'problems.cost.title': 'High operating costs',
    'problems.cost.description':
      'Systemic inefficiencies drain financial resources, affecting business competitiveness and sustainability.',
    'problems.efficiency.title': 'Low operational efficiency',
    'problems.efficiency.description':
      'Lack of integration between systems and processes leads to errors, rework and missed opportunities.',

    // Differentials
    'differentials.title': 'Our Differentials',
    'differentials.personalized': 'Personalized Support',
    'differentials.roi': 'Focus on ROI',
    'differentials.team': 'Young and Creative Team',
    'differentials.support': 'Continuous Support',

    // Clients
    'clients.title': 'Our Clients Testify',
    'clients.subtitle': "Our partners' satisfaction is our priority",
    'clients.testimonial': () => (
      <>
        In a short time, they created a complete platform for
        managing my services in four hotels in Paris.{''}
        Platform link: {links.majdesk}
      </>
    ),

    // Contact
    'contact.title': "Let's Talk About Your Project",
    'contact.subtitle': 'Transform your ideas into reality',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.company': 'Company',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.success': 'Message sent successfully!',
    'contact.form.error': 'Error sending. Please try again.',
    'contact.email': 'contact@gmvsolution.fr',
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
    'hero.subtitle':
      'Soluções inovadoras para otimizar seus processos e aumentar sua eficiência',
    'hero.cta.primary': 'Começar Agora',
    'hero.cta.secondary': 'Conhecer Nossos Serviços',

    // About Section
    'about.title': 'Quem somos nós?',
    'about.subtitle': 'Soluções sob medida',
    'about.description':
      'A GMV Solution nasceu da visão comum de três empreendedores apaixonados por tecnologia: Gabriel, Matheus e Vinicius. Eles são unidos pela convicção de que a inovação pode resolver os desafios mais complexos do cotidiano. O nome da empresa é um acrônimo de nossa missão principal: GENERATE MORE VALUE.',
    'about.card1.title': 'Soluções sob medida',
    'about.card1.description':
      'Cada cliente tem necessidades diferentes, não fazemos "copia e cola". Criamos estratégias adaptadas ao seu setor, orçamento e objetivos específicos.',
    'about.card2.title': 'ROI first (Retorno sobre investimento)',
    'about.card2.description':
      'Todas as nossas ações são pensadas em função do ROI. Sem métricas de vaidade: o que importa são as vendas, os leads qualificados e a rentabilidade.',
    'about.card3.title': 'Abordagem colaborativa',
    'about.card3.description':
      'Trabalhamos de mãos dadas com o cliente, mantendo uma comunicação fluida e transparente para que ele sempre tenha visibilidade sobre o progresso e os resultados.',

    // Mission Vision Values
    'mvv.title': 'Nossa missão, visão e valores',
    'mvv.mission.title': 'Missão',
    'mvv.mission.description':
      'Fornecer às empresas e particulares soluções tecnológicas inovadoras que simplificam processos, reduzem custos e otimizam a eficiência operacional.',
    'mvv.vision.title': 'Visão',
    'mvv.vision.description':
      'Ser a referência em Paris em transformação digital, criando um futuro onde a tecnologia está verdadeiramente a serviço das pessoas e organizações.',
    'mvv.values.title': 'Valores',
    'mvv.values.list':
      'Inovação constante • Confiança mútua • Excelência técnica • Compromisso com resultados',

    // Services / Transform
    'services.title': 'Como transformamos sua empresa',
    'services.subtitle': 'Nossas especialidades mais demandadas pelo mercado',
    'services.enterprises.title': 'Empresas',
    'services.enterprises.item1': 'Automatização de processos críticos',
    'services.enterprises.item2': 'Integração de sistemas existentes',
    'services.enterprises.item3': 'Análise de dados em tempo real',
    'services.enterprises.item4': 'Otimização da cadeia de valor',
    'services.individuals.title': 'Particulares',
    'services.individuals.item1': 'Soluções domóticas inteligentes',
    'services.individuals.item2': 'Aplicativos móveis personalizados',
    'services.individuals.item3': 'Gestão digital simplificada',
    'services.individuals.item4': 'Assistência técnica especializada',

    // Impact
    'impact.title': 'Impacto mensurável',
    'impact.cost.value': '40%',
    'impact.cost.title': 'Redução de custos',
    'impact.cost.description': 'Economias médias realizadas por nossos clientes',
    'impact.time.value': '60%',
    'impact.time.title': 'Ganho de tempo',
    'impact.time.description':
      'Tempo economizado graças aos processos automatizados',
    'impact.efficiency.value': '85%',
    'impact.efficiency.title': 'Aumento da eficiência',
    'impact.efficiency.description':
      'Melhoria da produtividade operacional',

    // Problems / Challenges
    'problems.title': 'Os desafios de hoje',
    'problems.time.title': 'Perda de tempo inútil',
    'problems.time.description':
      'Os processos manuais e repetitivos tomam tempo precioso que poderia ser dedicado ao crescimento e à inovação.',
    'problems.cost.title': 'Custos de operação elevados',
    'problems.cost.description':
      'As ineficiências sistêmicas esgotam os recursos financeiros, afetando a competitividade e sustentabilidade das empresas.',
    'problems.efficiency.title': 'Baixa eficiência operacional',
    'problems.efficiency.description':
      'A falta de integração entre sistemas e processos leva a erros, retrabalhos e oportunidades perdidas.',

    // Differentials
    'differentials.title': 'Nossos Diferenciais',
    'differentials.personalized': 'Atendimento Personalizado',
    'differentials.roi': 'Foco em ROI',
    'differentials.team': 'Equipe Jovem e Criativa',
    'differentials.support': 'Suporte Contínuo',

    // Clients
    'clients.title': 'Nossos Clientes Testemunham',
    'clients.subtitle': 'A satisfação de nossos parceiros é nossa prioridade',
    'clients.testimonial': () => (
      <>
        Em pouco tempo eles fizeram uma plataforma completa para o
        gerenciamento de meus serviços em 4 hóteis em Paris.{' '}
        Link da plataforma: {links.majdesk}
      </>
    ),

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
    'contact.email': 'contact@gmvsolution.fr',
    'contact.cta': 'Comece sua transformação digital hoje',

    // Footer
    'footer.rights': '© 2024 GMV Solution. Todos os direitos reservados.',
    'footer.tagline': 'Inovação • Tecnologia • Resultados',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (
      savedLanguage &&
      (savedLanguage === 'fr' ||
        savedLanguage === 'en' ||
        savedLanguage === 'pt')
    ) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  /** t agora retorna ReactNode e executa funções de tradução para renderizar JSX */
  const t = (key: string): React.ReactNode => {
    const dict = translations[language] || {};
    const value = dict[key];
    if (!value) return key;

    if (typeof value === 'function') {
      // Traduções que precisam retornar JSX
      return (value as () => React.ReactNode)();
    }

    return value as string;
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
