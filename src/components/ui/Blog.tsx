"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    title: "Why a Strong Brand Identity Is Essential",
    category: "Branding",
    date: "Apr 30, 2025",
    readTime: "5 min read",
    desc: "A strong brand identity isn't just about looking good — it's about clearly communicating who you are and why you matter."
  },
  {
    title: "The Power of Consistent Design",
    category: "Strategy",
    date: "Apr 15, 2025",
    readTime: "4 min read",
    desc: "Consistency builds trust. How uniform layouts and styling systems across multiple platforms amplify your brand presence."
  },
  {
    title: "How to Nail Your Website Strategy",
    category: "SEO & Growth",
    date: "Mar 28, 2025",
    readTime: "6 min read",
    desc: "A beautiful website is useless without visitors. Discover how to structure conversions and search rankings from day one."
  }
];

export default function Blog() {
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
    <section id="blog" className="py-40 px-6 lg:px-12 bg-background border-t border-border relative overflow-hidden">
      
      <div className="absolute top-[40%] right-[10%] w-[35vw] h-[35vw] bg-neutral-300/10 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold uppercase tracking-widest text-foreground mb-4"
            >
              [ 08 Blog ]
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-foreground"
            >
              Stories, strategies, and <br />
              <span className="text-neutral-500 font-medium">creative perspectives.</span>
            </motion.h2>
            <p className="text-muted max-w-lg text-lg leading-relaxed">
              Insights, tips, and guidelines from our tight-knit team on design, coding strategies, and AI agent integration.
            </p>
          </div>
          
          <div className="text-xs font-bold uppercase tracking-widest text-muted">
            [ All Insights ]
          </div>
        </div>

        {/* Blog Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.title}
              variants={itemVariants}
              className="glass-panel glass-panel-hover p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between group min-h-[360px]"
            >
              
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                    [ {post.category} ]
                  </span>
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-4 transition-colors duration-300">
                  {post.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted text-sm leading-relaxed mb-6">
                  {post.desc}
                </p>
              </div>

              {/* Read Action button link */}
              <div className="border-t border-border pt-6 flex items-center justify-between mt-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-foreground/80 transition-colors">
                  Read Article
                </span>
                <div className="w-8 h-8 rounded-full bg-foreground/5 border border-border flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-300">
                  <ArrowUpRight size={14} />
                </div>
              </div>

            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
