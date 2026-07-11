"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

export default function PageTransition() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const [targetRoute, setTargetRoute] = useState<string | null>(null);

  // 1. Initial Entry Animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1800); // 1.8 seconds premium splash screen

    return () => clearTimeout(timer);
  }, []);

  // 2. Intercept Specific Clicks globally (Capture Phase)
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;

      // Find the closest anchor tag ancestor
      while (target && target.tagName !== "A") {
        target = target.parentElement;
      }

      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore if user is trying to open in a new tab (ctrl+click, cmd+click, middle-click)
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;

      // Ignore external or email links
      if (href.startsWith("http") || href.startsWith("mailto")) return;

      // Extract the path portion for routing checks (e.g. "/#services" -> "/")
      const pathOnly = href.split("#")[0] || "/";

      // ONLY trigger the black screen transition on these exact main pages
      const allowedRoutes = ["/", "/projects", "/services", "/contact", "/privacy", "/terms"];
      if (!allowedRoutes.includes(pathOnly)) {
        return; // Let Next.js handle navigation normally for /blog, etc.
      }

      // If we are already on the target route (e.g. on "/" clicking "/#services")
      // let Next.js handle the native smooth scroll. We don't want a page transition for a page scroll.
      if (pathname === pathOnly) {
        // However, if the href is exactly the same as current pathname with NO hash,
        // intercept it and smoothly scroll to the top of the page.
        if (pathname === href) {
          e.preventDefault();
          e.stopPropagation();
          // @ts-ignore
          if (window.lenis) {
            // @ts-ignore
            window.lenis.scrollTo(0, { duration: 1.2 });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
        return;
      }

      // Intercept navigation to prevent next/link from instantly pushing
      e.preventDefault(); 
      e.stopPropagation();

      // Trigger black screen to animate in
      setTargetRoute(href);
      setIsTransitioning(true);

      // Execute router.push after screen is completely black + short 200ms hold phase
      setTimeout(() => {
        router.push(href);
      }, 850); // 650ms transition + 200ms hold
    };

    // Use capture phase to stop next/link from intercepting
    document.addEventListener("click", handleAnchorClick, true);
    return () => document.removeEventListener("click", handleAnchorClick, true);
  }, [pathname, router]);

  // 3. The Smooth Reveal (Animate away once new route is mounted)
  useEffect(() => {
    // Check if the target route's path matches the current pathname
    const targetPathOnly = targetRoute ? (targetRoute.split("#")[0] || "/") : null;
    
    // Only slide out if we are currently transitioning AND the pathname has updated to our target!
    if (isTransitioning && targetPathOnly && pathname === targetPathOnly) {
      
      // Fix Next.js hash routing: manually scroll to the element while the screen is still black
      if (targetRoute && targetRoute.includes("#")) {
        const hash = targetRoute.split("#")[1];
        // Wait 50ms to ensure the new page DOM is fully mounted
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            // Scroll instantly so the user doesn't see it moving after the reveal
            element.scrollIntoView({ behavior: "auto" });
          }
        }, 50);
      }

      // 100ms buffer to guarantee React has painted the DOM before revealing.
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setTargetRoute(null);
      }, 150);

      // Safety fallback in case of routing errors
      const fallback = setTimeout(() => setIsTransitioning(false), 5000);

      return () => {
        clearTimeout(timer);
        clearTimeout(fallback);
      };
    }
  }, [pathname, isTransitioning, targetRoute]);

  return (
    <>
      <AnimatePresence mode="wait">
        {(isInitialLoading || isTransitioning) && (
          <motion.div
            initial={{ y: isInitialLoading ? 0 : "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.65,
              ease: [0.76, 0, 0.24, 1], // Custom premium ease (cubic-bezier)
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[rgb(13,13,13)] overflow-hidden"
          >
            {/* Subtle atmospheric glow over the requested grey base */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

            {/* Clean minimalist design grid lines */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <div className="w-[1px] h-full bg-white" />
              <div className="h-[1px] w-full bg-white absolute" />
            </div>

            {/* Centered Brand Splash Content */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-center gap-2 text-4xl md:text-6xl font-black tracking-tighter text-white"
              >
                <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                  LuminaWeb
                </span>
                <span className="text-[#4d1fd7] drop-shadow-[0_0_20px_rgba(77,31,215,0.5)]">AI.</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-[9px] tracking-[0.4em] uppercase text-neutral-500 font-bold"
              >
                {isInitialLoading ? "[ loading experience ]" : "[ transitioning content ]"}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
