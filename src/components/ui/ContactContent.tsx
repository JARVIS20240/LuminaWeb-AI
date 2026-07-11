"use client";

import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function ContactContent() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Enforce top-alignment on mount to prevent browser scroll-memory bugs
  useEffect(() => {
    setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 100);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="pt-32 pb-12 md:pt-40 md:pb-16 lg:pt-40 lg:pb-20 px-6 lg:px-12 bg-background min-h-screen relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] bg-neutral-300/10 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 lg:mb-16 text-left max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-bold uppercase tracking-widest text-foreground mb-4"
          >
            [ Contact Us ]
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 text-foreground"
          >
            Let's build <span className="text-neutral-500">something</span> <br />
            extraordinary together.
          </motion.h1>
          <p className="text-muted text-lg leading-relaxed">
            Whether you have a specific project in mind or just want to explore possibilities, we're ready to listen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-foreground">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted">Name</label>
                  <input type="text" id="name" value={formData.name} onChange={handleChange} required className="bg-background border-b border-border py-3 outline-none text-foreground focus:border-foreground transition-colors" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted">Email</label>
                  <input type="email" id="email" value={formData.email} onChange={handleChange} required className="bg-background border-b border-border py-3 outline-none text-foreground focus:border-foreground transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-muted">Subject</label>
                <input type="text" id="subject" value={formData.subject} onChange={handleChange} required className="bg-background border-b border-border py-3 outline-none text-foreground focus:border-foreground transition-colors" placeholder="How can we help?" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-muted">Message</label>
                <textarea id="message" value={formData.message} onChange={handleChange} required rows={4} className="bg-background border-b border-border py-3 outline-none text-foreground focus:border-foreground transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === "loading" || status === "success"}
                className={`mt-4 py-4 px-8 rounded-full text-sm font-bold uppercase tracking-wider transition-colors self-start flex items-center justify-center min-w-[160px] disabled:opacity-50 ${status === "success" ? "bg-green-500 text-white" : "bg-foreground text-background hover:bg-neutral-800"}`}
              >
                {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
              </button>
              {status === "error" && <p role="alert" className="text-red-500 text-sm mt-2">Failed to send message. Please try again.</p>}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-col gap-12"
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-8 text-foreground">Contact Info</h2>
              <div className="flex flex-col gap-8">

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neutral-200/10 rounded-full text-foreground shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted mb-1">Email Us</h3>
                    <a href="mailto:luminawebai@gmail.com" className="text-xl text-foreground relative inline-block pb-1 text-inherit hover:text-inherit after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-current after:origin-bottom-right hover:after:origin-bottom-left after:transition-transform after:duration-[250ms] after:ease-out hover:after:scale-x-100">
                      luminawebai@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neutral-200/10 rounded-full text-foreground shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted mb-1">Visit Us</h3>
                    <p className="text-xl text-foreground">
                      Gujarat, India<br />
                      Available Worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 border border-border rounded-3xl bg-card">
              <h3 className="text-xl font-bold tracking-tight mb-4 text-foreground">Ready to start?</h3>
              <p className="text-muted leading-relaxed mb-6">
                We typically respond within 24 hours. Let's schedule a discovery call to discuss your vision.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
