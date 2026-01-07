import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Box, ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const marqueeWrapperRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);

  // Using reliable vector sources
  const logoUrls = [
    "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg",
    "https://www.vectorlogo.zone/logos/w3_css/w3_css-icon.svg",
    "https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg",
    "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
    "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",
    "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",
    "https://www.vectorlogo.zone/logos/nextjs/nextjs-icon.svg",
    "https://www.vectorlogo.zone/logos/java/java-icon.svg",
    "https://www.vectorlogo.zone/logos/springio/springio-icon.svg",
    "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",
    "https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg",
    "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg",
    "https://www.vectorlogo.zone/logos/figma/figma-icon.svg",
  ];

  // 4 sets to ensure it covers wide screens and loops seamlessly with xPercent: -25
  const marqueeIcons = [...logoUrls, ...logoUrls, ...logoUrls, ...logoUrls];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.2 }
      )
        .fromTo(
          marqueeWrapperRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.8"
        )
        .fromTo(
          supportRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        );

      // Infinite Marquee Animation
      gsap.to(marqueeTrackRef.current, {
        xPercent: -25,
        ease: "none",
        duration: 40, // Slower duration for better visibility
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10 opacity-60"></div>

      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100/80 border border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-8">
          <Box size={14} />
          <span>AI Web Design Agency</span>
        </div>

        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-neutral-900 mb-6 text-balance"
        >
          We Design AI-Powered Websites <br />
          That Turn{" "}
          <span className="text-neutral-400 font-light italic">
            Vision
          </span>{" "}
          Into Revenue
        </h1>

        {/* Infinite Scrolling Marquee */}
        <div
          ref={marqueeWrapperRef}
          className="relative w-full max-w-6xl mx-auto my-12 md:my-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <div ref={marqueeTrackRef} className="flex gap-4 md:gap-8 w-max pl-4">
            {marqueeIcons.map((url, i) => (
              <div
                key={i}
                className="w-16 h-16 md:w-20 md:h-20 bg-white border border-neutral-200 shadow-sm rounded-2xl flex items-center justify-center shrink-0 p-4 hover:border-neutral-300 transition-colors"
              >
                <img
                  src={url}
                  alt="Tech Logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none mx-auto"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => {
                  const nameInput = document.getElementById("contact-name");
                  if (nameInput) {
                    nameInput.focus();
                  }
                }, 800);
              }
            }}
            className="w-full sm:w-[200px] h-[56px] bg-neutral-900 text-white rounded-xl font-semibold text-lg hover:bg-black transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            Contact Us
          </a>
          <a
            href="#work"
            className="w-full sm:w-[200px] h-[56px] bg-white text-neutral-900 border border-neutral-200 rounded-xl font-semibold text-lg hover:bg-neutral-50 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
          >
            Explore Our Work{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>

        {/* Supporting Line */}
        <p
          ref={supportRef}
          className="mt-10 text-sm font-medium text-neutral-500"
        >
          ⚡ Trusted by ambitious founders & fast-growing startups
        </p>
      </div>
    </section>
  );
};

export default Hero;
