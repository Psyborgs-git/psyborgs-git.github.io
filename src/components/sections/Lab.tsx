import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LAB } from "../../constants";

export function Lab() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "3D", "AI/ML", "Shader", "Canvas"];
  const items = filter === "All" ? LAB : LAB.filter((i) => i.tags.some((t) => t === filter || t.includes(filter)));

  return (
    <section id="lab" style={{ padding: "112px 36px", minHeight: "70vh" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
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
          Lab / Experiments
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 44, flexWrap: "wrap" }}>
          {filters.map((f) => (
            <button
              key={f}
              data-h
              onClick={() => setFilter(f)}
              className="mono"
              style={{
                background: f === filter ? "var(--signal)" : "none",
                border: `1px solid ${f === filter ? "var(--signal)" : "var(--border)"}`,
                borderRadius: 2,
                padding: "5px 14px",
                fontSize: 9,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: f === filter ? "var(--void)" : "var(--ghost)",
                transition: "all 180ms",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        layout
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
          gap: 2,
        }}
      >
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              data-h
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                padding: "28px 24px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="syne"
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  color: "var(--paper)",
                  marginBottom: 14,
                  letterSpacing: "-.01em",
                }}
              >
                {item.title}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="mono"
                    style={{
                      fontSize: 8,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color: "var(--mist)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span
                className="mono"
                style={{
                  position: "absolute",
                  bottom: 18,
                  right: 18,
                  fontSize: 8,
                  color: "var(--border)",
                }}
              >
                {item.year}
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: "var(--signal)",
                  transformOrigin: "left",
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
