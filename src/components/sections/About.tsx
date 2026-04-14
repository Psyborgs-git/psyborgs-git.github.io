import { motion } from "framer-motion";
import { SKILL_STACK } from "../../constants";

export function About() {
  return (
    <section id="about" style={{ padding: "112px 36px", minHeight: "70vh" }}>
      <style>
        {`
          #about .about-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 72px;
            align-items: start;
          }
          @media (min-width: 1024px) {
            #about .about-grid {
              grid-template-columns: 1fr 1fr;
            }
          }
        `}
      </style>
      <div
        className="about-grid"
        style={{
          display: "grid",
          gap: 72,
          alignItems: "start",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            About
          </div>
          <p
            className="syne"
            style={{
              fontWeight: 700,
              fontSize: "clamp(22px,2.4vw,34px)",
              lineHeight: 1.2,
              letterSpacing: "-.02em",
              color: "var(--bright)",
              marginBottom: 28,
            }}
          >
            I build things that live at the intersection of code, geometry, and intelligence.
          </p>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.85,
              color: "var(--ghost)",
              marginBottom: 14,
            }}
          >
            Full-stack engineer focused on 3D web experiences and ambient AI integration. I work from system architecture
            down to vertex shaders — wherever the problem lives.
          </p>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.85,
              color: "var(--ghost)",
            }}
          >
            Currently building interactive 3D learning tools, procedural geometry systems, and AI interfaces that feel
            inevitable rather than bolted on.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            Stack
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {SKILL_STACK.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.06 }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                  <span
                    className="mono"
                    style={{
                      fontSize: 10,
                      color: "var(--paper)",
                      letterSpacing: ".04em",
                    }}
                  >
                    {s.name}
                  </span>
                  <span className="mono" style={{ fontSize: 9, color: "var(--mist)" }}>
                    {s.value}%
                  </span>
                </div>
                <div style={{ height: 1, background: "var(--border)", position: "relative" }}>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.06, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      transformOrigin: "left",
                      background: s.color,
                      width: `${s.value}%`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
