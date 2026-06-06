"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  if (pathname?.startsWith("/admin")) return null;

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    // Initial check
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const whatsappUrl = "https://wa.me/919746235886?text=Hello%20Vanya%20Architects%2C%20I%20would%20like%20to%20make%20an%20inquiry%20regarding%20a%20design%20project.";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 group flex items-center justify-end"
          aria-label="Inquire on WhatsApp"
        >
          {/* Custom Premium Tooltip */}
          <span className="mr-3 py-1.5 px-4 rounded-full bg-foreground text-background border border-accent/20 text-[10px] tracking-[0.15em] uppercase font-semibold pointer-events-none shadow-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 backdrop-blur-md hidden sm:inline-block">
            Inquire on WhatsApp
          </span>

          {/* Floating Circle Button */}
          <div className="w-12 h-12 md:w-14 md:h-14 bg-foreground hover:bg-accent text-accent hover:text-white rounded-full flex items-center justify-center border border-accent/40 shadow-lg transition-all duration-300 relative overflow-hidden">
            {/* Soft inner glow ring */}
            <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none" />
            
            <svg
              className="w-5 h-5 md:w-6 md:h-6 fill-current transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.07 4.93A10 10 0 0 0 11.03 2c-5.51 0-10 4.49-10 10 0 1.76.46 3.48 1.33 5L1 23l6.17-1.62A9.97 9.97 0 0 0 11.03 22c5.51 0 10-4.49 10-10 0-2.67-1.04-5.18-2.96-7.07zm-8.04 15.02c-1.57 0-3.1-.42-4.44-1.21l-.32-.19-3.67.96.98-3.58-.21-.33a8.17 8.17 0 0 1-1.25-4.3c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.85 5.8 2.4 1.55 1.55 2.4 3.61 2.4 5.8 0 4.52-3.68 8.2-8.2 8.2zm4.5-6.15c-.25-.12-1.47-.73-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.66.83-.81.99-.15.17-.3.19-.55.07a6.94 6.94 0 0 1-2.04-1.26 7.64 7.64 0 0 1-1.41-1.75c-.15-.25-.02-.39.1-.51.11-.12.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.5-.4-.43-.56-.44h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.29z" />
            </svg>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
