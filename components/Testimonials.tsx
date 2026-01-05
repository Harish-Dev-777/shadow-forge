import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

const testimonials = [
  {
    company: "Ailitic",
    quote: "They tailor their solutions to our specific needs and goals.",
    name: "Denis Slavska",
    role: "CTO, Ailitic",
    image: "https://i.pravatar.cc/150?u=1"
  },
  {
    company: "NeuraFlow",
    quote: "The team delivered a product that feels both elegant and highly functional.",
    name: "Alex Morgan",
    role: "Founder, NeuraFlow",
    image: "https://i.pravatar.cc/150?u=2"
  },
  {
    company: "VisionX",
    quote: "Their attention to detail and design thinking truly set them apart.",
    name: "Sophia Reynolds",
    role: "Product Lead, VisionX",
    image: "https://i.pravatar.cc/150?u=3"
  },
  {
    company: "AutomateIQ",
    quote: "From strategy to execution, everything was handled with clarity and precision.",
    name: "Michael Chen",
    role: "CEO, AutomateIQ",
    image: "https://i.pravatar.cc/150?u=4"
  },
  {
    company: "Nova Labs",
    quote: "They understood our vision instantly and translated it into a premium digital experience.",
    name: "Emma Laurent",
    role: "Head of Marketing, Nova Labs",
    image: "https://i.pravatar.cc/150?u=5"
  },
  {
    company: "DataHive",
    quote: "The final result exceeded our expectations in both performance and design.",
    name: "Rahul Mehta",
    role: "Co-Founder, DataHive",
    image: "https://i.pravatar.cc/150?u=6"
  },
  {
    company: "CloudNest",
    quote: "The website not only looks great but performs flawlessly across devices.",
    name: "Daniel Brooks",
    role: "CTO, CloudNest",
    image: "https://i.pravatar.cc/150?u=7"
  },
  {
    company: "Synapse AI",
    quote: "A rare combination of strong design, technical expertise, and strategic thinking.",
    name: "Laura Kim",
    role: "VP of Product, Synapse AI",
    image: "https://i.pravatar.cc/150?u=8"
  }
];

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Scroll by one card width roughly on desktop (400px + gap) or full width on mobile
      const scrollAmount = current.clientWidth < 768 ? current.clientWidth : 450;
      
      const newScrollLeft = direction === 'left' 
        ? current.scrollLeft - scrollAmount 
        : current.scrollLeft + scrollAmount;
      
      current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
            <div>
                <p className="text-xs font-bold tracking-widest text-neutral-500 uppercase mb-4">Our Reviews</p>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-neutral-900">
                    What Our <span className="text-neutral-400">Clients</span> Say
                </h2>
            </div>
            <div className="flex gap-4">
                <button 
                    onClick={() => scroll('left')}
                    className="w-14 h-14 rounded-full bg-white border border-neutral-200 text-black flex items-center justify-center hover:bg-neutral-100 transition-colors active:scale-95 shadow-sm"
                    aria-label="Previous testimonial"
                >
                    <ArrowLeft size={20} />
                </button>
                <button 
                    onClick={() => scroll('right')}
                    className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-colors active:scale-95 shadow-md"
                    aria-label="Next testimonial"
                >
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>

        <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8 items-stretch"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {testimonials.map((item, index) => (
                <div 
                    key={index}
                    className="min-w-[100%] md:min-w-[400px] snap-center bg-neutral-50 p-10 rounded-[2rem] flex flex-col justify-between min-h-[350px] border border-neutral-100 hover:border-neutral-200 transition-colors duration-300"
                >
                    <div className="flex justify-between items-start mb-8">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full grayscale opacity-80" />
                        <div className="px-4 py-2 bg-white rounded-full text-xs font-bold tracking-wide uppercase shadow-sm text-neutral-900 border border-neutral-100">{item.company}</div>
                    </div>
                    <div className="mb-8 flex-grow">
                        <Quote className="text-neutral-300 mb-4 fill-neutral-200" size={24} />
                        <p className="text-xl md:text-2xl font-medium leading-snug tracking-tight text-neutral-900">
                            "{item.quote}"
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-bold text-neutral-900 text-lg">{item.name}</p>
                        <p className="text-sm font-medium text-neutral-500">{item.role}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;