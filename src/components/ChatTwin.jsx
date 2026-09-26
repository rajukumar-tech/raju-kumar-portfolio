import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "../constants";
import { offlineAnswer } from "./twinOffline";

const SUGGESTIONS = [
  "What did you do at IIT Ropar?",
  "What's your strongest project?",
  "Which backend skills do you have?",
  "Are you open to internships?",
];

const GREETING = {
  role: "assistant",
  content: `Hi! I'm ${profile.shortName}'s AI Digital Twin 🤖 Ask me anything about my skills, projects or internship, and I'll answer on ${profile.shortName}'s behalf.`,
};

// Renders "• item" lines and bare URLs from replies without an HTML parser.
function MessageText({ text }) {
  const parts = text.split(/(https?:\/\/[^\s)]+)/g);
  return (
    <p className="whitespace-pre-wrap break-words">
      {parts.map((part, i) =>
        /^https?:\/\//.test(part) ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-lavender"
          >
            {part.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        ) : (
          part.replace(/\*\*/g, "").replace(/^[-*] /gm, "• ")
        )
      )}
    </p>
  );
}

const ChatTwin = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [offline, setOffline] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const ask = async (text) => {
    const question = text.trim();
    if (!question || loading) return;
    const history = [...messages, { role: "user", content: question }];
    setMessages(history);
    setInput("");
    setLoading(true);

    let reply;
    if (!offline) {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // The greeting is local UI text, so it isn't sent to the model.
          body: JSON.stringify({ messages: history.slice(1) }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.reply) {
          reply = data.reply;
        } else if (res.status === 429) {
          reply = "I'm getting a lot of questions right now. Give me a few seconds and try again!";
        } else {
          setOffline(true);
        }
      } catch {
        setOffline(true);
      }
    }
    if (!reply) reply = offlineAnswer(question);

    setMessages((m) => [...m, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  return (
    <div className="fixed z-40 bottom-5 right-5">
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute bottom-16 right-0 flex flex-col w-[calc(100vw-2.5rem)] max-w-sm h-[32rem] max-h-[75vh] overflow-hidden border shadow-2xl rounded-2xl border-white/10 bg-gradient-to-b from-navy to-primary"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label={`${profile.shortName}'s AI Digital Twin`}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/5">
              <span className="flex items-center justify-center text-lg rounded-full size-9 bg-radial from-lavender to-royal">
                🤖
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">
                  {profile.shortName}'s AI Twin
                </p>
                <p className="text-xs text-neutral-400">
                  {offline ? "Offline mode · quick answers" : "AI · may make mistakes"}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-md hover:bg-white/10"
                aria-label="Close chat"
              >
                <img src="/assets/close.svg" className="size-5" alt="" />
              </button>
            </div>

            <div ref={listRef} className="flex-1 px-4 py-3 space-y-3 overflow-y-auto text-sm">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-2xl ${
                      m.role === "user"
                        ? "bg-royal text-white rounded-br-sm"
                        : "bg-white/10 text-neutral-200 rounded-bl-sm"
                    }`}
                  >
                    <MessageText text={m.content} />
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-1 px-3 py-3 rounded-2xl bg-white/10 w-fit">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="rounded-full size-1.5 bg-neutral-300"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: d * 0.2 }}
                    />
                  ))}
                </div>
              )}
              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => ask(s)}
                      className="px-3 py-1.5 text-xs rounded-full ring-1 ring-white/15 text-neutral-300 hover:bg-white/10"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              className="flex gap-2 p-3 border-t border-white/10"
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={1000}
                placeholder="Ask about my work…"
                className="flex-1 px-3 py-2 text-sm rounded-lg outline-none bg-white/10 text-white placeholder:text-neutral-500 focus:ring-1 focus:ring-lavender"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-4 text-sm rounded-lg bg-radial from-lavender to-royal disabled:opacity-40"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-white rounded-full shadow-lg bg-radial from-lavender to-royal"
        aria-expanded={open}
      >
        <span className="text-lg">{open ? "✕" : "🤖"}</span>
        <span className="hidden sm:inline">{open ? "Close" : "Ask my AI Twin"}</span>
      </motion.button>
    </div>
  );
};

export default ChatTwin;
