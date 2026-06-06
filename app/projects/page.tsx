"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Maximize2 } from "lucide-react";
import { projects, Project } from "@/data/projects";

const categories = ["All", "Residential", "Commercial", "Hospitality", "Institutional", "Urban Concepts"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects based on selected category
  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "All") return true;
    // Handle plural mapping if category is named slightly differently
    if (selectedCategory === "Urban Concepts") return project.category === "Urban Concepts";
    return project.category === selectedCategory;
  });

  // Support scrolling hash anchors if accessed from Home Page (e.g. /projects#villa-sands)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.substring(1);
      const project = projects.find((p) => p.id === id);
      if (project) {
        setSelectedProject(project);
      }
    }
  }, []);

  // Prevent scrolling when detail modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <div className="w-full bg-background pt-32 pb-24 md:pt-40 md:pb-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <span className="text-xs text-accent tracking-[0.2em] uppercase font-bold">
            Selected Works
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl text-foreground font-light tracking-wide mt-4">
            Our Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-secondary font-light mt-6 leading-relaxed max-w-lg">
            Explore our architectural studies spanning luxury private residences, corporate structures, cultural institutions, and speculative urban environments.
          </p>
        </div>

        {/* Category Filters */}
        <div className="border-b border-border pb-6 mb-12 overflow-x-auto whitespace-nowrap scrollbar-none flex justify-start items-center space-x-8 md:space-x-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 relative py-2 focus:outline-none cursor-pointer ${
                (category === "All" && selectedCategory === "All") ||
                selectedCategory === category
                  ? "text-accent"
                  : "text-foreground hover:text-accent"
              }`}
            >
              {category}
              {selectedCategory === category && (
                <motion.span
                  layoutId="activeCategoryLine"
                  className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Projects Masonry / Asymmetrical Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              // Create dynamic spacing layout
              let colSpan = "md:col-span-6";
              let aspect = "aspect-[4/3]";
              
              if (index % 3 === 0) {
                colSpan = "md:col-span-8";
                aspect = "aspect-[16/10]";
              } else if (index % 3 === 1) {
                colSpan = "md:col-span-4";
                aspect = "aspect-[3/4]";
              } else {
                colSpan = "md:col-span-12";
                aspect = "aspect-[21/9] md:h-[450px]";
              }

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className={`${colSpan} group cursor-pointer`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className={`relative ${aspect} w-full overflow-hidden bg-border mb-4`}>
                    <Image
                      src={project.heroImage}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-500 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-background/90 text-foreground p-3 rounded-none shadow-md transition-all duration-300 translate-y-3 group-hover:translate-y-0 text-xs tracking-widest uppercase flex items-center gap-2 font-medium">
                        View Details <Maximize2 size={12} className="text-accent" />
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start pt-2">
                    <div>
                      <p className="text-[9px] tracking-[0.2em] text-accent uppercase font-bold">
                        {project.category}
                      </p>
                      <h2 className="font-heading text-2xl text-foreground font-light tracking-wide mt-1 group-hover:text-accent transition-colors">
                        {project.name}
                      </h2>
                      <p className="text-xs text-secondary tracking-wider font-light mt-1">
                        {project.location}
                      </p>
                    </div>
                    <span className="text-xs text-secondary font-light mt-1 tracking-wider uppercase border border-border px-3 py-1 bg-white">
                      {project.year}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Elegant Full-screen Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="w-full max-w-4xl bg-background min-h-screen relative p-6 md:p-12 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 left-6 md:top-10 md:left-12 z-10 text-foreground bg-white p-3 border border-border hover:bg-accent hover:text-white transition-colors duration-300 shadow-sm focus:outline-none"
                aria-label="Close project view"
              >
                <X size={18} />
              </button>

              <div className="mt-16">
                {/* Modal Hero */}
                <div className="relative aspect-[16/9] w-full bg-border overflow-hidden mb-12">
                  <Image
                    src={selectedProject.heroImage}
                    alt={selectedProject.name}
                    fill
                    sizes="(max-width: 1200px) 100vw, 80vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/15" />
                </div>

                {/* Project Specs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
                  {/* Left Column: Title & Metadata */}
                  <div className="md:col-span-5 space-y-6">
                    <div>
                      <p className="text-[10px] tracking-[0.25em] text-accent uppercase font-bold mb-2">
                        {selectedProject.category}
                      </p>
                      <h2 className="font-heading text-3xl md:text-4xl text-foreground font-light tracking-wide leading-tight">
                        {selectedProject.name}
                      </h2>
                    </div>

                    <div className="border-t border-border pt-6 grid grid-cols-2 gap-4 text-xs font-light">
                      <div>
                        <p className="text-secondary uppercase tracking-widest text-[9px] mb-1 font-semibold">Location</p>
                        <p className="text-foreground tracking-wide">{selectedProject.location}</p>
                      </div>
                      <div>
                        <p className="text-secondary uppercase tracking-widest text-[9px] mb-1 font-semibold">Year</p>
                        <p className="text-foreground tracking-wide">{selectedProject.year}</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-secondary uppercase tracking-widest text-[9px] mb-1 font-semibold">Total Area</p>
                        <p className="text-foreground tracking-wide">{selectedProject.area}</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-secondary uppercase tracking-widest text-[9px] mb-1 font-semibold">Status</p>
                        <p className="text-foreground tracking-wide">Completed</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Description */}
                  <div className="md:col-span-7">
                    <p className="text-secondary font-light text-sm leading-relaxed text-justify-custom whitespace-pre-line">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>

                {/* Project Gallery Grid */}
                <div className="border-t border-border pt-12 mb-8">
                  <h3 className="font-heading text-2xl text-foreground font-light tracking-wide mb-8">
                    Interior & Detail Studies
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {selectedProject.gallery.map((imgUrl, i) => (
                      <div key={i} className="relative aspect-[4/3] w-full overflow-hidden bg-border group">
                        <Image
                          src={imgUrl}
                          alt={`${selectedProject.name} detail view ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover transition-transform duration-500 group-hover:scale-102"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Drawer Control */}
              <div className="border-t border-border pt-8 mt-12 flex justify-between items-center text-xs">
                <span className="text-secondary tracking-widest uppercase font-light">
                  Vanya &copy; {new Date().getFullYear()}
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-foreground hover:text-accent font-semibold tracking-widest uppercase flex items-center gap-2"
                >
                  Return to Portfolio <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
