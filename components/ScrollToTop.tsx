import React, { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        pointerEvents: "all",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        y: 20,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-8 left-8 z-40 bg-black text-white p-3 rounded-full shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:scale-110 active:scale-95 transition-all opacity-0 translate-y-5"
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
      {/* Optional: Add a subtle ripple or distinct hover effect if needed, but basic transition is handled by Tailwind classes */}
    </button>
  );
};

export default ScrollToTop;
