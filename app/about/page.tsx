"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Hammer, Lightbulb, FileText, Activity } from "lucide-react";
import vigneshPhoto from "@/assets/About us/Profile_Vignesh/Ar.vignesh.jpg.png";

// Core Values Data
const values = [
  {
    title: "Craftsmanship",
    desc: "We respect materials and construction techniques. We collaborate closely with local masons, carpenters, and structural engineers to ensure execution aligns precisely with drawing sheets.",
    icon: Hammer,
  },
  {
    title: "Innovation",
    desc: "We research sustainable composites, responsive shading frameworks, and advanced prefabrication systems to solve modern volumetric challenges.",
    icon: Lightbulb,
  },
  {
    title: "Integrity",
    desc: "We build transparent client relationships. We respect local contexts, historic environments, and budget envelopes, managing projects from concept sketch to occupancy permit.",
    icon: FileText,
  },
  {
    title: "Sustainability",
    desc: "We design structures utilizing local timber, geothermal insulation, and graywater systems. We plan carbon-neutral architectures that contribute back to regional biomes.",
    icon: Activity,
  },
];

// Leadership metadata has been streamlined for single principal architect profile

export default function AboutPage() {
  return (
    <div className="w-full bg-background pt-32 pb-24 md:pt-40 md:pb-36">
      {/* 1. HERO STORY SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Header Title */}
          <div className="lg:col-span-5">
            <span className="text-xs text-accent tracking-[0.2em] uppercase font-bold">
              Who We Are
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl text-foreground font-light tracking-wide mt-4 leading-tight">
              Our Story
            </h1>
            <p className="text-xs text-secondary mt-6 tracking-wider font-light leading-relaxed max-w-sm">
              Founded on the belief that spaces should endure. We are a boutique team of architects, interior designers, and planners crafting custom architectures.
            </p>
          </div>

          {/* Core Story Content */}
          <div className="lg:col-span-7 space-y-6 text-secondary font-light text-sm md:text-base leading-relaxed">
            <p className="text-lg md:text-xl text-foreground/90 font-light italic">
              “Vanya was born from a desire to strip away architectural noise and return to raw, honest material expressions.”
            </p>
            <p className="text-justify-custom">
              Established in Copenhagen, Denmark, and expanding with global design partnerships, Vanya is a boutique architecture and interior design studio. We work at the intersection of Scandinavian minimalist layout and warm, material luxury. We serve clients who value craftsmanship, ecological responsibility, and design clarity.
            </p>
            <p className="text-justify-custom">
              Our projects range from private oceanfront retreats in Scandinavia and wood pavilions in Japan to corporate workspaces in Stockholm. Rather than applying a repetitive signature aesthetic, we explore the site, mapping solar paths, geological contours, and local cultural histories to compile a bespoke response.
            </p>
          </div>
        </div>
      </section>

      {/* 2. IMAGE SPLIT */}
      <section className="w-full relative aspect-[21/9] md:h-[450px] mb-24 md:mb-36 overflow-hidden bg-border">
        <Image
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=2000"
          alt="Vanya Studio Workspace Interior"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/15" />
      </section>

      {/* 3. MISSION, VISION & PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24 md:mb-36">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-accent uppercase font-bold">01 / Our Mission</span>
            <h2 className="font-heading text-2xl text-foreground font-light tracking-wide mt-3 mb-4">
              Enduring Architecture
            </h2>
            <p className="text-xs text-secondary font-light leading-relaxed text-justify-custom">
              To build structures that improve with time. We seek out organic materials, passive energy principles, and raw textures to create sustainable sanctuaries for human activity.
            </p>
          </div>

          <div>
            <span className="text-[10px] tracking-[0.25em] text-accent uppercase font-bold">02 / Our Vision</span>
            <h2 className="font-heading text-2xl text-foreground font-light tracking-wide mt-3 mb-4">
              Harmonious Integration
            </h2>
            <p className="text-xs text-secondary font-light leading-relaxed text-justify-custom">
              We envision a future where urban development acts as an extension of the local environment. Every project integrates indoor-outdoor boundaries and supports regional biodiversity.
            </p>
          </div>

          <div>
            <span className="text-[10px] tracking-[0.25em] text-accent uppercase font-bold">03 / Our Design Philosophy</span>
            <h2 className="font-heading text-2xl text-foreground font-light tracking-wide mt-3 mb-4">
              Tectonic Honesty
            </h2>
            <p className="text-xs text-secondary font-light leading-relaxed text-justify-custom">
              We express building mechanics openly. We treat structure, timber framing, concrete formwork, and metal connections as visual accents that communicate structural balance.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES SECTION */}
      <section className="bg-[#FAF8F5] border-t border-b border-border/60 py-24 md:py-32 mb-24 md:mb-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-xl mx-auto mb-20">
            <span className="text-xs text-accent tracking-[0.2em] uppercase font-bold">
              Our Integrity
            </span>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground font-light tracking-wide mt-3">
              Core Studio Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white p-8 border border-border/40 hover:border-accent/40 transition-colors duration-300"
                >
                  <span className="text-accent mb-6 inline-block">
                    <Icon size={22} strokeWidth={1.25} />
                  </span>
                  <h3 className="font-heading text-xl text-foreground font-light tracking-wide mb-4">
                    {val.title}
                  </h3>
                  <p className="text-xs text-secondary font-light leading-relaxed">
                    {val.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. PRINCIPAL PROFILE SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24 md:mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] w-full overflow-hidden bg-border group shadow-sm"
            >
              <Image
                src={vigneshPhoto}
                alt="Ar. Vighnesh S V - Principal Architect"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-102"
              />
            </motion.div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs text-accent tracking-[0.25em] uppercase font-bold">
                Founder & Principal Architect
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl text-foreground font-light tracking-wide mt-3 mb-2">
                Ar. Vighnesh S V
              </h2>
              <p className="text-xs sm:text-sm text-accent tracking-[0.15em] font-medium uppercase mt-2">
                B.Arch | M.Arch | AIIA
              </p>
            </div>

            <div className="border-t border-border pt-8 space-y-6 text-secondary font-light text-sm md:text-base leading-relaxed">
              <p className="text-lg text-foreground/90 font-light italic">
                “We do not simply draw plans; we coordinate light, topography, and raw natural materials into a sensory sanctuary that feels quiet, tactile, and permanent.”
              </p>
              <p className="text-justify-custom">
                Ar. Vighnesh S V is the founding principal of VANYA Architecture. With credentials spanning B.Arch, M.Arch, and registration with the Associate of the Indian Institute of Architects (AIIA), Vighnesh directs the design direction of the studio.
              </p>
              <p className="text-justify-custom">
                His practice combines rigorous tectonic detail, passive climate response, and a minimalist design vocabulary inspired by Scandinavian and warm luxury principles. He works personally with each client to steer projects from early volumetric concept sketches to final site craftsmanship.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. FUTURE VISION SECTION */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 text-center pt-16 border-t border-border/60">
        <span className="text-xs text-accent tracking-[0.25em] uppercase font-bold">Looking Ahead</span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground font-light tracking-wide mt-4 mb-6">
          The Next Tectonic Era
        </h2>
        <p className="text-xs sm:text-sm text-secondary font-light leading-relaxed max-w-2xl mx-auto text-center">
          As our environment undergoes shifting climates, the discipline of building must adapt. Vanya is committed to integrating biological concrete composites, structural timber framing, and localized clean microgrid solar arrays into all upcoming studies. We intend to continue leading the architectural dialogue toward zero-carbon structural design, demonstrating that luxurious living can support ecological prosperity.
        </p>
      </section>
    </div>
  );
}
