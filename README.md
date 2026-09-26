# Raju Kumar Munji: Portfolio

Personal portfolio: React + Vite + Tailwind, with a Three.js astronaut hero, project showcase, and an AI Digital Twin chat that answers questions about my work.

## Run locally

```bash
npm install
npm run dev
```

## Configuration

Copy `.env.example` to `.env` and fill in what you use:

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Powers the AI Digital Twin (`api/chat.js`). Without it the chat runs in offline mode. |
| `VITE_WEB3FORMS_KEY` | Optional: contact form delivery via Web3Forms. Falls back to FormSubmit. |
| `VITE_EMAILJS_*` | Optional: contact form delivery via EmailJS. |

All personal content lives in `src/constants/index.js`.

## Deploy

Import the repo on [Vercel](https://vercel.com). It auto-detects Vite and serves `api/chat.js` as a serverless function. Add the environment variables above in the Vercel project settings.
