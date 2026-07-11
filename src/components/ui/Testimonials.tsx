"use client";

import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";

const testimonials = [
  {
    quote: "They completely nailed our branding — from the visual identity to the tone of voice. Since launch, we’ve seen a clear uptick in client engagement and have gotten compliments on our new look almost daily.",
    author: "Steve",
    role: "Product Designer, Bloom",
    rating: 5
  },
  {
    quote: "Working with this team felt like adding a full creative department to our company overnight. They’re fast, responsive, and ridiculously talented — honestly one of the smoothest collaborations we’ve had.",
    author: "Sarah",
    role: "Head of Marketing, NovaSkin",
    rating: 5
  },
  {
    quote: "The website they built for us wasn’t just beautiful — it actually performs. We saw a 60% increase in bookings within the first month, and the feedback from our customers has been amazing.",
    author: "Max",
    role: "Founder, Craft & Code",
    rating: 5
  },
  {
    quote: "Every part of the process felt effortless. The communication was clear, the design thinking was sharp, and the final result exceeded expectations in every way. We felt like we were in good hands throughout.",
    author: "Elena",
    role: "Product Manager, Streamly",
    rating: 5
  }
];

export default function Testimonials() {
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
    <section id="testimonials" className="py-40 px-6 lg:px-12 bg-background border-t border-border relative overflow-hidden">
      
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[40vw] h-[40vw] bg-neutral-300/10 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="mb-24 text-left max-w-3xl">
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-foreground mb-4"
          >
            [ 05 Testimonials ]
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-foreground"
          >
            Real stories. Real partners. <br />
            Straight from our clients.
          </motion.h2>
          <p className="text-muted text-lg leading-relaxed">
            We are dedicated to building authentic relationships and delivering solutions that enable businesses to dominate their fields.
          </p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {testimonials.map((test, index) => (
            <motion.div
              key={test.author}
              variants={itemVariants}
              className="glass-panel p-10 md:p-12 rounded-3xl relative overflow-hidden flex flex-col justify-between group hover:border-foreground/20 transition-colors"
            >
              
              {/* Message icon overlay */}
              <div className="absolute top-6 right-8 text-foreground/[0.01] group-hover:text-foreground/[0.02] select-none pointer-events-none transition-all duration-500">
                <MessageSquare size={72} />
              </div>

              {/* Verified rating stars */}
              <div className="flex gap-1 mb-8">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-foreground text-foreground" />
                ))}
              </div>

              <blockquote className="text-muted text-base md:text-lg leading-relaxed italic mb-10">
                &ldquo;{test.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 border-t border-border pt-6">
                
                {/* Visual Avatar Placeholder */}
                <div className="w-10 h-10 rounded-full bg-foreground/5 border border-border flex items-center justify-center font-bold text-foreground text-sm uppercase">
                  {test.author.substring(0, 2)}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">{test.author}</h4>
                  <p className="text-xs font-semibold text-muted mt-0.5">{test.role}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
