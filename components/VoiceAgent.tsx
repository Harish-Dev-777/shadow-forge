import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mic,
  X,
  Sparkles,
  BrainCircuit,
  MessageSquare,
  User,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAction, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { searchKnowledgeBase } from "./utils/knowledgeBase";

// --- TYPES ---

type AgentState =
  | "IDLE"
  | "LISTENING"
  | "PROCESSING"
  | "SPEAKING"
  | "SUBMITTING";

interface LeadData {
  name: string;
  business_name: string;
  service: string;
  budget: string;
  timeline: string;
  phone: string;
  email: string;
}

// --- KNOWLEDGE BASE ---
const LOCAL_KB = {
  SERVICES: {
    keywords: [
      "service",
      "offer",
      "do",
      "what",
      "agency",
      "build",
      "create",
      "dev",
      "web",
      "app",
      "ai",
    ],
    response:
      "We build premium websites, AI automation systems, and custom mobile apps. What specific service are you looking for?",
  },
  PRICING: {
    keywords: ["price", "cost", "budget", "money", "how much", "rate", "fee"],
    response:
      "Our pricing depends on the project scope. Simple sites start lower, while complex AI solutions require more investment. Do you have a rough budget?",
  },
  TIMELINE: {
    keywords: [
      "time",
      "long",
      "when",
      "deadline",
      "fast",
      "asap",
      "schedule",
      "duration",
    ],
    response:
      "Timelines vary. A standard website takes about 2-4 weeks. Complex apps might take 2-3 months. When is your deadline?",
  },
  CONTACT: {
    keywords: [
      "contact",
      "email",
      "phone",
      "reach",
      "call",
      "number",
      "address",
    ],
    response:
      "Our team can reach out to you directly. What's the best phone number or email to contact you?",
  },
};

const VoiceAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<AgentState>("IDLE");
  const [audioLevel, setAudioLevel] = useState(0);

  const [messages, setMessages] = useState<
    { role: "agent" | "user"; text: string }[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<LeadData>({
    name: "",
    business_name: "",
    service: "",
    budget: "",
    timeline: "",
    phone: "",
    email: "",
  });

  const sendContactForm = useMutation(api.sendEmails.sendContactForm);
  const askGemini = useAction(api.ai.askExternalAI);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [isAutoListen, setIsAutoListen] = useState(true);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- VOICE OUTPUT (NATIVE WEB SPEECH - OPTIMIZED) ---
  // Using native API allows better control over specific "Anime Male" persona voices
  const speak = useCallback(
    (text: string) => {
      // 1. Update UI
      setState("SPEAKING");
      setMessages((prev) => {
        if (
          prev.length > 0 &&
          prev[prev.length - 1].text === text &&
          prev[prev.length - 1].role === "agent"
        )
          return prev;
        return [...prev, { role: "agent", text }];
      });

      // 2. Speak
      if (!synthRef.current) {
        // Try to re-init if finding voices failed initially
        synthRef.current = window.speechSynthesis;
      }

      const synth = synthRef.current;
      if (!synth) return;

      synth.cancel(); // Stop any previous speech

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = synth.getVoices();

      // Deep Male Voice Priority List (Attractive / Hot / Anime Persona)
      // 1. Google UK English Male (Sophisticated, "Hot" Accent)
      // 2. Microsoft George (UK - Deep)
      // 3. Google US English Male (Deep, Standard)
      const preferredVoice = voices.find(
        (v) =>
          v.name.includes("Google UK English Male") ||
          v.name.includes("Microsoft George") ||
          v.name.includes("Google US English Male") ||
          v.name.includes("Microsoft David")
      );

      if (preferredVoice) utterance.voice = preferredVoice;

      // ANIME MC - ATTRACTIVE / HOT TUNING
      // Deep, Calm, Confident.
      // Pitch < 1.0 = Deeper.
      // Rate ~ 1.0 = Measured/Confident.
      utterance.pitch = 0.85;
      utterance.rate = 1.0;

      // Visualizer Loop
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 80 + 20);
      }, 50);

      utterance.onend = () => {
        clearInterval(interval);
        setAudioLevel(0);
        setState("IDLE");
      };

      utterance.onerror = (e) => {
        console.error("TTS Error", e);
        clearInterval(interval);
        setAudioLevel(0);
        setState("IDLE");
      };

      synth.speak(utterance);
    },
    [isAutoListen, isOpen, setState, setMessages, setAudioLevel]
  );

  // Removed unused fallbackSpeak function to clean up code

  // --- BRAIN: DECISION MACHINE ---
  const processInput = async (rawText: string) => {
    setState("PROCESSING");
    setMessages((prev) => [...prev, { role: "user", text: rawText }]);

    const lower = rawText.toLowerCase();

    // 1. EXTRACT DATA (Rule-Based Slot Filling)
    let newData = { ...data };
    let extracted = false;

    // Name Extraction
    const nameMatch = lower.match(
      /(my name is|i'm|im|call me|this is) ([a-z\s]+)/i
    );
    if (nameMatch && nameMatch[2]) {
      const potentialName = nameMatch[2].trim();
      if (potentialName.split(" ").length < 4) {
        newData.name = potentialName;
        extracted = true;
      }
    }

    // Business Name
    const businessMatch = lower.match(
      /(business is|shop is|company is|called) ([a-z\s]+)/i
    );
    if (businessMatch && businessMatch[2]) {
      newData.business_name = businessMatch[2].trim();
      extracted = true;
    }

    if (lower.match(/(\$|dollar|budget|price|rupees|cost)/)) {
      newData.budget = rawText;
      extracted = true;
    }
    if (lower.match(/(week|month|asap|soon|year|days|tomorrow)/)) {
      newData.timeline = rawText;
      extracted = true;
    }
    if (lower.includes("@") || lower.includes("gmail")) {
      newData.email = rawText.replace("at", "@").replace("dot", ".");
      extracted = true;
    }
    if (lower.match(/\d{9,}/)) {
      newData.phone = rawText.replace(/\D/g, "");
      extracted = true;
    }
    if (
      !data.service &&
      (lower.includes("website") ||
        lower.includes("app") ||
        lower.includes("bot") ||
        lower.includes("seo") ||
        lower.includes("design"))
    ) {
      newData.service = rawText;
      extracted = true;
    }

    setData(newData);

    // 2. STOP COMMAND
    if (
      lower.includes("stop") ||
      lower.includes("bye") ||
      lower.includes("cancel") ||
      lower.includes("goodbye")
    ) {
      setIsAutoListen(false);
      speak("Alright. Have a good one.");
      setTimeout(() => setIsOpen(false), 3000);
      return;
    }

    // 3. SUBMIT COMMAND
    if (
      (lower.includes("send") || lower.includes("submit")) &&
      (newData.email || newData.phone)
    ) {
      setIsAutoListen(false);
      handleSubmission(newData);
      return;
    }

    // 4. RULE-BASED INTENT DETECTION (Fuse.js Knowledge Base)
    // First, check our local "External" AI Modal (Fuse.js)
    const localHit = searchKnowledgeBase(rawText);
    if (localHit && localHit.answer && localHit.intent !== "LEAD_COLLECTION") {
      // If we found a strong match, use it!
      speak(localHit.answer);
      return;
    }

    // 5. EXTERNAL FALLBACK LEAN AI (Gemini)
    // We send the extracted data context to the AI so it knows what we have/don't have.
    try {
      const aiRes = await askGemini({
        query: rawText,
        // Send simple context to save tokens and improve focus
        context: JSON.stringify(newData),
      });

      if (aiRes && aiRes.text) {
        speak(aiRes.text);
      } else {
        speak("I'm listening, go on.");
      }
    } catch (e) {
      console.error(e);
      speak("I didn't quite catch that. Could you repeat?");
    }
  };

  const getNextQuestion = (field: string) => {
    switch (field) {
      case "service":
        return "What service are you looking for?";
      case "name":
        return "May I know your name?";
      case "budget":
        return "Do you have a budget range?";
      case "contact":
        return "What's your phone number or email?";
      default:
        return "";
    }
  };

  const handleSubmission = async (finalData: LeadData) => {
    setState("SUBMITTING");
    speak("Sending your details to the team...");
    try {
      await sendContactForm({
        name: finalData.name || "Guest",
        businessName: finalData.business_name || "Not Provided",
        email: finalData.email || "Not Provided",
        phone: finalData.phone || "Not Provided",
        service: finalData.service || "General Inquiry",
        details: `Captured Budget: ${finalData.budget}. Timeline: ${finalData.timeline} (Voice Agent)`,
        timeline: finalData.timeline || "Flexible",
      });
      speak(
        "All done! Your details are submitted. Our team will contact you soon. Have a great day!"
      );
      setTimeout(() => setIsOpen(false), 4000);
    } catch (e) {
      speak("Sorry, I couldn't send the data.");
    }
  };

  // --- SETUP ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false; // We use loop instead of continuous to avoid "stuck" states
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          console.log("Mic started");
          setState("LISTENING");
        };

        recognition.onresult = (e: any) => {
          setAudioLevel(Math.random() * 100);
          if (e.results[0].isFinal) {
            processInput(e.results[0][0].transcript);
          }
        };

        recognition.onend = () => {
          console.log("Mic ended");
          // If we are NOT speaking and NOT processing, we should probably be listening if auto-listen is on.
          // However, usually we rely on speak() to restart it.
          // If the user said nothing, recognition ends. We might want to restart?
          // For now, let's let silence kill the loop to prevent infinite silence loops,
          // OR we can gently prompt.
          if (state === "LISTENING" && isAutoListen) {
            // It timed out. Let's briefly switch to idle, or restart?
            // Restarting immediately can be annoying if user walked away.
            // Let's set to IDLE. To resume, they tap. Or we can have a "Still there?" prompt.
            setState("IDLE");
          }
        };

        recognition.onerror = (event: any) => {
          console.error("Speech error", event.error);
          setState("IDLE");
        };

        recognitionRef.current = recognition;
      }
    }
  }, [isAutoListen]);
  // removed `state` from dependency to prevent re-creation loops
  // Added `isAutoListen` to re-init if needed, but mostly static.

  const handleStop = () => {
    setIsOpen(false);
    setIsAutoListen(false);
    synthRef.current?.cancel();
    recognitionRef.current?.stop();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-[90vw] md:w-[400px] h-[600px] bg-black/95 backdrop-blur-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/20 relative"
          >
            {/* Background Gradients - SHADOW THEME (Monochrome) */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/20 bg-neutral-900 flex items-center justify-center shadow-inner relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <BrainCircuit className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white tracking-wide leading-none font-manrope">
                    HARISH
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${state === "LISTENING" ? "bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" : "bg-white shadow-[0_0_8px_#ffffff]"}`}
                    />
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                      {state}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleStop}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white text-white hover:text-black transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 relative z-10 no-scrollbar">
              {messages.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40 space-y-6">
                  <div className="w-32 h-32 rounded-full border border-dashed border-white/20 flex items-center justify-center relative animate-spin-slow">
                    <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full" />
                    <Sparkles className="w-8 h-8 text-white/50" />
                  </div>
                  <div>
                    <p className="text-white font-manrope font-semibold text-lg">
                      System Online
                    </p>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest mt-2">
                      Listening for commands
                    </p>
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${m.role === "agent" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] p-5 text-[14px] leading-relaxed backdrop-blur-md border font-medium
                    ${
                      m.role === "agent"
                        ? "bg-neutral-900/50 text-neutral-200 rounded-2xl rounded-tl-sm border-white/10"
                        : "bg-white text-black rounded-2xl rounded-tr-sm border-white shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
                    }
                  `}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Control Center */}
            <div className="p-6 bg-black/80 backdrop-blur-2xl border-t border-white/10 relative z-20">
              {/* Orb Visualizer - LIGHT YAGAMI THEME (Red/White) */}
              <div className="h-24 flex items-center justify-center mb-6 relative">
                <div
                  className={`transition-all duration-500 ${state === "SPEAKING" ? "scale-110" : "scale-100"}`}
                >
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* Outer Glow */}
                    <div
                      className={`absolute inset-0 rounded-full blur-2xl transition-all duration-300
                            ${
                              state === "LISTENING"
                                ? "bg-red-600/30"
                                : state === "SPEAKING"
                                  ? "bg-white/20"
                                  : "bg-neutral-800/20"
                            }`}
                    />

                    {/* Core */}
                    <div
                      className={`w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-300 z-10 relative bg-black shadow-2xl
                            ${
                              state === "LISTENING"
                                ? "border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                                : state === "SPEAKING"
                                  ? "border-white shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                  : "border-neutral-800"
                            }`}
                    >
                      {state === "PROCESSING" ? (
                        <Sparkles className="w-6 h-6 text-white animate-spin-slow" />
                      ) : state === "LISTENING" ? (
                        <div className="w-16 h-1 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]" />
                      ) : (
                        <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (state === "LISTENING") {
                    recognitionRef.current?.stop();
                    setIsAutoListen(false);
                    setState("IDLE");
                  } else {
                    setIsAutoListen(true);
                    try {
                      recognitionRef.current?.start();
                    } catch (e) {}
                  }
                }}
                className={`w-full py-5 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden group border
                  ${
                    state === "LISTENING"
                      ? "bg-red-600 text-white border-red-500 hover:bg-red-700"
                      : "bg-white text-black border-white hover:bg-neutral-200"
                  }
                `}
              >
                {state === "LISTENING" ? "TERMINATE" : "INITIATE"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(true);
            setIsAutoListen(true);
            setTimeout(
              () => speak("Hi, I’m Harish. Welcome to Shadow Forge."),
              600
            );
          }}
          className="group relative flex items-center gap-4 pl-6 pr-8 py-4 bg-black text-white rounded-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-white/20 hover:border-white/40 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <BrainCircuit className="w-5 h-5 text-black" />
          </div>
          <div className="text-left">
            <span className="block text-[10px] text-neutral-400 font-bold uppercase tracking-widest mb-0.5">
              Assistant
            </span>
            <span className="block font-bold text-sm tracking-wide font-manrope">
              Harish
            </span>
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default VoiceAgent;
