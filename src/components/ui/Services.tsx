"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Custom Web Development",
    description: "Building responsive, blazing-fast websites tailored to your brand's unique digital identity.",
    number: "01"
  },
  {
    title: "AI Chatbot Integration",
    description: "Integrating intelligent AI agents to automate customer support and engage your visitors 24/7.",
    number: "02"
  },
  {
    title: "UI/UX Design",
    description: "Crafting intuitive and visually stunning user interfaces with smooth motion and scroll effects.",
    number: "03"
  },
  {
    title: "SEO Optimization",
    description: "Ensuring your website ranks high on search engines with modern, optimized code architecture.",
    number: "04"
  }
];

export default function Services() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="services" className="py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              My Services
            </h2>
            <p className="text-gray-500 max-w-md text-lg">
              Comprehensive digital solutions to build your brand and integrate the latest AI technologies.
            </p>
          </div>
          <div className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            [ Expertise ]
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group border-t border-gray-200 pt-8"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight group-hover:text-gray-600 transition-colors">
                  {service.title}
                </h3>
                <span className="text-sm font-medium text-gray-400">
                  {service.number}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg max-w-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
