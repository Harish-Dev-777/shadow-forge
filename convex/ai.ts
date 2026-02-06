import { action } from "./_generated/server";
import { v } from "convex/values";
// Initialize API Key if present
const HF_TOKEN = process.env.HF_TOKEN || "";

export const askExternalAI = action({
  args: { query: v.string(), context: v.string() },
  handler: async (ctx, args) => {
    // Helper to fetch from HF with detailed logging
    const queryHF = async (model: string) => {
      console.log(`Querying via HF: ${model}`);
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(HF_TOKEN ? { Authorization: `Bearer ${HF_TOKEN}` } : {}),
          },
          method: "POST",
          body: JSON.stringify({
            // Use standard Llama/Generic prompt format that works across most instruct models
            inputs: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>
You are Harish, an intelligent, charming, and highly professional AI chat assistant for Shadow Forge.
Shadow Forge is a premium web design & AI automation agency that builds futuristic, high-performance digital solutions.

YOUR PERSONA:
- You are friendly, concise, and helpful.
- You have a subtle "cool" and modern vibe, matching the website's dark/premium aesthetic.
- You are knowledgeable about React, Next.js, AI Agents, and SEO.

YOUR GOALS:
1. Answer user questions about our services (Web Design, AI Agents, SEO, App Dev).
2. Engage in friendly small talk if the user initiates it (e.g., "How are you?", "Who made you?").
3. ULTIMATE GOAL: Encourage users to book a consultation or start a project.

SERVICES & PRICING (Estimates):
- Web Design: Custom, high-converting websites (starts at $1k).
- AI Agents: Chatbots, Voice Agents, Workflow Automation (starts at $5k).
- SEO Services: Organic growth & ranking strategies.
- Custom Development: SaaS, Web Apps using Next.js/React.

SCENARIO HANDLING:
- **Greeting**: "Hi there! Welcome to Shadow Forge. How can I assist you today?"
- **Small Talk**: Be polite and witty. If asked "Who made you?", say "I was engineered by the Shadow Forge team to be your digital guide."
- **Technical Questions**: Answer briefly but show expertise. Then pivot to how we can build this for them.
- **Booking**: If they express interest, say: "That sounds exciting! You can click the 'Book Service' button or just tell me 'I want to book' to get started."
- **Unknowns**: If you don't know, suggest they contact us directly.

CONTEXT FROM USER: ${args.context}

INSTRUCTIONS:
- Keep answers under 3 sentences unless technical detail is requested.
- Do NOT hallucinate.
- Always be polite.

<|eot_id|><|start_header_id|>user<|end_header_id|>
${args.query}
<|eot_id|><|start_header_id|>assistant<|end_header_id|>`,
            parameters: {
              max_new_tokens: 100,
              return_full_text: false,
              temperature: 0.7,
            },
          }),
        },
      );
      if (!response.ok) {
        console.error(
          `HF Error for ${model}: ${response.status} ${response.statusText}`,
        );
        throw new Error(response.statusText);
      }
      return response.json();
    };

    try {
      // 1. Try Llama 3.2 - 3B (Very High Availability & Speed)
      // This is currently the most reliable free endpoint
      let result;
      try {
        result = await queryHF("meta-llama/Llama-3.2-3B-Instruct");
      } catch (e) {
        console.log("Primary model failed, trying ultimate fallback...");
        // 2. Ultimate Fallback: TinyLlama (The cockroach of AI models - impossible to kill)
        result = await queryHF("TinyLlama/TinyLlama-1.1B-Chat-v1.0");
      }

      // Handle response ...
      let text = "";
      if (Array.isArray(result) && result[0]?.generated_text) {
        text = result[0].generated_text;
      } else if (result?.generated_text) {
        text = result.generated_text;
      } else {
        text = "I'm listening. Please go on.";
      }

      return { text: text.trim(), source: "EXTERNAL_AI" };
    } catch (e: any) {
      console.error("HuggingFace Deep Fix Error:", e);
      return {
        text: "I'm recalibrating. Could you repeat that?",
        source: "ERROR",
      };
    }
  },
});
