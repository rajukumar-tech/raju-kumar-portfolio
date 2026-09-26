# Portfolio + AI Digital Twin: Plan & Spec

**Author:** Raju Kumar Munji · **Status as of:** 26 Sep 2026

## What I'm building

A personal portfolio website that presents my skills, projects, internship and achievements, plus an **AI Digital Twin**: a chatbot that answers visitors' questions about me in the first person, grounded only in my real portfolio data.

## Core features

| Feature | Description | Status |
|---|---|---|
| 3D hero | Three.js falling-astronaut scene over a parallax space background, animated headline | ✅ Done |
| WebGL fallback | Still astronaut image + line-art globe when the browser has no WebGL; error boundary so 3D failures can't break the page | ✅ Done |
| About | Intro, draggable concept cards, globe marked at Bengaluru, copy-email button, orbiting tech icons | ✅ Done |
| Skills | 5 groups: Languages, Frontend, Backend & Databases, AI/ML & Data, Tools | ✅ Done |
| Projects | 6 projects from my GitHub (own + collaborator repos), each with a real screenshot from running the code, detail popup and repo link | ✅ Done |
| Experience | IIT Ropar Vicharanashala Lab internship + B.Tech timeline | ✅ Done |
| Achievements | Hackathons, IIT Ropar recognitions, Deloitte job simulation (replaces the template's "Hear from my clients") | ✅ Done |
| Contact form | Sends to my inbox via FormSubmit (Web3Forms / EmailJS supported via env vars) | ✅ Built · ⏳ one-time activation click pending |
| Socials | GitHub, LinkedIn, email | ✅ Done |
| Page-wide starfield | Animated stars behind every section except the hero | ✅ Done |
| **AI Digital Twin** | Chat widget answering as me | ✅ Offline mode working · ⏳ online mode needs API key |

## AI Digital Twin design

```
ChatTwin.jsx ──POST /api/chat──▶ api/chat.js ──▶ Claude API (claude-opus-5)
     │                               ▲
     │ 503 / network error           │ system prompt built by api/_twin.js
     ▼                               │ from src/constants/index.js
twinOffline.js (keyword answers)  ◀──┘ same data source
```

- **Grounding:** the system prompt is generated from `src/constants/index.js`, so the twin always matches the site. Rules: first person, short answers, no invented facts, team projects not claimed as solo work, discloses it's an AI when asked, off-topic requests steered back.
- **Safety & cost:** input validation (≤12 turns, ≤1000 chars per message), ~10 requests/min per IP, `effort: "low"` for fast chat, server-side refusal fallback, API key server-only.
- **Offline mode:** without a key, answers skills / projects / internship / education / availability / contact questions from the same data.
- **Deploys as:** Vercel serverless function (`api/chat.js`); runs in `npm run dev` through a Vite middleware plugin.

## Claude Code plugin components

| Component | File | Purpose | Status |
|---|---|---|---|
| **Skill** `digital-twin` | `.claude/skills/digital-twin/SKILL.md` | How the twin works, answer rules, testing checklist | ✅ Done |
| **Command** `/add-project <repo-url>` | `.claude/commands/add-project.md` | Add a GitHub project: read the repo, take a real screenshot, add a truthful entry to constants, validate | ✅ Done |
| **Hook** PostToolUse (Edit\|Write) | `.claude/settings.json` → `scripts/validate-content.mjs` | After every edit, validates portfolio content (required fields, duplicate ids, missing images/icons); errors go back to Claude | ✅ Done |
| Project memory | `CLAUDE.md` | Commands, layout, conventions, secrets, done-checklist | ✅ Done |

## Tech stack

React 19, Vite, Tailwind CSS v4, Three.js (React Three Fiber + drei), Motion, cobe (globe), Anthropic SDK (`@anthropic-ai/sdk`), Vercel serverless functions.

## Done vs pending

**Done**
- Template chosen (Ali Sanati's astronaut portfolio), rebuilt with my resume content, GitHub projects and LinkedIn
- Template bugs fixed: dead nav links, broken "View Project" links, Linux case-sensitive imports, un-scrollable project popup, crash without WebGL
- Real screenshots for all 6 projects (ran each project locally; Aegis image built from a real fairness audit on the UCI Adult dataset)
- AI Digital Twin: backend, widget, offline mode, grounding from constants
- Claude Code skill, command and hook; CLAUDE.md

**Pending**
- [ ] Add `ANTHROPIC_API_KEY` and test the twin's online (Claude) answers end-to-end
- [ ] Activate the contact form (FormSubmit link) or switch to a Web3Forms key
- [ ] Deploy to Vercel (repo is ready; deployment deliberately postponed)
- [ ] Link preview image (Open Graph) for sharing on LinkedIn
- [ ] Streaming replies in the chat widget
- [ ] Automated tests for `api/chat.js` input validation and offline answers
