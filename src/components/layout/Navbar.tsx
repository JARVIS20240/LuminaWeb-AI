"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On-Mount Refresh Logic for Hashes
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      const targetId = hash.replace("#", "");
      
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const targetId = hash.replace("#", "");
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', hash);
      }
      setMobileMenuOpen(false);
    }
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (pathname === "/") {
      e.preventDefault();
      
      // 1. Immediately close the mobile menu overlay so the DOM can settle
      setMobileMenuOpen(false);
      
      // 2. Wait 150ms for React to unmount the menu and restore body scroll, THEN fire the native scroll
      setTimeout(() => {
        // Clean the ID in case it was passed with a hash
        const cleanId = hash.replace('#', ''); 
        const targetElement = document.getElementById(cleanId);
        
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.pushState(null, '', `#${cleanId}`);
        }
      }, 150); 
    } else {
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/#services" },
    { name: "Workflow", href: "/#workflow" },
    { name: "About", href: "/#about" },
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <>
      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-transparent md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "py-4 bg-background/80 backdrop-blur-xl border-b border-border"
          : "py-6 bg-transparent border-b border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-1 sm:gap-2 text-lg sm:text-xl font-bold tracking-tight text-foreground">
            <span>LuminaWeb</span>
            <span className="transition-all duration-300 group-hover:scale-110">AI.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={link.href.includes('#') ? (e) => handleNavClick(e, link.href.substring(1)) : undefined}
                className="group flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-neutral-500 hover:text-foreground transition-colors duration-300"
              >
                <span>[</span>
                <span className="relative overflow-hidden h-[1.2em] leading-[1.2em]">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] [@media(hover:hover)]:group-hover:-translate-y-full">
                    {link.name}
                  </span>
                  <span className="absolute top-full left-0 block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] [@media(hover:hover)]:group-hover:-translate-y-full">
                    {link.name}
                  </span>
                </span>
                <span>]</span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="relative group bg-foreground text-background text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-neutral-800"
            >
              <span className="relative overflow-hidden h-[1.2em] leading-[1.2em]">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] [@media(hover:hover)]:group-hover:-translate-y-full">
                  Get in Touch
                </span>
                <span className="absolute top-full left-0 block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] [@media(hover:hover)]:group-hover:-translate-y-full whitespace-nowrap">
                  Get in Touch
                </span>
              </span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden p-3 -m-3 text-foreground hover:text-neutral-500 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border py-8 px-6 flex flex-col gap-6 shadow-2xl overflow-hidden z-50"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={link.href.includes('#') ? (e) => handleMobileNavClick(e, link.href.substring(1)) : () => setMobileMenuOpen(false)}
                  className="text-base font-semibold tracking-widest uppercase text-neutral-600 hover:text-foreground transition-colors"
                >
                  [ {link.name} ]
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 bg-foreground text-background text-center py-4 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-800"
              >
                <span>Get in Touch</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
