"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ChevronDown, CheckCircle } from "lucide-react";
import { insertDbLead } from "@/lib/supabase";

// Project Types for dropdown
const projectTypes = [
  "Select Project Type",
  "Luxury Residence",
  "Commercial / Office Workspace",
  "Hospitality / Wellness Resort",
  "Master Planning / Landscape Design",
  "Heritage / Restoration Consultation",
];

// Localized FAQs Data for Kerala Context
const faqs = [
  {
    question: "What is your typical project design timeline?",
    answer: "A bespoke residential design typically takes between 4 to 8 months from initial conceptual studies to securing building permits from local corporations or panchayats. Larger commercial projects or wellness resorts can span 9 to 14 months depending on site dimensions and municipal clearances.",
  },
  {
    question: "Do you design projects across all of Kerala?",
    answer: "Yes. While our primary design studio is located in Trivandrum, we undertake residential, commercial, and hospitality designs across all districts of Kerala (including Kochi, Calicut, Kottayam, and Wayanad) as well as selective national commissions.",
  },
  {
    question: "How do you design for Kerala's tropical monsoon climate?",
    answer: "Kerala's humid climate requires specific architectural responses. We integrate deep roof overhangs (chajjas) to protect walls from heavy monsoons, double-height volumes to encourage hot air escape, jaali screens for continuous natural cross-ventilation, and specify local materials like laterite stone, terracotta tiles, and weather-resistant timber.",
  },
  {
    question: "What is your fee structure for custom architecture?",
    answer: "Our fees are structured based on the project scope, typically calculated as a percentage of the total construction budget (ranging from 8% to 12% for comprehensive layout, structural coordination, and site supervision). For early-stage feasibility or layout advice, we offer fixed consulting fees.",
  },
  {
    question: "Do you supervise the construction phase?",
    answer: "Yes. We conduct regular site inspections to ensure structural casting, brickwork, and custom carpentry align with our drawings. We assist you in selecting reliable local contractors and material suppliers in Kerala to maintain high quality.",
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Select Project Type",
    message: "",
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertDbLead({
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        projectType: formState.projectType,
        message: formState.message,
      });
    } catch (err) {
      console.error("Error logging enquiry to database:", err);
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({
        name: "",
        email: "",
        phone: "",
        projectType: "Select Project Type",
        message: "",
      });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full bg-background pt-32 pb-24 md:pt-40 md:pb-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <span className="text-xs text-accent tracking-[0.2em] uppercase font-bold">
            Get In Touch
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl text-foreground font-light tracking-wide mt-4">
            Start a Project
          </h1>
          <p className="text-xs sm:text-sm text-secondary font-light mt-6 leading-relaxed max-w-lg">
            Let&apos;s build an enduring space together. Reach out to coordinate an initial consultation at our Trivandrum studio, or schedule a virtual session to discuss your site coordinates in Kerala.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-28">
          {/* Left Column: Studio Info & Map */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <h2 className="font-heading text-2xl text-foreground font-light tracking-wide">
                Find Us
              </h2>

              <div className="space-y-6 text-xs text-secondary font-light tracking-wide">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <span className="text-accent mt-0.5"><MapPin size={16} /></span>
                  <div>
                    <p className="font-semibold text-foreground uppercase tracking-widest text-[9px] mb-1">Kerala Studio Office</p>
                    <p className="leading-relaxed">Vanya Architects<br />Killy, Kattakada<br />Trivandrum, Kerala, India</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-start gap-4">
                  <span className="text-accent mt-0.5"><Phone size={16} /></span>
                  <div>
                    <p className="font-semibold text-foreground uppercase tracking-widest text-[9px] mb-1">Call Us</p>
                    <p className="leading-relaxed">+91 9746235886</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <span className="text-accent mt-0.5"><Mail size={16} /></span>
                  <div>
                    <p className="font-semibold text-foreground uppercase tracking-widest text-[9px] mb-1">Email Inquiries</p>
                    <a href="mailto:vanyaarchitects01@gmail.com" className="leading-relaxed hover:text-accent transition-colors block">
                      vanyaarchitects01@gmail.com
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <span className="text-accent mt-0.5"><Clock size={16} /></span>
                  <div>
                    <p className="font-semibold text-foreground uppercase tracking-widest text-[9px] mb-1">Office Hours</p>
                    <p className="leading-relaxed">Monday – Saturday: 10:00 – 19:00 IST<br />Sunday: By appointment only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Satellite View Embed */}
            <div className="border border-border/80 bg-neutral-100 aspect-[4/3] w-full relative overflow-hidden select-none group">
              <iframe
                title="Vanya Architects Satellite View"
                src="https://maps.google.com/maps?q=8.498955,77.070847&t=k&z=17&output=embed"
                className="w-full h-full border-0 filter brightness-95 contrast-105 transition-all duration-700"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Studio Name Overlay Badge */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="text-[10px] tracking-[0.2em] font-logo uppercase font-bold text-white bg-black/75 backdrop-blur-md px-3 py-1.5 border border-white/10 shadow-lg">
                  V Λ N Y Λ ARCHITECTS
                </span>
              </div>
              {/* External Link Overlay Button */}
              <a
                href="https://maps.app.goo.gl/GjWiPutoy9Nrbd7o9"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 z-10 text-[9px] tracking-[0.15em] text-white bg-black/75 backdrop-blur-md px-3.5 py-2 border border-white/10 shadow-lg uppercase font-medium hover:bg-accent transition-colors duration-300"
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-border/50 p-8 md:p-12 shadow-sm relative">
              <AnimatePresence>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="text-accent mb-6"
                    >
                      <CheckCircle size={52} strokeWidth={1.5} />
                    </motion.span>
                    <h3 className="font-heading text-3xl text-foreground font-light tracking-wide mb-4">
                      Message Received
                    </h3>
                    <p className="text-xs text-secondary leading-relaxed font-light max-w-sm">
                      Thank you for contacting Vanya Architects. We will review your project brief and get in touch within two business days.
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <h2 className="font-heading text-2xl text-foreground font-light tracking-wide mb-8">
                From Concept to Concrete.
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="flex flex-col border-b border-border/80 pb-2">
                  <label htmlFor="name" className="text-[9px] tracking-[0.2em] text-secondary uppercase font-semibold mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-transparent text-xs text-foreground placeholder-secondary/30 border-none outline-none focus:ring-0 py-1"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col border-b border-border/80 pb-2">
                  <label htmlFor="email" className="text-[9px] tracking-[0.2em] text-secondary uppercase font-semibold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className="w-full bg-transparent text-xs text-foreground placeholder-secondary/30 border-none outline-none focus:ring-0 py-1"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col border-b border-border/80 pb-2">
                  <label htmlFor="phone" className="text-[9px] tracking-[0.2em] text-secondary uppercase font-semibold mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="+91 97462 35886"
                    className="w-full bg-transparent text-xs text-foreground placeholder-secondary/30 border-none outline-none focus:ring-0 py-1"
                  />
                </div>

                {/* Project Type */}
                <div className="flex flex-col border-b border-border/80 pb-2">
                  <label htmlFor="projectType" className="text-[9px] tracking-[0.2em] text-secondary uppercase font-semibold mb-1">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formState.projectType}
                    onChange={handleChange}
                    className="w-full bg-transparent text-xs text-foreground border-none outline-none focus:ring-0 py-1 appearance-none cursor-pointer"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-white text-foreground">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col border-b border-border/80 pb-2">
                  <label htmlFor="message" className="text-[9px] tracking-[0.2em] text-secondary uppercase font-semibold mb-1">
                    Project Brief
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Describe your Kerala site location, dimensions, monsoon/topographic conditions, and design budget..."
                    className="w-full bg-transparent text-xs text-foreground placeholder-secondary/30 border-none outline-none focus:ring-0 py-1 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={formState.projectType === "Select Project Type" || !formState.name || !formState.email || !formState.message}
                  className="w-full py-4 bg-accent hover:bg-accent/90 disabled:bg-[#C4B7A9]/40 text-white text-xs tracking-[0.2em] uppercase transition-all duration-300 font-medium cursor-pointer"
                >
                  Send Briefing
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="border-t border-border pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <span className="text-xs text-accent tracking-[0.2em] uppercase font-bold">
                Frictionless Journey
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground font-light tracking-wide mt-3">
                Frequently Asked Inquiries
              </h2>
              <p className="text-xs text-secondary leading-relaxed font-light mt-6 max-w-sm">
                Answers to design process coordinates, fee structures, and project logistics.
              </p>
            </div>

            {/* Accordion */}
            <div className="lg:col-span-8 border-t border-border/80">
              {faqs.map((faq, i) => {
                const isOpen = activeFaq === i;
                return (
                  <div
                    key={i}
                    className="border-b border-border/80 py-6 transition-all duration-300 cursor-pointer"
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-heading text-lg md:text-xl text-foreground font-light tracking-wide">
                        {faq.question}
                      </h3>
                      <span
                        className={`text-accent transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <ChevronDown size={18} />
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
                        {faq.answer}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
