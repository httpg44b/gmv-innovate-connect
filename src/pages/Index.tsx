import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Problems from '@/components/Problems';
import Clients from '@/components/Clients';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Navbar />
      <Hero />
      <About />
      <Services />
      
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
