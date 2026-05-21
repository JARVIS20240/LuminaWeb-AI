"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#111111] text-white pt-24 pb-8 px-6 lg:px-12 mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-8"
            >
              Let&apos;s build <br />
              <span className="text-gray-500">something</span> <br />
              extraordinary.
            </motion.h2>
            <Link
              href="mailto:contact@luminaweb.ai"
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-5 rounded-full text-lg font-bold hover:bg-gray-200 transition-colors"
            >
              Start a Project
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-col lg:items-end justify-end lg:text-right">
            <div className="space-y-6">
              <div>
                <h4 className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-2">Socials</h4>
                <div className="flex flex-col lg:items-end gap-2 text-lg font-medium">
                  <Link href="#" className="hover:text-gray-400 transition-colors">GitHub</Link>
                  <Link href="#" className="hover:text-gray-400 transition-colors">LinkedIn</Link>
                  <Link href="#" className="hover:text-gray-400 transition-colors">Twitter</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} LuminaWeb AI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Decorative large background text */}
      <div className="absolute bottom-[-10%] left-0 right-0 text-[15vw] font-bold tracking-tighter text-white/5 whitespace-nowrap text-center pointer-events-none select-none">
        LUMINAWEB
      </div>
    </footer>
  );
}
