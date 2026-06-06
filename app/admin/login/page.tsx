"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirect if already logged in
    const isLoggedIn = localStorage.getItem("vanya_admin_session") === "active";
    if (isLoggedIn) {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Get admin password from env or default
    const configuredPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "vanyaadmin";

    setTimeout(() => {
      if (password === configuredPassword) {
        localStorage.setItem("vanya_admin_session", "active");
        router.push("/admin");
      } else {
        setError("Invalid administrative credentials. Please try again.");
        setIsLoading(false);
      }
    }, 800); // Soft loading delay for aesthetic feel
  };

  return (
    <div className="min-h-screen w-full bg-[#1C1C1C] flex items-center justify-center px-6 py-12 relative overflow-hidden select-none">
      {/* Background Subtle Watermark Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <span className="font-heading text-[15vw] tracking-[0.2em] font-light text-white">VANYA</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-stone-900 border border-accent/20 p-8 md:p-10 shadow-2xl relative z-10"
      >
        {/* Logo Header */}
        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold">
            Portal Gateway
          </span>
          <h1 className="font-heading text-3xl text-white font-light tracking-[0.15em] mt-3">
            V Λ N Y Λ
          </h1>
          <p className="text-[9px] text-accent tracking-[0.2em] uppercase mt-1.5 font-medium border-t border-accent/20 pt-2 inline-block">
            Architects Admin
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-[9px] tracking-[0.2em] text-secondary uppercase font-semibold block mb-1"
            >
              Enter Administrative Passcode
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/60">
                <Lock size={16} />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-stone-950 border border-stone-800 focus:border-accent text-white text-xs px-12 py-4 tracking-wider focus:outline-none transition-colors duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/60 hover:text-accent transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[11px] text-red-400 font-light tracking-wide bg-red-950/20 border border-red-900/30 px-4 py-2.5"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-white text-xs tracking-[0.2em] uppercase font-medium py-4 px-6 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? "Verifying..." : "Access Control"}
            {!isLoading && <ArrowRight size={14} />}
          </button>
        </form>

        {/* Footer Hint */}
        <div className="text-center mt-8">
          <p className="text-[9px] text-secondary/40 font-mono tracking-wider">
            DEFAULT PASSCODE FOR TESTING: vanyaadmin
          </p>
        </div>
      </motion.div>
    </div>
  );
}
