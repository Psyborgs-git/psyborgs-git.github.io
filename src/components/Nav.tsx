import { motion } from "framer-motion";

interface NavProps {
  active: string;
}

export function Nav({ active }: NavProps) {
  const links = ["work", "lab", "about", "contact"];

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 28,
        right: 36,
        zIndex: 1000,
        display: "flex",
        gap: 28,
      }}
    >
      {links.map((l) => (
        <button
          key={l}
          data-h
          onClick={() => go(l)}
          style={{
            background: "none",
            border: "none",
            padding: "4px 0",
            fontFamily: "JetBrains Mono,monospace",
            fontSize: 10,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: active === l ? "var(--signal)" : "var(--ghost)",
            transition: "color 200ms",
            position: "relative",
          }}
        >
          {l}
          {active === l && (
            <motion.div
              layoutId="nav-line"
              style={{
                position: "absolute",
                bottom: -1,
                left: 0,
                right: 0,
                height: 1,
                background: "var(--signal)",
              }}
            />
          )}
        </button>
      ))}
    </motion.nav>
  );
}
