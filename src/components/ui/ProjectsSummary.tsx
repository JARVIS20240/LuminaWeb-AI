"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const projects = [
  {
    id: 2,
    title: "Embriago Coffee",
    category: "Web Development",
    url: "https://embriago-coffee.vercel.app/",
    image: "/images/embriago_coffee.png",
    tags: ["React", "Custom CSS", "Modern Web"]
  },
  {
    id: 3,
    title: "DakaDaka",
    category: "Web Development",
    url: "https://daka-daka.vercel.app/",
    image: "/images/Dakadaka_restorent.jpeg",
    tags: ["Minimalist UI", "Animations", "Creative App"]
  }
];

export default function ProjectsSummary() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: true,
  });

  useEffect(() => {
    if (!emblaApi) return;
  }, [emblaApi]);

  return (
    <section id="projects" className="scroll-mt-24 py-12 md:py-20 lg:py-32 px-6 lg:px-12 bg-background relative overflow-hidden">
      {/* Radial glow background */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[50vw] h-[50vw] bg-neutral-300/10 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Block */}
        <div className="mb-12 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold uppercase tracking-widest text-foreground mb-4"
            >
              [ Our Work ]
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 text-foreground"
            >
              Featured Collaborations & <br />
              <span className="text-neutral-500 font-medium">Digital Masterpieces.</span>
            </motion.h2>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">


            <Link
              href="/projects"
              className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground hover:text-neutral-500 transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Embla Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing -mx-6 px-6 lg:-mx-12 lg:px-12" ref={emblaRef}>
          <div className="flex gap-6 lg:gap-12">
            {projects.map((project, index) => (
              <div key={project.id} className="flex-[0_0_90%] md:flex-[0_0_48%] min-w-0 pb-4">
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    delay: index % 2 === 0 ? 0 : 0.2,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="group flex flex-col gap-6"
                >
                  {/* Image Container Card */}
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-3xl bg-card border border-border p-3 hover:border-foreground/20 transition-colors duration-500 relative shadow-sm"
                    draggable="false"
                  >
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
                      <Image
                        src={project.image}
                        alt={`Screenshot of the ${project.title} website interface`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                        priority={index < 2}
                        draggable="false"
                      />

                      {/* Subtle vignette gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />

                      {/* Hover Floating Launch Badge */}
                      <div className="absolute top-4 right-4 bg-foreground text-background rounded-full p-4 opacity-0 translate-y-3 scale-75 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:scale-100 transition-all duration-500 ease-out z-20 shadow-xl pointer-events-none">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </Link>

                  {/* Description Block */}
                  <div className="flex justify-between items-start px-2">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                          {project.category}
                        </span>
                        <span className="text-neutral-300">•</span>
                        <div className="flex gap-1.5">
                          {project.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-medium tracking-wider text-muted uppercase">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-neutral-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
