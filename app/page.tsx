"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Compass, Eye, Shield, Leaf } from "lucide-react";
import { projects as staticProjects, Project } from "@/data/projects";
import { getDbProjects } from "@/lib/supabase";

// Services Data
const services = [
  {
    id: "s1",
    title: "Architecture Design",
    desc: "From volumetric concept to structural execution. We design private residences, civic landmarks, and commercial developments that harmonize with their environments and withstand the test of time.",
  },
  {
    id: "s2",
    title: "Interior Architecture",
    desc: "A continuation of the building's outer voice. We curate bespoke interior environments featuring rich, natural materials, tactile details, custom joinery, and tailored spatial choreography.",
  },
  {
    id: "s3",
    title: "Master Planning",
    desc: "Large-scale site strategies that weave community, natural topography, and infrastructure into cohesive urban and rural frameworks, promoting long-term growth and environmental balance.",
  },
  {
    id: "s4",
    title: "Landscape Integration",
    desc: "Architecture does not sit on the land; it belongs to it. We draft seamless indoor-outdoor flows, specifying native plantings, private courtyards, and integrated water features.",
  },
  {
    id: "s5",
    title: "Commercial Design",
    desc: "High-performance workspaces, high-end retail flagships, and corporate environments that communicate brand identity through premium spatial design and tactile materials.",
  },
  {
    id: "s6",
    title: "Consultation",
    desc: "Expert advisory services covering project feasibility, zoning compliance, sustainable material sourcing, and architectural heritage restoration.",
  },
];

// Why Vanya Data
const coreStrengths = [
  {
    title: "Timeless Design",
    desc: "We avoid transient trends. Our structures are planned to age gracefully, acquiring character and depth over decades through the choice of raw, natural materials.",
    icon: Compass,
  },
  {
    title: "Human-Centered Thinking",
    desc: "We study how people move, breathe, and interact within a space. Every layout and window placement is designed to nurture well-being and visual comfort.",
    icon: Eye,
  },
  {
    title: "Attention to Detail",
    desc: "From the alignment of concrete formwork to the texture of a handrail, we believe the micro-details define the macro-experience of luxury.",
    icon: Shield,
  },
  {
    title: "Sustainable Vision",
    desc: "Passive solar principles, low-carbon materials, and high-efficiency geothermal envelopes are default considerations in every project we construct.",
    icon: Leaf,
  },
];

export default function HomePage() {
  const [activeService, setActiveService] = useState<number | null>(0);
  const [frame, setFrame] = useState(1);
  const [maxFrame, setMaxFrame] = useState(1);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [projectsList, setProjectsList] = useState<Project[]>(staticProjects);
  const totalFrames = 152;

  useEffect(() => {
    getDbProjects().then((data) => {
      setProjectsList(data);
    });
  }, []);

  useEffect(() => {
    let isCancelled = false;
    const preloadImages: HTMLImageElement[] = [];

    const loadFrame = (index: number) => {
      if (isCancelled || index > totalFrames) return;

      const img = new window.Image();
      img.src = `/Landing_animation/frame-${String(index).padStart(3, '0')}.jpg`;
      
      img.onload = () => {
        if (isCancelled) return;
        
        // Start animation once the first 30 frames are ready
        if (index === 30) {
          setIsPreloaded(true);
          setMaxFrame(30);
        } else if (index > 30) {
          // Increment the loop limit progressively in batches of 10 to reduce re-renders
          if (index % 10 === 0 || index === totalFrames) {
            setMaxFrame(index);
          }
        }
        
        loadFrame(index + 1);
      };
      
      img.onerror = () => {
        if (isCancelled) return;
        // Skip frame on load failure to prevent halting the queue
        loadFrame(index + 1);
      };
      
      preloadImages.push(img);
    };

    // Begin sequential queue loading from frame 1
    loadFrame(1);

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isPreloaded) return;

    const interval = setInterval(() => {
      setFrame((prev) => {
        if (prev >= totalFrames) {
          clearInterval(interval);
          return totalFrames;
        }
        if (prev < maxFrame) {
          return prev + 1;
        }
        return prev;
      });
    }, 40); // 25 FPS (40ms interval)

    return () => clearInterval(interval);
  }, [isPreloaded, maxFrame, totalFrames]);

  // Take the first 4 projects for the Featured Projects section
  const featuredProjects = projectsList.slice(0, 4);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Hero Background Image Sequence */}
        <div className="absolute inset-0 z-0">
          <img
            src={`/Landing_animation/frame-${String(frame).padStart(3, '0')}.jpg`}
            alt="Vanya Luxury Architecture Hero Background"
            className="w-full h-full object-cover scale-102 select-none"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Custom Watermark SVG Overlay */}
        <div className="absolute inset-0 z-1 pointer-events-none flex items-center justify-center select-none overflow-hidden">
          <svg
            width="1534"
            height="1024"
            viewBox="0 0 1534 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full md:w-auto md:h-[110%] opacity-15 scale-95 md:scale-100 transition-opacity duration-1000"
          >
            <circle cx="645.243" cy="519" r="372.804" stroke="white" strokeOpacity="0.5" strokeWidth="2.5"/>
            <path d="M0 60.7837H93.5135L402.108 706.027L350.676 799.54L0 60.7837Z" fill="white" fillOpacity="0.5"/>
            <path d="M93.1982 61.2837L401.546 706.01L350.708 798.443L0.791016 61.2837H93.1982Z" stroke="white" strokeOpacity="0.5"/>
            <path d="M865 303.919L911.757 201.054L1253.08 930.46H1159.57L865 303.919Z" fill="white" fillOpacity="0.5"/>
            <path d="M1252.29 929.959H1159.89L865.55 303.916L911.763 202.248L1252.29 929.959Z" stroke="white" strokeOpacity="0.5"/>
            <path d="M813.568 0L869.676 102.865L434.838 986.568L392.757 874.351L813.568 0Z" fill="white" fillOpacity="0.5"/>
            <path d="M869.112 102.876L434.899 985.31L393.299 874.375L813.596 1.09473L869.112 102.876Z" stroke="white" strokeOpacity="0.5"/>
            <line x1="1254.33" y1="23.3784" x2="1254.33" y2="1023.97" stroke="white" strokeOpacity="0.5" strokeWidth="2.5"/>
            <line x1="533.405" y1="990.966" x2="1534" y2="990.966" stroke="white" strokeOpacity="0.5" strokeWidth="2.5"/>
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center flex flex-col items-center justify-center mt-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-sans font-extralight text-4xl sm:text-6xl md:text-8xl text-white tracking-wide leading-[1.15] max-w-5xl"
          >
            Where Nature Meets <br />
            High Design.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xs sm:text-sm md:text-base text-white/80 tracking-[0.15em] font-light max-w-4xl mt-8 mb-12 leading-relaxed"
          >
            We don’t just design spaces—we curate environments where luxury breathes. <br className="hidden md:inline" />
            VANYA blends avant-garde architecture with organic elements, shaping <br className="hidden md:inline" />
            bespoke residences that stand as quiet testaments to timeless design
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-2xl"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto min-w-[240px] px-8 py-4 bg-transparent hover:bg-white/10 border border-white/60 hover:border-white text-white text-xs tracking-[0.25em] uppercase transition-all duration-300 text-center font-medium"
            >
              Commission a Design
            </Link>
            <Link
              href="/projects"
              className="relative w-full sm:w-auto min-w-[240px] px-8 py-4 bg-transparent hover:bg-white/10 border border-white/60 hover:border-white text-white text-xs tracking-[0.25em] uppercase transition-all duration-300 text-center font-medium flex flex-col items-center justify-center group"
            >
              <span>View Projects</span>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/40 tracking-[0.1em] font-light transition-opacity group-hover:text-white/70">
                \
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/50 mb-2 font-light">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-[1px] h-12 bg-white/40"
          />
        </motion.div>
      </section>

      {/* 2. PHILOSOPHY SECTION */}
      <section className="py-24 md:py-36 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <span className="text-xs text-accent tracking-[0.2em] uppercase font-bold">
                Our Philosophy
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground font-light tracking-wide mt-4 leading-tight">
                Architecture
                <br />
                Beyond Buildings
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6 text-secondary font-light leading-relaxed text-sm md:text-base">
              <p className="text-lg md:text-xl text-foreground/90 font-light italic">
                “We do not construct modules of convenience. We sculpt permanent responses to the landscape, creating spatial thresholds where nature and human life exist in perpetual dialogue.”
              </p>
              <p className="text-justify-custom">
                At Vanya, our practice is anchored in functional and thoughtful design, tectonic integrity, and the emotional resonance of space. We believe that architecture holds the power to shape experience—that a perfectly placed skylight, the raw weight of cast concrete, or a transition from granite to oak can define a daily ritual.
              </p>
              <p className="text-justify-custom">
                We select projects that invite critical design inquiry. Whether developing a luxury clifftop residence, a quiet corporate headquarters, or a self-sustaining urban concept, our team works with a select group of clients to transform requirements into structural works of art.
              </p>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center text-xs tracking-[0.2em] text-accent uppercase font-semibold group"
                >
                  Learn More About Our Studio
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SECTION */}
      <section className="py-24 bg-[#FAF8F5] border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs text-accent tracking-[0.2em] uppercase font-bold">
                Selected Works
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground font-light tracking-wide mt-3">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center text-xs tracking-[0.2em] text-foreground uppercase hover:text-accent font-semibold mt-4 md:mt-0 transition-colors group"
            >
              Explore Full Portfolio
              <ArrowRight size={14} className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>

          {/* Grid Layout of Featured Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/projects#${project.id}`} data-cursor="view">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-border mb-6">
                    <Image
                      src={project.heroImage}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] text-accent uppercase font-bold mb-1">
                        {project.category}
                      </p>
                      <h3 className="font-heading text-2xl text-foreground font-light tracking-wide group-hover:text-accent transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-secondary tracking-wider font-light mt-1">
                        {project.location}
                      </p>
                    </div>
                    <span className="text-xs text-secondary font-light mt-2 tracking-wider">
                      {project.year}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section className="py-24 md:py-36 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Header Col */}
            <div className="lg:col-span-4">
              <span className="text-xs text-accent tracking-[0.2em] uppercase font-bold">
                Expertise
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground font-light tracking-wide mt-4">
                Disciplines of
                <br />
                Vanya
              </h2>
              <p className="text-xs text-secondary leading-relaxed font-light mt-6 max-w-sm">
                We approach each scale of project with the same material rigor, environmental awareness, and emotional intentionality.
              </p>
            </div>

            {/* Accordion list */}
            <div className="lg:col-span-8 border-t border-border">
              {services.map((service, index) => {
                const isOpen = activeService === index;
                return (
                  <div
                    key={service.id}
                    className="border-b border-border py-6 transition-all duration-300 cursor-pointer"
                    onClick={() => setActiveService(isOpen ? null : index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-heading text-xl md:text-2xl text-foreground font-light tracking-wide">
                        {service.title}
                      </h3>
                      <span
                        className={`text-accent transition-transform duration-300 ${
                          isOpen ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        <ChevronRight size={20} />
                      </span>
                    </div>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={
                        isOpen
                          ? { height: "auto", opacity: 1, marginTop: "1rem" }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs md:text-sm text-secondary font-light leading-relaxed max-w-2xl">
                        {service.desc}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY VANYA SECTION */}
      <section className="py-24 md:py-32 bg-[#FAF8F5] border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-xl mx-auto mb-20">
            <span className="text-xs text-accent tracking-[0.2em] uppercase font-bold">
              Our Value Blueprint
            </span>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground font-light tracking-wide mt-3">
              Why Vanya Studio
            </h2>
            <p className="text-xs text-secondary mt-4 font-light tracking-wider leading-relaxed">
              We stand apart through our devotion to materials, micro-details, and climate-positive design thinking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreStrengths.map((strength, index) => {
              const Icon = strength.icon;
              return (
                <motion.div
                  key={strength.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border border-border/50 p-8 flex flex-col items-start hover:border-accent/40 transition-colors duration-300"
                >
                  <span className="text-accent mb-6 bg-background p-3 rounded-none">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <h3 className="font-heading text-xl text-foreground tracking-wide font-light mb-4">
                    {strength.title}
                  </h3>
                  <p className="text-xs text-secondary font-light leading-relaxed">
                    {strength.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="relative py-28 md:py-40 bg-dark-accent text-background overflow-hidden">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
          <div className="w-[800px] h-[800px] rounded-full border border-background absolute -top-40 -left-40" />
          <div className="w-[800px] h-[800px] rounded-full border border-background absolute -bottom-40 -right-40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          <span className="text-xs text-accent tracking-[0.3em] uppercase font-semibold mb-4">
            Collaborate With Us
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl text-white font-light tracking-wide leading-tight mb-8">
            Let&apos;s Create Something
            <br />
            Extraordinary
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#C4B7A9] tracking-wide font-light max-w-2xl mb-12 leading-relaxed">
            We partner with visionary homeowners, business developers, and civic organizations worldwide to realize environments that set new standards.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-10 py-5 bg-accent hover:bg-accent/90 text-white text-xs tracking-[0.25em] uppercase transition-all duration-300"
          >
            Start a Conversation
            <ArrowRight size={14} className="ml-3" />
          </Link>
        </div>
      </section>
    </div>
  );
}
