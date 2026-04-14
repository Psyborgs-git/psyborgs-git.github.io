# Architecture Overview

## Component Hierarchy

```
App (main root)
├── <Cursor />
├── <Nav active={active} />
├── <main>
│   ├── <Hero />
│   │   └── <HeroCanvas />
│   │       (Three.js particle + core morph scene)
│   │
│   ├── <Work />
│   │   └── {PROJECTS.map(p => (
│   │       <ProjectCanvas accent={p.accent} geoType={p.geo} />
│   │     ))}
│   │
│   ├── <Lab />
│   │   (Filterable experiments grid)
│   │
│   ├── <About />
│   │   (Bio + skill proficiency bars)
│   │
│   └── <Contact />
│       (Email form with state management)
│
└── <Ghost />
    (AI chat interface with Anthropic API)
```

## Data Flow

```
constants.ts
├── GLOBAL_STYLES → App → <style> injection
├── PROJECTS → Work → {map over items}
├── LAB → Lab → {filter & render items}
├── SKILL_STACK → About → {render proficiency}
└── GHOST_SYSTEM_PROMPT → Ghost → {send to API}
```

## State Management

```
App.tsx
├── [active] : string
│   └── Updated by IntersectionObserver
│   └── Passed to Nav for highlight
│
Nav.tsx
├── Uses active prop
│   └── Shows active nav item
│
Work.tsx (stateless)
Lab.tsx
├── [filter] : string
├── Updates items based on filter selection
│
Contact.tsx
├── [val] : string (email input)
├── [sent] : boolean (form state)
│
Ghost.tsx
├── [open] : boolean (chat panel open/close)
├── [msgs] : Array<Message>  (chat history)
├── [input] : string (input box)
├── [loading] : boolean (API loading)
```

## Three.js Scenes

### HeroCanvas (Main)
- **Particles:** Orbital motion + mouse repulsion (1800 particles)
- **Core:** Morphing icosahedron with wireframe
- **Lights:** 2 point lights (cyan, purple) + ambient
- **Camera:** Follows mouse position
- **Performance:** Optimized with requestAnimationFrame

### ProjectCanvas (Mini, Reusable)
- **Geometry:** TorusKnot | Torus | Octahedron (per project)
- **Material:** Phong with emissive highlight
- **Wireframe:** Overlay for visual interest
- **Light:** Single point light matching accent color
- **Auto-rotate:** Continuous rotation animation

## Animation Libraries

```
Framer Motion (used in):
├── HeroCanvas (particle entrance)
├── Nav (nav line underline)
├── Hero section titles (letter by letter)
├── Work section (staggered card entrance)
├── Lab section (filter button transitions + grid layout animations)
├── About section (skill bar progress animation)
├── Contact section (form state transitions)
├── Ghost chat (message fade-in + loading pulse)

Three.js (used in):
├── HeroCanvas (particle physics, core morphing)
└── ProjectCanvas x3 (rotating geometries)
```

## API Integration

### Anthropic Claude API
```
Ghost.tsx
├── sends to: https://api.anthropic.com/v1/messages
├── model: claude-sonnet-4-20250514
├── max_tokens: 1000
├── system: GHOST_SYSTEM_PROMPT
├── handles: Navigation routing via [NAV:section] tags
└── error handling: "Signal lost" fallback
```

## Event Listeners

```
App.tsx
├── IntersectionObserver (on: work, lab, about, contact)
│   └── Triggers Nav highlight update

Cursor.tsx
├── mousemove → cursor position tracking
├── mousedown → dot shrink
├── mouseup → dot grow
└── [data-h] elements → ring scale on hover

Nav.tsx
├── click → smooth scroll to section

HeroCanvas.tsx
├── mousemove → camera + particle repulsion
├── resize → camera aspect + renderer size
└── requestAnimationFrame (60fps)

ProjectCanvas.tsx
└── requestAnimationFrame (60fps)

Ghost.tsx
├── click on pill → toggle chat panel
├── Enter key in input → send message
├── click send button → send message
└── focus management for input ref
```

## File Sizes (Approximate)

| File | Lines | Purpose |
|------|-------|---------|
| App.tsx | ~40 | Main component & state |
| constants.ts | ~80 | All data & config |
| Cursor.tsx | ~50 | Custom cursor |
| Nav.tsx | ~45 | Navigation bar |
| HeroCanvas.tsx | ~140 | Hero Three.js scene |
| ProjectCanvas.tsx | ~85 | Project preview scene |
| Ghost.tsx | ~180 | AI chat interface |
| Hero.tsx | ~120 | Hero section |
| Work.tsx | ~85 | Work section |
| Lab.tsx | ~90 | Lab section |
| About.tsx | ~100 | About section |
| Contact.tsx | ~80 | Contact section |
| **Total** | **~1055** | Full working app |

## Build Output

```
Vite Build
├── HTML (index.html)
├── JavaScript (bundled & minified)
├── CSS (extracted & optimized)
├── Assets (fonts via Google Fonts CDN)
└── Output: dist/ folder ready for deployment
```

## Development Experience

```
bun run dev
├── Vite dev server on :5173
├── HMR (Hot Module Replacement) enabled
├── Fast refresh on file changes
├── Type checking with TypeScript
└── Browser auto-opens to localhost:5173

bun run type-check
├── Runs TypeScript compiler
├── No emit (files not generated)
├── Catches type errors before build

bun run build
├── TypeScript compile
├── Vite bundling + minification
├── Output to dist/
└── Ready for production deployment
```

## Performance Optimizations

- **Code splitting:** Only load needed components
- **Tree shaking:** Unused exports removed
- **Lazy rendering:** Framer Motion useInView only animates visible items
- **Canvas optimization:** Proper disposal of Three.js resources
- **Event debouncing:** Intersection observer uses threshold
- **Memory management:** Cleanup in useEffect return functions

---

**Architecture Last Updated:** April 14, 2026  
**Framework Stack:** React 18 + TypeScript + Framer Motion + Three.js + Vite + Bun
