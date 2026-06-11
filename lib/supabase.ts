import { createClient } from "@supabase/supabase-js";
import { projects as staticProjects, Project } from "@/data/projects";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create supabase client or null if not configured
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  status?: string;
  created_at?: string;
}

// Helper to fetch all projects
export async function getDbProjects(): Promise<Project[]> {
  if (!supabase) {
    console.warn("Supabase is not configured. Falling back to local static projects.");
    return staticProjects;
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("priority", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      // If priority column doesn't exist, fallback to created_at
      if (error.code === "42703") {
        console.warn("Priority column not found in database. Falling back to created_at sorting.");
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (fallbackError) {
          console.error("Error fetching projects from Supabase (fallback):", fallbackError.message);
          return staticProjects;
        }
        return fallbackData as Project[];
      }
      
      console.error("Error fetching projects from Supabase:", error.message);
      return staticProjects;
    }

    if (!data || data.length === 0) {
      // If table is empty, return static projects
      return staticProjects;
    }

    return data as Project[];
  } catch (err) {
    console.error("Failed to connect to Supabase database:", err);
    return staticProjects;
  }
}

// Helper to add a project
export async function insertDbProject(project: Omit<Project, "created_at">) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .insert([project])
      .select();

    if (error) {
      // If priority column doesn't exist, retry without priority
      if (error.code === "42703" || error.message.includes("priority")) {
        console.warn("Priority column not found in database. Retrying project insert without priority.");
        const { priority, ...projectWithoutPriority } = project;
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("projects")
          .insert([projectWithoutPriority])
          .select();
        
        if (fallbackError) throw fallbackError;
        return fallbackData;
      }
      throw error;
    }
    return data;
  } catch (err: any) {
    // Catch generic exceptions/network errors and check if it's due to priority column
    if (err.message && err.message.includes("priority")) {
      const { priority, ...projectWithoutPriority } = project;
      const { data, error } = await supabase
        .from("projects")
        .insert([projectWithoutPriority])
        .select();
      if (error) throw error;
      return data;
    }
    throw err;
  }
}

// Helper to update a project
export async function updateDbProject(id: string, project: Partial<Project>) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .update(project)
      .eq("id", id)
      .select();

    if (error) {
      // If priority column doesn't exist, retry without priority
      if (error.code === "42703" || error.message.includes("priority")) {
        console.warn("Priority column not found in database. Retrying project update without priority.");
        const { priority, ...projectWithoutPriority } = project;
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("projects")
          .update(projectWithoutPriority)
          .eq("id", id)
          .select();
        
        if (fallbackError) throw fallbackError;
        return fallbackData;
      }
      throw error;
    }
    return data;
  } catch (err: any) {
    if (err.message && err.message.includes("priority")) {
      const { priority, ...projectWithoutPriority } = project;
      const { data, error } = await supabase
        .from("projects")
        .update(projectWithoutPriority)
        .eq("id", id)
        .select();
      if (error) throw error;
      return data;
    }
    throw err;
  }
}

// Helper to delete a project
export async function deleteDbProject(id: string) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

// Helper to log a lead inquiry
export async function insertDbLead(lead: Lead) {
  if (!supabase) {
    console.warn("Supabase not configured. Lead mock-logged locally:", lead);
    return { success: true, mock: true };
  }

  const { data, error } = await supabase
    .from("leads")
    .insert([
      {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        projectType: lead.projectType,
        message: lead.message,
        status: "new",
      },
    ])
    .select();

  if (error) {
    console.error("Error saving lead to Supabase:", error.message);
    throw error;
  }

  return { success: true, data };
}

// Helper to retrieve leads (Admin panel only)
export async function getDbLeads(): Promise<Lead[]> {
  if (!supabase) {
    console.warn("Supabase is not configured. Cannot fetch leads.");
    return [];
  }

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

// Helper to update lead status
export async function updateLeadStatus(id: string, status: string) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
}
