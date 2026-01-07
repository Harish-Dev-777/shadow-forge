import React, { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  ChevronDown,
  Check,
  Sparkles,
  X,
  PartyPopper,
} from "lucide-react";
import gsap from "gsap";

const services = [
  "AI Web Design",
  "UX & Conversion",
  "Brand Identity",
  "Motion Design",
  "SEO Optimization",
  "Website Maintenance",
  "AI Chatbot Integration",
  "API Integration",
  "E-commerce Solutions",
  "Landing Page Design",
  "Full Website Development",
  "UI/UX to Design Conversion",
  "Logo Design",
];

// Form data interface
interface FormData {
  name: string;
  businessName: string;
  service: string;
  budget: string;
  email: string;
  phone: string;
  details: string;
}

import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

const Contact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sendEmail = useMutation(api.sendEmails.sendContactForm);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    businessName: "",
    service: "",
    budget: "",
    email: "",
    phone: "",
    details: "",
  });

  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; phone?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/; // Basic validation for 10 digits, optional country code

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Cleaning phone number to just digits for check if desired, or use regex
    // Allowing +91 space/dash and 10 digits, or just 10 digits
    if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Expose function to window for AI agent to fill form
  useEffect(() => {
    (window as any).fillContactForm = (data: Partial<FormData>) => {
      console.log("AI Agent filling form with:", data);

      if (data.name)
        setFormData((prev) => ({ ...prev, name: data.name || "" }));
      if (data.service) {
        setSelectedService(data.service);
        setFormData((prev) => ({ ...prev, service: data.service || "" }));
      }
      if (data.budget) {
        setSelectedBudget(data.budget);
        setFormData((prev) => ({ ...prev, budget: data.budget || "" }));
      }
      if (data.email)
        setFormData((prev) => ({ ...prev, email: data.email || "" }));
      if (data.phone)
        setFormData((prev) => ({ ...prev, phone: data.phone || "" }));
      if (data.details)
        setFormData((prev) => ({ ...prev, details: data.details || "" }));

      // Scroll to form
      document
        .getElementById("contact-form")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    // Expose function to submit form programmatically
    (window as any).submitContactForm = () => {
      const form = document.getElementById("contact-form") as HTMLFormElement;
      if (form) {
        form.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }
    };

    return () => {
      delete (window as any).fillContactForm;
      delete (window as any).submitContactForm;
    };
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  // Success message animation
  useEffect(() => {
    if (showSuccess && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { y: -100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      );

      const timer = setTimeout(() => {
        if (successRef.current) {
          gsap.to(successRef.current, {
            y: -100,
            opacity: 0,
            scale: 0.9,
            duration: 0.4,
            onComplete: () => setShowSuccess(false),
          });
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const finalData = {
      ...formData,
      service: selectedService,
      budget: selectedBudget,
    };

    try {
      await sendEmail(finalData);
      setShowSuccess(true);

      // Reset form
      setFormData({
        name: "",
        businessName: "",
        service: "",
        budget: "",
        email: "",
        phone: "",
        details: "",
      });
      setSelectedService("");
      setSelectedBudget("");
    } catch (error: any) {
      console.error("Failed to send email:", error);
      alert(
        `Something went wrong: ${error?.message || "Unknown error"}. Please try again later.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-32 bg-white relative" id="contact">
      {/* Premium Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 md:top-8 left-0 w-full z-[100] flex justify-center px-4 md:px-6 pointer-events-none">
          <div
            ref={successRef}
            className="pointer-events-auto bg-[#0a0a0a]/90 border border-white/10 text-white px-6 md:px-8 py-5 md:py-6 rounded-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-3xl flex items-center gap-5 max-w-md w-full relative overflow-hidden"
          >
            {/* Subtle light leak effect */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-[50px] pointer-events-none"></div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

            {/* Icon */}
            <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-b from-neutral-800 to-neutral-900 border border-white/10 flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group">
              <div className="absolute inset-0 rounded-full bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Check
                className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                size={22}
                strokeWidth={3}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1">
              <h4 className="font-medium text-base md:text-lg tracking-wide text-white mb-0.5">
                Request Sent Successfully
              </h4>
              <p className="text-neutral-500 text-sm font-light leading-snug">
                Thank you. We will get back to you shortly.
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                gsap.to(successRef.current, {
                  y: -20,
                  opacity: 0,
                  filter: "blur(10px)",
                  duration: 0.4,
                  onComplete: () => setShowSuccess(false),
                });
              }}
              className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition-all duration-300 text-neutral-500 hover:text-white shrink-0"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

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
                <span className="text-sm font-bold tracking-wider uppercase text-purple-200">
                  New AI Assistant
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Chat with Jessica
              </h3>
              <p className="text-neutral-300 leading-relaxed max-w-xl mb-6">
                Make a call with Jessica to discuss your project, get instant
                answers about our <strong>pricing</strong> and{" "}
                <strong>services</strong>, and discover how we can help bring
                your vision to life.
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const widget = document.querySelector("elevenlabs-convai");
                  const startButton = widget?.shadowRoot?.querySelector(
                    'button[aria-label="Start a call"]'
                  ) as HTMLElement;
                  if (startButton) startButton.click();
                }}
                className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <Sparkles size={18} className="fill-black" />
                Start Conversation
              </button>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
              <span className="text-xs font-mono text-green-400">
                ONLINE NOW
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-16 leading-tight">
          Hey! We are <span className="text-neutral-300">ready</span> <br />
          to <span className="text-indigo-200">consult you_</span>
        </h2>

        <form id="contact-form" className="space-y-12" onSubmit={handleSubmit}>
          {/* Continuous Paragraph Form */}
          <div className="text-2xl md:text-4xl font-light text-neutral-900 leading-relaxed">
            <span>My name is </span>
            <input
              id="contact-name"
              type="text"
              placeholder="first and last name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="bg-transparent border-b-2 border-neutral-200 focus:border-black outline-none placeholder:text-neutral-300 min-w-[280px] md:min-w-[320px] pb-1 transition-all duration-300 text-neutral-900 font-light placeholder:font-light"
              autoComplete="name"
              required
            />
            <span> and I represent </span>
            <input
              id="contact-business"
              type="text"
              placeholder="business or shop name"
              value={formData.businessName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  businessName: e.target.value,
                }))
              }
              className="bg-transparent border-b-2 border-neutral-200 focus:border-black outline-none placeholder:text-neutral-300 min-w-[280px] md:min-w-[320px] pb-1 transition-all duration-300 text-neutral-900 font-light placeholder:font-light"
              autoComplete="organization"
            />
            <span className="text-sm text-neutral-400 italic"> (optional)</span>
            <span>. I'm interested in </span>

            {/* Inline Dropdown */}
            <span
              className="relative inline-block min-w-[280px] md:min-w-[320px]"
              ref={dropdownRef}
            >
              <span
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-between border-b cursor-pointer pb-2 transition-all duration-300 w-full ${
                  isOpen
                    ? "border-black"
                    : "border-neutral-300 hover:border-neutral-400"
                }`}
              >
                <span
                  className={`${
                    selectedService
                      ? "text-neutral-900 font-normal"
                      : "text-neutral-300"
                  }`}
                >
                  {selectedService || "select a service"}
                </span>
                <ChevronDown
                  className={`text-neutral-400 transition-transform duration-300 hover:text-black ${
                    isOpen ? "rotate-180 text-black" : ""
                  }`}
                  size={24}
                />
              </span>

              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 top-full mt-4 w-full min-w-[320px] bg-neutral-900 rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] border border-neutral-800 overflow-hidden transition-all duration-300 origin-top z-50 ${
                  isOpen
                    ? "opacity-100 scale-100 translate-y-0 visible"
                    : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"
                }`}
              >
                <ul className="py-2 max-h-[320px] overflow-y-auto scroll-smooth">
                  {services.map((service) => (
                    <li
                      key={service}
                      onClick={() => {
                        setSelectedService(service);
                        setIsOpen(false);
                      }}
                      className="px-6 py-4 hover:bg-neutral-800 cursor-pointer flex items-center justify-between group transition-colors border-b border-neutral-800 last:border-0"
                    >
                      <span
                        className={`text-lg font-medium transition-colors ${
                          selectedService === service
                            ? "text-white"
                            : "text-neutral-400 group-hover:text-white"
                        }`}
                      >
                        {service}
                      </span>
                      {selectedService === service && (
                        <Check size={20} className="text-white" />
                      )}
                    </li>
                  ))}
                </ul>

                {/* Scroll Indicator */}
                <div className="sticky bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-neutral-900 via-neutral-900/90 to-transparent pointer-events-none flex items-end justify-center pb-2">
                  <div className="flex flex-col items-center gap-0.5 animate-bounce">
                    <ChevronDown size={16} className="text-neutral-500" />
                    <span className="text-xs text-neutral-500 font-medium">
                      Scroll for more
                    </span>
                  </div>
                </div>
              </div>
            </span>
            <span>. My project budget is </span>

            {/* Inline Budget Pills */}
            <span className="inline-flex flex-wrap gap-2 align-middle">
              {[
                "₹2k-3k",
                "₹3k-5k",
                "₹5k-10k",
                "₹10k-15k",
                "₹15k-20k",
                ">₹20k",
              ].map((budget) => (
                <label key={budget} className="cursor-pointer inline-block">
                  <input
                    type="radio"
                    name="budget"
                    value={budget}
                    checked={selectedBudget === budget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="peer hidden"
                  />
                  <span className="px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-full border border-neutral-200 peer-checked:bg-black peer-checked:text-white hover:border-black transition-all inline-block">
                    {budget}
                  </span>
                </label>
              ))}
            </span>
            <span>. Please contact me at </span>
            <span className="relative inline-block">
              <input
                id="contact-email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, email: e.target.value }));
                  if (errors.email)
                    setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className={`bg-transparent border-b-2 ${
                  errors.email
                    ? "border-red-500 text-red-600"
                    : "border-neutral-200 focus:border-black text-neutral-900"
                } outline-none placeholder:text-neutral-300 min-w-[280px] md:min-w-[320px] pb-1 transition-all duration-300 font-light placeholder:font-light`}
                autoComplete="email"
                required
              />
              {errors.email && (
                <div className="absolute left-0 top-full mt-2 z-10 flex items-center gap-2 bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-xs text-red-600 font-medium whitespace-nowrap">
                    {errors.email}
                  </span>
                </div>
              )}
            </span>
            <span> and my mobile number is </span>
            <span className="relative inline-block">
              <input
                id="contact-phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, phone: e.target.value }));
                  if (errors.phone)
                    setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                className={`bg-transparent border-b-2 ${
                  errors.phone
                    ? "border-red-500 text-red-600"
                    : "border-neutral-200 focus:border-black text-neutral-900"
                } outline-none placeholder:text-neutral-300 min-w-[240px] md:min-w-[280px] pb-1 transition-all duration-300 font-light placeholder:font-light`}
                autoComplete="tel"
                required
              />
              {errors.phone && (
                <div className="absolute left-0 top-full mt-2 z-10 flex items-center gap-2 bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-xs text-red-600 font-medium whitespace-nowrap">
                    {errors.phone}
                  </span>
                </div>
              )}
            </span>
            <span>. Optionally, I'm sharing more details: </span>
            <input
              id="contact-details"
              type="text"
              placeholder="your project details"
              value={formData.details}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, details: e.target.value }))
              }
              className="bg-transparent border-b-2 border-neutral-200 focus:border-black outline-none placeholder:text-neutral-300 min-w-[280px] md:min-w-[400px] pb-1 transition-all duration-300 text-neutral-900 font-light placeholder:font-light"
            />
            <span>.</span>
          </div>

          <div className="pt-12">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group bg-black text-white pl-8 pr-2 py-2 rounded-full text-lg font-medium flex items-center gap-4 hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Sending..." : "Send request"}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                ) : (
                  <ArrowRight size={20} />
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
