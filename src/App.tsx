import { useState, useEffect } from "react";
import { GLOBAL_STYLES } from "./constants";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Ghost } from "./components/Ghost";
import { Hero } from "./components/sections/Hero";
import { Work } from "./components/sections/Work";
import { Lab } from "./components/sections/Lab";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";

export default function App() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { threshold: 0.35 }
    );

    ["work", "lab", "about", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <Cursor />
      <Nav active={active} />
      <main>
        <Hero />
        <Work />
        <Lab />
        <About />
        <Contact />
      </main>
      <Ghost />
    </>
  );
}
