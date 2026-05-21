"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Enterprise Meeting Summarizer",
    category: "AI & ML",
    url: "https://github.com/JARVIS20240/Enterprise_meeting_summarizer",
    color: "bg-neutral-200",
  },
  {
    id: 2,
    title: "Langchain RAG System",
    category: "AI & ML",
    url: "https://github.com/JARVIS20240/Langchain-Rag_System",
    color: "bg-neutral-300",
  },
  {
    id: 3,
    title: "CriticalInsight Engine Agent",
    category: "AI & ML",
    url: "https://github.com/JARVIS20240/CriticalInsight-Engine_Agent",
    color: "bg-neutral-200",
  },
  {
    id: 4,
    title: "Embriago Coffee",
    category: "Web Development",
    url: "https://github.com/JARVIS20240/Embriago-Coffee",
    color: "bg-neutral-300",
  },
  {
    id: 5,
    title: "DakaDaka",
    category: "Web Development",
    url: "https://github.com/JARVIS20240/DakaDaka",
    color: "bg-neutral-200",
  },
  {
    id: 6,
    title: "Prisma Web Studio",
    category: "Web Development",
    url: "https://github.com/JARVIS20240/prisma-web-studio",
    color: "bg-neutral-300",
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              Featured Work
            </h2>
            <p className="text-gray-500 max-w-md text-lg">
              A collection of AI systems and modern web development concepts.
            </p>
          </div>
          <div className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            [ Portfolio ]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: index % 2 === 0 ? 0 : 0.2,
                ease: [0.16, 1, 0.3, 1] as const
              }}
              className="group flex flex-col gap-4"
            >
              <Link href={project.url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-3xl bg-white p-4">
                <div className={`w-full aspect-[4/3] rounded-2xl ${project.color} flex items-center justify-center relative overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]`}>
                  {/* Placeholder for project image/visual */}
                  <span className="text-black/20 font-bold text-2xl tracking-widest uppercase">{project.category.split(' ')[0]}</span>

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

                  <div className="absolute top-4 right-4 bg-white rounded-full p-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <ArrowUpRight size={20} className="text-black" />
                  </div>
                </div>
              </Link>

              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight mb-1 group-hover:text-gray-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 font-medium">
                    {project.category}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
