#!/usr/bin/env node
/**
 * Generate static case-study pages from content/case-studies.json (synced from workspace).
 *
 * - Chrome (nav/footer/head assets) is extracted from work/aum-apparel.html
 *   so generated pages stay pixel-identical with the hand-written ones.
 * - Curated clients with hand-written pages (AUM Apparel, Cau Chocolates, LYTH)
 *   are skipped to avoid duplicate content.
 * - Also rewrites sitemap.xml with all case URLs.
 * Graceful no-op when content/case-studies.json is missing.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const write = (p, s) => fs.writeFileSync(path.join(ROOT, p), s);

const esc = (v) => String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const lineEnd = (s, i) => s.indexOf("\n", i) + 1;

function richText(raw) {
  const lines = String(raw || "").replace(/\r/g, "").split("\n").map((l) => l.trim()).filter(Boolean);
  let html = "";
  const list = [];
  const flush = () => {
    if (list.length) { html += "<ul>" + list.map((l) => "<li>" + esc(l) + "</li>").join("") + "</ul>"; list.length = 0; }
  };
  for (const l of lines) {
    if (/^[-\u2022]\s+/.test(l)) list.push(l.replace(/^[-\u2022]\s+/, ""));
    else { flush(); html += "<p>" + esc(l) + "</p>"; }
  }
  flush();
  return html;
}

const CURATED = [
  { re: /aum/i, slug: "aum-apparel" },
  { re: /chau|cau/i, slug: "chau-chocolate" },
  { re: /lyth/i, slug: "lyth" },
];

const dataPath = "content/case-studies.json";
if (!fs.existsSync(path.join(ROOT, dataPath))) {
  console.warn("content/case-studies.json missing - nothing to generate");
  process.exit(0);
}
const data = JSON.parse(read(dataPath));
const items = (data.items || []).filter((c) => c && c.slug && !CURATED.some((k) => k.re.test(String(c.client_name || ""))));

const tpl = read("work/aum-apparel.html");

const iTitle = tpl.indexOf("<title>");
const iTitleEnd = lineEnd(tpl, tpl.indexOf("</title>"));
const iCanon = tpl.indexOf('<link rel="canonical"');
const iCanonEnd = lineEnd(tpl, iCanon);
const iOrg = tpl.indexOf('<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization"');
const iOrgEnd = lineEnd(tpl, iOrg);
const iTw = tpl.indexOf('<meta name="twitter:card"');
const iTwEnd = lineEnd(tpl, iTw);
const iArt = tpl.indexOf('<script type="application/ld+json">{"@context":"https://schema.org","@graph"');
const iArtEnd = lineEnd(tpl, iArt);
const iMain = tpl.indexOf('<main id="main">') + '<main id="main">'.length;
const iMainEnd = tpl.indexOf("</main>");
if ([iTitle, iCanon, iOrg, iTw, iArt, iMain, iMainEnd].some((i) => i <= 0)) {
  console.error("Template markers not found in work/aum-apparel.html");
  process.exit(1);
}

const A = tpl.slice(0, iTitle).replace(/<!-- =+[\s\S]*?=+ -->/, "<!-- GENERATED FILE - do not edit. Regenerate: node scripts/generate-cases.mjs -->");
const B = tpl.slice(iTitleEnd, iCanon);
const ORG_LD = tpl.slice(iCanonEnd, iOrg);
const E = tpl.slice(iArtEnd, iMain).replace('<main id="main">', '<main id="main" lang="id">');
const AFTER = tpl.slice(iMainEnd);
const chip = (t) => '<span style="font-family:var(--mono);font-size:9px;letter-spacing:.1em;text-transform:uppercase;border:1px solid var(--line);padding:4px 8px;color:var(--muted)">' + esc(t) + "</span>";
const today = new Date().toISOString().slice(0, 10);
const BASE = "https://hadona.id";
const written = [];

for (const c of items) {
  const client = String(c.client_name || "Client");
  const metrics = c.metrics || {};
  const mk = Object.keys(metrics);
  const metricTag = mk.length ? metrics[mk[0]] + " " + mk[0] : "case study";
  const hero = c.hero_image_url || c.thumbnail_url || "";
  const lede = String(c.challenge || "").replace(/\r/g, "").split("\n").map((s) => s.trim()).filter(Boolean)[0] || client;
  const desc = String(c.results || "").replace(/[\r\n]+/g, " ").trim().slice(0, 152);
  const url = BASE + "/work/" + c.slug;
  const chips = ["Case study", String(c.services || "Digital marketing")].filter(Boolean).map(chip).join("");
  const stats = mk.slice(0, 6).map((k) => "<div><b>" + esc(metrics[k]) + "</b><span>" + esc(k) + "</span></div>").join("");
  const fig = hero
    ? '<figure class="case-cover"><div class="wrap"><img width="1600" height="900" src="' + esc(hero) + '" alt="' + esc(client) + ' case study" loading="lazy" decoding="async"><figcaption>' + esc(client) + (c.services ? " \u00b7 " + esc(c.services) : "") + "</figcaption></div></figure>"
    : "";
  const title = esc(client + ": " + metricTag) + " \u2014 Hadona\u00ae";
  const articleLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE + "/" },
        { "@type": "ListItem", "position": 2, "name": "Work", "item": BASE + "/work" },
        { "@type": "ListItem", "position": 3, "name": client, "item": url },
      ]},
      { "@type": "Article", "headline": client + ": " + metricTag,
        "datePublished": today, "dateModified": today,
        "author": { "@type": "Organization", "name": "Hadona Digital Media" },
        "publisher": { "@type": "Organization", "name": "Hadona Digital Media", "logo": { "@type": "ImageObject", "url": BASE + "/assets/brand/icon-512.png" } },
        "mainEntityOfPage": url },
    ],
  });
  const head =
    A +
    "<title>" + title + "</title>\n<meta name=\"description\" content=\"" + esc(desc) + "\">\n" +
    B +
    '<link rel="canonical" href="' + url + '">\n' +
    ORG_LD +
    '<meta property="og:type" content="article">\n<meta property="og:title" content="' + esc(client + ": " + metricTag) + '">\n<meta property="og:description" content="' + esc(desc) + '">\n<meta property="og:image" content="' + esc(hero || BASE + "/assets/brand/og-image.jpg") + '">\n<meta property="og:url" content="' + url + '">\n' +
    tpl.slice(iTw, iTwEnd) +
    '<script type="application/ld+json">' + articleLd + "</script>\n" +
    E;
  const main =
    '<header class="phero">\n  <div class="wrap">\n' +
    '    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/work">Work</a><span>/</span><span>' + esc(client) + "</span></nav>\n" +
    '    <div class="case-kicker" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">' + chips + "</div>\n" +
    '    <h1 class="h1">' + esc(client) + "</h1>\n" +
    '    <p class="lede" style="margin-top:14px">' + esc(lede) + "</p>\n" +
    "  </div>\n</header>\n\n" +
    '<div class="wrap">\n  <div class="case-stats">' + stats + "</div>\n</div>\n\n" +
    fig + "\n\n" +
    '<div class="wrap">\n  <article class="case-body">\n' +
    "    <h2>Tantangan</h2>\n    " + richText(c.challenge) + "\n\n" +
    "    <h2>Strategi</h2>\n    " + richText(c.strategy) + "\n\n" +
    "    <h2>Hasil</h2>\n    " + richText(c.results) + "\n\n" +
    '    <h2>Mau hasil seperti ini?</h2>\n    <p>Kirim brief singkat \u2014 strategist kami membaca akun Anda dan membalas dengan tiga perbaikan pertama, gratis.</p>\n    <p style="margin-top:14px"><a class="btn btn-solid" href="/contact">Diskusikan akun Anda</a></p>\n' +
    "  </article>\n\n" +
    '  <nav class="pager" aria-label="More work">\n' +
    '    <a href="/contact"><span><small>Next</small><br>Start a project</span>\n      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>\n    </a>\n' +
    '    <a href="/work"><span><small>Back to</small><br>All work</span>\n      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>\n    </a>\n  </nav>';
  write("work/" + c.slug + ".html", head + main + AFTER);
  written.push(c.slug);
}

const STATIC_URLS = [
  ["/", "weekly", "1.0"], ["/work", "weekly", "0.7"],
  ["/work/aum-apparel", "monthly", "0.7"], ["/work/chau-chocolate", "monthly", "0.7"], ["/work/lyth", "monthly", "0.7"],
  ["/engagement", "monthly", "0.8"], ["/capabilities", "monthly", "0.7"], ["/studio", "monthly", "0.7"],
  ["/contact", "monthly", "0.7"], ["/terms", "monthly", "0.7"], ["/privacy", "monthly", "0.7"],
];
const sm =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  STATIC_URLS.map(([u, f, p]) => "  <url><loc>" + BASE + u + "</loc><lastmod>" + today + "</lastmod><changefreq>" + f + "</changefreq><priority>" + p + "</priority></url>").join("\n") + "\n" +
  written.map((s) => "  <url><loc>" + BASE + "/work/" + s + "</loc><lastmod>" + today + "</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>").join("\n") +
  "\n</urlset>\n";
write("sitemap.xml", sm);
console.log("generated " + written.length + " case pages + sitemap (" + (items.length + CURATED.length) + " published, " + CURATED.length + " curated skipped)");
