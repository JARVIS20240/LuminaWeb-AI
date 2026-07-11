import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { InferenceClient } from '@huggingface/inference';
import { OpenRouter } from '@openrouter/sdk';

// Extremely basic in-memory store for rate limiting (Note: not suitable for serverless edge scaling, but works for basic portfolio)
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

const SYSTEM_PROMPT = `You are LuminaWeb AI, the official AI representative for LuminaWeb AI's freelance portfolio.
You are helping customers understand our services, workflow, and portfolio.

SERVICES OFFERED:
1. Brand Strategy & Identity: Strategic identities that communicate your story clearly.
2. Website Development: User-centric, responsive websites designed for smooth navigation and optimized conversion.
3. SEO Marketing: Targeted, data-driven SEO strategies that boost visibility and traffic.

WORKFLOW:
1. Discovery: Deep understanding of the business.
2. Design: Crafting innovative concepts.
3. Development: Clean, functional code built with precision.
4. Launch: Deploying the project and monitoring live analytics.

FEATURED PROJECTS:
- Embriago Coffee (React, Custom CSS)
- DakaDaka (Minimalist UI, Animations)
- Enterprise Meeting Summarizer (Speech AI, GPT Models)
- Langchain RAG System (Vector DB, RAG)
- CriticalInsight Engine Agent (AI Agent, Data Security)

CONTACT & PAYMENT INFORMATION:
- Contact Person: Karan Mistry
- Primary Email: luminawebai@gmail.com
- Secondary Email: karan.mistry.dev@gmail.com
- For project inquiries, encourage users to visit the /contact page.

INSTRUCTIONS:
Your tone is professional, minimalist, helpful, and concise.
Answer questions confidently using the provided information. Keep responses relatively short.
If anyone asks about payment, billing, pricing, custom quotes, or how to connect/contact, you MUST provide the contact details:
  - Contact Person: Karan Mistry
  - Email: luminawebai@gmail.com or karan.mistry.dev@gmail.com
IMPORTANT: Output your response in plain text ONLY. Do NOT use any Markdown formatting, bolding, or asterisks (e.g. do not use **bold**). Use standard numbering or hyphens for lists.`;

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

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN;
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    let reply = "";
    let apiSuccess = false;
    let errors: string[] = [];

    // --- PRIORITY 1: GitHub Models API (OpenAI SDK) ---
    if (GITHUB_TOKEN) {
      try {
        console.log("Attempting Priority 1: GitHub Models API...");
        const client = new OpenAI({
          baseURL: "https://models.github.ai/inference",
          apiKey: GITHUB_TOKEN,
        });

        const response = await client.chat.completions.create({
          messages: apiMessages.map(m => ({
            role: m.role as "system" | "user" | "assistant",
            content: m.content
          })),
          model: "openai/gpt-4o-mini",
          temperature: 0.7,
          max_tokens: 1000,
        });

        const content = response.choices[0]?.message?.content;
        if (content) {
          reply = content;
          apiSuccess = true;
          console.log("Priority 1 (GitHub Models) Succeeded!");
        } else {
          throw new Error("Empty response content from GitHub Models API");
        }
      } catch (err: any) {
        const errMsg = err.message || JSON.stringify(err);
        errors.push(`GitHub Models Error: ${errMsg}`);
        console.warn("Priority 1 (GitHub Models) Failed:", errMsg);
      }
    } else {
      console.log("GitHub Models skipped (GITHUB_TOKEN not configured).");
    }

    // --- PRIORITY 2: Hugging Face API (InferenceClient) ---
    if (!apiSuccess && HUGGINGFACE_API_KEY) {
      try {
        console.log("Attempting Priority 2: Hugging Face API...");
        const client = new InferenceClient(HUGGINGFACE_API_KEY);

        // Convert messages to raw prompt format for textGeneration
        const promptInput = apiMessages.map(m => `${m.role}: ${m.content}`).join('\n') + '\nassistant:';

        const output = await client.textGeneration({
          model: "meta-llama/Meta-Llama-3-8B:fastest",
          inputs: promptInput,
          provider: "auto",
          parameters: {
            max_new_tokens: 250,
            temperature: 0.7,
          }
        });

        let generated = output.generated_text;
        if (generated) {
          // If the model output includes the prompt prefix, strip it
          if (generated.includes('assistant:')) {
            generated = generated.split('assistant:').pop()?.trim() || "";
          }
          reply = generated;
          apiSuccess = true;
          console.log("Priority 2 (Hugging Face) Succeeded!");
        } else {
          throw new Error("Empty response from Hugging Face");
        }
      } catch (err: any) {
        const errMsg = err.message || JSON.stringify(err);
        errors.push(`Hugging Face Error: ${errMsg}`);
        console.warn("Priority 2 (Hugging Face) Failed:", errMsg);
      }
    } else if (!apiSuccess) {
      console.log("Hugging Face skipped (HUGGINGFACE_API_KEY not configured).");
    }

    // --- PRIORITY 3: OpenRouter API (OpenRouter SDK) ---
    if (!apiSuccess && OPENROUTER_API_KEY) {
      try {
        console.log("Attempting Priority 3: OpenRouter API...");
        const openrouter = new OpenRouter({
          apiKey: OPENROUTER_API_KEY
        });

        const stream = await openrouter.chat.send({
          chatRequest: {
            model: "meta-llama/llama-3.2-3b-instruct:free",
            messages: apiMessages.map(m => ({
              role: m.role as any,
              content: m.content
            })),
            stream: true
          }
        });

        let accumulated = "";
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            accumulated += content;
          }
        }

        if (accumulated.trim()) {
          reply = accumulated;
          apiSuccess = true;
          console.log("Priority 3 (OpenRouter) Succeeded!");
        } else {
          throw new Error("Empty response from OpenRouter stream");
        }
      } catch (err: any) {
        const errMsg = err.message || JSON.stringify(err);
        errors.push(`OpenRouter Error: ${errMsg}`);
        console.warn("Priority 3 (OpenRouter) Failed:", errMsg);
      }
    } else if (!apiSuccess) {
      console.log("OpenRouter skipped (OPENROUTER_API_KEY not configured).");
    }

    // --- FALLBACK: Offline response if all providers failed ---
    if (!apiSuccess) {
      const debugKeys = `[Debug] Status: GitHub=${!!GITHUB_TOKEN}, HF=${!!HUGGINGFACE_API_KEY}, OR=${!!OPENROUTER_API_KEY}. Errors: ${errors.join(' | ')}`;
      reply = `Hello! I am LuminaWeb AI. I am currently experiencing connection issues and cannot access my brain. However, you can still view my creator's amazing web and AI projects above or click 'Get in Touch'! \n\n${debugKeys}`;
    }

    return NextResponse.json({ role: 'assistant', content: reply });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred while processing your request." }, 
      { status: 500 }
    );
  }
}
