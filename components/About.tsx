import React, { useEffect } from "react";
import gsap from "gsap";
import { ArrowRight, Zap, Target, PenTool, Lightbulb, CheckCircle2 } from "lucide-react";

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const tl = gsap.timeline();
    
    tl.fromTo(
      ".about-hero-text",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );
    
    tl.fromTo(
      ".about-section",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.4"
    );
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <h1 className="about-hero-text text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-6">
            About Shadow Forge
          </h1>
          <p className="about-hero-text text-xl md:text-2xl text-neutral-600 leading-relaxed font-light max-w-3xl mx-auto">
            At Shadow Forge, we don’t just build websites, we craft digital experiences that leave a lasting impression.
          </p>
        </div>

        {/* Intro */}
        <div className="about-section text-neutral-600 space-y-6 text-lg mb-24 max-w-3xl mx-auto">
          <p>
            Founded with a passion for design and a focus on results, Shadow Forge helps businesses transform their ideas into powerful online presences. Whether you're a startup looking to make your mark or an established brand ready to evolve, we blend creativity with strategy to deliver websites that are not only visually striking but also built to perform.
          </p>
        </div>

        {/* Mission */}
        <div className="about-section bg-neutral-50 rounded-3xl p-10 md:p-16 mb-24 relative overflow-hidden">
          <Target className="absolute -top-10 -right-10 w-48 h-48 text-neutral-100 opacity-50" strokeWidth={1} />
          <h2 className="text-3xl font-bold text-neutral-900 mb-6 relative z-10 flex items-center gap-3">
            <Target className="text-black" /> Our Mission
          </h2>
          <p className="text-xl text-neutral-600 relative z-10">
            To empower businesses with high-quality, modern web design that drives growth, builds trust, and stands out in a crowded digital world.
          </p>
        </div>

        {/* What We Do */}
        <div className="about-section mb-24">
          <h2 className="text-3xl font-bold text-neutral-900 mb-10 flex items-center gap-3">
            <PenTool className="text-black" /> What We Do
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            We specialize in:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              "Custom Website Design",
              "Responsive & Mobile-First Development",
              "UI/UX Design",
              "Landing Pages & Conversion Optimization",
              "Website Redesign & Performance Improvements"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white border border-neutral-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle2 className="text-black w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-neutral-800">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-lg text-neutral-600">
            Every project we take on is approached with precision, creativity, and a deep understanding of your brand and audience.
          </p>
        </div>

        {/* Our Approach */}
        <div className="about-section mb-24">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
            <Lightbulb className="text-black" /> Our Approach
          </h2>
          <p className="text-lg text-neutral-600">
            At Shadow Forge, we believe great design is more than aesthetics—it’s about solving problems. We take the time to understand your goals, your users, and your vision. From concept to launch, we focus on creating seamless, engaging experiences that deliver real results.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="about-section bg-black text-white rounded-3xl p-10 md:p-16 mb-24 shadow-2xl relative overflow-hidden">
          <Zap className="absolute -bottom-10 -left-10 w-64 h-64 text-neutral-900 opacity-50" strokeWidth={0.5} />
          <h2 className="text-3xl font-bold mb-10 relative z-10 flex items-center gap-3">
            <Zap className="text-white" /> Why Choose Us
          </h2>
          <ul className="space-y-6 relative z-10">
            {[
              "Tailored solutions, not templates",
              "Clean, modern, and scalable designs",
              "Fast, responsive, and optimized builds",
              "Clear communication and collaboration",
              "Results-driven mindset"
            ].map((reason, idx) => (
              <li key={idx} className="flex items-center gap-4 text-lg text-neutral-300">
                <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="about-section text-center">
          <h2 className="text-4xl font-bold text-neutral-900 mb-6 tracking-tight">
            Let’s Build Something Powerful
          </h2>
          <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto">
            Your website is often the first impression of your brand—make it count. At Shadow Forge, we’re here to forge something exceptional with you.
          </p>
          <div className="flex flex-col items-center gap-4">
            <p className="font-medium text-neutral-900 italic">
              Ready to get started? Let’s bring your vision to life.
            </p>
            <button 
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-4 px-8 py-4 bg-black text-white rounded-full font-semibold flex items-center gap-2 hover:bg-neutral-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Start Your Project <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
