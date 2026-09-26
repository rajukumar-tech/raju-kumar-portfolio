# CLAUDE.md

Personal portfolio for Raju Kumar Munji (B.Tech CSE, AI/ML, Atria University) with an AI Digital Twin chatbot. React 19 + Vite + Tailwind CSS v4, Three.js via React Three Fiber, Motion for animation.

## Commands

```bash
npm install
npm run dev                          # dev server; also serves /api/chat
npm run build                        # production build to dist/
node scripts/validate-content.mjs    # check src/constants/index.js
```

## Layout

- `src/constants/index.js`: **all personal content** (profile, skills, projects, experience, achievements). Sections and the AI twin both read from here. Edit content here, never inside components.
- `src/sections/`: page sections in order: Navbar, Hero, About, Skills, Projects, Experiences, Achievements, Contact, Footer (wired in `src/App.jsx`).
- `src/components/`: shared UI. Notable: `SafeWebGL.jsx` (WebGL detection + error boundary), `ChatTwin.jsx` (chat widget), `twinOffline.js` (offline answers), `Particles.jsx` (page-wide starfield).
- `api/chat.js`: `POST /api/chat`, the twin backend (Vercel serverless function; also mounted in dev by the `devApi` plugin in `vite.config.js`). `api/_twin.js` builds the system prompt from the constants.
- `public/assets/`: images, logos, project screenshots, `astronaut-fallback.png`. `public/models/`: the astronaut `.glb`.
- `.claude/`: project skill (`digital-twin`), command (`/add-project`), and hook (content validation).

## Conventions

- **Truthful content only.** Projects and skills must be backed by the resume or the actual repos. Collaborator repos start their description with "Team project · ". Don't invent metrics, features or dates.
- Import paths are case-sensitive on Linux hosts (Vercel): match file names exactly (`Frameworks.jsx`, `Navbar.jsx`).
- Anything WebGL (`<Canvas>`, the cobe globe) goes inside `<SafeWebGL fallback={...}>` so browsers without WebGL still get a complete page.
- Dark logos need a light backing (`bg-white/90`) on dark cards.
- Use the existing theme tokens (`primary`, `navy`, `indigo`, `storm`, `royal`, `lavender`, `sand`) rather than new colours.

## Secrets and environment

Never commit `.env` (it's gitignored). See `.env.example`:

- `ANTHROPIC_API_KEY`: server-only, used by `api/chat.js`. Without it the twin runs in offline mode.
- `VITE_WEB3FORMS_KEY` / `VITE_EMAILJS_*`: optional contact-form providers. The default is FormSubmit, which needs a one-time activation click per domain.

## Before finishing a change

1. `node scripts/validate-content.mjs` passes (the PostToolUse hook runs it automatically after edits).
2. `npm run build` succeeds.
3. Check the change in the browser, including with the chat widget open and on a narrow (phone) width.
