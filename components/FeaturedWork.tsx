import React, { useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "I Build This",
    category: "SaaS & Construction Tech",
    description:
      "A comprehensive platform streamlining construction project management and contractor discovery.",
    result: "🚀 Streamlined workflows by 3x",
    tags: ["SaaS", "Next.js", "Construction", "Platform"],
    image: "/assets/projects/DevlopersBlog.png",
    link: "https://i-buld-this.vercel.app/",
  },
  {
    id: "02",
    title: "Smile Care Clinic",
    category: "Healthcare & Booking",
    description:
      "A modern, trustworthy dental clinic website with integrated appointment booking and service showcase.",
    result: "📅 Increased bookings by 150%",
    tags: ["Healthcare", "Booking System", "UX Design"],
    image: "/assets/projects/SmileCareDentalClinic.png",
    link: "https://smile-care-clinic.vercel.app/",
  },
  {
    id: "03",
    title: "Spice Soul",
    category: "E-commerce & Culinary",
    description:
      "A vibrant, appetizing e-commerce experience for a premium spice brand, focused on sensory design.",
    result: "🌶️ Boosted sales conversion by 40%",
    tags: ["E-commerce", "Branding", "Sensory Design"],
    image: "/assets/projects/Spice-and-Soul.png",
    link: "https://spice-soul.vercel.app/",
  },
  {
    id: "04",
    title: "Harish Portfolio",
    category: "Personal Brand & Portfolio",
    description:
      "A high-performance personal portfolio showcasing creative development skills and project history.",
    result: "✨ Award-winning design aesthetics",
    tags: ["Portfolio", "Creative Dev", "3D Elements"],
    image: "/assets/projects/Portfolio.png",
    link: "https://harish-portfolio-tawny.vercel.app/",
  },
  {
    id: "05",
    title: "Trendly",
    category: "E-commerce & AI",
    description:
      "A curated, premium e-commerce experience powered by intelligence to elevate lifestyle shopping.",
    result: "📈 98% Happy Customers",
    tags: ["E-commerce", "AI", "Premium"],
    image: "/assets/projects/Trendly.png",
    link: "https://trendly-ecommerce-one.vercel.app/",
  },
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
    <section
      className="bg-neutral-950 py-24 text-white overflow-hidden"
      id="work"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Selected Work
          </h2>
          <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">
            Showcasing the future of digital interaction through AI-driven
            design.
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
        <div className="flex flex-row gap-4 h-[600px]">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`relative overflow-hidden rounded-3xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group h-full
                                ${index === activeIndex ? "flex flex-[3]" : "hidden md:flex md:flex-[0.5] bg-neutral-900 border border-white/5"}
                            `}
            >
              {/* Background Image (Active Only) */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeIndex === index ? "opacity-100" : "opacity-0"}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              </div>

              {/* Active Content Overlay */}
              <div
                className={`absolute inset-0 p-8 md:p-10 flex flex-col justify-between transition-all duration-500 delay-100 ${activeIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-6xl md:text-8xl font-serif italic text-white/20 leading-none">
                    {project.id}
                  </span>
                  <a
                    href={(project as any).link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform duration-300 relative z-50 cursor-pointer pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <ArrowUpRight size={24} />
                  </a>
                </div>

                <div className="max-w-2xl">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md bg-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mb-2 text-neutral-300 font-medium tracking-wide uppercase text-sm">
                    {project.category}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-lg text-neutral-300 mb-6 leading-relaxed max-w-lg">
                    {project.description}
                  </p>
                  <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 rounded-lg font-semibold text-lg">
                    {project.result}
                  </div>
                </div>
              </div>

              {/* Inactive State: Vertical Text (Desktop) */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${activeIndex === index ? "opacity-0 pointer-events-none" : "opacity-100"}`}
              >
                <h3 className="text-3xl font-bold text-neutral-600 whitespace-nowrap -rotate-90 tracking-widest uppercase group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <span className="absolute bottom-10 text-3xl font-serif italic text-neutral-700">
                  {project.id}
                </span>
              </div>

              {/* Inactive State: Horizontal Row (Mobile) - REMOVED */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
