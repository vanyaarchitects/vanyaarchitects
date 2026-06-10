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
    id: "villa-sands",
    name: "Villa Sands",
    category: "Residential",
    location: "Varkala, Kerala",
    area: "420 m²",
    year: "2024",
    description: "Perched on the rugged cliffs of Varkala, Villa Sands is a celebration of light, raw concrete, and the Arabian Sea. The building composition features overlapping horizontal planes of board-marked concrete, intersected by frameless glass walls that dissolve the boundary between the living spaces and the coastal horizon. The interior layout uses raw teak wood, natural linen, and sand-colored travertine, fostering a calm, sanctuary-like atmosphere inspired by functional and thoughtful luxury.",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "the-monolith",
    name: "The Monolith",
    category: "Commercial",
    location: "Kochi, Kerala",
    area: "2,400 m²",
    year: "2025",
    description: "Designed as the headquarters for a sustainable design house, The Monolith stands as a sculpture of warm timber and dark slate in Kochi. The exterior facade features dynamic vertical louvers made of carbonized timber, which self-regulate sunlight entry based on solar positioning. Inside, a soaring three-story atrium framed in structural glue-laminated timber houses co-working spaces, drawing boards, and open gardens, establishing a tactile, community-driven workplace that breathes with the surrounding cityscape.",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "aura-pavilion",
    name: "Aura Pavilion",
    category: "Hospitality",
    location: "Wayanad, Kerala",
    area: "850 m²",
    year: "2023",
    description: "The Aura Pavilion is a wellness resort lounge designed in collaboration with local artisans. Tucked into the lush forests of Wayanad, Kerala, the structure utilizes traditional Kerala timber framing (Ettukettu details) integrated with modern steel joints. A central silent reflection pool mirrors the sky and forest canopy. Floating wooden decks, screen walls, and sliding panels permit natural ventilation, while the scent of locally harvested wood completes the deeply restorative sensory experience.",
    heroImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "vertical-oasis",
    name: "Vertical Oasis",
    category: "Urban Concepts",
    location: "Mumbai, India",
    area: "15,000 m²",
    year: "2026",
    description: "A theoretical proposal for high-density, carbon-negative living. The Vertical Oasis reimagines the skyscraper as a self-sustaining ecosystem in Mumbai. The tower features pre-fabricated structural timber modules clustered around a geothermal core. Alternating double-height garden terraces act as micro-climates, filtering urban noise, purifying the air, and collecting rainwater for building systems. This project bridges architectural luxury with critical climate-responsive engineering.",
    heroImage: "https://images.unsplash.com/photo-1448630360428-654745591619?auto=format&fit=crop&q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1448630360428-654745591619?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "tectonic-art-gallery",
    name: "Tectonic Art Gallery",
    category: "Institutional",
    location: "Trivandrum, Kerala",
    area: "4,500 m²",
    year: "2025",
    description: "Commanding views over the Ashtamudi Lake, the Tectonic Art Gallery houses exhibition spaces for contemporary sculpture and community halls. Built with locally quarried light granite and sweeping laminated wood curves, the gallery's ceiling features custom sculptural skylights that funnel daylight into the exhibition spaces, forming shifting patterns of shadow and light that naturally illuminate the artwork below.",
    heroImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=800"
    ]
  },
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
