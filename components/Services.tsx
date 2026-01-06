import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  Monitor,
  Layout,
  Fingerprint,
  Zap,
  TrendingUp,
  Settings,
  Bot,
  Plug,
} from "lucide-react";
import { ServiceData } from "../App";

interface ServicesProps {
  onServiceClick: (service: ServiceData) => void;
}

const servicesData: ServiceData[] = [
  {
    id: "ai-web-design",
    title: "AI Web Design",
    description:
      "Pixel-perfect, AI-enhanced websites designed to convert users into customers.",
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    iconType: "monitor",
    fullContent: {
      heroImage:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2000&auto=format&fit=crop",
      longDescription:
        "We utilize cutting-edge generative AI to prototype, design, and build websites faster than ever before. Our process ensures that your site is not just visually stunning but also optimized for performance and conversion from day one.",
      features: [
        "Generative UI Prototyping",
        "Responsive & Adaptive Layouts",
        "SEO-Optimized Structure",
        "High-Performance Next.js Code",
      ],
    },
  },
  {
    id: "ux-strategy",
    title: "UX & Conversion",
    description:
      "Data-driven layouts and user journeys that guide visitors toward action.",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-100",
    iconType: "layout",
    fullContent: {
      heroImage:
        "https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?q=80&w=2000&auto=format&fit=crop",
      longDescription:
        "Beauty means nothing without function. We analyze user behavior to create intuitive paths that reduce friction and maximize conversion rates. Every pixel serves a purpose.",
      features: [
        "User Journey Mapping",
        "A/B Testing Strategies",
        "Heatmap Analysis",
        "Accessibility Compliance",
      ],
    },
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    description:
      "Logos, typography, and visual language crafted for long-term brand recognition.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    iconType: "fingerprint",
    fullContent: {
      heroImage:
        "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=2000&auto=format&fit=crop",
      longDescription:
        "Your brand is your story. We craft cohesive visual identities that resonate with your target audience, from logo design to comprehensive design systems that scale.",
      features: [
        "Logo Design & Typography",
        "Color Psychology",
        "Design Systems",
        "Brand Guidelines",
      ],
    },
  },
  {
    id: "motion-design",
    title: "Motion Design",
    description:
      "Smooth animations and micro-interactions that make your product feel alive.",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
    iconType: "zap",
    fullContent: {
      heroImage:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
      longDescription:
        "Motion captures attention. We use GSAP and WebGL to create cinematic experiences that delight users without sacrificing performance.",
      features: [
        "Micro-interactions",
        "Scroll-triggered Animation",
        "Lottie Integration",
        "3D WebGL Elements",
      ],
    },
  },
  {
    id: "seo-optimization",
    title: "SEO Optimization",
    description:
      "Search-engine optimized websites built to rank, attract, and convert organic traffic.",
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-100",
    iconType: "trending-up",
    fullContent: {
      heroImage: "/assets/services/SEO.png",
      longDescription:
        "We build SEO into the foundation of your website—not as an afterthought. From technical SEO and site speed to content structure and schema, we ensure long-term organic growth.",
      features: [
        "Technical SEO Audits",
        "On-Page & Off-Page Optimization",
        "Core Web Vitals Optimization",
        "Schema Markup & Indexing",
      ],
    },
  },
  {
    id: "website-maintenance",
    title: "Website Maintenance",
    description:
      "Ongoing support, updates, and performance monitoring to keep your site flawless.",
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-100",
    iconType: "settings",
    fullContent: {
      heroImage: "/assets/services/website_maintenance.png",
      longDescription:
        "Your website needs continuous care. We handle updates, security patches, performance monitoring, and content changes so you can focus on growing your business.",
      features: [
        "Performance & Uptime Monitoring",
        "Security Updates & Backups",
        "Content & Feature Updates",
        "Bug Fixes & Technical Support",
      ],
    },
  },
  {
    id: "ai-chatbot-integration",
    title: "AI Chatbot Integration",
    description:
      "Smart AI assistants that engage users, capture leads, and automate support.",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100",
    iconType: "bot",
    fullContent: {
      heroImage: "/assets/services/ai_chatbot.png",
      longDescription:
        "We design and integrate AI-powered chatbots tailored to your business—handling customer support, lead qualification, bookings, and real-time assistance 24/7.",
      features: [
        "Custom AI Chat & Voice Bots",
        "Lead Capture & CRM Integration",
        "Multi-language Support",
        "Website & WhatsApp Integration",
      ],
    },
  },
  {
    id: "api-integration",
    title: "API Integration",
    description:
      "Seamless third-party and custom API integrations to power your workflows.",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    iconType: "plug",
    fullContent: {
      heroImage: "/assets/services/api_integration.png",
      longDescription:
        "From payment gateways and analytics tools to CRMs and AI services, we integrate APIs that extend functionality and automate your digital ecosystem.",
      features: [
        "Payment Gateway Integration",
        "CRM & Marketing Tools",
        "Custom Backend APIs",
        "Secure Authentication Flows",
      ],
    },
  },
];

const IconComponent = ({
  type,
  className,
}: {
  type: string;
  className?: string;
}) => {
  switch (type) {
    case "monitor":
      return <Monitor className={className} />;
    case "layout":
      return <Layout className={className} />;
    case "fingerprint":
      return <Fingerprint className={className} />;
    case "zap":
      return <Zap className={className} />;
    case "trending-up":
      return <TrendingUp className={className} />;
    case "settings":
      return <Settings className={className} />;
    case "bot":
      return <Bot className={className} />;
    case "plug":
      return <Plug className={className} />;
    default:
      return <Monitor className={className} />;
  }
};

const Services: React.FC<ServicesProps> = ({ onServiceClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state explicitly to avoid "stuck" invisible elements
      gsap.set(".service-card", {
        y: 50,
        opacity: 0,
        autoAlpha: 0, // Helps with visibility handling
      });

      // Animate to visible
      gsap.to(".service-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%", // Triggers slightly earlier
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility", // Ensures clean state after animation
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="py-24 bg-white overflow-hidden relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
            What We Do Best
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-500 text-lg leading-relaxed">
            A complete blend of AI, design, and strategy — everything you need
            to dominate digitally.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory px-4 md:px-0 w-full"
            style={{ scrollBehavior: "smooth" }}
          >
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="service-card flex-none w-[300px] md:w-[350px] min-w-[300px] snap-center bg-white rounded-3xl p-8 hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col items-center text-center group/card cursor-pointer"
                onClick={() => onServiceClick(service)}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-full ${service.iconBg} ${service.iconColor} flex items-center justify-center mb-8 group-hover/card:scale-110 transition-transform duration-300`}
                >
                  <IconComponent type={service.iconType} className="w-8 h-8" />
                </div>

                {/* Text */}
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-neutral-500 leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>

                {/* Button */}
                <button className="px-8 py-3 rounded-full border border-neutral-200 text-sm font-semibold text-neutral-900 hover:bg-black hover:text-white hover:border-black transition-all duration-300">
                  View more
                </button>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-all active:scale-95 shadow-md"
              aria-label="Scroll left"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-all active:scale-95 shadow-md"
              aria-label="Scroll right"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
