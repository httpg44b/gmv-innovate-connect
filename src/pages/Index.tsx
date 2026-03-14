import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import TechStack from '@/components/TechStack';
import Impact from '@/components/Impact';
import Problems from '@/components/Problems';
import Clients from '@/components/Clients';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen font-inter" style={{ background: 'hsl(220 20% 7%)' }}>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <TechStack />
      <Impact />
      <Problems />
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
