import Fuse from "fuse.js";

export const KNOWLEDGE_BASE_DATA = [
  // --- IDENTIFICATION ---
  {
    category: "Identity",
    keywords: [
      "who are you",
      "what is your name",
      "harish",
      "voice assistant",
      "who made you",
      "are you real",
    ],
    answer:
      "I'm Harish, the AI Chat Assistant for Shadow Forge. I was engineered to help you navigate our services and start your next project.",
    intent: "FAQ",
  },

  // --- SERVICES: GENERAL ---
  {
    category: "Services",
    keywords: [
      "service",
      "services",
      "offer",
      "do",
      "build",
      "create",
      "what can you do",
      "capabilities",
      "help me",
    ],
    answer:
      "We offer a full suite of digital services: Premium Web Design, Custom AI Agents, Next.js Applications, and SEO. What are you looking to build?",
    intent: "SERVICE_QUERY",
  },

  // --- SERVICES: WEB DESIGN ---
  {
    category: "Services",
    keywords: [
      "web design",
      "website",
      "design",
      "ui",
      "ux",
      "landing page",
      "redesign",
      "corporate site",
      "portfolio",
    ],
    answer:
      "We create award-winning, high-performance websites. Whether you need a high-converting landing page or a full corporate redesign, we ensure it looks premium and loads fast.",
    intent: "SERVICE_QUERY",
  },
  {
    category: "Services",
    keywords: [
      "ecommerce",
      "shop",
      "store",
      "online store",
      "shopify",
      "sell online",
      "cart",
    ],
    answer:
      "Yes, we build powerful e-commerce platforms using Next.js or Shopify, complete with secure payment processing and inventory management.",
    intent: "SERVICE_QUERY",
  },
  {
    category: "Services",
    keywords: ["maintenance", "support", "update", "fix", "hosting", "manage"],
    answer:
      "We offer ongoing maintenance packages to keep your site secure, fast, and up-to-date after launch.",
    intent: "SERVICE_QUERY",
  },

  // --- SERVICES: APP DEV ---
  {
    category: "Services",
    keywords: [
      "development",
      "coding",
      "react",
      "nextjs",
      "app",
      "web app",
      "saas",
      "software",
      "mobile app",
      "platform",
    ],
    answer:
      "We specialize in building scalable SaaS platforms and web applications using the latest tech stack: Next.js, React, Tailwind, and Supabase/Convex.",
    intent: "SERVICE_QUERY",
  },
  {
    category: "Services",
    keywords: ["mobile", "ios", "android", "phone app", "native"],
    answer:
      "We build responsive web apps that work perfectly on mobile. For native mobile apps (iOS/Android), we use React Native. Detailed discussion is recommended.",
    intent: "SERVICE_QUERY",
  },

  // --- SERVICES: AI & SEO ---
  {
    category: "Services",
    keywords: [
      "ai",
      "bot",
      "chatbot",
      "agent",
      "automation",
      "voice",
      "intelligence",
      "openai",
      "llm",
      "gpt",
    ],
    answer:
      "We build custom AI solutions: Customer Support Chatbots (like me!), Voice Agents for lead qualifying, and internal workflow automation tools.",
    intent: "SERVICE_QUERY",
  },
  {
    category: "Services",
    keywords: [
      "seo",
      "ranking",
      "google",
      "search",
      "traffic",
      "marketing",
      "content",
    ],
    answer:
      "Our SEO strategies are data-driven. We optimize your site structure, content, and performance to rank higher on Google and drive organic leads.",
    intent: "SERVICE_QUERY",
  },

  // --- PRICING: GENERAL ---
  {
    category: "Pricing",
    keywords: [
      "price",
      "prices",
      "cost",
      "costs",
      "how much",
      "budget",
      "rates",
      "fee",
      "quote",
      "pricing",
      "packages",
    ],
    answer:
      "Our pricing is tailored to value. \n- Basic Websites: Start at $1,000\n- Custom Web Apps: Start at $5,000\n- AI Solutions: Start at $5,000\nDo you have a specific budget in mind?",
    intent: "PRICING_QUERY",
  },
  {
    category: "Pricing",
    keywords: [
      "expensive",
      "cheap",
      "affordable",
      "discount",
      "negotiable",
      "too much",
    ],
    answer:
      "We focus on premium quality and ROI. While we aren't the cheapest, we deliver the highest value. We can often tailor a scope to fit a realistic budget.",
    intent: "PRICING_QUERY",
  },
  {
    category: "Pricing",
    keywords: ["hourly", "rate", "hour", "pay per hour"],
    answer:
      "We typically work on a fixed-project basis so you know the total cost upfront. For ongoing work, our retainer starts at $100/hr.",
    intent: "PRICING_QUERY",
  },
  {
    category: "Pricing",
    keywords: ["payment", "payment plan", "installments", "upfront", "deposit"],
    answer:
      "standard terms are 50% upfront to start, and 50% upon completion. We can discuss milestone-based payments for larger projects.",
    intent: "PRICING_QUERY",
  },

  // --- TIMELINE ---
  {
    category: "Timeline",
    keywords: [
      "time",
      "long",
      "duration",
      "timeline",
      "when",
      "deadline",
      "how fast",
      "turnaround",
    ],
    answer:
      "Typical Timelines:\n- Landing Pages: 1-2 weeks\n- Full Websites: 2-4 weeks\n- Custom Apps/AI: 4-12 weeks\nThis varies based on complexity.",
    intent: "FAQ",
  },
  {
    category: "Timeline",
    keywords: [
      "rush",
      "asap",
      "emergency",
      "hurry",
      "urgent",
      "quickly",
      "fast",
    ],
    answer:
      "We can sometimes accommodate rush projects directly depending on our schedule. A rush fee may apply.",
    intent: "LEAD_COLLECTION",
  },
  {
    category: "Timeline",
    keywords: [
      "start",
      "begin",
      "kickoff",
      "availability",
      "when can you start",
    ],
    answer:
      "We usually book 2 weeks in advance. If you're ready, we can secure your slot today. Shall we request a consultation?",
    intent: "LEAD_COLLECTION",
  },

  // --- LEAD COLLECTION TRIGGERS ---
  {
    category: "Lead",
    keywords: [
      "contact",
      "email",
      "phone",
      "reach",
      "call",
      "hire",
      "start project",
      "book",
      "meeting",
      "consultation",
    ],
    answer:
      "Excellent. Let's get the ball rolling. I'll need a few details to set up your consultation.",
    intent: "LEAD_COLLECTION",
  },

  // --- SOCIAL / GENERAL ---
  {
    category: "General",
    keywords: [
      "hello",
      "hi",
      "hey",
      "greetings",
      "good morning",
      "good evening",
      "yo",
    ],
    answer:
      "Hello! Welcome to Shadow Forge. What are you looking to build today?",
    intent: "GENERAL_QUERY",
  },
  {
    category: "Social",
    keywords: [
      "how are you",
      "how are you doing",
      "what's up",
      "how is it going",
    ],
    answer:
      "I'm operating at peak performance! Ready to help you elevate your business.",
    intent: "GENERAL_QUERY",
  },
  {
    category: "Social",
    keywords: [
      "thank you",
      "thanks",
      "thx",
      "appreciate fit",
      "cool",
      "awesome",
      "great",
      "good job",
    ],
    answer: "Glad I could help! Is there anything else you'd like to know?",
    intent: "GENERAL_QUERY",
  },
  {
    category: "Social",
    keywords: ["bye", "goodbye", "see ya", "cya", "leave", "exit"],
    answer: "Goodbye! We look forward to working with you.",
    intent: "GENERAL_QUERY",
  },
];

const options = {
  includeScore: true,
  // Search in 'keywords' and also 'category' to broad match
  keys: ["keywords", "category"],
  threshold: 0.4, // 0.0 is perfect match, 1.0 is match anything
};

const fuse = new Fuse(KNOWLEDGE_BASE_DATA, options);

export const searchKnowledgeBase = (query: string) => {
  const results = fuse.search(query);
  if (results.length > 0) {
    return results[0].item;
  }
  return null;
};
