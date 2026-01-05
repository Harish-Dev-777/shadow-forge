import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronDown, Check, Sparkles } from 'lucide-react';

const services = [
  "Landing page",
  "Full website",
  "Website SEO",
  "E-commerce",
  "UI/UX to design conversion",
  "Logo design"
];

const Contact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className="py-32 bg-white" id="contact">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* AI Assistant Banner */}
        <div className="mb-16 p-8 rounded-3xl bg-neutral-900 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                         <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                            <Sparkles size={20} className="text-purple-300" />
                         </div>
                         <span className="text-sm font-bold tracking-wider uppercase text-purple-200">New AI Assistant</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">Chat with Jessica</h3>
                    <p className="text-neutral-300 leading-relaxed max-w-xl">
                        Skip the form? Use our AI assistant to <strong>schedule appointments</strong>, <strong>book sessions</strong>, and get instant answers about our <strong>pricing</strong> and <strong>services</strong>.
                    </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                    <span className="text-xs font-mono text-green-400">ONLINE NOW</span>
                </div>
            </div>
        </div>

        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-16 leading-tight">
          Hey! We are <span className="text-neutral-300">ready</span> <br />
          to <span className="text-indigo-200">consult you_</span>
        </h2>

        <form className="space-y-8 md:space-y-12">
            <div className="flex flex-wrap items-baseline gap-4 text-2xl md:text-4xl font-light text-neutral-900 leading-relaxed relative z-20">
                <span>My name is</span>
                <input 
                    type="text" 
                    placeholder="first and last name" 
                    className="bg-transparent border-b border-neutral-300 focus:border-black outline-none placeholder:text-neutral-300 min-w-[300px] pb-2 transition-colors"
                />
                <span>and I'm interested in</span>
                
                {/* Custom Dropdown */}
                <div className="relative inline-block min-w-[320px]" ref={dropdownRef}>
                    <div 
                        onClick={() => setIsOpen(!isOpen)}
                        className={`w-full border-b cursor-pointer flex items-center justify-between pb-2 transition-all duration-300 group ${isOpen ? 'border-black' : 'border-neutral-300 hover:border-neutral-400'}`}
                    >
                        <span className={`${selectedService ? 'text-neutral-900 font-normal' : 'text-neutral-300'}`}>
                            {selectedService || "select a service"}
                        </span>
                        <ChevronDown 
                            className={`text-neutral-400 transition-transform duration-300 group-hover:text-black ${isOpen ? 'rotate-180 text-black' : ''}`} 
                            size={24} 
                        />
                    </div>

                    {/* Dropdown Menu */}
                    <div className={`absolute left-0 top-full mt-4 w-full bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-neutral-100 overflow-hidden transition-all duration-300 origin-top z-50 ${isOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'}`}>
                        <ul className="py-2 max-h-[320px] overflow-y-auto">
                            {services.map((service) => (
                                <li 
                                    key={service}
                                    onClick={() => {
                                        setSelectedService(service);
                                        setIsOpen(false);
                                    }}
                                    className="px-6 py-4 hover:bg-neutral-50 cursor-pointer flex items-center justify-between group transition-colors border-b border-neutral-50 last:border-0"
                                >
                                    <span className={`text-lg font-medium transition-colors ${selectedService === service ? 'text-black' : 'text-neutral-500 group-hover:text-neutral-900'}`}>
                                        {service}
                                    </span>
                                    {selectedService === service && (
                                        <Check size={20} className="text-black" />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <span>.</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-2xl md:text-4xl font-light text-neutral-900">
                <span>My project budget</span>
                <div className="flex flex-wrap gap-2 text-sm md:text-base">
                    {['₹2k-3k', '₹3k-5k', '₹5k-10k', '₹10k-15k', '₹15k-20k', '>₹20k'].map((budget) => (
                        <label key={budget} className="cursor-pointer">
                            <input type="radio" name="budget" className="peer hidden" />
                            <span className="px-6 py-2 rounded-full border border-neutral-200 peer-checked:bg-black peer-checked:text-white hover:border-black transition-all">
                                {budget}
                            </span>
                        </label>
                    ))}
                </div>
                <span>.</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-4 text-2xl md:text-4xl font-light text-neutral-900">
                <span>Please, contact me at</span>
                <input 
                    type="email" 
                    placeholder="name@example.com" 
                    className="bg-transparent border-b border-neutral-300 focus:border-black outline-none placeholder:text-neutral-300 min-w-[300px] md:min-w-[350px] pb-2 transition-colors"
                />
                <span>and my mobile number is</span>
                <input 
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    className="bg-transparent border-b border-neutral-300 focus:border-black outline-none placeholder:text-neutral-300 min-w-[280px] md:min-w-[300px] pb-2 transition-colors"
                />
                <span>.</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-4 text-2xl md:text-4xl font-light text-neutral-900">
                <span>Optionally, I'm sharing more:</span>
                <input 
                    type="text" 
                    placeholder="your project details" 
                    className="bg-transparent border-b border-neutral-300 focus:border-black outline-none placeholder:text-neutral-300 flex-grow pb-2 transition-colors"
                />
                <span>.</span>
            </div>

            <div className="pt-12">
                <button type="submit" className="group bg-black text-white pl-8 pr-2 py-2 rounded-full text-lg font-medium flex items-center gap-4 hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                    Send request
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                        <ArrowRight size={20} />
                    </div>
                </button>
            </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;