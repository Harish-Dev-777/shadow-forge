import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const SocialProof: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".stat-item", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6 max-w-4xl mx-auto leading-tight">
            Built for Brands That Refuse to Look Ordinary
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-500 text-lg md:text-xl leading-relaxed">
            From early-stage startups to growing digital products, we partner with teams that value design, performance, and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative">
            
            {/* Stat 1: Satisfaction */}
            <div className="stat-item p-8 flex flex-col items-start justify-between min-h-[280px] lg:border-r lg:border-dashed border-neutral-200">
                <div className="relative w-full">
                    <span className="text-[5rem] font-bold text-neutral-900 leading-none tracking-tighter">100<span className="text-3xl align-top ml-1 text-neutral-400">%</span></span>
                    {/* Smile/Curve decoration */}
                    <div className="w-full h-12 mt-4 opacity-100">
                        <svg width="100%" height="100%" viewBox="0 0 200 40" preserveAspectRatio="none">
                             <path d="M10,10 Q100,60 190,10" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>
                <p className="text-sm font-bold text-neutral-500 uppercase tracking-wide mt-8">
                    Client Satisfaction
                </p>
            </div>

            {/* Stat 2: Conversion */}
            <div className="stat-item p-8 flex flex-col items-start justify-between min-h-[280px] lg:border-r lg:border-dashed border-neutral-200">
                <div className="flex items-end gap-2 h-24 mt-4 w-full px-4">
                    <div className="w-1/5 h-[30%] bg-neutral-200 rounded-t-sm"></div>
                    <div className="w-1/5 h-[50%] bg-neutral-300 rounded-t-sm"></div>
                    <div className="w-1/5 h-[40%] bg-neutral-400 rounded-t-sm"></div>
                    <div className="w-1/5 h-[70%] bg-neutral-600 rounded-t-sm"></div>
                    <div className="w-1/5 h-full bg-neutral-900 rounded-t-sm relative shadow-lg">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-neutral-900 font-bold text-xs bg-neutral-100 px-2 py-1 rounded">
                             ROI
                        </div>
                    </div>
                </div>
                <p className="text-sm font-bold text-neutral-500 uppercase tracking-wide mt-8">
                    Conversion-Focused Design
                </p>
            </div>

            {/* Stat 3: On Time Delivery */}
            <div className="stat-item p-8 flex flex-col items-start justify-between min-h-[280px] lg:border-r lg:border-dashed border-neutral-200">
                <div className="relative w-full h-32 flex items-center justify-center">
                    {/* Timeline Graphic */}
                    <div className="w-full h-1 bg-neutral-100 relative rounded-full overflow-hidden">
                        <div className="absolute left-0 top-0 h-full bg-neutral-900 w-3/4"></div>
                    </div>
                    <div className="absolute left-[75%] w-4 h-4 bg-neutral-900 rounded-full border-4 border-white shadow-md"></div>
                    <div className="absolute right-0 w-2 h-2 bg-neutral-300 rounded-full"></div>
                    
                    {/* Checkmark badge */}
                    <div className="absolute top-4 right-4 w-10 h-10 border-2 border-neutral-900 rounded-full flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                </div>
                <p className="text-sm font-bold text-neutral-500 uppercase tracking-wide mt-8">
                    On Time Delivery
                </p>
            </div>

            {/* Stat 4: Global Clients */}
            <div className="stat-item p-8 flex flex-col items-start justify-between min-h-[280px]">
                <div className="w-full flex justify-center py-4 relative">
                     {/* Abstract Globe/Network */}
                     <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-300">
                        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" />
                        <ellipse cx="50" cy="50" rx="40" ry="15" stroke="currentColor" />
                        <ellipse cx="50" cy="50" rx="15" ry="40" stroke="currentColor" />
                        
                        {/* Dots representing clients */}
                        <circle cx="50" cy="50" r="3" fill="#171717" stroke="none" />
                        <circle cx="75" cy="40" r="2" fill="#171717" stroke="none" />
                        <circle cx="25" cy="60" r="2" fill="#171717" stroke="none" />
                        <circle cx="40" cy="20" r="2" fill="#171717" stroke="none" />
                     </svg>
                </div>
                <p className="text-sm font-bold text-neutral-500 uppercase tracking-wide mt-8">
                    Global & Local Clients
                </p>
            </div>

        </div>
      </div>
    </section>
  );
};

export default SocialProof;