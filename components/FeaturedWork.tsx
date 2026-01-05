import React, { useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';

const projects = [
    {
        id: "01",
        title: "NeuraFlow",
        category: "AI SaaS Platform",
        description: "A conversion-focused website designed to explain complex AI technology with clarity and elegance.",
        result: "🚀 Increased demo sign-ups by 3.4×",
        tags: ["AI", "SaaS", "UX Design", "Motion"],
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
    },
    {
        id: "02",
        title: "VisionX",
        category: "Startup Landing Page",
        description: "A bold, modern landing page crafted to position the brand as a category leader from day one.",
        result: "📈 Improved user engagement by 210%",
        tags: ["Startup", "Web Design", "Branding", "GSAP"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
    },
    {
        id: "03",
        title: "AutomateIQ",
        category: "AI Automation Platform",
        description: "A premium website experience that balances trust, innovation, and performance.",
        result: "💡 Reduced bounce rate by 45%",
        tags: ["AI", "Automation", "UX", "Performance"],
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "04",
        title: "Nova Labs",
        category: "Digital Product Website",
        description: "An immersive, animation-driven website designed to elevate brand perception.",
        result: "✨ Boosted brand credibility",
        tags: ["Product", "Motion Design", "Next.js"],
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
    }
];

const FeaturedWork: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="bg-neutral-950 py-24 text-white overflow-hidden" id="work">
             {/* Section Header */}
             <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Selected Work</h2>
                    <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">
                        Showcasing the future of digital interaction through AI-driven design.
                    </p>
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex gap-4">
                    <button 
                        onClick={handlePrev} 
                        aria-label="Previous project"
                        className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors active:scale-95"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <button 
                        onClick={handleNext}
                        aria-label="Next project" 
                        className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors active:scale-95"
                    >
                        <ArrowRight size={24} />
                    </button>
                </div>
             </div>

             {/* Projects Accordion */}
             <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[600px]">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            onClick={() => setActiveIndex(index)}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`relative overflow-hidden rounded-3xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group
                                ${activeIndex === index ? 'md:flex-[3] h-[500px] md:h-auto' : 'md:flex-[0.5] h-[100px] md:h-auto bg-neutral-900 border border-white/5'}
                            `}
                        >
                            {/* Background Image (Active Only) */}
                             <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeIndex === index ? 'opacity-100' : 'opacity-20 md:opacity-0'}`}>
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                             </div>

                             {/* Active Content Overlay */}
                             <div className={`absolute inset-0 p-8 md:p-10 flex flex-col justify-between transition-all duration-500 delay-100 ${activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                 <div className="flex justify-between items-start">
                                     <span className="text-6xl md:text-8xl font-serif italic text-white/20 leading-none">{project.id}</span>
                                     <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform duration-300">
                                        <ArrowUpRight size={24} />
                                     </div>
                                 </div>
                                 
                                 <div className="max-w-2xl">
                                     <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md bg-white/10">
                                                {tag}
                                            </span>
                                        ))}
                                     </div>
                                     <div className="mb-2 text-neutral-300 font-medium tracking-wide uppercase text-sm">{project.category}</div>
                                     <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{project.title}</h3>
                                     <p className="text-lg text-neutral-300 mb-6 leading-relaxed max-w-lg">{project.description}</p>
                                     <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 rounded-lg font-semibold text-lg">
                                         {project.result}
                                     </div>
                                 </div>
                             </div>

                             {/* Inactive State: Vertical Text (Desktop) */}
                             <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${activeIndex === index ? 'opacity-0 pointer-events-none' : 'opacity-0 md:opacity-100'}`}>
                                 <h3 className="text-3xl font-bold text-neutral-600 whitespace-nowrap -rotate-90 tracking-widest uppercase group-hover:text-white transition-colors">
                                     {project.title}
                                 </h3>
                                  <span className="absolute bottom-10 text-3xl font-serif italic text-neutral-700">{project.id}</span>
                             </div>
                             
                             {/* Inactive State: Horizontal Row (Mobile) */}
                             <div className={`absolute inset-0 flex items-center justify-between px-8 md:hidden transition-opacity duration-300 ${activeIndex === index ? 'opacity-0' : 'opacity-100'}`}>
                                <div className="flex items-center gap-6">
                                    <span className="text-3xl font-serif italic text-neutral-600">{project.id}</span>
                                    <h3 className="text-xl font-bold text-neutral-300">{project.title}</h3>
                                </div>
                                <ArrowUpRight className="text-neutral-600" />
                             </div>

                        </div>
                    ))}
                </div>
             </div>
        </section>
    );
};

export default FeaturedWork;