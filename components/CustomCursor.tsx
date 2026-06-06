"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const pathname = usePathname();
  const [hoverState, setHoverState] = useState<"default" | "hover">("default");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 450, mass: 0.45 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor if fine pointer is detected (typically desktop/mouse)
    const isPointerFine = window.matchMedia("(pointer: fine)").matches;
    if (!isPointerFine) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  useEffect(() => {
    const isPointerFine = window.matchMedia("(pointer: fine)").matches;
    if (!isPointerFine) return;

    // Attach mouse listeners to interactive elements
    const addListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, select, input, textarea, [role='button'], [data-cursor]"
      );
      
      interactiveElements.forEach((el) => {
        const handleMouseEnter = () => {
          setHoverState("hover");
        };

        const handleMouseLeave = () => {
          setHoverState("default");
        };

        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);

        // Cleanup function attachments to prevent leaks
        (el as any)._cursorMouseEnter = handleMouseEnter;
        (el as any)._cursorMouseLeave = handleMouseLeave;
      });
    };

    addListeners();

    // Re-bind listeners on router/DOM path navigation shifts
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  if (pathname?.startsWith("/admin") || !isVisible) return null;

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block bg-transparent"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: hoverState === "hover" ? 1.6 : 1,
          borderColor: hoverState === "hover" ? "rgba(176, 141, 87, 0.95)" : "rgba(176, 141, 87, 0.45)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />

      {/* Inner Pin Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hoverState === "hover" ? 0 : 1,
        }}
        transition={{ duration: 0.12 }}
      />
    </>
  );
}
