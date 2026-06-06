export interface Project {
  id: string;
  name: string;
  category: "Residential" | "Commercial" | "Hospitality" | "Institutional" | "Urban Concepts";
  location: string;
  area: string;
  year: string;
  description: string;
  heroImage: string;
  gallery: string[];
}

export const projects: Project[] = [
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
  }
];
