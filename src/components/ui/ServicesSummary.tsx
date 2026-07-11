"use client";

import { motion } from "framer-motion";
import { Globe, Search, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Brand Strategy & Identity",
    description: "Strategic identities that communicate your story clearly, setting your brand apart and building authentic connections with your audience."
  },
  {
    title: "Website Development",
    description: "User-centric, responsive websites designed for smooth navigation, compelling visuals, and optimized conversion."
  },
  {
    title: "Seo Marketing",
    description: "Targeted, data-driven SEO strategies that boost visibility, attract quality traffic, and position your business ahead of competitors."
  }
];

export default function ServicesSummary() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="services" className="scroll-mt-24 py-12 md:py-20 lg:py-32 px-6 lg:px-12 bg-background relative overflow-hidden">
      
      {/* Background glow overlay */}
      <div className="absolute top-[50%] right-[10%] w-[35vw] h-[35vw] bg-neutral-300/10 rounded-full filter blur-[100px] pointer-events-none" />
 
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="mb-12 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold uppercase tracking-widest text-foreground mb-4"
            >
              [ 01 Services ]
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-foreground"
            >
              <span className="text-[#6B6B6B]">Not just services - we deliver</span> <br />
              <span className="font-medium">
                <span className="text-[#0D0D0D]">growth</span>
                <span className="text-[#6B6B6B]">, </span>
                <span className="text-[#0D0D0D]">clarity</span>
                <span className="text-[#6B6B6B]">, and </span>
                <span className="text-[#0D0D0D]">real impact</span>
                <span className="text-[#6B6B6B]">.</span>
              </span>
            </motion.h2>
          </div>
        </div>
 
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-4"
        >
          {services.map((service, index) => {
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="w-full bg-white rounded-[24px] p-8 md:p-10 lg:p-12 flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-muted text-sm md:text-base leading-relaxed max-w-md">
                  {service.description}
                </p>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-left md:text-right w-full md:w-auto">
                  {service.title}
                </h3>
              </motion.div>
            );
          })}
          
          {/* Bottom CTA Card */}
          <motion.div variants={itemVariants} className="mt-2">
            <Link 
              href="/contact" 
              className="w-full bg-[#111111] text-white rounded-[24px] p-8 md:p-10 lg:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:bg-black transition-colors shadow-lg block group"
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Ready to Start?
              </h3>
              <div className="flex items-center gap-4 text-xl md:text-2xl font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-150 transition-transform duration-300" />
                <span>Get in Touch</span>
              </div>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
