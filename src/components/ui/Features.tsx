"use client";

import { motion } from "framer-motion";
import { MessageSquare, ArrowUpRight, TrendingUp, Zap, Target } from "lucide-react";

export default function Features() {
  const chatBubbleVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.5,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const chatMessages = [
    { sender: "client", text: "Just saw the first draft - this is 🔥🔥🔥", delay: 1 },
    { sender: "agency", text: "Yes! So glad you like it. Want me to prep a second direction too?", delay: 2 },
    { sender: "client", text: "That would be amazing. You're killing it.", delay: 3 },
    { sender: "agency", text: "Already on it. You'll have it by tomorrow afternoon.", delay: 4 },
  ];

  return (
    <section id="features" className="scroll-mt-24 py-12 md:py-20 lg:py-32 px-6 lg:px-12 bg-background relative overflow-hidden">
      
      {/* Delicate background glow overlay */}
      <div className="absolute top-[40%] left-[10%] w-[30vw] h-[30vw] bg-neutral-300/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-12 lg:mb-16 flex flex-col items-start text-left">
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground shrink-0"
          >
            [ 02 Features ]
          </motion.p>
          
          <div className="max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-foreground"
            >
              <span className="text-[#0D0D0D]">Designed for growth.</span> <br />
              <span className="text-[#0D0D0D]">Built </span>
              <span className="text-[#6B6B6B]">for </span>
              <span className="text-[#0D0D0D]">conversion</span>
              <span className="text-[#6B6B6B]">.</span>
            </motion.h2>
            <p className="text-muted text-lg leading-relaxed">
              Every feature we design is aligned with your business goals, making sure your brand is loved, remembered, and drives growth.
            </p>
          </div>
        </div>

        {/* Feature Grid layout */}
        <div className="flex flex-col gap-8 items-stretch mb-8 w-full">
          
          {/* Row 1: The Top Split Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            
            {/* Left Column: Interactive Chat Mockup (Effortless Collaboration) */}
            <motion.div
              variants={cardVariants}
              className="glass-panel p-10 md:p-12 rounded-3xl flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-foreground/5 border border-border text-foreground">
                    <MessageSquare size={20} />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">
                    Effortless Collaboration
                  </h3>
                </div>
                <p className="text-muted text-base md:text-lg leading-relaxed max-w-md mb-8">
                  Real-time updates and fast replies that make you feel like we’re right there with you every step of the way.
                </p>
              </div>

              {/* Chat bubble screen mock */}
              <div className="w-full bg-[#FAF9F6] border border-border rounded-2xl p-6 flex flex-col gap-4 max-w-lg mx-auto shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-border pb-4 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-muted uppercase tracking-widest">[ Project Thread ]</span>
                  </div>
                  <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">Lumina Agent</span>
                </div>
                
                <div className="flex flex-col gap-3 min-h-[220px] justify-end">
                  {chatMessages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      custom={idx}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={chatBubbleVariants}
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.sender === "client"
                          ? "self-start bg-neutral-100 border border-border text-foreground"
                          : "self-end bg-foreground text-background"
                      }`}
                    >
                      <p>{msg.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Stacked Cards */}
            <div className="flex flex-col gap-8">
              {/* Scalability card */}
              <motion.div
                variants={cardVariants}
                className="glass-panel p-8 rounded-3xl flex flex-col justify-center"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2.5 rounded-xl bg-foreground/5 border border-border text-emerald-600">
                    <TrendingUp size={20} />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted">[ Scalability ]</h4>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-2">
                  Infinite
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  Built with modern frameworks and AI integrations to handle your first 100 visitors or your first 1,000,000 without breaking a sweat.
                </p>
              </motion.div>

              {/* Strong Online Presence Card */}
              <motion.div
                variants={cardVariants}
                className="glass-panel p-10 rounded-3xl flex items-start gap-6 group hover:border-foreground/30 transition-colors"
              >
                <div className="p-4 rounded-2xl bg-foreground/5 border border-border text-foreground shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors duration-500">
                  <ArrowUpRight size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">
                    Stronger Online Presence
                  </h3>
                  <p className="text-muted leading-relaxed text-sm md:text-base">
                    Rank higher on search engines, get found faster by target demographics, and stay permanently top-of-mind.
                  </p>
                </div>
              </motion.div>

              {/* Higher Conversion Rates Card */}
              <motion.div
                variants={cardVariants}
                className="glass-panel p-10 rounded-3xl flex items-start gap-6 group hover:border-foreground/30 transition-colors"
              >
                <div className="p-4 rounded-2xl bg-foreground/5 border border-border text-foreground shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors duration-500">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">
                    Higher Conversion Rates
                  </h3>
                  <p className="text-muted leading-relaxed text-sm md:text-base">
                    Designs and content structured to keep people clicking, scrolling, sharing, and converting into customers.
                  </p>
                </div>
              </motion.div>
            </div>
            
          </motion.div>

          {/* Row 2: The Bottom Full-Width Anchor */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="w-full"
          >
            {/* Speed Launch card */}
            <motion.div
              variants={cardVariants}
              className="bg-[#0a0a0a] border border-neutral-800 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 w-full"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white">
                    <Zap size={20} />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-400">[ Execution Speed ]</h4>
                </div>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-md">
                  Standard design and development projects launched in as little as 3 weeks.
                </p>
              </div>
              <h3 className="text-5xl md:text-7xl font-black text-white tracking-tight shrink-0">
                3 Weeks
              </h3>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
