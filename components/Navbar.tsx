"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Portfolio", href: "/projects" },
  { name: "Services", href: "/services" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isTransparent = !scrolled && pathname === "/";
  const fillColor = isTransparent ? "white" : "#1C1C1C";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isTransparent
            ? "bg-transparent border-b border-transparent pt-8 pb-4"
            : "bg-background/90 backdrop-blur-md border-b border-border/40 pt-6 pb-3 shadow-sm"
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-6 md:px-16 flex justify-between items-end relative">
          {/* Logo Container */}
          <Link
            href="/"
            className="flex flex-col items-start transition-opacity hover:opacity-85 focus:outline-none relative pb-8"
            aria-label="Vanya Architecture Home"
          >
            {/* Inline SVG Logo Text (Increased font size / heights) */}
            <svg
              width="416"
              height="75"
              viewBox="0 0 416 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 sm:h-9 md:h-11 w-auto transition-colors duration-500 overflow-visible"
            >
              <path d="M40 1.53027H48.8526L69 71.5303H61.6737L40 1.53027Z" fill={fillColor}/>
              <path d="M137.822 3.53027H145L121.972 71.5303H113L137.822 3.53027Z" fill={fillColor}/>
              <path d="M269 1.53027H278.644L297 37.9747L292.022 42.5303L269 1.53027Z" fill={fillColor}/>
              <rect x="291" y="36.5303" width="7" height="35" fill={fillColor}/>
              <path d="M366.779 2.99213L376.141 2.99212L350.168 71.672L341.999 71.672L366.779 2.99213Z" fill={fillColor}/>
              <path d="M83.9588 1.53027H92L69.4227 71.5303H62L83.9588 1.53027Z" fill={fillColor}/>
              <path d="M138 3.53027H147.411L172 71.5303H163.196L138 3.53027Z" fill={fillColor}/>
              
              {/* N: Left vertical leg, diagonal path (no transform), right vertical leg */}
              <rect x="197.881" y="0.530273" width="7" height="71" fill={fillColor}/>
              <path d="M197.881 6.04688 L205.57 1.66 L242.98 67.24 L235.28 71.63 Z" fill={fillColor}/>
              <rect x="235" y="0.530273" width="7" height="71" fill={fillColor}/>
              
              <path d="M312.023 1.53027H320L297.602 41.5303L293 36.4175L312.023 1.53027Z" fill={fillColor}/>
              <path d="M367 3.8325L375.657 3.53027L400 71.5303H391.444L367 3.8325Z" fill={fillColor}/>
            </svg>
            
            {/* Architects Underline with responsive screen-wide line masking */}
            <div className="absolute bottom-0 left-0 w-full flex items-center select-none pointer-events-none">
              {/* Left Line: runs from screen edge and ends exactly under the first 'Λ' of 'V Λ N Y Λ' */}
              <div className="relative h-[1px] w-[20%] flex-shrink-0">
                <div className={`absolute right-0 w-[100vw] h-[1px] transition-colors duration-500 ${
                  isTransparent ? "bg-white/35" : "bg-border/70"
                }`} />
              </div>
              
              {/* Architects gold label */}
              <span className="text-accent font-heading text-xs sm:text-sm md:text-[24px] tracking-[0.25em] font-medium leading-none whitespace-nowrap z-10 px-2 pointer-events-auto">
                Architects
              </span>
              
              {/* Right Line: runs from Architects text rightwards across the viewport */}
              <div className="relative h-[1px] flex-grow">
                <div className={`absolute left-0 w-[100vw] h-[1px] transition-colors duration-500 ${
                  isTransparent ? "bg-white/35" : "bg-border/70"
                }`} />
              </div>
            </div>
          </Link>

          {/* Desktop Menu (aligned with VANYA text bottom, sitting above the line) */}
          <nav className="hidden md:flex items-center space-x-10 pb-8" aria-label="Desktop navigation">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-xs sm:text-sm md:text-[15px] tracking-[0.25em] uppercase transition-colors duration-300 font-medium py-1 focus:outline-none ${
                    isActive
                      ? isTransparent ? "text-white" : "text-accent"
                      : isTransparent ? "text-white/80 hover:text-white" : "text-foreground hover:text-accent"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className={`absolute bottom-0 left-0 w-full h-[1.5px] ${
                        isTransparent ? "bg-white" : "bg-accent"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            
            {/* Contact Button */}
            <Link
              href="/contact"
              className={`text-xs sm:text-sm md:text-[15px] tracking-[0.25em] uppercase transition-all duration-300 font-medium px-5 py-2 border rounded-none focus:outline-none ${
                pathname === "/contact"
                  ? "bg-accent border-accent text-white"
                  : isTransparent
                    ? "border-white/40 text-white hover:border-white hover:bg-white hover:text-foreground"
                    : "border-accent/50 text-accent hover:border-accent hover:bg-accent hover:text-white"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden pb-8 p-1 transition-colors focus:outline-none ${
              isTransparent ? "text-white hover:text-white/80" : "text-foreground hover:text-accent"
            }`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-background flex flex-col justify-center items-center px-8"
          >
            <nav className="flex flex-col items-center space-y-8 text-center w-full max-w-xs" aria-label="Mobile navigation">
              {navLinks.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`text-xl tracking-[0.25em] uppercase font-light focus:outline-none ${
                        isActive ? "text-accent font-normal" : "text-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* Mobile Contact Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                className="w-full pt-4"
              >
                <Link
                  href="/contact"
                  className="block w-full py-3.5 border border-accent text-accent text-center text-base tracking-[0.25em] uppercase font-medium hover:bg-accent hover:text-white transition-colors duration-300"
                >
                  Contact
                </Link>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12 text-center"
            >
              <p className="text-[10px] tracking-[0.2em] text-secondary uppercase font-light">
                V Λ N Y Λ &copy; {new Date().getFullYear()}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
