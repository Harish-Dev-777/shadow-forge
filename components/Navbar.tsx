import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md py-4 border-b border-neutral-100' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                S
            </div>
            <span className="font-bold text-xl tracking-tight text-neutral-900">Shadow Forge.</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-neutral-600 hover:text-black transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="tel:+919025946625"
            className="bg-black text-white px-6 py-2.5 text-sm font-semibold rounded-full hover:bg-neutral-800 transition-all active:scale-95 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
          >
            Book a Demo Call
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-neutral-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-neutral-100 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2 fade-in duration-200">
           {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-lg font-medium text-neutral-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="h-px bg-neutral-100 my-2"></div>
           <a 
            href="tel:+919025946625"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold text-center flex items-center justify-center gap-2"
           >
            Book a Demo Call
            <ArrowRight size={16} />
           </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;