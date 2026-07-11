"use client";

import { motion } from "framer-motion";
import { UserCheck, Sparkles, Terminal, ShieldAlert } from "lucide-react";

const teamMembers = [
  {
    name: "Steve",
    role: "Creative Director",
    desc: "Overseeing all visual brand identities, digital strategy, and conceptual design systems.",
    icon: Sparkles
  },
  {
    name: "Sarah",
    role: "Lead Designer",
    desc: "Crafting modern user interfaces, complex animation motion flows, and luxury graphics.",
    icon: UserCheck
  },
  {
    name: "Max",
    role: "Lead Developer",
    desc: "Writing blazing-fast clean frontend code and structuring reliable custom system layouts.",
    icon: Terminal
  },
  {
    name: "Elena",
    role: "Project Manager",
    desc: "Managing milestones, timeline execution, and client communication for seamless delivery.",
    icon: ShieldAlert
  }
];

const teamStats = [
  { label: "Developers", count: 4 },
  { label: "Designers", count: 2 },
  { label: "Project Manager", count: 1 },
  { label: "Creative Lead", count: 1 }
];

export default function Team() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="about" className="scroll-mt-24 py-12 md:py-20 lg:py-32 px-6 lg:px-12 bg-background relative overflow-hidden">
      
      <div className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] bg-neutral-300/10 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Vertical Stack */}
        <div className="flex flex-col gap-10 w-full items-start">
          
          {/* Top Context Block */}
          <div className="flex flex-col w-full">
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-sm font-bold uppercase tracking-widest text-foreground mb-4"
              >
                [ 04 About ]
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 text-foreground leading-tight"
              >
                <span className="text-[#6b6b6b]">Elite engineering.</span> <br />
                Strict privacy.
              </motion.h2>
              <p className="text-muted text-base md:text-lg leading-relaxed mb-12 max-w-2xl">
                We aren't a bloated marketing agency. We are a specialized team dedicated to building custom, high-performance web architecture from the ground up.
              </p>
            </div>


          </div>

          {/* Manifesto Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex w-full"
          >
            <motion.div
              variants={itemVariants}
              className="glass-panel glass-panel-hover p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[220px] w-full"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 rounded-2xl bg-foreground/5 border border-border text-foreground">
                  <Terminal size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-foreground">[ OUR DIRECTIVE ]</span>
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                  Professional Engineering Efforts
                </h3>
                <p className="text-muted text-lg md:text-xl leading-relaxed">
                  We bridge the gap between complex AI and user-centric design. By prioritizing advanced machine learning integrations, robust data privacy, and modern frameworks, we architect digital solutions that are built to scale and engineered to perform.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
