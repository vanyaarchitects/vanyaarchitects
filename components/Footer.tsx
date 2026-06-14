"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 5000);
    }
  };

  return (
    <footer className="bg-dark-accent text-background border-t border-[#4E4238] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-1 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="flex flex-col text-background font-logo tracking-[0.25em] focus:outline-none"
              >
                <span className="text-xl md:text-2xl font-medium leading-none">
                  V Λ N Y Λ
                </span>
                <span className="text-[8px] md:text-[9px] tracking-[0.45em] mt-1 text-[#C4B7A9] font-light">
                  ARCHITECTS
                </span>
              </Link>
              <p className="mt-6 text-xs text-[#C4B7A9] tracking-wider leading-relaxed font-light">
                Crafting enduring spaces that harmonize human experience with tropical monsoons and natural landscapes in Kerala. Inspired by minimalist design and warm tactile luxury.
              </p>
            </div>
            <div className="flex items-center space-x-6 mt-8">
              <a
                href="https://www.instagram.com/vanyaarchitects/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C4B7A9] hover:text-accent transition-colors duration-300"
                aria-label="Vanya Architecture Instagram"
              >
                <svg
                  className="w-[18px] h-[18px] fill-none stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C4B7A9] hover:text-accent transition-colors duration-300"
                aria-label="Vanya Architecture LinkedIn"
              >
                <svg
                  className="w-[18px] h-[18px] fill-none stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="mailto:vanyaarchitects01@gmail.com"
                className="text-[#C4B7A9] hover:text-accent transition-colors duration-300"
                aria-label="Vanya Architects Email Contact"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-logo tracking-[0.2em] uppercase text-accent mb-6 font-semibold">
              Navigation
            </h3>
            <ul className="space-y-4 text-xs font-light tracking-widest uppercase">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About Studio
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-accent transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-logo tracking-[0.2em] uppercase text-accent mb-6 font-semibold">
              Services
            </h3>
            <ul className="space-y-4 text-xs text-[#C4B7A9] font-light tracking-wide">
              <li>Architecture Design</li>
              <li>Interior Architecture</li>
              <li>Master Planning</li>
              <li>Landscape Integration</li>
              <li>Commercial Design</li>
              <li>Luxury Residential Consultations</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-logo tracking-[0.2em] uppercase text-accent mb-6 font-semibold">
              Newsletter
            </h3>
            <p className="text-xs text-[#C4B7A9] tracking-wide mb-6 font-light leading-relaxed">
              Subscribe to receive updates on newly completed projects, studio insights, and publications.
            </p>
            <form onSubmit={handleSubscribe} className="relative border-b border-[#C4B7A9]/40 pb-2">
              <input
                type="email"
                required
                placeholder="YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-xs tracking-widest text-background placeholder-[#C4B7A9]/50 border-none outline-none focus:ring-0 uppercase pr-8"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 text-[#C4B7A9] hover:text-accent transition-colors"
                aria-label="Submit newsletter subscription"
              >
                <ArrowRight size={16} />
              </button>
            </form>
            {subscribed && (
              <p className="text-[10px] text-accent mt-3 tracking-widest uppercase font-light">
                Thank you for subscribing.
              </p>
            )}
          </div>
        </div>

        {/* Venture Branding */}
        <div className="border-t border-[#4E4238]/60 pt-12 pb-4 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-full max-w-sm mb-4">
            <div className="h-[0.5px] bg-[#B08D57]/30 flex-grow"></div>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#B08D57] px-4 font-semibold">
              A Venture Of
            </span>
            <div className="h-[0.5px] bg-[#B08D57]/30 flex-grow"></div>
          </div>
          
          <div className="flex items-center gap-4 mb-8">
            {/* SVG Logo - High-fidelity geometric representation of Meleparambil M logo */}
            <svg 
              viewBox="0 0 100 100" 
              className="w-10 h-10 text-[#B08D57]" 
              fill="currentColor"
            >
              {/* Left Stem (Outer) */}
              <path d="M15 15 L22 20 L22 85 L15 80 Z" />
              {/* Left Stem (Inner) */}
              <path d="M26 22 L33 27 L33 55 L26 48 Z" />
              {/* Left Diagonal */}
              <path d="M37 15 L44 15 L50 65 L43 65 Z" />
              {/* Right Diagonal */}
              <path d="M63 15 L56 15 L50 65 L57 65 Z" />
              {/* Right Stem (Inner) */}
              <path d="M74 22 L67 27 L67 55 L74 48 Z" />
              {/* Right Stem (Outer) */}
              <path d="M85 15 L78 20 L78 85 L85 80 Z" />
            </svg>
            
            <div className="flex flex-col leading-none">
              <span className="font-heading text-xl md:text-2xl tracking-[0.18em] text-white font-light">
                MELEPARAMBIL
              </span>
              <div className="flex items-center w-full mt-2">
                <div className="h-[0.5px] bg-[#B08D57]/40 flex-grow"></div>
                <span className="text-[9px] tracking-[0.45em] uppercase text-[#B08D57] px-2 font-semibold">
                  GROUP
                </span>
                <div className="h-[0.5px] bg-[#B08D57]/40 flex-grow"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#4E4238] pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-[#C4B7A9] tracking-[0.15em] uppercase font-light">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} VANYA ARCHITECTS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
