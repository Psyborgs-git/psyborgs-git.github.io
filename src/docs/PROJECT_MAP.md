# 🗺️ Project Map & Visual Guide

## Component Tree Visualization

```
┌─────────────────────────────────────────────────────────────┐
│                         <App.tsx>                           │
│  • Manages active section state                             │
│  • IntersectionObserver for nav highlighting               │
│  • Injects GLOBAL_STYLES                                   │
└────────┬──────────────────────────────────────────────────┬─┘
         │                                                  │
    ┌────▼──────────────┐              ┌──────────────────▼──┐
    │   <Cursor />      │              │   <Ghost />        │
    │                   │              │                    │
    │ • Mouse tracking  │              │ • Chat interface   │
    │ • Dot+ring+aura   │              │ • Anthropic API    │
    │ • Hover states    │              │ • Navigation       │
    └───────────────────┘              └────────────────────┘
    
    ┌──────────────────────────────────────────────────────┐
    │              <Nav active={active} />                │
    │                                                      │
    │  • Smooth scroll to sections                        │
    │  • Active indicator animation                       │
    │  • Fixed top-right positioning                      │
    └──────────────────────────────────────────────────────┘

    ┌──────────────────────────────────────────────────────┐
    │                    <main>                            │
    │                                                      │
    │  ┌────────────────────────────────────────────────┐ │
    │  │ <Hero id="hero">                              │ │
    │  │  • HeroCanvas (Three.js particles)           │ │
    │  │  • Animated title                             │ │
    │  │  • Status badge                               │ │
    │  │  • Scroll hint                                 │ │
    │  └────────────────────────────────────────────────┘ │
    │                                                      │
    │  ┌────────────────────────────────────────────────┐ │
    │  │ <Work id="work">                             │ │
    │  │  • Map over PROJECTS array                    │ │
    │  │  • ProjectCanvas x3 (rotating geos)          │ │
    │  │  • Card titles, tags, descriptions            │ │
    │  └────────────────────────────────────────────────┘ │
    │                                                      │
    │  ┌────────────────────────────────────────────────┐ │
    │  │ <Lab id="lab">                               │ │
    │  │  • Filter buttons (All, 3D, AI/ML, etc)     │ │
    │  │  • Animated grid layout                       │ │
    │  │  • Filtered LAB items                         │ │
    │  └────────────────────────────────────────────────┘ │
    │                                                      │
    │  ┌────────────────────────────────────────────────┐ │
    │  │ <About id="about">                           │ │
    │  │  • Bio section (left)                         │ │
    │  │  • Skill bars (right)                         │ │
    │  │  • Animated progress bars                     │ │
    │  └────────────────────────────────────────────────┘ │
    │                                                      │
    │  ┌────────────────────────────────────────────────┐ │
    │  │ <Contact id="contact">                       │ │
    │  │  • Email input field                          │ │
    │  │  • Form state management                      │ │
    │  │  • Confirmation message                       │ │
    │  └────────────────────────────────────────────────┘ │
    │                                                      │
    └──────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
                    ┌─────────────────────┐
                    │   constants.ts      │
                    │                     │
                    │ • GLOBAL_STYLES    │
                    │ • PROJECTS[]       │
                    │ • LAB[]            │
                    │ • SKILL_STACK[]    │
                    │ • SYSTEM_PROMPT    │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
         ┌──────▼────┐  ┌─────▼────┐  ┌─────▼───┐
         │   App     │  │  Work    │  │  About  │
         │<style>    │  │ {PROJECTS│  │{SKILLS} │
         │{injects}  │  │.map(...)}│  │.map(...)│
         └──────────┘  └──────────┘  └─────────┘
         
         ┌──────────────────────────────┐
         │         Ghost                │
         │  send to Anthropic API       │
         │  https://api.anthropic.com   │
         └──────────────────────────────┘
```

---

## State Management Map

### App.tsx (Root)
```
state: active = ""

flow:
  IntersectionObserver catches scroll events
  → triggers setActive(sectionId)
  → passes to <Nav active={active} />
  → Nav highlights current section

sections: ["work", "lab", "about", "contact"]
```

### Nav.tsx
```
receives: active (string)
displays: links with layoutId animate on active change
```

### Lab.tsx (Has internal state)
```
state: filter = "All"

flow:
  filter button clicked
  → setFilter(tag)
  → filter items: LAB.filter(i => i.tags.includes(filter))
  → AnimatePresence re-renders with animations
```

### Contact.tsx (Has internal state)
```
state:
  val = ""        (email input)
  sent = false    (form submitted?)

flow:
  type in input → setVal(text)
  press Enter or click Send → setVal("") && setSent(true)
  show confirmation → setVal("") after delay
```

### Ghost.tsx (Complex state)
```
state:
  open = false        (chat panel open?)
  msgs = []          (chat history)
  input = ""         (typing input)
  loading = false    (awaiting response?)

flow:
  click pill → setOpen(!open)
  type message → setInput(text)
  press Enter → 
    • setLoading(true)
    • call Anthropic API
    • add messages to msgs[]
    • setLoading(false)
    • detect [NAV:section] → scroll
```

---

## Animation Library Usage

### Framer Motion (motion.* components)
```
Hero.tsx
├── motion.h1 (title chars)
│   └── staggered delays for letter animation
├── motion.div (status badge)
│   └── dot-pulse keyframe animation
└── motion.div (scroll hint)
    └── bounce animation

Nav.tsx
├── motion.nav (container)
│   └── entrance animation on load
└── motion.div #nav-line (active underline)
    └── layoutId="nav-line" for smooth transition

Work.tsx
├── motion.div (cards container)
│   └── staggerContainer
└── motion.div x3 (project cards)
    └── staggered entrance with delay

Lab.tsx
├── motion.button (filter buttons)
├── motion.div (grid container)
│   └── layout animation
└── AnimatePresence (exit animations on filter change)

About.tsx
├── motion.div (skill bars)
    └── scaleX animation from 0→100%

Contact.tsx
├── AnimatePresence
│   └── form → confirmation transition
```

### Three.js (3D rendering)
```
HeroCanvas.tsx
├── 1800 particles
│   ├── geometry: BufferGeometry
│   ├── material: PointsMaterial
│   ├── physics: orbital motion + mouse repulsion
│   └── animation: requestAnimationFrame
├── morphing core
│   ├── geometry: IcosahedronGeometry
│   ├── animation: amplitude 0.07 sin wave
│   └── wireframe overlay
└── lights
    ├── cyan point light (orbital path)
    └── purple point light (orbital path)

ProjectCanvas.tsx (reusable, per project)
├── geometry selection
│   ├── "torus-knot" → TorusKnotGeometry
│   ├── "torus" → TorusGeometry
│   └── "octahedron" → OctahedronGeometry
├── material: Phong with emissive
├── wireframe: overlay for visual depth
└── animation: auto-rotation
```

---

## File Organization & Responsibilities

```
src/
├── main.tsx
│   └── Entry point: ReactDOM.createRoot(App)
│
├── App.tsx
│   └── Root orchestrator:
│       • State management (active section)
│       • Global styles injection
│       • Intersection observer setup
│       • Component composition
│
├── constants.ts
│   └── Single source of truth:
│       • CSS design tokens & keyframes
│       • Project data (PROJECTS[])
│       • Experiment data (LAB[])
│       • Skill data (SKILL_STACK[])
│       • AI system prompt
│
├── components/
│   │
│   ├── Cursor.tsx
│   │   └── Custom cursor with physics:
│   │       • Position tracking
│   │       • Lerped lagging effect
│   │       • Hover state detection
│   │
│   ├── Nav.tsx
│   │   └── Navigation bar:
│   │       • Fixed positioning
│   │       • Active indicator
│   │       • Smooth scroll linking
│   │
│   ├── HeroCanvas.tsx
│   │   └── Hero Three.js scene:
│   │       • Particle system
│   │       • Core morphing
│   │       • Lighting setup
│   │
│   ├── ProjectCanvas.tsx
│   │   └── Reusable 3D component:
│   │       • Geometry selection
│   │       • Material configuration
│   │       • Auto-rotation
│   │
│   ├── Ghost.tsx
│   │   └── AI chat interface:
│   │       • API integration
│   │       • Message management
│   │       • Navigation routing
│   │
│   └── sections/
│       ├── Hero.tsx
│       │   └── Landing section with animations
│       ├── Work.tsx
│       │   └── Project showcase grid
│       ├── Lab.tsx
│       │   └── Filterable experiments
│       ├── About.tsx
│       │   └── Bio and skills
│       └── Contact.tsx
│           └── Email form
│
├── index.css
│   └── Global styles, themes, scrollbar
│
└── App.css
    └── Component-specific styles
```

---

## Build & Deployment Flow

```
source code (src/)
    ↓
TypeScript compiler (tsc)
    ↓
Vite bundler
    ├── ES module resolution
    ├── Tree shaking (unused code removal)
    ├── Code splitting
    └── Minification
    ↓
output (dist/)
    ├── index.html
    ├── assets/
    │   ├── index-XXX.js (main bundle)
    │   └── index-XXX.css (styles)
    └── vite.svg
    ↓
deployment
    ├── Vercel: bun build → vercel deploy
    ├── Netlify: bun build → netlify deploy --dir=dist
    └── GitHub Pages: push dist/ to gh-pages branch
```

---

## Port Mapping & Networking

```
Local Development:
┌─────────────────────────────────┐
│  Your Machine                    │
│                                 │
│  localhost:5173                 │
│  ├── index.html                 │
│  ├── /src/main.tsx (HMR)       │
│  └── /vite.svg                  │
│                                 │
│  Background API:                │
│  └─→ https://api.anthropic.com  │
│      (Claude requests)          │
└─────────────────────────────────┘

Production:
┌──────────────────────────────┐
│  CDN / Hosting               │
│                              │
│  https://yoursite.com        │
│  ├── index.html              │
│  ├── assets/index-XXX.js     │
│  └── assets/index-XXX.css    │
│                              │
│  External APIs:              │
│  └─→ https://api.anthropic.com
└──────────────────────────────┘
```

---

## TypeScript Type Flow

```
App.tsx
├── useState<string> → active state
├── useEffect deps[] → runs once on mount
└── sections mapped with proper JSX return types

Nav.tsx
├── interface NavProps { active: string }
└── component: React.FC<NavProps>

HeroCanvas.tsx
├── useRef<THREE.Group>(null)
├── useRef<THREE.Renderer>(null)
└── proper THREE.* type annotations

ProjectCanvas.tsx
├── interface ProjectCanvasProps { accent: string; geoType: "torus-knot"|... }
└── component: React.FC<ProjectCanvasProps>

Ghost.tsx
├── interface Message { role: "user"|"assistant"; content: string }
├── useState<Message[]>
└── Anthropic API response typing
```

---

## Performance Optimization Layers

```
1. Code Level
   ├── Component memoization where needed
   ├── Event debouncing (IntersectionObserver)
   └── Proper cleanup in useEffect

2. Build Level
   ├── Tree shaking (remove unused code)
   ├── Code splitting (lazy load sections)
   ├── Minification (reduce bundle size)
   └── Compression (gzip on CDN)

3. Three.js Level
   ├── Geometry reuse (don't recreate each frame)
   ├── Material pooling
   ├── RequestAnimationFrame throttling
   └── Proper texture management

4. Network Level
   ├── CDN delivery (dist files)
   ├── HTTP/2 multiplexing
   ├── Gzip compression
   └── Cache headers
```

---

## Development to Production Checklist

```
Development
├── bun run dev              (start dev server)
├── edit src/ files          (auto-refresh with HMR)
├── bun run type-check       (verify types)
└── test in browser          (validate behavior)

Pre-Production
├── run same checks locally
├── test on different browsers
├── test on mobile/tablet
└── verify API keys configured

Production Build
├── bun run build            (compile & optimize)
├── bun run preview          (test production build locally)
├── run final checks
└── deploy dist/ folder

Post-Deployment
├── verify site loads
├── check performance metrics
├── test all features
├── monitor error logs
└── celebrate! 🎉
```

---

**Last Updated:** April 14, 2026  
**Format:** Visual Guide for Quick Reference
