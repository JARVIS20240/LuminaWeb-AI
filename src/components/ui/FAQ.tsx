
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "It depends on the scope. A landing page might take 2–3 weeks, while a full branding and website package could take 6–10. We’ll give you a clear, realistic timeline before we begin so you know exactly what to expect."
  },
  {
    question: "What if I don’t know exactly what I need?",
    answer: "No problem. We’ll help you figure it out. Whether it’s a quick call or a deeper discovery session, we will guide you through our process to clarify your goals and map out a strategic plan."
  },
  {
    question: "Can I request just one service?",
    answer: "Absolutely. You can book a single standalone service (like a fast landing page or SEO audit) or bundle multiple together — whatever fits your immediate goals and timeline."
  },
  {
    question: "How do payments work?",
    answer: "For projects, we usually split payments into 2 or 3 transparent milestones (e.g. 50% upfront, 50% upon launch). For monthly plans, billing is done upfront each month. Everything is clear and agreed upon in writing before we start."
  },
  {
    question: "What if I need changes after a project ends?",
    answer: "We offer ongoing support, either through our popular monthly subscription plans or as-needed updates. You won’t be left hanging — we are here as your long-term creative partners."
  }
];

function FAQItem({ question, answer, isOpen, toggleOpen, index }: {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="bg-card border border-border rounded-xl p-6 shadow-sm mb-4"
    >
      <button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className="text-lg md:text-xl font-bold text-foreground group-hover:text-foreground/80 transition-colors duration-300">
          {question}
        </span>
        <div className="w-8 h-8 rounded-full bg-foreground/5 border border-border flex items-center justify-center text-foreground shrink-0 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-300 ml-4">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-muted text-sm md:text-base leading-relaxed mt-4 max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="scroll-mt-24 py-12 md:py-20 lg:py-32 px-6 lg:px-12 bg-background relative overflow-hidden">

      <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-neutral-300/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10 items-start">

        {/* Header Block (Left Column) */}
        <div className="text-left flex flex-col items-start">
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-foreground mb-4"
          >
            [ 05 FAQ ]
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-foreground"
          >
            <span className="text-[#6B6B6B]">Smarter decisions</span> <br />
            <span className="text-[#6B6B6B]">start </span>
            <span className="text-[#0D0D0D]">with clear answers</span>
            <span className="text-[#6B6B6B]">.</span>
          </motion.h2>
          <p className="text-muted text-base md:text-lg leading-relaxed max-w-lg">
            Got an idea, a goal, or a challenge? We’ve compiled answers to the most common questions our clients ask.
          </p>
        </div>

        {/* Accordions (Right Column) */}
        <div className="flex flex-col mt-9 lg:mt-10">
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              index={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              toggleOpen={() => toggleOpen(idx)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
