import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "01",
    title: "Discover",
    description: "We understand your brand, users, goals, and competitors. We dive deep into data to build a strategy that guarantees results.",
  },
  {
    id: "02",
    title: "Design",
    description: "We craft a visually stunning, conversion-focused experience. Every pixel is placed with purpose to guide your users toward action.",
  },
  {
    id: "03",
    title: "Build",
    description: "We develop fast, scalable websites using modern technologies like Next.js and Tailwind. Performance and SEO are baked in from the start.",
  },
  {
    id: "04",
    title: "Launch & Scale",
    description: "We refine, optimize, and help you grow with confidence. Our partnership continues beyond launch to ensure long-term success.",
  }
];

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create ScrollTriggers for each step to update the active state
      steps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: stepsRef.current[index],
          start: "top center",
          end: "bottom center",
          toggleClass: { targets: `.indicator-${index}`, className: "active-step" },
          onEnter: () => {
             gsap.to(`.indicator-dot-${index}`, { scale: 1.5, backgroundColor: "#000", duration: 0.3 });
             gsap.to(`.indicator-text-${index}`, { color: "#000", x: 10, duration: 0.3 });
          },
          onLeave: () => {
             gsap.to(`.indicator-dot-${index}`, { scale: 1, backgroundColor: "#d4d4d4", duration: 0.3 });
             gsap.to(`.indicator-text-${index}`, { color: "#a3a3a3", x: 0, duration: 0.3 });
          },
          onEnterBack: () => {
             gsap.to(`.indicator-dot-${index}`, { scale: 1.5, backgroundColor: "#000", duration: 0.3 });
             gsap.to(`.indicator-text-${index}`, { color: "#000", x: 10, duration: 0.3 });
          },
          onLeaveBack: () => {
             gsap.to(`.indicator-dot-${index}`, { scale: 1, backgroundColor: "#d4d4d4", duration: 0.3 });
             gsap.to(`.indicator-text-${index}`, { color: "#a3a3a3", x: 0, duration: 0.3 });
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-neutral-50 py-24 md:py-32 relative" id="process">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Sticky Left Column */}
          <div className="lg:w-1/3 lg:h-[calc(100vh-200px)] lg:sticky lg:top-32 flex flex-col justify-between">
            <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-8">
                Our Proven <br/> Creative Process
                </h2>
                <p className="text-neutral-500 text-lg leading-relaxed mb-12 max-w-sm">
                    A streamlined workflow designed to move fast without breaking things. From chaos to clarity in four steps.
                </p>
                <div className="hidden lg:block">
                     <a href="#contact" className="inline-block px-8 py-3 bg-neutral-900 text-white rounded-full font-semibold hover:bg-black transition-all hover:scale-105 active:scale-95">
                        Start Your Project
                     </a>
                </div>
            </div>

            {/* Desktop Indicators */}
            <div className="hidden lg:flex flex-col gap-8 relative pl-4">
                {/* Connecting Line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-px bg-neutral-200 -z-10"></div>
                
                {steps.map((step, index) => (
                    <div key={step.id} className={`indicator-${index} flex items-center gap-6 transition-all duration-300`}>
                        <div className={`indicator-dot-${index} w-3 h-3 rounded-full bg-neutral-300 transition-colors duration-300`}></div>
                        <span className={`indicator-text-${index} text-2xl font-medium text-neutral-400 transition-all duration-300`}>
                            {step.id} {step.title}
                        </span>
                    </div>
                ))}
            </div>
          </div>

          {/* Scrolling Right Column */}
          <div className="lg:w-2/3 flex flex-col gap-24 lg:gap-40 pt-8 lg:pt-0">
            {steps.map((step, index) => (
                <div 
                    key={step.id} 
                    ref={el => { stepsRef.current[index] = el; }}
                    className="flex flex-col md:flex-row gap-8 md:gap-12 group"
                >
                    {/* Mobile Number Display */}
                    <div className="lg:hidden text-6xl font-bold text-neutral-200">
                        {step.id}
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6 lg:hidden">
                             <div className="w-12 h-px bg-neutral-300"></div>
                             <h3 className="text-2xl font-bold text-neutral-900">{step.title}</h3>
                        </div>

                        {/* Card */}
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-neutral-100 hover:shadow-xl transition-shadow duration-500">
                             <h3 className="hidden lg:block text-3xl font-bold text-neutral-900 mb-6">{step.title}</h3>
                             <p className="text-lg text-neutral-500 leading-relaxed mb-8">
                                 {step.description}
                             </p>
                             
                             {/* Visual Representation (Abstract UI) */}
                             <div className="w-full h-48 bg-neutral-50 rounded-xl overflow-hidden relative border border-neutral-100">
                                 {index === 0 && (
                                     <div className="absolute inset-0 flex items-center justify-center">
                                         <div className="flex gap-2">
                                            <div className="w-16 h-16 rounded-full bg-blue-100 animate-pulse"></div>
                                            <div className="w-16 h-16 rounded-full bg-purple-100 animate-pulse delay-75"></div>
                                            <div className="w-16 h-16 rounded-full bg-orange-100 animate-pulse delay-150"></div>
                                         </div>
                                     </div>
                                 )}
                                 {index === 1 && (
                                    <div className="p-6 space-y-3">
                                        <div className="w-1/3 h-4 bg-neutral-200 rounded animate-pulse"></div>
                                        <div className="w-2/3 h-4 bg-neutral-200 rounded animate-pulse delay-75"></div>
                                        <div className="flex gap-3 mt-4">
                                            <div className="w-1/2 h-20 bg-neutral-200 rounded animate-pulse delay-100"></div>
                                            <div className="w-1/2 h-20 bg-neutral-200 rounded animate-pulse delay-200"></div>
                                        </div>
                                    </div>
                                 )}
                                 {index === 2 && (
                                     <div className="absolute inset-0 bg-neutral-900 p-6 font-mono text-xs text-green-400 opacity-90 overflow-hidden">
                                         <p>{`> npm install next react gsap`}</p>
                                         <p className="mt-2">{`> building production build...`}</p>
                                         <p className="mt-2 text-white">{`✓ optimized`}</p>
                                         <p className="mt-2 text-white">{`✓ 100/100 performance`}</p>
                                     </div>
                                 )}
                                 {index === 3 && (
                                     <div className="absolute inset-0 flex items-end justify-center pb-0">
                                         <div className="w-full flex items-end justify-around h-32 px-6">
                                             <div className="w-8 bg-green-200 h-[40%] rounded-t-md animate-[bounce_2s_infinite]"></div>
                                             <div className="w-8 bg-green-300 h-[60%] rounded-t-md animate-[bounce_2.2s_infinite]"></div>
                                             <div className="w-8 bg-green-400 h-[50%] rounded-t-md animate-[bounce_1.8s_infinite]"></div>
                                             <div className="w-8 bg-green-500 h-[90%] rounded-t-md animate-[bounce_2.5s_infinite]"></div>
                                         </div>
                                     </div>
                                 )}
                             </div>
                        </div>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;