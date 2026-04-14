import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GHOST_SYSTEM_PROMPT } from "../constants";

export function Ghost() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const msgsRef = useRef<HTMLDivElement>(null);

  const send = async () => {
    if (!input.trim() || loading) return;

    const text = input.trim();
    setInput("");

    const next = [...msgs, { role: "user" as const, content: text }];
    setMsgs(next);
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: GHOST_SYSTEM_PROMPT,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      const reply = data.content?.[0]?.text || "Signal lost.";
      const nav = reply.match(/\[NAV:(\w+)\]/);

      if (nav) {
        document.getElementById(nav[1])?.scrollIntoView({ behavior: "smooth" });
      }

      setMsgs((p) => [...p, { role: "assistant", content: reply.replace(/\[NAV:\w+\]/g, "").trim() }]);
    } catch {
      setMsgs((p) => [...p, { role: "assistant", content: "Signal lost. Try again." }]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [msgs]);

  const visible = msgs.slice(-6);

  return (
    <div style={{ position: "fixed", bottom: 28, left: 36, zIndex: 2000 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 10px)",
              left: 0,
              width: 316,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "12px 14px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: 9,
                  color: "var(--ghost)",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                }}
              >
                Ghost · Portfolio Intelligence
              </span>
              <button
                data-h
                onClick={() => setOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--mist)",
                  fontSize: 16,
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div
              ref={msgsRef}
              style={{
                padding: "14px",
                minHeight: 80,
                maxHeight: 260,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {visible.length === 0 && (
                <p className="mono" style={{ fontSize: 10, color: "var(--mist)", lineHeight: 1.7 }}>
                  Ask about the work, the stack, or what I'm building.
                </p>
              )}
              {visible.map((m, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: m.role === "user" ? 13 : 11,
                    fontFamily: m.role === "user" ? "Syne,sans-serif" : "JetBrains Mono,monospace",
                    color: m.role === "user" ? "var(--paper)" : "var(--ghost)",
                    lineHeight: 1.65,
                    textAlign: m.role === "user" ? "right" : "left",
                    padding: m.role === "user" ? "0 0 0 32px" : "0 32px 0 0",
                  }}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <motion.div
                  className="mono"
                  style={{ fontSize: 11, color: "var(--signal)" }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                >
                  ···
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div
              style={{
                padding: "10px 14px",
                borderTop: "1px solid var(--border)",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask anything..."
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  outline: "none",
                  fontFamily: "JetBrains Mono,monospace",
                  fontSize: 11,
                  color: "var(--paper)",
                  letterSpacing: ".02em",
                }}
              />
              <button
                data-h
                onClick={send}
                className="mono"
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 12,
                  color: input.trim() ? "var(--signal)" : "var(--border)",
                  transition: "color 150ms",
                }}
              >
                ↵
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pill */}
      <motion.button
        data-h
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        style={{
          background: "var(--surface)",
          borderRadius: 20,
          padding: "7px 15px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "JetBrains Mono,monospace",
          fontSize: 11,
          color: "var(--ghost)",
          letterSpacing: ".08em",
          border: open ? "1px solid var(--signal)" : "1px solid var(--border)",
          transition: "border-color 200ms",
        }}
      >
        <motion.span
          animate={
            open
              ? { backgroundColor: "#5FDDBC" }
              : {
                  backgroundColor: ["#5FDDBC", "rgba(95,221,188,.2)", "#5FDDBC"],
                  scale: [1, 0.75, 1],
                }
          }
          transition={{ duration: 2.8, repeat: open ? 0 : Infinity }}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--signal)",
            display: "inline-block",
          }}
        />
        ghost
      </motion.button>
    </div>
  );
}
