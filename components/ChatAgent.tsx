import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Sparkles,
  MessageSquare,
  Send,
  Bot,
  User,
  CheckCircle2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAction, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { searchKnowledgeBase } from "./utils/knowledgeBase";

// --- TYPES ---

type AgentState = "IDLE" | "PROCESSING" | "TYPING" | "SUBMITTING";

interface LeadData {
  name: string;
  business_name: string;
  service: string;
  budget: string;
  timeline: string;
  phone: string;
  email: string;
  details: string;
}

const SERVICES = [
  "Web Design",
  "Custom Web App",
  "AI Agent",
  "SEO / Marketing",
];

const ChatAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<AgentState>("IDLE");
  const [input, setInput] = useState("");

  // Booking State
  const [isBooking, setIsBooking] = useState(false);
  const [currentField, setCurrentField] = useState<keyof LeadData | null>(null);

  const [messages, setMessages] = useState<
    { role: "agent" | "user"; text: string }[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [data, setData] = useState<LeadData>({
    name: "",
    business_name: "",
    service: "",
    budget: "",
    timeline: "",
    phone: "",
    email: "",
    details: "",
  });

  const sendContactForm = useMutation(api.sendEmails.sendContactForm);
  const askGemini = useAction(api.ai.askExternalAI);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Initial Greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addAgentMessage(
        "Hi, I’m Harish. Welcome to Shadow Forge! Are you looking to book a discovery call for your project?",
      );
      setTimeout(() => {
        setSuggestions(["Yes, book a call", "Just have a question"]);
      }, 1000);
    }
  }, [isOpen]);

  const addAgentMessage = (text: string) => {
    setState("TYPING");
    setTimeout(
      () => {
        setMessages((prev) => [...prev, { role: "agent", text }]);
        setState("IDLE");
      },
      600 + Math.random() * 500,
    ); // Simulate typing delay
  };

  const processInput = async (text: string) => {
    if (!text.trim()) return;

    // Add User Message
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setSuggestions([]); // Clear suggestions on input
    setState("PROCESSING");

    const lower = text.toLowerCase();

    // 1. CHECK FOR RESET/STOP
    if (lower === "cancel" || lower === "stop" || lower === "reset") {
      setIsBooking(false);
      setCurrentField(null);
      setData({
        name: "",
        business_name: "",
        service: "",
        budget: "",
        timeline: "",
        phone: "",
        email: "",
        details: "",
      });
      addAgentMessage("Okay, I've reset the conversation. How can I help?");
      return;
    }

    // 2. BOOKING MODE LOGIC
    if (isBooking && currentField) {
      handleBookingInput(text);
      return;
    }

    // 3. INTENT DETECTION (General Mode)

    // Check Knowledge Base first
    const localHit = searchKnowledgeBase(lower);

    if (localHit) {
      if (localHit.intent === "LEAD_COLLECTION") {
        // Start Booking Flow
        startBookingFlow();
        return;
      }
      // Answer Question
      addAgentMessage(localHit.answer);
      return;
    }

    // Check for explicit booking keywords if KB didn't catch it
    if (
      lower.includes("book") ||
      lower.includes("hire") ||
      lower.includes("start project") ||
      lower.includes("yes") || // Handle "Yes" from suggestion
      lower.includes("schedule") ||
      lower.includes("contact you")
    ) {
      startBookingFlow();
      return;
    }

    // CHECK FOR SPECIFIC SERVICES
    const foundService = SERVICES.find((s) => lower.includes(s.toLowerCase()));
    if (
      foundService ||
      lower.includes("landing page") ||
      lower.includes("website") ||
      lower.includes("store")
    ) {
      const serviceName =
        foundService || (lower.includes("store") ? "E-commerce" : "Web Design");
      setIsBooking(true);
      setData({ ...data, service: serviceName });
      // Skip straight to name, acknowledging the service
      addAgentMessage(
        `Awesome! A ${serviceName} project. Let's get the details. What is your name?`,
      );
      setCurrentField("name");
      return;
    }

    // Handle "Just have a question" or similar
    if (lower.includes("question") || lower.includes("ask")) {
      addAgentMessage("Sure! What would you like to know?");
      return;
    }

    // FALLBACK: GUIDED MENU (Replace Generic AI for unclear inputs)
    // If we reached here, we don't know what they want.
    addAgentMessage(
      "I'm not sure I understood. I can help you with the following services. You can say 'I need a website' or 'Book a call'.",
    );
    setTimeout(() => {
      setSuggestions([...SERVICES, "Book a Call", "Just a Question"]);
    }, 500);
    return;
  };

  // --- BOOKING LOGIC ---

  const startBookingFlow = () => {
    setIsBooking(true);
    addAgentMessage(
      "Great! Let's get your project details. First, what is your name?",
    );
    setCurrentField("name");
  };

  const handleBookingInput = (text: string) => {
    // Save data for current field
    if (!currentField) return;

    const newData = { ...data, [currentField]: text };
    setData(newData);

    // Determine next field
    const next = getNextField(newData);

    if (next) {
      setCurrentField(next);
      addAgentMessage(getQuestionForField(next));
    } else {
      // All done
      setCurrentField(null);
      setIsBooking(false); // Finished collecting
      submitBooking(newData);
    }
  };

  const getNextField = (currentData: LeadData): keyof LeadData | null => {
    if (!currentData.name) return "name";
    if (!currentData.email) return "email";
    if (!currentData.phone) return "phone";
    if (!currentData.business_name) return "business_name";
    if (!currentData.service) return "service";
    if (!currentData.details) return "details";
    if (!currentData.budget) return "budget";
    if (!currentData.timeline) return "timeline";

    return null; // Ready to submit
  };

  const getQuestionForField = (field: keyof LeadData): string => {
    switch (field) {
      case "name":
        return "What is your name?";
      case "email":
        return "Thanks. What is your email address?";
      case "phone":
        return "Perfect. What is your phone number?";
      case "business_name":
        return "What is your Business or Company name? (or say 'Personal')";
      case "service":
        return "What kind of service are you looking for? (e.g. Web Design, AI Agent, SEO)";
      case "details":
        return "Could you give me a brief description of the project details?";
      case "budget":
        return "Do you have a rough budget range? (e.g. $1k-3k, or say 'Not sure')";
      case "timeline":
        return "When do you need this completed by? (e.g. 2 weeks, ASAP)";
      default:
        return "";
    }
  };

  const submitBooking = async (finalData: LeadData) => {
    addAgentMessage("Perfect. I'm generating your request ticket...");
    try {
      await sendContactForm({
        name: finalData.name,
        email: finalData.email,
        phone: finalData.phone,
        service: finalData.service,
        details: finalData.details,
        budget: finalData.budget,
        businessName: finalData.business_name,
        timeline: finalData.timeline,
      });
      addAgentMessage(
        "Done! Your inquiry has been sent. I've also sent a confirmation to your email.",
      );
      addAgentMessage("Is there anything else I can help you with?");
    } catch (e) {
      console.error(e);
      addAgentMessage(
        "I apologize, but I couldn't transmit the data. Please try the main contact form below.",
      );
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100] font-sans flex flex-col items-end gap-4">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-[90vw] md:w-[380px] h-[600px] bg-neutral-950 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/5 bg-neutral-900/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Harish AI</h3>
                    <p className="text-xs text-neutral-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Online
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/10 via-neutral-950 to-neutral-950">
                {messages.map((m, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i}
                    className={`flex ${m.role === "agent" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed
                      ${
                        m.role === "agent"
                          ? "bg-neutral-900 text-neutral-200 border border-white/10 rounded-tl-sm"
                          : "bg-white text-black rounded-tr-sm shadow-lg shadow-white/5"
                      }
                    `}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
                {state === "TYPING" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-neutral-900 border border-white/10 p-3 rounded-2xl rounded-tl-sm flex gap-1">
                      <span
                        className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/5 bg-neutral-900/30 backdrop-blur-sm">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    processInput(input);
                  }}
                  className="flex gap-2 relative flex-col"
                >
                  {suggestions.length > 0 && (
                    <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => processInput(s)}
                          className="whitespace-nowrap px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs rounded-full border border-white/10 transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 w-full">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={
                        isBooking
                          ? `Enter your ${currentField}...`
                          : "Ask anything..."
                      }
                      className="flex-1 bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/20 transition-colors"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      className="p-3 bg-white hover:bg-neutral-200 text-black rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 pl-4 pr-6 py-3.5 bg-white text-black rounded-full shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_10px_40px_-5px_rgba(255,255,255,0.5)] transition-all duration-300"
          >
            <div className="relative w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
            </div>
            <span className="font-bold text-sm tracking-tight font-manrope">
              Book Service
            </span>
          </motion.button>
        )}
      </div>
    </>
  );
};

export default ChatAgent;
