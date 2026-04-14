import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Contact() {
  const [val, setVal] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contact"
      style={{
        padding: "112px 36px 80px",
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 760 }}
      >
        <div
          className="mono"
          style={{
            fontSize: 9,
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "var(--mist)",
            marginBottom: 44,
          }}
        >
          Let's Talk
        </div>
        <h2
          className="syne"
          style={{
            fontWeight: 800,
            fontSize: "clamp(38px,5.5vw,76px)",
            lineHeight: 1,
            letterSpacing: "-.04em",
            color: "var(--bright)",
            marginBottom: 56,
          }}
        >
          What are you<br />
          <span style={{ color: "var(--signal)" }}>building?</span>
        </h2>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div key="form" exit={{ opacity: 0, y: -14 }} style={{ borderBottom: "1px solid var(--fog)", paddingBottom: 14 }}>
              <input
                value={val}
                onChange={(e) => setVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && val.trim() && setSent(true)}
                placeholder="Type it here..."
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontFamily: "Syne,sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(17px,2.2vw,26px)",
                  color: "var(--paper)",
                  letterSpacing: "-.01em",
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="mono"
              style={{
                fontSize: 12,
                color: "var(--signal)",
                letterSpacing: ".06em",
              }}
            >
              ✓ Received. I'll be in touch.
            </motion.div>
          )}
        </AnimatePresence>

        {!sent && (
          <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
            <button
              data-h
              onClick={() => val.trim() && setSent(true)}
              className="mono"
              style={{
                background: "none",
                border: "none",
                fontSize: 11,
                letterSpacing: ".08em",
                color: val.trim() ? "var(--signal)" : "var(--mist)",
                transition: "color 180ms",
              }}
            >
              → Send (or press ↵)
            </button>
          </div>
        )}
      </motion.div>

      {/* Footer */}
      <div
        style={{
          marginTop: 96,
          paddingTop: 36,
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span className="mono" style={{ fontSize: 9, color: "var(--border)", letterSpacing: ".1em" }}>
          SIGNAL · 2026
        </span>
        <span className="mono" style={{ fontSize: 9, color: "var(--border)", letterSpacing: ".1em" }}>
          THREE.JS · REACT · FRAMER
        </span>
      </div>
    </section>
  );
}
