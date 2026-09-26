// Validates src/constants/index.js, the single source of truth for the site
// and the AI Digital Twin. Run by the Claude Code PostToolUse hook in
// .claude/settings.json after every edit, and usable by hand:
//   node scripts/validate-content.mjs
// Exit code 2 sends the errors back to Claude so it fixes them.
import fs from "node:fs";

const errors = [];
let data;
try {
  data = await import(new URL("../src/constants/index.js", import.meta.url));
} catch (err) {
  console.error(`constants/index.js failed to load: ${err.message}`);
  process.exit(2);
}

const { profile, myProjects, experiences, achievements, skillGroups } = data;
const publicDir = new URL("../public/", import.meta.url);
const assetExists = (p) => fs.existsSync(new URL(p.replace(/^\//, ""), publicDir));

for (const key of ["name", "shortName", "email", "github"]) {
  if (!profile?.[key]) errors.push(`profile.${key} is missing`);
}

const ids = new Set();
for (const p of myProjects ?? []) {
  const where = `project "${p.title ?? p.id}"`;
  if (ids.has(p.id)) errors.push(`${where}: duplicate id ${p.id}`);
  ids.add(p.id);
  for (const key of ["title", "description", "href", "image"]) {
    if (!p[key]) errors.push(`${where}: ${key} is missing`);
  }
  if (!Array.isArray(p.subDescription) || !p.subDescription.length) {
    errors.push(`${where}: subDescription needs at least one bullet`);
  }
  if (p.image && !assetExists(p.image)) errors.push(`${where}: image ${p.image} not found in public/`);
  for (const t of p.tags ?? []) {
    if (t.path && !assetExists(t.path)) errors.push(`${where}: tag icon ${t.path} not found`);
  }
}

for (const e of experiences ?? []) {
  if (!e.title || !e.job || !e.date || !e.contents?.length) {
    errors.push(`experience "${e.title ?? "?"}": title, job, date and contents are required`);
  }
}
for (const a of achievements ?? []) {
  if (!a.title || !a.body) errors.push(`achievement "${a.title ?? "?"}": title and body are required`);
}
for (const g of skillGroups ?? []) {
  for (const s of g.skills) {
    if (s.path && !assetExists(s.path)) errors.push(`skill "${s.name}": icon ${s.path} not found`);
  }
}

if (errors.length) {
  console.error(`Portfolio content check failed:\n- ${errors.join("\n- ")}`);
  process.exit(2);
}
console.log(`Content OK: ${myProjects.length} projects, ${experiences.length} experience entries, ${achievements.length} achievements.`);
