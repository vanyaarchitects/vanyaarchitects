const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// Read .env.local
const envPath = path.join(__dirname, "../.env.local");
console.log("Reading environment configuration from:", envPath);

if (!fs.existsSync(envPath)) {
  console.error("ERROR: .env.local file not found. Make sure it exists in the workspace root.");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf8");
const envVars = {};
envContent.split("\n").forEach((line) => {
  const match = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let key = match[1];
    let value = match[2] || "";
    // Remove quotes if present
    if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
      value = value.substring(1, value.length - 1);
    }
    envVars[key] = value.trim();
  }
});

const url = envVars.NEXT_PUBLIC_SUPABASE_URL;
const key = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("ERROR: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing in .env.local.");
  process.exit(1);
}

const supabase = createClient(url, key);

const projectsToSync = [
  {
    id: "bharath-residence",
    name: "Bharath Residence",
    category: "Residential",
    location: "Trivandrum, Kerala",
    area: "280 m²",
    year: "2024",
    description: "A contemporary tropical residence designed for Mr. Bharath. The building coordinates structure and ventilation with a double-height courtyard and custom screen walls to optimize cross-breezes and ambient daylighting.",
    heroImage: "/works/3d-designs/bharath/bharath-1.jpg",
    gallery: [
      "/works/3d-designs/bharath/bharath-1.jpg",
      "/works/3d-designs/bharath/bharath-2.jpg"
    ]
  },
  {
    id: "hadil-house",
    name: "Hadil House",
    category: "Residential",
    location: "Malappuram, Kerala",
    area: "310 m²",
    year: "2024",
    description: "Designed for Mr. Hadil, this tropical residence features sweeping overhangs, a native stone facade, and wide verandahs to protect the structural volumes from intense tropical sun and heavy monsoon cycles.",
    heroImage: "/works/3d-designs/hadil-house/2.1.jpg",
    gallery: [
      "/works/3d-designs/hadil-house/2.1.jpg",
      "/works/3d-designs/hadil-house/2.2.jpg"
    ]
  },
  {
    id: "jishnu-renovation",
    name: "Jishnu Renovation",
    category: "Residential",
    location: "Kollam, Kerala",
    area: "190 m²",
    year: "2025",
    description: "A modern renovation project for Mr. Jishnu. The design overlays a contemporary open floor plan and local teakwood detailing onto an existing traditional structure, improving natural ventilation and lighting.",
    heroImage: "/works/3d-designs/jishnu-renovation/k-1.jpg",
    gallery: [
      "/works/3d-designs/jishnu-renovation/k-1.jpg",
      "/works/3d-designs/jishnu-renovation/k-2.jpg",
      "/works/3d-designs/jishnu-renovation/k3.jpg",
      "/works/3d-designs/jishnu-renovation/k4.jpg"
    ]
  },
  {
    id: "naseem-residence",
    name: "Naseem Residence",
    category: "Residential",
    location: "Kochi, Kerala",
    area: "340 m²",
    year: "2025",
    description: "Designed for Mr. Naseem, this luxury residence blends clean minimalist geometric formwork with tropical landscaping. The layout emphasizes an indoor-outdoor spatial flow, organized around a central reflecting pool.",
    heroImage: "/works/3d-designs/naseem/rendered-1.jpg",
    gallery: [
      "/works/3d-designs/naseem/rendered-1.jpg",
      "/works/3d-designs/naseem/for-post-1.jpg",
      "/works/3d-designs/naseem/rendered-1-.1.jpg",
      "/works/3d-designs/naseem/rendered-3.jpg"
    ]
  },
  {
    id: "sajeeb-residence",
    name: "Sajeeb Residence",
    category: "Residential",
    location: "Trivandrum, Kerala",
    area: "260 m²",
    year: "2024",
    description: "A climate-responsive residence for Mr. Sajeeb. Features a unique sloped roof profile that funnels rainwater to harvesting channels, combined with brick jaali screens that filter harsh afternoon sunlight.",
    heroImage: "/works/3d-designs/sajeeb/1-sajeeb-0.jpg",
    gallery: [
      "/works/3d-designs/sajeeb/1-sajeeb-0.jpg",
      "/works/3d-designs/sajeeb/2-sajeeb-2.jpg"
    ]
  },
  {
    id: "shivajith-house",
    name: "Shivajith House",
    category: "Residential",
    location: "Kannur, Kerala",
    area: "220 m²",
    year: "2024",
    description: "A sleek, functional single-family villa designed for Mr. Shivajith. The facade integrates raw exposed concrete finishes with natural local wood screens, creating a warm tactile texture.",
    heroImage: "/works/3d-designs/shivajith/elevation-view.jpg",
    gallery: [
      "/works/3d-designs/shivajith/elevation-view.jpg"
    ]
  },
  {
    id: "sreerakha-residence",
    name: "Sreerakha Residence",
    category: "Residential",
    location: "Palakkad, Kerala",
    area: "295 m²",
    year: "2025",
    description: "Structural blueprints and floor plans for the Sreerakha Residence. The layout optimizes double-height dining volumes and cross-ventilated bedroom orientations to manage the warm regional micro-climate.",
    heroImage: "https://images.unsplash.com/photo-1503387762-592dedb8fe31?auto=format&fit=crop&q=80&w=1600",
    gallery: [
      "/works/3d-designs/sreerakha/ground-floor.pdf",
      "/works/3d-designs/sreerakha/first-floor.pdf"
    ]
  },
  {
    id: "suryakandhi-auditorium",
    name: "Suryakandhi Auditorium",
    category: "Commercial",
    location: "Trivandrum, Kerala",
    area: "1,800 m²",
    year: "2025",
    description: "A major commercial and community auditorium commission. Designed to host large cultural gatherings, the structure features wide column-free spans, acoustically optimized panel details, and passive ventilation chimneys.",
    heroImage: "/works/3d-designs/suryakandhi-auditorium/4.jpg",
    gallery: [
      "/works/3d-designs/suryakandhi-auditorium/4.jpg"
    ]
  },
  {
    id: "trivandrum-corporation-landmark",
    name: "Trivandrum Corporation Landmark",
    category: "Urban Concepts",
    location: "Trivandrum, Kerala",
    area: "4,200 m²",
    year: "2026",
    description: "An urban intervention concept proposed for the Trivandrum Corporation. This public plaza and commercial landmark integrates pedestrian walkways, native garden terraces, and active solar sun-shading sails.",
    heroImage: "/works/3d-designs/trivandrum-corporation/g-1.jpg",
    gallery: [
      "/works/3d-designs/trivandrum-corporation/g-1.jpg",
      "/works/3d-designs/trivandrum-corporation/g2.jpg",
      "/works/3d-designs/trivandrum-corporation/g3.jpg",
      "/works/3d-designs/trivandrum-corporation/g4.jpg"
    ]
  }
];

async function syncProjects() {
  console.log("\n--- STARTING SUPABASE PORTFOLIO SYNCHRONIZATION ---");
  console.log(`Preparing to upsert ${projectsToSync.length} projects...`);

  let successCount = 0;
  let errorCount = 0;

  for (const project of projectsToSync) {
    try {
      console.log(`Syncing project: "${project.name}" (ID: ${project.id})...`);
      const { data, error } = await supabase
        .from("projects")
        .upsert(project, { onConflict: "id" })
        .select();

      if (error) {
        console.error(`❌ Error syncing "${project.name}":`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Successfully synced "${project.name}"`);
        successCount++;
      }
    } catch (e) {
      console.error(`❌ Unexpected error syncing "${project.name}":`, e.message || e);
      errorCount++;
    }
  }

  console.log("\n--- SYNCHRONIZATION SUMMARY ---");
  console.log(`Total projects processed: ${projectsToSync.length}`);
  console.log(`Successfully synced:      ${successCount}`);
  console.log(`Failed to sync:           ${errorCount}`);
  console.log("---------------------------------\n");

  if (errorCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

syncProjects();
