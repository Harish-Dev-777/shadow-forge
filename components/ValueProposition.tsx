import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Cpu, Rocket, Diamond } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Design That Converts",
    description: "We don’t just make things look good — we design for results. Every layout is optimized for user engagement and business growth.",
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-50"
  },
  {
    title: "AI-First Approach",
    description: "We leverage AI to move faster, smarter, and more creatively. This means rapid prototyping and data-backed design decisions.",
    icon: Cpu,
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    title: "Startup-Focused",
    description: "We understand speed, clarity, and growth. We skip the corporate fluff and deliver scalable assets that investors love.",
    icon: Rocket,
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  {
    title: "Premium Quality",
    description: "Every pixel, animation, and interaction is intentional. We build digital experiences that feel expensive and trustworthy.",
    icon: Diamond,
    color: "text-blue-600",
    bg: "bg-blue-50"
  }
];

const ValueProposition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // Ensure initial state is set before triggering animation
        gsap.set(".value-card", { y: 50, autoAlpha: 0 });

        gsap.to(".value-card", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
            },
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-32 bg-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
                Why Founders <br /> <span className="text-neutral-400">Choose Us</span>
            </h2>
            <div className="h-1 w-24 bg-neutral-900 mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
                <div 
                    key={index} 
                    className="value-card group p-8 rounded-3xl border border-neutral-100 bg-white hover:border-neutral-200 hover:shadow-xl transition-all duration-300"
                >
                    <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon size={28} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-neutral-900 mb-4 group-hover:translate-x-1 transition-transform">
                        {feature.title}
                    </h3>
                    
                    <p className="text-neutral-500 leading-relaxed group-hover:text-neutral-600 transition-colors">
                        {feature.description}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;