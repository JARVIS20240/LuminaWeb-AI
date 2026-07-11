"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

const projects = [
  {
    id: 2,
    title: "Embriago Coffee",
    category: "Web Development",
    url: "https://embriago-coffee.vercel.app/",
    image: "/images/embriago_coffee.png",
    tags: ["React", "Custom CSS", "Modern Web"]
  },
  {
    id: 3,
    title: "DakaDaka",
    category: "Web Development",
    url: "https://daka-daka.vercel.app/",
    image: "/images/Dakadaka_restorent.jpeg",
    tags: ["Minimalist UI", "Animations", "Creative App"]
  },
  {
    id: 4,
    title: "Enterprise Meeting Summarizer",
    category: "AI & ML Integration",
    url: "https://github.com/JARVIS20240/Enterprise_meeting_summarizer",
    image: "/images/meeting_summarizer.jpeg",
    tags: ["Speech AI", "GPT Models", "Analytics"]
  },
  {
    id: 5,
    title: "Langchain RAG System",
    category: "AI & ML Integration",
    url: "https://github.com/JARVIS20240/Langchain-Rag_System",
    image: "/images/langchain_rag.jpeg",
    tags: ["Vector DB", "RAG", "Langchain"]
  },
  {
    id: 6,
    title: "CriticalInsight Engine Agent",
    category: "AI & ML Integration",
    url: "https://github.com/JARVIS20240/CriticalInsight-Engine_Agent",
    image: "/images/critical_insight (2).jpeg",
    tags: ["AI Agent", "Decision Tree", "Data Security"]
  }
];

export default function Projects() {
  // Enforce top-alignment on mount to prevent browser scroll-memory bugs
  useEffect(() => {
    setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 100);
  }, []);

  return (
    <section id="projects" className="min-h-[100dvh] scroll-mt-24 py-12 md:py-20 lg:py-32 px-6 lg:px-12 bg-background relative overflow-hidden">

      {/* Radial glow background */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[50vw] h-[50vw] bg-neutral-300/10 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Block */}
        <div className="mb-12 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold uppercase tracking-widest text-foreground mb-4"
            >
              [ Our Work ]
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-foreground"
            >
              Featured Collaborations & <br />
              <span className="text-neutral-500 font-medium">Digital Masterpieces.</span>
            </motion.h2>
            <p className="text-muted max-w-lg text-lg leading-relaxed">
              This is the kind of work we live for — branding, premium websites, and AI systems that don’t just look spectacular, but deliver massive results.
            </p>
          </div>

          <div className="text-xs font-bold uppercase tracking-widest text-muted">
            [ Portfolio Projects ]
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{
                duration: 0.6,
                delay: 0.1 + (index * 0.08),
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group flex flex-col gap-6"
            >
              {/* Image Container Card */}
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-3xl bg-card border border-border p-3 hover:border-foreground/20 transition-colors duration-500 relative shadow-sm"
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                    priority={index < 2}
                  />

                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />

                  {/* Hover Floating Launch Badge */}
                  <div className="absolute top-4 right-4 bg-foreground text-background rounded-full p-4 opacity-0 translate-y-3 scale-75 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-500 ease-out z-20 shadow-xl">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </Link>

              {/* Description Block */}
              <div className="flex justify-between items-start px-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                      {project.category}
                    </span>
                    <span className="text-neutral-300">•</span>
                    <div className="flex gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-medium tracking-wider text-muted uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-neutral-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
