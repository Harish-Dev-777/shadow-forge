import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Body Scroll Lock
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // GSAP Animation for Menu
  useEffect(() => {
    const menu = menuRef.current;
    const links = linksRef.current.filter(Boolean); // Filter out nulls
    const bg = bgRef.current;

    if (mobileMenuOpen) {
      // Open Animation
      const tl = gsap.timeline();

      // 1. Reveal Background
      tl.to(menu, {
        duration: 0.1,
        visibility: 'visible',
      })
      .to(bg, {
        scaleY: 1,
        duration: 0.6,
        ease: 'power4.inOut',
        transformOrigin: 'top',
      })
      .to(links, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.2');

    } else {
      // Close Animation
      const tl = gsap.timeline();

      tl.to(links, {
        y: 50,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power2.in',
      })
      .to(bg, {
        scaleY: 0,
        duration: 0.5,
        ease: 'power4.inOut',
        transformOrigin: 'top',
      })
      .to(menu, {
        duration: 0.1,
        visibility: 'hidden',
      });
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'FAQ', href: '#faq' },
  ];

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const addToLinksRef = (el: HTMLAnchorElement | null) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  // Clear refs on re-render to avoid duplicates/stale refs
  linksRef.current = [];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled && !mobileMenuOpen
            ? 'bg-white/80 backdrop-blur-md py-4 border-b border-neutral-100'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-50">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group relative z-50">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg group-hover:rotate-12 transition-all duration-300 shadow-lg ${mobileMenuOpen ? 'bg-white text-black' : 'bg-black text-white'}`}>
              S
            </div>
            <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${mobileMenuOpen ? 'text-white' : 'text-neutral-900'}`}>
              Shadow Forge.
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-neutral-600 hover:text-black transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA & Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+919025946625"
              className={`hidden md:flex px-6 py-2.5 text-sm font-semibold rounded-full transition-all active:scale-95 shadow-lg hover:shadow-xl hover:-translate-y-0.5 items-center gap-2 ${mobileMenuOpen ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'}`}
            >
              Book a Demo Call
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>

            {/* Custom Hamburger */}
            <button
              ref={hamburgerRef}
              onClick={toggleMenu}
              className="md:hidden relative z-50 w-12 h-12 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <span 
                className={`block h-0.5 w-6 rounded-full transition-all duration-300 ease-out ${
                  mobileMenuOpen 
                    ? 'rotate-45 translate-y-2 bg-white' 
                    : 'bg-black translate-y-0'
                }`} 
              />
              <span 
                className={`block h-0.5 w-6 rounded-full transition-all duration-300 ease-out ${
                  mobileMenuOpen 
                    ? 'opacity-0 translate-x-3' 
                    : 'opacity-100 bg-black translate-x-0'
                }`} 
              />
              <span 
                className={`block h-0.5 w-6 rounded-full transition-all duration-300 ease-out ${
                  mobileMenuOpen 
                    ? '-rotate-45 -translate-y-2 bg-white' 
                    : 'bg-black translate-y-0'
                }`} 
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 invisible md:hidden"
        style={{ pointerEvents: mobileMenuOpen ? 'all' : 'none' }}
      >
        <div 
          ref={bgRef} 
          className="absolute inset-0 bg-neutral-950 origin-top transform scale-y-0"
        ></div>

        <div className="relative z-50 h-full flex flex-col justify-center px-8">
          <div className="flex flex-col gap-6">
            {navLinks.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                ref={addToLinksRef}
                className="text-5xl font-bold text-white tracking-tight opacity-0 translate-y-12 hover:text-neutral-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
             <a 
                href="tel:+919025946625"
                ref={addToLinksRef}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-medium text-neutral-400 mt-8 flex items-center gap-4 opacity-0 translate-y-12 hover:text-white transition-colors"
               >
                Book a Demo Call <ArrowRight size={24} />
               </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;