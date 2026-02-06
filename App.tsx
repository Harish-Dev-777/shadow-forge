import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import Services from "./components/Services";
import Process from "./components/Process";
import FeaturedWork from "./components/FeaturedWork";
import ValueProposition from "./components/ValueProposition";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ServiceDetail from "./components/ServiceDetail";
import ScrollToTop from "./components/ScrollToTop";
import ChatAgent from "./components/ChatAgent";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  iconColor: string;
  iconBg: string;
  iconType:
    | "monitor"
    | "layout"
    | "fingerprint"
    | "zap"
    | "trending-up"
    | "settings"
    | "bot"
    | "plug";
  fullContent: {
    heroImage: string;
    longDescription: string;
    features: string[];
  };
}

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(
    null,
  );
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const updateFooterHeight = () => {
      const footer = document.getElementById("sticky-footer");
      if (footer) {
        setFooterHeight(footer.offsetHeight);
      }
    };

    updateFooterHeight();
    window.addEventListener("resize", updateFooterHeight);

    // Set body background to match footer for seamless reveal
    // We use the exact color of the footer (neutral-950 which is #0a0a0a)
    const originalBodyBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#0a0a0a";

    return () => {
      window.removeEventListener("resize", updateFooterHeight);
      document.body.style.backgroundColor = originalBodyBg;
    };
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
    <div className="w-full min-h-screen text-neutral-900 selection:bg-neutral-900 selection:text-white relative">
      <div
        className="relative z-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-b-[2rem] md:rounded-b-[4rem]"
        style={{ marginBottom: `${footerHeight}px` }}
      >
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
      </div>
      <Footer />
      <ChatAgent />
      <ScrollToTop />
    </div>
  );
};

export default App;
