#!/usr/bin/env node
/**
 * Sync published content from Supabase into content/*.json
 *
 * Usage:
 *   node scripts/sync-content.mjs --env "/path/to/.env.local"
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/sync-content.mjs
 *
 * Read-only. Never writes to the database. Never prints keys.
 */
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const envFlag = args.indexOf("--env");
const envPath = envFlag > -1 ? args[envFlag + 1] : process.env.ENV_FILE;

function loadEnv(file) {
  if (!file || !fs.existsSync(file)) return {};
  const out = {};
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#") || !t.includes("=")) continue;
    const i = t.indexOf("=");
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

const env = { ...loadEnv(envPath), ...process.env };
const url = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_KEY;

if (!url || !key) {
  console.error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (use --env path)");
  process.exit(1);
}

const headers = { apikey: key, Authorization: `Bearer ${key}` };
const outDir = path.join(process.cwd(), "content");
fs.mkdirSync(outDir, { recursive: true });

async function get(table, query = "") {
  const res = await fetch(`${url}/rest/v1/${table}?${query}`, { headers });
  if (!res.ok) throw new Error(`${table}: ${res.status} ${await res.text()}`);
  return res.json();
}

const clients = await get(
  "client_logos",
  "select=name,logo_url,website_url,display_order&is_active=eq.true&order=display_order.asc,name.asc"
);

const testimonials = await get(
  "testimonials",
  "select=client_name,testimonial,position,is_featured,display_order&is_published=eq.true&order=display_order.asc"
);

const caseStudies = await get(
  "case_studies",
  "select=slug,title,client_name,challenge,strategy,results,metrics,thumbnail_url,hero_image_url,services,is_featured,display_order&is_published=eq.true&order=display_order.asc&limit=24"
).catch(() => []);

const write = (name, data) =>
  fs.writeFileSync(path.join(outDir, name), JSON.stringify({ syncedAt: new Date().toISOString(), count: data.length, items: data }, null, 1));

write("clients.json", clients);
write("testimonials.json", testimonials);
write("case-studies.json", caseStudies);

console.log(`clients=${clients.length} testimonials=${testimonials.length} caseStudies=${caseStudies.length}`);
