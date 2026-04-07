import React, { useEffect, useState, Suspense, lazy } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Eagerly loaded (above-the-fold)
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";

import Footer from "./components/Footer";
// Lazy loaded (below-the-fold) - reduces initial bundle size
const Services = lazy(() => import("./components/Services"));
const Process = lazy(() => import("./components/Process"));
const FeaturedWork = lazy(() => import("./components/FeaturedWork"));
const ValueProposition = lazy(() => import("./components/ValueProposition"));
const FAQ = lazy(() => import("./components/FAQ"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Contact = lazy(() => import("./components/Contact"));
const About = lazy(() => import("./components/About"));
const ServicesPage = lazy(() => import("./components/ServicesPage"));
const ServiceDetail = lazy(() => import("./components/ServiceDetail"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./components/TermsConditions"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));
const ChatAgent = lazy(() => import("./components/ChatAgent"));

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
  const [currentRoute, setCurrentRoute] = useState<"home" | "about" | "services" | "privacy" | "terms">("home");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#about") {
        setCurrentRoute("about");
        setTimeout(() => window.scrollTo(0, 0), 10);
      } else if (hash === "#services") {
        setCurrentRoute("services");
        setTimeout(() => window.scrollTo(0, 0), 10);
      } else if (hash === "#privacy") {
        setCurrentRoute("privacy");
        setTimeout(() => window.scrollTo(0, 0), 10);
      } else if (hash === "#terms") {
        setCurrentRoute("terms");
        setTimeout(() => window.scrollTo(0, 0), 10);
      } else {
        setCurrentRoute("home");
        if (hash && hash !== "#hero" && hash !== "#" && hash !== "#about" && hash !== "#services" && hash !== "#privacy" && hash !== "#terms") {
          setTimeout(() => {
            document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        } else {
          setTimeout(() => window.scrollTo(0, 0), 10);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Initial check without forcing scroll if not needed
    if (window.location.hash === "#about") {
      setCurrentRoute("about");
    } else if (window.location.hash === "#services") {
      setCurrentRoute("services");
    } else if (window.location.hash === "#privacy") {
      setCurrentRoute("privacy");
    } else if (window.location.hash === "#terms") {
      setCurrentRoute("terms");
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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
    document.body.style.backgroundColor = selectedService ? "#FDFBF7" : "#0a0a0a";

    return () => {
      window.removeEventListener("resize", updateFooterHeight);
      document.body.style.backgroundColor = originalBodyBg;
    };
  }, [selectedService]); // Re-run when service selection changes

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
    <div className="w-full min-h-screen text-neutral-900 selection:bg-neutral-900 selection:text-white relative bg-[#FDFBF7]">
      <div
        className="relative z-10 bg-[#FDFBF7] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-b-[2rem] md:rounded-b-[4rem]"
        style={{ marginBottom: `${footerHeight}px` }}
      >
        <Navbar />
        <main>
          <Suspense fallback={null}>
            {currentRoute === "about" ? (
              <About />
            ) : currentRoute === "services" ? (
              <ServicesPage onServiceClick={setSelectedService} />
            ) : currentRoute === "privacy" ? (
              <PrivacyPolicy />
            ) : currentRoute === "terms" ? (
              <TermsConditions />
            ) : (
              <>
                <Hero />
                <SocialProof />
                <Process />
                <FeaturedWork />
                <ValueProposition />
                <FAQ />
                <Testimonials />
              </>
            )}
            <Contact />
          </Suspense>
        </main>
      </div>
      <Footer />
      <Suspense fallback={null}>
        <ChatAgent />
        <ScrollToTop />
      </Suspense>
    </div>
  );
};

export default App;
