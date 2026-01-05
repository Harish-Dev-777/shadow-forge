import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-neutral-200">
            <button 
                className="w-full py-6 flex items-center justify-between text-left group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg md:text-xl font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors pr-8">{question}</span>
                <span className={`p-2 bg-neutral-100 rounded-full transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-45' : ''}`}>
                    <Plus size={16} />
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
                <p className="text-neutral-500 leading-relaxed max-w-2xl">{answer}</p>
            </div>
        </div>
    );
};

const FAQ: React.FC = () => {
    const questions = [
        { 
            q: "What services do you offer?", 
            a: "We specialize in AI-powered web design, UX & conversion strategy, branding, motion design, and modern web development. Our goal is to build websites that don’t just look good — they perform and convert." 
        },
        { 
            q: "What makes your agency different?", 
            a: "We combine AI, strategy, and premium design. Unlike typical agencies, we focus on results, clarity, and user experience, not just visuals. Every decision we make is intentional and data-driven." 
        },
        { 
            q: "Do you work with startups or only large companies?", 
            a: "We primarily work with startups, founders, and growing digital products, but we also collaborate with established brands looking to modernize their online presence." 
        },
        { 
            q: "How long does a project usually take?", 
            a: "Most projects take 2–6 weeks, depending on scope and complexity. We prioritize quality and speed, without cutting corners." 
        },
        { 
            q: "What technologies do you use?", 
            a: "We use modern, scalable technologies such as Next.js, Tailwind CSS, GSAP animations, and AI-powered tools to ensure performance, flexibility, and long-term growth." 
        },
        { 
            q: "Will my website be mobile-friendly and fast?", 
            a: "Absolutely. Every website we build is fully responsive, performance-optimized, and designed to deliver a smooth experience across all devices." 
        },
        { 
            q: "Can you redesign an existing website?", 
            a: "Yes. We can redesign, optimize, and elevate your current website to improve visuals, user experience, and conversion rates." 
        },
        { 
            q: "Do you provide ongoing support after launch?", 
            a: "Yes. We offer ongoing support, maintenance, and optimization packages to ensure your website continues to perform and evolve." 
        },
        { 
            q: "How much does a project cost?", 
            a: "Each project is unique. Pricing depends on scope, features, and complexity. We offer transparent, value-based pricing tailored to your goals." 
        },
        { 
            q: "How do we get started?", 
            a: "Simply book a free strategy call. We’ll discuss your goals, challenges, and vision — and see if we’re the right fit." 
        }
    ];

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
                Frequently Asked <span className="text-neutral-400">Questions</span>
            </h2>
            <div className="h-1 w-20 bg-neutral-900"></div>
        </div>
        
        <div className="flex flex-col">
            {questions.map((item, i) => (
                <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;