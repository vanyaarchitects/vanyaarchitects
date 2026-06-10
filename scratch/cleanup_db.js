const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// Read .env.local
const envPath = path.join(__dirname, "../.env.local");
const envContent = fs.readFileSync(envPath, "utf8");
const envVars = {};
envContent.split("\n").forEach((line) => {
  const match = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let key = match[1];
    let value = match[2] || "";
    if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
      value = value.substring(1, value.length - 1);
    }
    envVars[key] = value.trim();
  }
});

const url = envVars.NEXT_PUBLIC_SUPABASE_URL;
const key = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(url, key);

async function cleanupDb() {
  const targetIds = ["villa-sands", "the-monolith", "aura-pavilion", "vertical-oasis", "tectonic-art-gallery"];
  console.log("Deleting template projects from Supabase database:", targetIds);
  
  const { data, error } = await supabase
    .from("projects")
    .delete()
    .in("id", targetIds)
    .select();
  
  if (error) {
    console.error("❌ Error deleting templates:", error);
    process.exit(1);
  }
  
  console.log("✅ Successfully deleted template projects! Count deleted:", data ? data.length : 0);
  console.log(data);
  process.exit(0);
}

cleanupDb();
