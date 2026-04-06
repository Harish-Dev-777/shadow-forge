import React, { useEffect } from "react";
import gsap from "gsap";
import { ArrowRight, Monitor, Layout, Fingerprint, Zap, TrendingUp, Settings, Bot, Plug } from "lucide-react";
import { ServiceData } from "../App";
import { servicesData } from "./Services"; // Reuse existing data

interface ServicesPageProps {
  onServiceClick: (service: ServiceData) => void;
}

const IconComponent = ({
  type,
  className,
}: {
  type: string;
  className?: string;
}) => {
  switch (type) {
    case "monitor":
      return <Monitor className={className} />;
    case "layout":
      return <Layout className={className} />;
    case "fingerprint":
      return <Fingerprint className={className} />;
    case "zap":
      return <Zap className={className} />;
    case "trending-up":
      return <TrendingUp className={className} />;
    case "settings":
      return <Settings className={className} />;
    case "bot":
      return <Bot className={className} />;
    case "plug":
      return <Plug className={className} />;
    default:
      return <Monitor className={className} />;
  }
};

const ServicesPage: React.FC<ServicesPageProps> = ({ onServiceClick }) => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const tl = gsap.timeline();
    
    tl.fromTo(
      ".services-hero-text",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );
    
    tl.fromTo(
      ".services-grid-item",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-neutral-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-neutral-200/50 to-transparent blur-[120px] pointer-events-none rounded-full transform translate-x-1/4 -translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="services-hero-text inline-block px-4 py-1.5 rounded-full border border-neutral-200 bg-white/50 backdrop-blur-sm text-sm font-semibold tracking-wide text-neutral-600 mb-6 uppercase shadow-sm">
            Our Offerings
          </div>
          <h1 className="services-hero-text text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-6">
            Digital Excellence.
            <br /> <span className="text-neutral-400">Delivered.</span>
          </h1>
          <p className="services-hero-text text-xl md:text-2xl text-neutral-600 leading-relaxed font-light">
            We provide a comprehensive suite of digital services designed to elevate your brand and drive measurable results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {servicesData.map((service, index) => (
            <div 
              key={service.id}
              onClick={() => onServiceClick(service)}
              className="services-grid-item group bg-white border border-neutral-100/80 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 cursor-pointer flex flex-col relative overflow-hidden"
            >
              {/* Subtle background flair */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-neutral-100 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl"></div>

              <div className={`w-14 h-14 rounded-2xl ${service.iconBg} ${service.iconColor} flex flex-none items-center justify-center mb-8 relative z-10 group-hover:scale-105 transition-transform duration-500`}>
                <IconComponent type={service.iconType} className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 relative z-10">
                {service.title}
              </h3>
              
              <p className="text-neutral-500 leading-relaxed flex-grow relative z-10 text-lg mb-8 font-light">
                {service.description}
              </p>

              <div className="mt-auto relative z-10 flex items-center gap-3 text-sm font-semibold text-neutral-900 group-hover:text-black transition-colors">
                <span className="relative overflow-hidden">
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Explore Service</span>
                  <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-black">Explore Service</span>
                </span>
                <ArrowRight size={18} className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="services-hero-text text-center bg-black text-white rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-800 via-black to-black opacity-60"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight max-w-2xl mx-auto">
              Not sure which service is right for you?
            </h2>
            <p className="text-xl text-neutral-400 mb-10 font-light max-w-xl mx-auto">
              Let's discuss your custom requirements and find the perfect path forward.
            </p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                window.location.hash = "#contact";
              }}
              className="px-8 py-4 bg-white text-black rounded-full font-semibold inline-flex items-center gap-2 hover:bg-neutral-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 duration-300 pointer-events-auto"
            >
              Get Free Consultation <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
