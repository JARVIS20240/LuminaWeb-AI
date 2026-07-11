"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";

const workflowSteps = [
  {
    step: "01",
    name: "Discovery",
    description: "Deep understanding of your business, forming the foundation for an impactful and tailored digital strategy.",
    icon: Search
  },
  {
    step: "02",
    name: "Design",
    description: "Crafting innovative concepts and highly custom, user-focused designs that effectively speak to your audience.",
    icon: PenTool
  },
  {
    step: "03",
    name: "Development",
    description: "Turning ideas into clean, functional code built with precision, delivered on time, and fully optimized for speed.",
    icon: Code
  },
  {
    step: "04",
    name: "Launch",
    description: "Deploying your completed project, monitoring live analytics performance, and refining details for ongoing success.",
    icon: Rocket
  }
];

export default function Workflow() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="workflow" className="scroll-mt-24 py-12 md:py-20 lg:py-32 px-6 lg:px-12 bg-background relative overflow-hidden">

      {/* Background soft lighting */}
      <div className="absolute bottom-[10%] left-[50%] -translate-x-1/2 w-[40vw] h-[40vw] bg-neutral-300/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12 lg:gap-16">

        {/* Header Group */}
        <div className="flex flex-col text-left items-start max-w-3xl">
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-foreground text-left mb-6 md:mb-8"
          >
            [ 03 Workflow ]
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6"
          >
            <span className="text-[#6b6b6b]">No guesswork, just</span> <br />
            <span className="text-[#6b6b6b]">a clear path from</span> <br />
            <span className="text-[#0a0a0a]">ideas → results</span>
            <span className="text-[#6b6b6b]">.</span>
          </motion.h2>
          <p className="text-muted text-lg leading-relaxed max-w-md">
            Our systematic, client-tested approach ensures transparency, absolute precision, and remarkable results.
          </p>
        </div>

        {/* Workflow Steps 4-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
        >
          {workflowSteps.map((step) => {
            return (
              <motion.div
                key={step.step}
                variants={cardVariants}
                className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:border-foreground/30 transition-all duration-300 flex flex-col h-full"
              >
                <div className="shrink-0 w-12 md:w-16">
                  <span className="text-4xl md:text-5xl font-black text-muted/30 group-hover:text-foreground transition-colors duration-500">
                    {step.step}
                  </span>
                </div>
                <div className="mt-8 lg:mt-10">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-4">
                    {step.name}
                  </h3>
                  <p className="text-muted leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
