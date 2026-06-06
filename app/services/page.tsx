"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Compass, 
  Layers, 
  PenTool, 
  FileCheck, 
  Hammer, 
  Activity,
  ChevronRight
} from "lucide-react";

// Detailed Services Data
const servicesData = [
  {
    id: "01",
    title: "Architectural Design",
    desc: "From initial volumetric study to full-scale structural construction. We specialize in private tropical residences, luxury retreats, and commercial landmarks that respect local contexts, mapping solar pathways and monsoon wind channels directly into schematic plans.",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    deliverables: [
      "Volumetric & Massing Studies",
      "Solar Path & Passive Shading Design",
      "Structural Coordination Sheets",
      "Passive Monsoon Ventilation Layouts"
    ]
  },
  {
    id: "02",
    title: "Interior Architecture",
    desc: "A fluid continuation of the building's outer voice. We select tactile natural materials (travertine, local timbers, raw concrete), designing custom joinery, custom built-in furniture, and bespoke lighting coordinates that define the sensory layout of the home.",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
    deliverables: [
      "Bespoke Cabinetry & Joinery Details",
      "Tactile Material Board Selection",
      "Integrated Spatial Lighting Schemes",
      "Custom Interior FF&E Sourcing"
    ]
  },
  {
    id: "03",
    title: "Master Planning & Site Strategy",
    desc: "Large-scale land coordination that respects ecological contours. We map elevations, water flows, and vegetation to draft sensitive strategies for luxury residential enclaves, wellness resorts, and commercial properties throughout Kerala.",
    icon: PenTool,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800",
    deliverables: [
      "Topographical Elevation Studies",
      "Rainwater Harvesting & Drainage Paths",
      "Zoning & Spatial Density Audits",
      "Phased Development Roadmaps"
    ]
  },
  {
    id: "04",
    title: "Landscape Integration",
    desc: "Architecture must not sit on top of the site; it belongs to it. We outline seamless indoor-outdoor thresholds, designing courtyards, rain gardens, natural pools, and specifying native planting palettes that thrive in regional weather cycles.",
    icon: Activity,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800",
    deliverables: [
      "Private Internal Courtyard Layouts",
      "Native Horticultural Palettes",
      "Hardscape Boundary Details",
      "Outdoor Bioclimatic Living Areas"
    ]
  },
  {
    id: "05",
    title: "Consultation & Permitting",
    desc: "Clear navigation of regulatory environments. We coordinate feasibility studies and structural coordinate submissions for Corporation and Panchayat building permit clearances, including specialized CRZ (Coastal Regulation Zone) advisory.",
    icon: FileCheck,
    image: "https://images.unsplash.com/photo-1503387762-592dedb8fe31?auto=format&fit=crop&q=80&w=800",
    deliverables: [
      "Municipal Corporation Permit Files",
      "Panchayat Zoning Feasibility Studies",
      "Coastal Regulation Zone Advisory",
      "Contractor & Supplier Selection Support"
    ]
  }
];

// Design Journey Phases
const journeyPhases = [
  {
    num: "01",
    phase: "Context Alignment",
    title: "Site & Climatology Studies",
    desc: "We perform micro-climate audits. We map the site coordinates, solar angles, and monsoon wind vectors in Kerala. This ensures we shape the structure to utilize wind channels and passive shading naturally."
  },
  {
    num: "02",
    phase: "Schematic Volumetrics",
    title: "Clay Massing & Materials",
    desc: "We test volumetric configurations through physical clay models and 3D wireframes. We specify early raw material palettes (wood, natural stone, local concrete) to establish texture guidelines."
  },
  {
    num: "03",
    phase: "Developed Detail",
    title: "Blueprints & Clearance Permits",
    desc: "We produce highly refined architectural coordinate sheets, custom joinery details, and structural drawings. In parallel, we coordinate clearances with regional Panchayat or Corporation planning boards."
  },
  {
    num: "04",
    phase: "Tectonic Oversight",
    title: "Construction Craftsmanship",
    desc: "We run periodic site reviews. We inspect structural castings, brick alignments, and custom carpentry on-site, ensuring contractor execution matches the rigor of our initial design sheets."
  }
];

export default function ServicesPage() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="w-full bg-background pt-32 pb-24 md:pt-40 md:pb-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* 1. HERO HEADER SECTION */}
        <div className="max-w-3xl mb-20 md:mb-28">
          <span className="text-xs text-accent tracking-[0.2em] uppercase font-bold">
            01 / Our Capabilities
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl text-foreground font-light tracking-wide mt-4 leading-tight">
            Bespoke Architectural Engineering.
          </h1>
          <p className="text-xs sm:text-sm text-secondary font-light mt-8 leading-relaxed max-w-2xl text-justify-custom">
            Architecture is a slow, thoughtful response to topography and culture. Our practice works at the intersection of functional, thoughtful layout and warm tropical luxury. We offer comprehensive design services, steering projects from early geographic site diagnostics through clear permit approvals and direct site masonry supervision.
          </p>
        </div>

        {/* 2. DYNAMIC SERVICES GRID (Hover Panel Inspired by BOD) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-border pt-16 mb-28 md:mb-36">
          
          {/* Left Column: Interactive Navigation List */}
          <div className="lg:col-span-5 space-y-2">
            <h2 className="text-[10px] tracking-[0.25em] text-accent uppercase font-bold mb-8">
              Services Portfolio
            </h2>
            <div className="flex flex-col border-b border-border/40">
              {servicesData.map((item, idx) => {
                const isActive = idx === activeIdx;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    className="w-full text-left py-6 border-t border-border/40 flex items-center justify-between group transition-colors focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      <span className={`text-xs font-mono tracking-widest ${
                        isActive ? "text-accent font-bold" : "text-secondary/60 group-hover:text-foreground/80"
                      }`}>
                        {item.id}
                      </span>
                      <span className={`font-heading text-lg sm:text-xl md:text-2xl font-light tracking-wide transition-colors ${
                        isActive ? "text-accent" : "text-foreground group-hover:text-accent"
                      }`}>
                        {item.title}
                      </span>
                    </div>
                    <span className={`transition-transform duration-300 ${
                      isActive ? "text-accent translate-x-1" : "text-secondary/40 group-hover:text-accent group-hover:translate-x-1"
                    }`}>
                      <ChevronRight size={18} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Detail Panel with Image & Text */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-border/40 p-8 md:p-12 shadow-sm min-h-[500px] flex flex-col justify-between relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8 flex flex-col h-full justify-between"
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <h3 className="font-heading text-2xl md:text-3xl text-foreground font-light tracking-wide">
                        {servicesData[activeIdx].title}
                      </h3>
                      <span className="text-xs text-accent/80 font-mono tracking-widest pt-2">
                        VANYA / {servicesData[activeIdx].id}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-secondary font-light leading-relaxed text-justify-custom">
                      {servicesData[activeIdx].desc}
                    </p>

                    {/* Deliverables */}
                    <div className="space-y-4">
                      <h4 className="text-[9px] tracking-[0.25em] text-accent uppercase font-bold">
                        Studio Deliverables
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-secondary/90 font-light">
                        {servicesData[activeIdx].deliverables.map((deliv, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Panel Image Reveal */}
                  <div className="relative w-full h-48 sm:h-56 mt-8 overflow-hidden bg-stone-100 group/img">
                    <Image
                      src={servicesData[activeIdx].image}
                      alt={servicesData[activeIdx].title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover grayscale transition-all duration-700 group-hover/img:grayscale-0 group-hover/img:scale-102"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 3. THE DESIGN JOURNEY (Methodology Timeline) */}
        <section className="border-t border-border pt-20 mb-28 md:mb-36">
          <div className="max-w-xl mb-16">
            <span className="text-xs text-accent tracking-[0.2em] uppercase font-bold">
              02 / Our Process
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground font-light tracking-wide mt-3">
              The Tectonic Sequence.
            </h2>
            <p className="text-xs text-secondary mt-5 font-light leading-relaxed">
              We manage projects systematically. Every study flows through four distinct phases, ensuring aesthetic alignment and financial control.
            </p>
          </div>

          {/* Process Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {journeyPhases.map((phase, idx) => (
              <div 
                key={phase.num} 
                className="border border-border/40 p-6 md:p-8 bg-white/40 backdrop-blur-sm relative hover:border-accent/40 transition-colors duration-300"
              >
                {/* Gold Sequence Number */}
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs text-accent font-mono tracking-widest font-semibold">
                    PHASE {phase.num}
                  </span>
                  <span className="text-[9px] tracking-widest text-secondary/50 uppercase font-light">
                    {phase.phase}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl text-foreground font-light tracking-wide mb-4">
                  {phase.title}
                </h3>
                <p className="text-xs text-secondary font-light leading-relaxed text-justify-custom">
                  {phase.desc}
                </p>

                {/* Connecting Line (Only visible on large screens) */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[1px] bg-border/40 z-10" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 4. LUXURY CTA CALLOUT */}
        <section className="bg-white border border-border/60 p-8 md:p-16 text-center max-w-4xl mx-auto shadow-sm">
          <span className="text-[10px] tracking-[0.25em] text-accent uppercase font-bold">
            Start Your Journey
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-foreground font-light tracking-wide mt-4 mb-6">
            Ready to commission a design study?
          </h2>
          <p className="text-xs text-secondary font-light leading-relaxed max-w-xl mx-auto mb-10 text-center">
            Connect with Ar. Vighnesh S V at our Trivandrum studio to review your site parameters in Kerala, analyze zoning guides, and map out your residential or commercial volume schematics.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-accent hover:bg-accent/90 text-white text-xs tracking-[0.25em] uppercase font-medium transition-colors duration-300"
          >
            Connect with Us
          </Link>
        </section>
      </div>
    </div>
  );
}
