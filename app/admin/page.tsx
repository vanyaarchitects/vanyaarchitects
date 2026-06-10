"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  FolderGit, 
  MessageSquare, 
  LogOut, 
  LayoutDashboard, 
  MapPin, 
  Calendar, 
  Maximize, 
  ChevronRight, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Clock,
  Edit
} from "lucide-react";
import { getDbProjects, insertDbProject, updateDbProject, deleteDbProject, getDbLeads, updateLeadStatus, isSupabaseConfigured, Lead } from "@/lib/supabase";
import { Project } from "@/data/projects";

type Tab = "overview" | "projects" | "inquiries";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  
  // Data States
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [leadsList, setLeadsList] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Project Form States
  const [showAddModal, setShowAddModal] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  
  const [newProject, setNewProject] = useState({
    id: "",
    name: "",
    category: "Residential" as Project["category"],
    location: "",
    area: "",
    year: "",
    description: "",
    heroImage: "",
    galleryUrls: "", // Comma-separated
  });

  useEffect(() => {
    // Authenticate check
    const isLoggedIn = localStorage.getItem("vanya_admin_session") === "active";
    if (!isLoggedIn) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
      loadDashboardData();
    }
  }, [router]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const projects = await getDbProjects();
      setProjectsList(projects);
      
      const leads = await getDbLeads();
      setLeadsList(leads);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("vanya_admin_session");
    router.push("/admin/login");
  };

  // Convert File upload to Base64 String for easy storing
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "heroImage" | "gallery") => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (field === "heroImage") {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProject(prev => ({ ...prev, heroImage: reader.result as string }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      // Gallery Multiple
      const base64Promises = Array.from(files).map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(base64Promises).then((results) => {
        setNewProject(prev => {
          const current = prev.galleryUrls ? prev.galleryUrls.split(",") : [];
          const combined = [...current, ...results].filter(Boolean);
          return { ...prev, galleryUrls: combined.join(",") };
        });
      });
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setIsSubmitting(true);

    if (!isSupabaseConfigured) {
      setFormError("Saving failed. Database connection credentials are missing. Please configure Supabase variables.");
      setIsSubmitting(false);
      return;
    }

    if (!newProject.id || !newProject.name || !newProject.location || !newProject.heroImage) {
      setFormError("Please fill out all required fields, including Hero Image.");
      setIsSubmitting(false);
      return;
    }

    const formattedId = newProject.id.toLowerCase().replace(/\s+/g, "-");

    try {
      const galleryArray = newProject.galleryUrls
        ? newProject.galleryUrls.split(",").map(url => url.trim()).filter(Boolean)
        : [newProject.heroImage]; // Default to heroImage if empty

      const projectData = {
        id: formattedId,
        name: newProject.name,
        category: newProject.category,
        location: newProject.location,
        area: newProject.area || "N/A",
        year: newProject.year || new Date().getFullYear().toString(),
        description: newProject.description,
        heroImage: newProject.heroImage,
        gallery: galleryArray,
      };

      if (isEditing && editingProjectId) {
        await updateDbProject(editingProjectId, projectData);
        setFormSuccess("Project successfully updated in database!");
      } else {
        await insertDbProject(projectData);
        setFormSuccess("Project successfully published to database!");
      }

      setNewProject({
        id: "",
        name: "",
        category: "Residential",
        location: "",
        area: "",
        year: "",
        description: "",
        heroImage: "",
        galleryUrls: "",
      });
      setIsEditing(false);
      setEditingProjectId(null);
      
      // Reload lists
      loadDashboardData();
      setTimeout(() => {
        setShowAddModal(false);
        setFormSuccess("");
      }, 1500);
    } catch (err: any) {
      setFormError(err.message || "An error occurred while saving project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}" from the database?`)) return;

    try {
      await deleteDbProject(id);
      setProjectsList(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to delete project. Make sure Supabase is configured.");
      console.error(err);
    }
  };

  const handleUpdateLeadStatus = async (id: string, currentStatus: string) => {
    const nextStatusMap: Record<string, string> = {
      "new": "contacted",
      "contacted": "archived",
      "archived": "new"
    };
    
    const nextStatus = nextStatusMap[currentStatus] || "new";

    try {
      await updateLeadStatus(id, nextStatus);
      setLeadsList(prev => prev.map(lead => lead.id === id ? { ...lead, status: nextStatus } : lead));
    } catch (err) {
      alert("Failed to update status.");
      console.error(err);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#1C1C1C] font-sans flex flex-col md:flex-row select-none">
      
      {/* 1. ADMIN PANEL SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#1C1C1C] text-white flex flex-col justify-between p-6 border-r border-[#B08D57]/20">
        <div className="space-y-8">
          {/* Logo Brand */}
          <div className="border-b border-stone-800 pb-6">
            <h2 className="font-heading text-xl tracking-[0.15em] font-light">V Λ N Y Λ</h2>
            <p className="text-[8px] text-[#B08D57] tracking-[0.25em] uppercase font-semibold mt-1">Studio Manager</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs tracking-wider uppercase font-semibold transition-colors cursor-pointer ${
                activeTab === "overview" 
                  ? "bg-[#B08D57] text-white" 
                  : "text-stone-400 hover:text-white hover:bg-stone-900/50"
              }`}
            >
              <LayoutDashboard size={14} />
              Overview
            </button>
            
            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs tracking-wider uppercase font-semibold transition-colors cursor-pointer ${
                activeTab === "projects" 
                  ? "bg-[#B08D57] text-white" 
                  : "text-stone-400 hover:text-white hover:bg-stone-900/50"
              }`}
            >
              <FolderGit size={14} />
              Projects ({projectsList.length})
            </button>

            <button
              onClick={() => setActiveTab("inquiries")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs tracking-wider uppercase font-semibold transition-colors cursor-pointer ${
                activeTab === "inquiries" 
                  ? "bg-[#B08D57] text-white" 
                  : "text-stone-400 hover:text-white hover:bg-stone-900/50"
              }`}
            >
              <MessageSquare size={14} />
              Inquiries ({leadsList.filter(l => l.status === "new").length} New)
            </button>
          </nav>
        </div>

        {/* User logout section */}
        <div className="border-t border-stone-800 pt-6 mt-8 md:mt-0 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-stone-400">Authenticated</span>
            <span className="text-xs font-semibold text-[#B08D57]">Administrator</span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-stone-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-grow p-6 md:p-10 max-h-screen overflow-y-auto">
        {/* Status Warnings */}
        {!isSupabaseConfigured && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 text-xs flex items-center gap-3 mb-6 shadow-sm">
            <AlertCircle size={16} className="text-amber-600 flex-shrink-0" />
            <div>
              <span className="font-bold">Development Mode Fallback Active:</span> Supabase environment variables are not configured. Currently displaying static files. Database actions (adding projects, logging messages) will log warnings.
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="w-full h-96 flex items-center justify-center">
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400 animate-pulse">Synchronizing database state...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div>
                  <span className="text-xs text-[#B08D57] tracking-wider uppercase font-semibold">Studio Health</span>
                  <h1 className="font-heading text-3xl md:text-4xl font-light tracking-wide mt-1 text-[#1C1C1C]">Control Dashboard</h1>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white border border-stone-200 p-6 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold">Total Projects</p>
                      <h3 className="text-3xl font-light mt-2">{projectsList.length}</h3>
                    </div>
                    <span className="text-[#B08D57]"><FolderGit size={24} strokeWidth={1} /></span>
                  </div>

                  <div className="bg-white border border-stone-200 p-6 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold">New Enquiries</p>
                      <h3 className="text-3xl font-light mt-2 text-[#B08D57]">
                        {leadsList.filter(l => l.status === "new").length}
                      </h3>
                    </div>
                    <span className="text-[#B08D57]"><MessageSquare size={24} strokeWidth={1} /></span>
                  </div>

                  <div className="bg-white border border-stone-200 p-6 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold">Total Inquiries</p>
                      <h3 className="text-3xl font-light mt-2">{leadsList.length}</h3>
                    </div>
                    <span className="text-stone-400"><FileText size={24} strokeWidth={1} /></span>
                  </div>
                </div>

                {/* Quick Lists split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Inquiries List */}
                  <div className="bg-white border border-stone-200 p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
                    <div>
                      <h3 className="text-sm font-semibold tracking-wider uppercase border-b border-stone-100 pb-4 flex items-center gap-2">
                        <Clock size={14} className="text-[#B08D57]" />
                        Recent Enquiries
                      </h3>
                      <div className="mt-4 space-y-4">
                        {leadsList.slice(0, 3).map((lead) => (
                          <div key={lead.id} className="text-xs border-b border-stone-50 pb-3 last:border-0 last:pb-0">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-semibold">{lead.name}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[8px] uppercase font-semibold ${
                                lead.status === "new" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                              }`}>
                                {lead.status}
                              </span>
                            </div>
                            <p className="text-stone-400 text-[10px]">{lead.projectType}</p>
                            <p className="text-stone-500 mt-1 line-clamp-1 italic">“{lead.message}”</p>
                          </div>
                        ))}
                        {leadsList.length === 0 && (
                          <p className="text-xs text-stone-400 italic py-8 text-center">No inquiries received yet.</p>
                        )}
                      </div>
                    </div>
                    {leadsList.length > 0 && (
                      <button 
                        onClick={() => setActiveTab("inquiries")}
                        className="mt-6 text-xs text-[#B08D57] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        View All Inquiries <ChevronRight size={14} />
                      </button>
                    )}
                  </div>

                  {/* Dynamic Projects Overview */}
                  <div className="bg-white border border-stone-200 p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
                    <div>
                      <h3 className="text-sm font-semibold tracking-wider uppercase border-b border-stone-100 pb-4 flex items-center gap-2">
                        <FolderGit size={14} className="text-[#B08D57]" />
                        Latest Project Additions
                      </h3>
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        {projectsList.slice(0, 3).map((p) => (
                          <div key={p.id} className="relative aspect-square bg-stone-100 border border-stone-200 overflow-hidden group">
                            <img src={p.heroImage} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                            <div className="absolute inset-x-0 bottom-0 bg-black/70 p-2 text-[9px] text-white truncate font-medium">
                              {p.name}
                            </div>
                          </div>
                        ))}
                      </div>
                      {projectsList.length === 0 && (
                        <p className="text-xs text-stone-400 italic py-8 text-center">No projects added yet.</p>
                      )}
                    </div>
                    <div className="flex gap-4 mt-6">
                      <button 
                        onClick={() => {
                          setNewProject({
                            id: "",
                            name: "",
                            category: "Residential",
                            location: "",
                            area: "",
                            year: "",
                            description: "",
                            heroImage: "",
                            galleryUrls: "",
                          });
                          setIsEditing(false);
                          setEditingProjectId(null);
                          setShowAddModal(true);
                        }}
                        className="text-xs bg-[#B08D57] hover:bg-[#B08D57]/90 text-white px-4 py-2 font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus size={14} /> Add Project
                      </button>
                      <button 
                        onClick={() => setActiveTab("projects")}
                        className="text-xs border border-stone-300 hover:border-stone-800 text-stone-600 hover:text-stone-900 px-4 py-2 font-semibold cursor-pointer"
                      >
                        Manage Projects
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === "projects" && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-[#B08D57] tracking-wider uppercase font-semibold">Portfolio Showcase</span>
                    <h1 className="font-heading text-3xl font-light tracking-wide mt-1">Manage Projects</h1>
                  </div>
                  <button
                    onClick={() => {
                      setNewProject({
                        id: "",
                        name: "",
                        category: "Residential",
                        location: "",
                        area: "",
                        year: "",
                        description: "",
                        heroImage: "",
                        galleryUrls: "",
                      });
                      setIsEditing(false);
                      setEditingProjectId(null);
                      setShowAddModal(true);
                    }}
                    className="bg-[#B08D57] hover:bg-[#B08D57]/90 text-white text-xs tracking-wider uppercase font-bold py-3 px-6 flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Plus size={16} />
                    New Project
                  </button>
                </div>

                {/* List Table of Projects */}
                <div className="bg-white border border-stone-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-stone-50 border-b border-stone-200 text-[10px] tracking-wider uppercase text-stone-400">
                        <th className="py-4 px-6 font-semibold">Thumbnail</th>
                        <th className="py-4 px-6 font-semibold">Project Name</th>
                        <th className="py-4 px-6 font-semibold">Category</th>
                        <th className="py-4 px-6 font-semibold">Location</th>
                        <th className="py-4 px-6 font-semibold">Scale</th>
                        <th className="py-4 px-6 font-semibold">Year</th>
                        <th className="py-4 px-6 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-stone-100">
                      {projectsList.map((project) => (
                        <tr key={project.id} className="hover:bg-stone-50/55 transition-colors">
                          <td className="py-3 px-6">
                            <div className="w-12 h-12 bg-stone-100 border border-stone-200 overflow-hidden relative">
                              <img src={project.heroImage} alt={project.name} className="w-full h-full object-cover" />
                            </div>
                          </td>
                          <td className="py-3 px-6 font-semibold text-stone-800">{project.name}</td>
                          <td className="py-3 px-6 text-stone-400">{project.category}</td>
                          <td className="py-3 px-6">{project.location}</td>
                          <td className="py-3 px-6">{project.area}</td>
                          <td className="py-3 px-6 font-mono text-stone-500">{project.year}</td>
                          <td className="py-3 px-6 text-right flex justify-end gap-1">
                            <button
                              onClick={() => {
                                setNewProject({
                                  id: project.id,
                                  name: project.name,
                                  category: project.category,
                                  location: project.location,
                                  area: project.area,
                                  year: project.year,
                                  description: project.description || "",
                                  heroImage: project.heroImage,
                                  galleryUrls: project.gallery ? project.gallery.join(",") : "",
                                });
                                setIsEditing(true);
                                setEditingProjectId(project.id);
                                setShowAddModal(true);
                              }}
                              className="text-stone-400 hover:text-[#B08D57] p-2 transition-colors cursor-pointer"
                              title="Edit Project"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id, project.name)}
                              className="text-stone-400 hover:text-red-500 p-2 transition-colors cursor-pointer"
                              title="Delete Project"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {projectsList.length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-stone-400 italic">No projects found. Create one above to get started.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* INQUIRIES TAB */}
            {activeTab === "inquiries" && (
              <motion.div
                key="inquiries"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs text-[#B08D57] tracking-wider uppercase font-semibold">Inbound Leads</span>
                  <h1 className="font-heading text-3xl font-light tracking-wide mt-1">Client Inquiries</h1>
                </div>

                <div className="bg-white border border-stone-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-stone-50 border-b border-stone-200 text-[10px] tracking-wider uppercase text-stone-400">
                        <th className="py-4 px-6 font-semibold">Status</th>
                        <th className="py-4 px-6 font-semibold">Client Name</th>
                        <th className="py-4 px-6 font-semibold">Contact Info</th>
                        <th className="py-4 px-6 font-semibold">Project Type</th>
                        <th className="py-4 px-6 font-semibold">Message Detail</th>
                        <th className="py-4 px-6 font-semibold text-right">Cycle Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-stone-100">
                      {leadsList.map((lead) => (
                        <tr key={lead.id} className="hover:bg-stone-50/55 transition-colors">
                          <td className="py-4 px-6">
                            <span className={`px-2.5 py-1 rounded-full text-[9px] uppercase font-bold ${
                              lead.status === "new" 
                                ? "bg-amber-100 text-amber-800" 
                                : lead.status === "contacted"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-stone-100 text-stone-600"
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-semibold text-stone-800">{lead.name}</td>
                          <td className="py-4 px-6">
                            <div className="space-y-0.5">
                              <p className="font-medium">{lead.email}</p>
                              {lead.phone && <p className="text-stone-400 font-mono">{lead.phone}</p>}
                            </div>
                          </td>
                          <td className="py-4 px-6 font-medium text-[#B08D57]">{lead.projectType}</td>
                          <td className="py-4 px-6 max-w-xs">
                            <p className="line-clamp-2 text-stone-600 leading-relaxed italic">“{lead.message}”</p>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => handleUpdateLeadStatus(lead.id!, lead.status!)}
                              className="text-xs border border-stone-200 hover:border-stone-800 text-stone-500 hover:text-stone-800 py-1.5 px-3 rounded-md transition-all cursor-pointer font-medium tracking-wide"
                            >
                              Move State
                            </button>
                          </td>
                        </tr>
                      ))}
                      {leadsList.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-stone-400 italic">No enquiries received yet. Form submissions will log here automatically.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        )}
      </main>

      {/* 3. ADD PROJECT DIALOG MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#B08D57]/20 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8"
          >
            {/* Header */}
            <div className="flex justify-between items-start border-b border-stone-100 pb-4 mb-6">
              <div>
                <h3 className="font-heading text-2xl text-stone-800 font-light">
                  {isEditing ? "Edit Portfolio Showcase" : "New Portfolio Showcase"}
                </h3>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">
                  {isEditing ? "Modify coordinates in database" : "Submit coordinates directly to database"}
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-800 text-xl font-light cursor-pointer"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-xs flex items-center gap-2 mb-6">
                <AlertCircle size={14} className="text-red-600 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-xs flex items-center gap-2 mb-6">
                <CheckCircle size={14} className="text-green-600 flex-shrink-0" />
                <span>{formSuccess}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleCreateProject} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ID */}
                <div className="space-y-1">
                  <label className="text-[9px] tracking-widest uppercase text-stone-400 font-semibold">Project ID / Slug (required)</label>
                  <input
                    type="text"
                    value={newProject.id}
                    onChange={(e) => setNewProject(prev => ({ ...prev, id: e.target.value }))}
                    placeholder="e.g. villa-residence"
                    required
                    disabled={isEditing}
                    className={`w-full border border-stone-200 p-3 bg-stone-50 focus:bg-white focus:border-[#B08D57] outline-none transition-colors ${
                      isEditing ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  />
                </div>
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[9px] tracking-widest uppercase text-stone-400 font-semibold">Project Name (required)</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Villa Residence"
                    required
                    className="w-full border border-stone-200 p-3 bg-stone-50 focus:bg-white focus:border-[#B08D57] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category */}
                <div className="space-y-1">
                  <label className="text-[9px] tracking-widest uppercase text-stone-400 font-semibold">Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject(prev => ({ ...prev, category: e.target.value as Project["category"] }))}
                    className="w-full border border-stone-200 p-3 bg-stone-50 focus:bg-white focus:border-[#B08D57] outline-none transition-colors"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Institutional">Institutional</option>
                    <option value="Urban Concepts">Urban Concepts</option>
                  </select>
                </div>
                {/* Location */}
                <div className="space-y-1">
                  <label className="text-[9px] tracking-widest uppercase text-stone-400 font-semibold">Location (required)</label>
                  <input
                    type="text"
                    value={newProject.location}
                    onChange={(e) => setNewProject(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. Trivandrum, Kerala"
                    required
                    className="w-full border border-stone-200 p-3 bg-stone-50 focus:bg-white focus:border-[#B08D57] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Scale / Area */}
                <div className="space-y-1">
                  <label className="text-[9px] tracking-widest uppercase text-stone-400 font-semibold">Scale / Build Area</label>
                  <input
                    type="text"
                    value={newProject.area}
                    onChange={(e) => setNewProject(prev => ({ ...prev, area: e.target.value }))}
                    placeholder="e.g. 450 m²"
                    className="w-full border border-stone-200 p-3 bg-stone-50 focus:bg-white focus:border-[#B08D57] outline-none transition-colors"
                  />
                </div>
                {/* Year */}
                <div className="space-y-1">
                  <label className="text-[9px] tracking-widest uppercase text-stone-400 font-semibold">Year of Handover</label>
                  <input
                    type="text"
                    value={newProject.year}
                    onChange={(e) => setNewProject(prev => ({ ...prev, year: e.target.value }))}
                    placeholder="e.g. 2025"
                    className="w-full border border-stone-200 p-3 bg-stone-50 focus:bg-white focus:border-[#B08D57] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[9px] tracking-widest uppercase text-stone-400 font-semibold">Project Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the architectural concept, materials, and passive design details..."
                  rows={4}
                  className="w-full border border-stone-200 p-3 bg-stone-50 focus:bg-white focus:border-[#B08D57] outline-none transition-colors resize-none"
                />
              </div>

              {/* Image Upload Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-stone-100 pt-4">
                {/* Hero Image */}
                <div className="space-y-2">
                  <label className="text-[9px] tracking-widest uppercase text-[#B08D57] font-bold block">Hero / Thumbnail Image (required)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "heroImage")}
                    className="block w-full text-[10px] text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-stone-100 file:text-[#B08D57] hover:file:bg-[#B08D57]/10 cursor-pointer"
                  />
                  {newProject.heroImage && (
                    <div className="relative w-24 h-16 border border-stone-200 overflow-hidden mt-2">
                      <img src={newProject.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Gallery Upload */}
                <div className="space-y-2">
                  <label className="text-[9px] tracking-widest uppercase text-[#B08D57] font-bold block">Gallery Images (optional)</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "gallery")}
                    className="block w-full text-[10px] text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-stone-100 file:text-[#B08D57] hover:file:bg-[#B08D57]/10 cursor-pointer"
                  />
                  <p className="text-[9px] text-stone-400 mt-1">You can upload multiple files at once.</p>
                  
                  {/* Gallery previews */}
                  {newProject.galleryUrls && (
                    <div className="flex flex-wrap gap-2 mt-2 max-h-16 overflow-y-auto">
                      {newProject.galleryUrls.split(",").map((url, i) => (
                        <div key={i} className="relative w-12 h-8 border border-stone-200 overflow-hidden">
                          <img src={url} alt="Gallery Preview" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 border-t border-stone-100 pt-5 mt-6 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="border border-stone-200 hover:border-stone-800 text-stone-600 hover:text-stone-900 py-3 px-6 text-xs tracking-wider uppercase font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#B08D57] hover:bg-[#B08D57]/90 disabled:bg-[#B08D57]/50 text-white py-3 px-6 text-xs tracking-wider uppercase font-semibold cursor-pointer flex items-center justify-center"
                >
                  {isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Publish Project"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
