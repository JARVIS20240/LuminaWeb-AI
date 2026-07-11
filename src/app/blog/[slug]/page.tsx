"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // Convert slug to a readable title
  const title = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : "Blog Post";

  return (
    <main className="py-40 px-6 lg:px-12 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted hover:text-foreground transition-colors mb-12">
          <ArrowLeft size={16} />
          <span>Back to Blog</span>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-foreground">
            [ Article ]
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mt-6 mb-8 text-foreground">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-xs font-semibold text-muted border-b border-border pb-12 mb-12">
            <span>May 22, 2026</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
          
          <div className="prose prose-invert max-w-none text-muted text-lg leading-relaxed space-y-8">
            <p>
              This is a placeholder for the blog post content. The actual content would be fetched from a CMS or local markdown files based on the slug: <strong>{slug}</strong>.
            </p>
            <p>
              When building a modern web experience, every detail matters. From the typography choices to the subtle micro-interactions that guide the user's eye, the goal is always to create something that feels alive.
            </p>
            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6 tracking-tight">The Role of Design Systems</h2>
            <p>
              A robust design system ensures consistency across the entire application. It acts as the single source of truth for spacing, typography, colors, and interactive states.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
