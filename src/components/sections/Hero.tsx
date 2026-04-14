import { motion } from "framer-motion";
import { HeroCanvas } from "../HeroCanvas";

export function Hero() {
  const name1 = "Full Stack".split("");
  const name2 = "Engineer".split("");

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <HeroCanvas />

      {/* Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="mono"
        style={{
          position: "absolute",
          top: 32,
          left: 36,
          zIndex: 10,
          fontSize: 9,
          letterSpacing: ".16em",
          textTransform: "uppercase",
          color: "var(--mist)",
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "var(--signal)",
            display: "inline-block",
            animation: "dot-pulse 2.5s ease-in-out infinite",
          }}
        />
        Available for Work · 2026
      </motion.div>

      {/* Hero Text */}
      <div style={{ position: "relative", zIndex: 10, padding: "0 36px", userSelect: "none" }}>
        <h1
          className="syne"
          style={{
            fontWeight: 800,
            fontSize: "clamp(52px,8.5vw,112px)",
            lineHeight: 0.92,
            letterSpacing: "-.04em",
            color: "var(--bright)",
            marginBottom: 22,
          }}
        >
          {name1.map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.038, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {c}
            </motion.span>
          ))}
          <br />
          {name2.map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 + i * 0.038, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "inline-block",
                color: i === 0 ? "var(--signal)" : "var(--bright)",
              }}
            >
              {c}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mono"
          style={{
            fontSize: 12,
            color: "var(--ghost)",
            letterSpacing: ".08em",
            display: "flex",
            gap: 14,
            alignItems: "center",
          }}
        >
          <span>React</span>
          <span style={{ color: "var(--border)" }}>·</span>
          <span>Three.js</span>
          <span style={{ color: "var(--border)" }}>·</span>
          <span>3D Art</span>
          <span style={{ color: "var(--border)" }}>·</span>
          <span style={{ color: "var(--signal)" }}>AI</span>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="mono"
        style={{
          position: "absolute",
          bottom: 32,
          right: 36,
          zIndex: 10,
          fontSize: 9,
          letterSpacing: ".12em",
          color: "var(--mist)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 8,
        }}
      >
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>
          ↓
        </motion.span>
        <span>scroll</span>
      </motion.div>
    </section>
  );
}
