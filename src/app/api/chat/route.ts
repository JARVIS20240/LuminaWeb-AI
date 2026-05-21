import { NextResponse } from 'next/server';

// Extremely basic in-memory store for rate limiting (Note: not suitable for serverless edge scaling, but works for basic portfolio)
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

const SYSTEM_PROMPT = `You are LuminaWeb AI, the official AI representative for a freelance web developer's portfolio.
The developer specializes in Custom Web Development, AI Chatbot Integration, UI/UX Design, and SEO Optimization.
Their work includes AI systems like Enterprise Meeting Summarizer, Langchain RAG System, and CriticalInsight Engine Agent, as well as web projects like Embriago Coffee, DakaDaka, and Prisma Web Studio.
Your tone is professional, minimalist, helpful, and concise (reflecting a premium dark/white off-brand vibe).
Keep your responses short. If you don't know the answer, direct the user to the contact section.`;

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const now = Date.now();

    const userRecord = rateLimitStore.get(ip);
    if (userRecord) {
      if (now - userRecord.timestamp < RATE_LIMIT_WINDOW) {
        if (userRecord.count >= MAX_REQUESTS) {
          return NextResponse.json({
            error: "Too many requests. Please try again in a minute."
          }, { status: 429 });
        }
        userRecord.count += 1;
      } else {
        rateLimitStore.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimitStore.set(ip, { count: 1, timestamp: now });
    }

    // 2. Parse User Input
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format." }, { status: 400 });
    }

    // Prepare messages payload
    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages
    ];

    // 3. Provider Call (using OpenRouter or Fallback)
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

    let reply = "";

    if (OPENROUTER_API_KEY) {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",
          messages: apiMessages,
        })
      });

      if (response.ok) {
        const data = await response.json();
        reply = data.choices[0].message.content;
      } else {
        throw new Error("OpenRouter API Failed");
      }
    } else if (HUGGINGFACE_API_KEY) {
      // Fallback to hugging face if OpenRouter isn't set
      const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: apiMessages.map(m => `${m.role}: ${m.content}`).join('\n') + '\nassistant:',
          parameters: { max_new_tokens: 150 }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data[0].generated_text as string;
        reply = text.split('assistant:').pop()?.trim() || "";
      } else {
        throw new Error("HuggingFace API Failed");
      }
    } else {
      // Offline fallback for demo purposes if no API key is provided
      reply = "Hello! I am LuminaWeb AI. I noticed no API key is currently configured for me to connect to my brain. However, you can still view my creator's amazing web and AI projects above!";
    }

    return NextResponse.json({ role: 'assistant', content: reply });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
