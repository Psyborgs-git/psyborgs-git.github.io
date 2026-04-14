// Design Tokens - Global Styles
export const GLOBAL_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --void:    #070710;
  --surface: #0D0D1A;
  --border:  #191928;
  --fog:     #252538;
  --mist:    #44445E;
  --ghost:   #7878A0;
  --paper:   #C4C4DC;
  --bright:  #EDEDFF;
  --signal:  #5FDDBC;
  --pulse:   #9B7FFA;
  --heat:    #F4721A;
}
html { background: var(--void); scroll-behavior: smooth; }
body { background: var(--void); color: var(--paper); overflow-x: hidden; cursor: none !important; }
* { cursor: none !important; }
::selection { background: var(--signal); color: var(--void); }
::-webkit-scrollbar { width: 2px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--fog); }
.syne  { font-family: 'Syne', sans-serif; }
.mono  { font-family: 'JetBrains Mono', monospace; }
input, textarea { font-family: 'Syne', sans-serif; }
input::placeholder { color: var(--mist); }
@keyframes dot-pulse {
  0%,100% { opacity:1; transform:scale(1); }
  50%      { opacity:.3; transform:scale(.7); }
}
@keyframes ring-spin {
  to { transform:rotate(360deg); }
}
`;

// Projects Data
export const PROJECTS = [
  {
    id: "01",
    title: "3D Scene Viewer",
    tags: ["Three.js", "React", "WebGL"],
    desc: "Slider-driven 3D visualization system — brilliant.org-inspired learning interface with animated scene scrubbing.",
    accent: "#5FDDBC",
    geo: "torus-knot" as const,
  },
  {
    id: "02",
    title: "Educational Blog Engine",
    tags: ["Full Stack", "Vite", "AI/ML"],
    desc: "Static-built educational platform with path-based 3D scenes and ML architecture visualizations.",
    accent: "#9B7FFA",
    geo: "octahedron" as const,
  },
  {
    id: "03",
    title: "AI Sidekick Framework",
    tags: ["LLM", "React", "API"],
    desc: "Context-aware ambient intelligence layer — speaks first-person as the developer, routes navigation, knows everything.",
    accent: "#F4721A",
    geo: "torus" as const,
  },
];

// Lab Experiments Data
export const LAB = [
  { title: "Vertex Noise Field", tags: ["GLSL", "Three.js"], year: "2026" },
  { title: "Particle Physics Sim", tags: ["WebGL", "Math"], year: "2026" },
  { title: "React Component Graph", tags: ["D3", "React"], year: "2025" },
  { title: "Neural Net Visualizer", tags: ["AI/ML", "3D"], year: "2025" },
  { title: "Procedural Terrain", tags: ["Three.js", "Shader"], year: "2025" },
  { title: "Type Morph Engine", tags: ["Canvas", "Animation"], year: "2025" },
];

// Skill Stack Data
export const SKILL_STACK = [
  { name: "Django", value: 95, color: "var(--signal)" },
  { name: "FastAPI", value: 95, color: "var(--signal)" },
  { name: "React", value: 95, color: "var(--signal)" },
  { name: "Framer Motion", value: 90, color: "var(--signal)" },
  { name: "Three.js", value: 88, color: "var(--pulse)" },
  { name: "TypeScript", value: 85, color: "var(--pulse)" },
  { name: "Node.js", value: 82, color: "var(--pulse)" },
  { name: "Python", value: 82, color: "var(--pulse)" },
  { name: "C++", value: 82, color: "var(--pulse)" },
  { name: "Rust", value: 82, color: "var(--pulse)" },
  { name: "GLSL", value: 75, color: "var(--heat)" },
  { name: "AI / LLM", value: 80, color: "var(--heat)" },
  { name: "React Native", value: 82, color: "var(--heat)" },
  { name: "Electron/tauri natives", value: 90, color: "var(--heat)" },
  { name: "AWS/GCP Cloud", value: 99, color: "var(--heat)" },
  { name: "GraphQL", value: 99, color: "var(--signal)" },
  { name: "Government Compliance", value: 99, color: "var(--signal)" },
];

// Ghost AI System Prompt
export const GHOST_SYSTEM_PROMPT = `You are Ghost — the ambient intelligence of this developer's portfolio. Speak in first person as the developer. Be direct, technically precise, confident. Max 3 sentences unless asked for detail. Never say "As an AI" or similar. You are not a chatbot — you are context made interactive.

Developer profile:

- Full-stack engineer: React, Three.js, WebGL, Framer Motion, TypeScript, Node.js, Python
- Specializes in 3D web experiences, procedural geometry, GLSL shaders, scroll-driven animation
- Builds AI-integrated ambient interfaces (not chatbot wrappers)
- Projects: 3D Scene Viewer (slider-driven), Educational Blog Engine (static + 3D paths), AI Sidekick Framework
- Available for work 2026
- Philosophy: "build things that live at the intersection of code, geometry, and intelligence"
- Stack depth: React 95%, Framer Motion 90%, Three.js 88%, TypeScript 85%, Node.js 82%, GLSL 75%, AI/LLM 80%

If asked to navigate, reply with [NAV:work], [NAV:lab], [NAV:about], or [NAV:contact] anywhere in your response.`;
