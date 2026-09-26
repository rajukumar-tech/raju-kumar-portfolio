---
name: digital-twin
description: Update, test or debug the portfolio's AI Digital Twin chatbot (api/chat.js, api/_twin.js, src/components/ChatTwin.jsx, src/components/twinOffline.js). Use when changing what the twin knows or how it answers, adding offline answers, or when the chat widget misbehaves.
---

# AI Digital Twin

The twin answers visitor questions in first person on Raju's behalf.

## How it fits together

- **Knowledge:** `api/_twin.js` builds the system prompt from `src/constants/index.js`. To change what the twin knows, edit the constants, not the prompt. The site and the twin must never disagree.
- **Online path:** `src/components/ChatTwin.jsx` POSTs `{messages}` to `/api/chat`. `api/chat.js` validates input (max 12 turns, 1000 chars per message, ~10 requests/min per IP) and calls Claude (`claude-opus-5`, `effort: "low"`, `fallbacks: "default"`) with `ANTHROPIC_API_KEY`. The same handler runs as a Vercel function and inside `npm run dev` through the `devApi` plugin in `vite.config.js`.
- **Offline path:** when `/api/chat` returns 503 (no key) or fails, the widget answers with `offlineAnswer()` from `src/components/twinOffline.js`: keyword intents over the constants.

## Rules for the twin's answers

- Ground every answer in the constants; if a fact is missing, say so and point to the email. Never invent grades, dates, metrics or employers.
- Collaborator projects are described as team work, never sole credit.
- If asked, say plainly it is an AI twin.
- Keep replies to 2-4 sentences or short bullets.

## Testing checklist

1. `node scripts/validate-content.mjs` passes.
2. Offline answers: import `offlineAnswer` in a Node one-off and check the four suggestion chips, a project name, "are you a bot?", and an off-topic question.
3. `curl -X POST localhost:<port>/api/chat -H "Content-Type: application/json" -d '{"messages":[{"role":"user","content":"hi"}]}'` returns 503 without a key and `{reply}` with one.
4. In the browser: open the widget, click a suggestion, type a question, confirm the header shows "Offline mode" or "AI" correctly.
5. `npm run build` succeeds.
