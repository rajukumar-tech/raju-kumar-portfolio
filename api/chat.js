// POST /api/chat — the AI Digital Twin backend.
// Runs as a Vercel serverless function in production and inside the Vite dev
// server locally (see vite.config.js). Needs ANTHROPIC_API_KEY in the
// environment; without it the endpoint returns 503 and the widget switches to
// its offline answers.
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "./_twin.js";

const MODEL = "claude-opus-5";
const MAX_TURNS = 12; // most recent messages sent to the model
const MAX_CHARS = 1000; // per visitor message

let client;

// Best-effort per-IP limit. Serverless instances don't share memory, so this
// only slows down a single abusive client; add a real limiter if needed.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 10;
}

// Accepts [{role, content}] from the widget and returns a clean,
// alternating user/assistant history that starts and ends with the user.
function sanitize(messages) {
  if (!Array.isArray(messages)) return null;
  const clean = [];
  for (const m of messages.slice(-MAX_TURNS * 2)) {
    if (!m || (m.role !== "user" && m.role !== "assistant")) continue;
    if (typeof m.content !== "string" || !m.content.trim()) continue;
    const content = m.content.trim().slice(0, MAX_CHARS);
    if (clean.length && clean.at(-1).role === m.role) {
      clean.at(-1).content += `\n${content}`;
    } else {
      clean.push({ role: m.role, content });
    }
  }
  while (clean.length && clean[0].role !== "user") clean.shift();
  const trimmed = clean.slice(-MAX_TURNS);
  while (trimmed.length && trimmed[0].role !== "user") trimmed.shift();
  if (!trimmed.length || trimmed.at(-1).role !== "user") return null;
  return trimmed;
}

export async function handleChat(body, ip = "local") {
  if (!process.env.ANTHROPIC_API_KEY) {
    return { status: 503, json: { error: "not_configured" } };
  }
  const messages = sanitize(body?.messages);
  if (!messages) return { status: 400, json: { error: "bad_request" } };
  if (rateLimited(ip)) return { status: 429, json: { error: "rate_limited" } };

  client ??= new Anthropic();
  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 1024, // replies are deliberately short
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low" }, // chat: fast, low-latency answers
      cache_control: { type: "ephemeral" },
      system: SYSTEM_PROMPT,
      messages,
    });

    if (response.stop_reason === "refusal") {
      return {
        status: 200,
        json: {
          reply:
            "I can't help with that one. Ask me about my projects, skills or internship instead!",
        },
      };
    }
    const reply = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();
    return { status: 200, json: { reply } };
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return { status: 429, json: { error: "rate_limited" } };
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("Anthropic auth failed: check ANTHROPIC_API_KEY");
      return { status: 503, json: { error: "not_configured" } };
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`Anthropic API error ${error.status}:`, error.message);
      return { status: 502, json: { error: "upstream_error" } };
    }
    console.error(error);
    return { status: 500, json: { error: "server_error" } };
  }
}

// Vercel Node.js function entry point (req.body is parsed JSON).
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0] || "unknown";
  const { status, json } = await handleChat(req.body, ip);
  return res.status(status).json(json);
}
