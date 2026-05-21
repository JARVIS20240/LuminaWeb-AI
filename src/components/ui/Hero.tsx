"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section className="min-h-[85vh] flex flex-col justify-center px-6 lg:px-12 max-w-7xl mx-auto pt-20">
      <div className="max-w-4xl">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="uppercase tracking-widest text-sm font-semibold mb-6 text-gray-500"
        >
          [ Digital Identity & AI Integration ]
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8"
        >
          Elevating <br />
          <span className="text-gray-400">Digital</span> <br />
          Presence.
        </motion.h1>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-12"
        >
          <p className="max-w-sm text-lg text-gray-600 font-medium leading-relaxed">
            I craft stunning websites with advanced motion effects and seamless AI chatbot integrations to help your business stand out.
          </p>
          <Link
            href="#projects"
            className="group flex items-center gap-2 bg-black text-white px-6 py-4 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            View Projects
            <ArrowDownRight className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
