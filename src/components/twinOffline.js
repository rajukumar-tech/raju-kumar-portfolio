// Offline answers for the AI twin, used when the /api/chat backend isn't
// configured (no ANTHROPIC_API_KEY) or can't be reached. Pure keyword
// matching over the same data the site renders.
import {
  profile,
  skillGroups,
  myProjects,
  experiences,
  achievements,
} from "../constants/index.js";

const list = (items) => items.map((i) => `• ${i}`).join("\n");
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Word-start match, so "ai" doesn't fire on "available" or "hi" on "which".
const has = (q, ...words) =>
  words.some((w) => new RegExp(`\\b${escape(w)}`).test(q));

export function offlineAnswer(question) {
  const q = question.toLowerCase();

  const project = myProjects.find((p) =>
    q.includes(p.title.toLowerCase().split(/[ :(]/)[0])
  );
  if (project) {
    return `${project.title}: ${project.description}\n\n${list(
      project.subDescription.slice(0, 3)
    )}\n\nTech: ${project.tags.map((t) => t.name).join(", ")}. More: ${project.href}`;
  }
  if (has(q, "open to", "available", "availability", "hire", "hiring", "looking for", "join")) {
    return `Yes! I'm looking for software engineering and data analytics internships, on-site or remote from ${profile.location}. Reach me at ${profile.email} or through the contact form below.`;
  }
  if (has(q, "intern", "iit", "ropar", "experience", "work")) {
    const e = experiences[0];
    return `I was a ${e.title} at ${e.job} (${e.date}).\n\n${list(e.contents.slice(0, 3))}`;
  }
  if (has(q, "project", "built", "portfolio", "made")) {
    return `Some things I've worked on:\n\n${list(
      myProjects.map((p) => `${p.title}: ${p.description.split("·").pop().trim()}`)
    )}\n\nAsk me about any of them!`;
  }
  const group = skillGroups.find((g) =>
    has(q, ...g.title.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 2))
  );
  if (group && has(q, "skill", "stack", "tech", "know", "use", "language", "backend", "frontend")) {
    return `${group.title}: ${group.skills.map((s) => s.name).join(", ")}.`;
  }
  if (has(q, "skill", "stack", "tech", "language", "backend", "frontend", "know")) {
    return skillGroups
      .map((g) => `${g.title}: ${g.skills.map((s) => s.name).join(", ")}`)
      .join("\n");
  }
  if (has(q, "achiev", "hackathon", "award", "certif")) {
    return list(achievements.map((a) => `${a.title} (${a.org})`));
  }
  if (has(q, "study", "college", "university", "education", "degree", "atria", "b.tech", "btech")) {
    const e = experiences.find((x) => /student/i.test(x.title)) || experiences[1];
    return `${e.contents[0]} I'm at ${e.job}, graduating ${e.date.replace("Expected ", "")}.`;
  }
  if (has(q, "contact", "email", "hire", "reach", "linkedin", "available", "internship")) {
    return `I'm looking for software engineering and data analytics internships. The best way to reach me is ${profile.email}, or use the contact form below.${
      profile.linkedin ? ` LinkedIn: ${profile.linkedin}` : ""
    }`;
  }
  if (has(q, "where", "location", "based", "live")) {
    return `I'm based in ${profile.location} (IST) and open to on-site or remote internships.`;
  }
  if (has(q, "github", "code", "repo")) {
    return `My GitHub is ${profile.github}. Each project here links to its repository too.`;
  }
  if (has(q, "who are you", "are you real", "human", "ai", "bot")) {
    return `I'm ${profile.shortName}'s AI twin, answering from this portfolio. The real ${profile.shortName} reads messages sent to ${profile.email}.`;
  }
  if (has(q, "hi", "hello", "hey")) {
    return `Hi! I'm ${profile.shortName}'s AI twin. Ask me about my skills, projects, internship or how to reach me.`;
  }
  return `I don't have a good answer for that yet. Try asking about my skills, projects, internship or achievements, or email me at ${profile.email}.`;
}
