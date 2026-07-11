"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.15,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.15,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const tagVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 200, damping: 15 },
    },
  };

  const tags = [
    "Brand Strategy & Identity",
    "Website Development",
    "SEO Marketing",
  ];

  const stats = [
    { value: "3 Weeks", label: "Average Launch" },
    { value: "24/7", label: "AI Integration" },
    { value: "1 : 1", label: "Direct Communication" },
  ];

  return (
    <section id="home" className="scroll-mt-24 min-h-screen flex flex-col justify-center px-6 lg:px-12 max-w-7xl mx-auto py-12 md:py-20 lg:py-32 relative">

      {/* Glow Effects */}
      <div aria-hidden="true" className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-neutral-300/20 rounded-full filter blur-[120px] pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] bg-black/2 rounded-full filter blur-[100px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
      >

        {/* Left Column: Heading and Taglines */}
        <div className="lg:col-span-8 flex flex-col items-start">

          <motion.div
            variants={headingVariants}
            className="inline-flex items-center gap-2 border border-border bg-card backdrop-blur-md px-4 py-2 rounded-full mb-8"
          >
            <Sparkles size={14} className="text-foreground" />
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              Digital Identity & AI Integration
            </span>
          </motion.div>

          <motion.h1
            variants={headingVariants}
            className="text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-8 text-foreground"
          >
            Elevating <br />
            <span className="text-stroke">Digital</span> <br />
            Presence.
          </motion.h1>

          <motion.p
            variants={headingVariants}
            className="max-w-xl text-lg md:text-xl text-muted font-medium leading-relaxed mb-12"
          >
            We craft memorable brands, design and develop stunning websites, optimize your presence through strategic SEO, and amplify your impact with results-driven digital marketing.
          </motion.p>

          <motion.div
            variants={headingVariants}
            className="flex flex-wrap gap-3 mb-12"
          >
            {tags.map((tag, index) => (
              <motion.span
                key={tag}
                variants={tagVariants}
                className="text-xs font-semibold uppercase tracking-wider border border-border bg-card/50 text-muted px-4 py-2.5 rounded-full"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <motion.div variants={headingVariants}>
            <Link
              href="/contact"
              className="group flex items-center gap-3 bg-foreground text-background px-8 py-5 rounded-full text-base font-bold transition-all duration-300 hover:bg-neutral-800"
            >
              <span>Ready to Start? Get in Touch</span>
              <ArrowDownRight className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" size={18} />
            </Link>
          </motion.div>

        </div>

        {/* Right Column: Stats Cards Grid */}
        <div className="lg:col-span-4 grid grid-cols-1 gap-6 w-full">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="group glass-panel glass-panel-hover p-6 rounded-3xl relative overflow-hidden flex flex-col justify-center h-[174px] w-[280px] border border-border bg-card shadow-sm"
            >
              <span className="absolute top-4 right-6 text-4xl font-bold transition-colors duration-300 text-[#d1d1d1] group-hover:text-[#5c5c5b] dark:group-hover:text-[#5c5c5b] select-none pointer-events-none">
                {`0${index + 1}`}
              </span>

              <div className="pr-12">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-foreground">
                  {stat.value}
                </h3>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
