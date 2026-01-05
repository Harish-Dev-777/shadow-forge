import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ServiceData } from '../App';
import Footer from './Footer';

interface ServiceDetailProps {
  service: ServiceData;
  onBack: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".anim-text", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2
        });
        
        gsap.from(imgRef.current, {
            scale: 1.1,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
        {/* Navigation / Header */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100 py-4 px-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-black transition-colors"
                >
                    <ArrowLeft size={18} /> Back to Home
                </button>
                <div className="font-bold text-xl tracking-tight">Shadow Forge.</div>
                <div className="w-10"></div> {/* Spacer for balance */}
            </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div className={`inline-block px-4 py-1.5 rounded-full ${service.iconBg} ${service.iconColor} text-sm font-bold mb-6 anim-text`}>
                        {service.title}
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-8 anim-text">
                        {service.description}
                    </h1>
                    <p className="text-lg text-neutral-500 leading-relaxed mb-10 anim-text">
                        {service.fullContent.longDescription}
                    </p>
                    
                    <div className="anim-text">
                        <button className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-neutral-800 transition-all">
                            Start a Project
                        </button>
                    </div>
                </div>
                
                <div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/3] shadow-2xl">
                    <img 
                        ref={imgRef}
                        src={service.fullContent.heroImage} 
                        alt={service.title} 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-neutral-50">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-12 text-center">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.fullContent.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                            <CheckCircle2 className="text-black" />
                            <span className="font-medium text-lg">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <Footer />
    </div>
  );
};

export default ServiceDetail;