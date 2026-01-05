import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Services from './components/Services';
import Process from './components/Process';
import FeaturedWork from './components/FeaturedWork';
import ValueProposition from './components/ValueProposition';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServiceDetail from './components/ServiceDetail';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  iconColor: string;
  iconBg: string;
  iconType: 'monitor' | 'layout' | 'fingerprint' | 'zap';
  fullContent: {
    heroImage: string;
    longDescription: string;
    features: string[];
  };
}

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  useEffect(() => {
    // smooth scroll reset implementation
  }, []);

  // Simple client-side routing
  if (selectedService) {
    return (
      <ServiceDetail 
        service={selectedService} 
        onBack={() => {
          setSelectedService(null);
          // Small timeout to allow DOM to paint before scrolling
          setTimeout(() => {
             window.scrollTo(0, 0);
          }, 10);
        }} 
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Services onServiceClick={setSelectedService} />
        <Process />
        <FeaturedWork />
        <ValueProposition />
        <FAQ />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;