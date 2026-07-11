"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    const targetId = hash.replace("#", "");
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', hash);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Failed to subscribe.");
    }
  };



  const quickLinks = [
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/#services" },
    { name: "Workflow", href: "/#workflow" },
    { name: "About", href: "/#about" },
    { name: "FAQ", href: "/#faq" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
  ];

  return (
    <footer id="contact" className="bg-[#0a0a0a] text-white p-8 border border-white/10 relative rounded-[32px] overflow-hidden m-2">

      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.02),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Top Layer: Horizontal Links (Bracket Style) */}
        <div className="flex w-full justify-start md:justify-center text-[16px] text-neutral-400 mb-8">
          <div className="flex flex-col items-start md:items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8">
            {quickLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={link.href.includes('#') ? (e) => handleNavClick(e, link.href.substring(1)) : undefined}
                className="group flex items-center gap-1.5 hover:text-white transition-colors duration-300"
              >
                <span>[</span>
                <span className="relative overflow-hidden h-[1.2em] leading-[1.2em]">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] [@media(hover:hover)]:group-hover:-translate-y-full">
                    {link.name}
                  </span>
                  <span className="absolute top-full left-0 block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] [@media(hover:hover)]:group-hover:-translate-y-full whitespace-nowrap">
                    {link.name}
                  </span>
                </span>
                <span>]</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Middle Layer: Centered Hero Text */}
        <div className="flex flex-col items-center text-center gap-8 my-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-[60px] font-bold tracking-tighter leading-[1.1] text-center mx-auto max-w-3xl"
          >
            Let&apos;s build <span className="text-neutral-400 font-medium">something</span> <br />
            extraordinary.
          </motion.h2>

          <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">

            {/* Newsletter */}
            <div className="w-full max-w-sm">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3 text-center">[ Stay Updated ]</h4>
              <form onSubmit={handleSubscribe} className="flex gap-2 p-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus("idle"); setMessage(""); }}
                  disabled={status === "loading" || status === "success"}
                  required
                  placeholder="Enter your email"
                  className="flex-grow pl-4 text-xs bg-transparent outline-none text-white placeholder-neutral-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${status === "success" ? "bg-green-500 text-white" : "bg-white text-black hover:bg-neutral-200"} disabled:opacity-50`}
                >
                  {status === "loading" ? "Joining..." : status === "success" ? "Subscribed!" : "Join"}
                </button>
              </form>
              {status === "error" && (
                <p role="alert" className="text-xs text-red-500 mt-3 text-center">{message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="border-t border-white/10 pt-10" />

        {/* Bottom Layer: Three-Column Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end w-full gap-10 lg:gap-6 text-neutral-400">
          {/* Left Section: Brand & Copyright */}
          <div className="flex flex-col items-start gap-1">
            <span className="text-[34px] leading-none font-bold text-white tracking-tight whitespace-nowrap">LuminaWeb AI</span>
            <span className="text-sm text-neutral-500">© {currentYear} All rights reserved.</span>
          </div>

          {/* Center Section: Legal Links */}
          <div className="flex gap-4 lg:gap-8 font-medium text-[16px] text-neutral-400 mb-1 lg:mb-[6px]">
            <Link href="/privacy" className="group flex items-center gap-1.5 hover:text-white transition-colors duration-300">
              <span>[</span>
              <span className="relative overflow-hidden h-[1.2em] leading-[1.2em]">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] [@media(hover:hover)]:group-hover:-translate-y-full">Privacy</span>
                <span className="absolute top-full left-0 block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] [@media(hover:hover)]:group-hover:-translate-y-full whitespace-nowrap">Privacy</span>
              </span>
              <span>]</span>
            </Link>
            <Link href="/terms" className="group flex items-center gap-1.5 hover:text-white transition-colors duration-300">
              <span>[</span>
              <span className="relative overflow-hidden h-[1.2em] leading-[1.2em]">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] [@media(hover:hover)]:group-hover:-translate-y-full">Terms</span>
                <span className="absolute top-full left-0 block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] [@media(hover:hover)]:group-hover:-translate-y-full whitespace-nowrap">Terms</span>
              </span>
              <span>]</span>
            </Link>
          </div>

          {/* Right Section: Contact Info */}
          <div className="flex flex-col sm:flex-row gap-8 lg:gap-16 text-left">

            <div className="flex flex-col items-start gap-1">
              <span className="text-base text-neutral-500">Email</span>
              <a href="mailto:luminawebai@gmail.com" className="whitespace-nowrap text-[24px] font-bold text-white relative inline-block pb-1 text-inherit hover:text-inherit after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right hover:after:origin-bottom-left after:transition-transform after:duration-[250ms] after:ease-out hover:after:scale-x-100">
                luminawebai@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Large background decorative typography */}
      <div className="absolute bottom-[-5%] left-0 right-0 text-[16vw] font-bold tracking-tighter text-white/[0.01] select-none pointer-events-none text-center leading-none">
        LUMINA WEB
      </div>
    </footer>
  );
}
