import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Serves /api/chat during `npm run dev` with the same handler Vercel runs in
// production, so the AI twin works locally too.
function devApi() {
  return {
    name: "dev-api",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          return res.end();
        }
        let raw = "";
        for await (const chunk of req) raw += chunk;
        let body = null;
        try {
          body = JSON.parse(raw || "{}");
        } catch {
          // falls through to a 400 from handleChat
        }
        const { handleChat } = await server.ssrLoadModule("/api/chat.js");
        const { status, json } = await handleChat(body);
        res.statusCode = status;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(json));
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Make server-only secrets from .env (like ANTHROPIC_API_KEY) visible to the
  // dev API. Only VITE_-prefixed variables are ever exposed to the browser.
  const env = loadEnv(mode, process.cwd(), "");
  if (env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_API_KEY) {
    process.env.ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY;
  }
  return {
    plugins: [react(), tailwindcss(), devApi()],
  };
});
