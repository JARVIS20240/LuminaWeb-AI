"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Subscription",
    price: "$3,999",
    period: "/month",
    tagline: "Ideal for brands that need regular creative, design, or development support.",
    features: [
      "Set number of dedicated hours",
      "Priority 24-48h turnaround",
      "Flexible scope (design, dev, SEO)",
      "Direct access to your creative team",
      "Monthly planning & check-ins"
    ],
    popular: true,
    action: "Start Monthly Plan",
    link: "/contact"
  },
  {
    name: "Per Project",
    price: "$1,299",
    period: "+",
    tagline: "Perfect for brands that need a full-service launch, a one-off redesign, or a sprint.",
    features: [
      "Fixed scope, timeline & deliverables",
      "One-time fee based on details",
      "Full focus on a single core goal",
      "Dedicated team for your launch",
      "Clear milestones & approvals"
    ],
    popular: false,
    action: "Get Custom Quote",
    link: "/contact"
  }
];

const popularServices = [
  { name: "Landing Page", price: "from $1,999" },
  { name: "Full Website", price: "from $4,999" },
  { name: "Branding Package", price: "from $2,999" },
  { name: "Packaging Design", price: "from $1,499" }
];

export default function Pricing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="pricing" className="py-40 px-6 lg:px-12 bg-background relative overflow-hidden">
      
      <div className="absolute bottom-[30%] right-[10%] w-[35vw] h-[35vw] bg-neutral-300/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="mb-24 text-left max-w-3xl">
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-foreground mb-4"
          >
            [ 06 Pricing ]
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-foreground"
          >
            Flexible plans. <br />
            Serious business impact.
          </motion.h2>
          <p className="text-muted text-lg leading-relaxed">
            Transparent pricing structured to align with your timeline, goals, and monthly support budget.
          </p>
        </div>

        {/* Pricing Cards row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-20"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={`glass-panel p-10 md:p-12 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[580px] ${
                plan.popular ? "border-foreground/30 shadow-sm" : "border-border"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-6 right-6 bg-foreground text-background text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Sparkles size={10} />
                  <span>Popular Choice</span>
                </div>
              )}

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-muted block mb-6">
                  {`[ ${plan.name} ]`}
                </span>
                
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl md:text-6xl font-black tracking-tight text-foreground">{plan.price}</span>
                  <span className="text-base text-muted font-semibold">{plan.period}</span>
                </div>

                <p className="text-muted text-sm md:text-base leading-relaxed mb-8">
                  {plan.tagline}
                </p>

                <ul className="space-y-4 mb-10 border-t border-border pt-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm md:text-base text-muted font-medium">
                      <div className="w-5 h-5 rounded-full bg-foreground/5 flex items-center justify-center text-foreground shrink-0">
                        <Check size={12} />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={plan.link}
                className={`group w-full py-4 rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all duration-300 ${
                  plan.popular
                    ? "bg-foreground text-background hover:bg-neutral-800"
                    : "bg-foreground/5 border border-border text-foreground hover:bg-foreground hover:text-background hover:border-foreground"
                }`}
              >
                <span>{plan.action}</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>

            </motion.div>
          ))}
        </motion.div>

        {/* Popular Services Submenu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 rounded-3xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-border pb-6">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">Popular Service Estimates</h3>
              <p className="text-xs font-semibold text-muted uppercase tracking-widest mt-1">[ Standard scopes ]</p>
            </div>
            <p className="text-xs text-muted font-medium max-w-xs md:text-right">
              *Prices listed are estimates based on typical project scopes. For a precise custom proposal, please contact us.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularServices.map((srv) => (
              <div 
                key={srv.name} 
                className="bg-foreground/[0.02] border border-border p-6 rounded-2xl flex flex-col justify-between hover:border-foreground/15 transition-colors"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-muted mb-2">[ {srv.name} ]</span>
                <span className="text-lg font-bold text-foreground">{srv.price}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
