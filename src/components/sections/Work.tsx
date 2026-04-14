import { motion } from "framer-motion";
import { PROJECTS } from "../../constants";
import { ProjectCanvas } from "../ProjectCanvas";

export function Work() {
  return (
    <section id="work" style={{ padding: "112px 36px", minHeight: "100vh" }}>
      <motion.div
        className="mono"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: 9,
          letterSpacing: ".16em",
          textTransform: "uppercase",
          color: "var(--mist)",
          marginBottom: 60,
        }}
      >
        Selected Work
      </motion.div>

      {PROJECTS.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            borderTop: "1px solid var(--border)",
            padding: "44px 0",
            alignItems: "center",
          }}
        >
          {/* Text */}
          <div style={{ paddingRight: 56 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--fog)", letterSpacing: ".1em", marginBottom: 14 }}>
              {p.id}
            </div>
            <h3
              className="syne"
              style={{
                fontWeight: 700,
                fontSize: "clamp(26px,2.8vw,42px)",
                lineHeight: 1.1,
                letterSpacing: "-.025em",
                color: "var(--bright)",
                marginBottom: 18,
              }}
            >
              {p.title}
            </h3>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.75,
                color: "var(--ghost)",
                marginBottom: 22,
                maxWidth: 380,
              }}
            >
              {p.desc}
            </p>
            <div style={{ display: "flex", gap: 6, marginBottom: 28, flexWrap: "wrap" }}>
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="mono"
                  style={{
                    fontSize: 9,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    border: "1px solid var(--border)",
                    borderRadius: 2,
                    padding: "3px 8px",
                    color: "var(--mist)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <motion.button
              data-h
              style={{
                background: "none",
                border: "none",
                padding: 0,
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 11,
                color: p.accent,
                letterSpacing: ".06em",
                display: "flex",
                gap: 8,
                alignItems: "center",
                transition: "gap 200ms",
              }}
              whileHover="hov"
              variants={{ hov: { gap: 16 } }}
            >
              View Project →
            </motion.button>
          </div>

          {/* 3D Preview */}
          <div
            style={{
              height: 260,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <ProjectCanvas accent={p.accent} geoType={p.geo} />
          </div>
        </motion.div>
      ))}
    </section>
  );
}
