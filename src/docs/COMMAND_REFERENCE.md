# ⚡ Quick Command Reference

## 🚀 Three Commands to Get Started

```bash
cd Psyborgs-git                    # Navigate to project
bun install                        # Install dependencies
bun run dev                        # Start development server
```

**Open:** http://localhost:5173

---

## 📝 All Commands

| Command | Purpose | Output |
|---------|---------|--------|
| `bun install` | Install all dependencies | `node_modules/` created |
| `bun run dev` | Start development server | Runs on `localhost:5173` |
| `bun run build` | Build for production | Creates `dist/` folder |
| `bun run preview` | Preview production build | Runs built app locally |
| `bun run type-check` | Check TypeScript types | Shows type errors |
| `bun run lint` | Run ESLint | Shows code style issues |

---

## 📂 Project Structure

```
src/
├── App.tsx                    # Root component (40 lines)
├── constants.ts              # All data & config
├── main.tsx                  # Entry point
├── index.css                 # Global styles
├── App.css                   # Component styles
└── components/
    ├── Cursor.tsx            # Custom cursor
    ├── Nav.tsx               # Navigation bar
    ├── HeroCanvas.tsx        # Hero 3D scene
    ├── ProjectCanvas.tsx     # Project previews
    ├── Ghost.tsx             # AI chat
    └── sections/
        ├── Hero.tsx          # Hero section
        ├── Work.tsx          # Portfolio
        ├── Lab.tsx           # Experiments
        ├── About.tsx         # Bio & skills
        └── Contact.tsx       # Contact form
```

---

## 🔧 Key Files

| File | Purpose | Edit For |
|------|---------|----------|
| `src/constants.ts` | All data | Projects, skills, colors, prompts |
| `src/App.tsx` | Root | App structure, layout |
| `src/components/*.tsx` | Features | Component behavior |
| `vite.config.ts` | Build | Build settings |
| `tsconfig.json` | TypeScript | Type checking rules |
| `package.json` | Dependencies | Adding packages |

---

## 🎨 Customization Quick Guide

### Add a Project
Edit: `src/constants.ts`
```typescript
export const PROJECTS = [
  // ... existing
  { id: "04", title: "My Project", tags: ["React"], desc: "Desc", accent: "#color", geo: "torus" }
];
```

### Add a Skill
Edit: `src/constants.ts`
```typescript
export const SKILL_STACK = [
  // ... existing
  { name: "Vue", value: 75, color: "var(--signal)" }
];
```

### Change Colors
Edit: `src/constants.ts` → GLOBAL_STYLES
```css
:root {
  --void: #070710;     /* Background */
  --signal: #5FDDBC;   /* Cyan */
  --pulse: #9B7FFA;    /* Purple */
  --heat: #F4721A;     /* Orange */
}
```

### Change Animation Speed
Search component file, adjust:
```typescript
transition={{ duration: 0.5 }}  // ← Change this
```

---

## 📚 Documentation Map

| Need | File |
|------|------|
| Quick start | `QUICK_START.md` |
| Setup help | `MIGRATION_GUIDE.md` |
| Architecture | `ARCHITECTURE.md` |
| Visual overview | `PROJECT_MAP.md` |
| What changed | `COMPLETION_SUMMARY.md` |
| Deployment | `VERIFICATION_CHECKLIST.md` |
| Full index | `DOCUMENTATION_INDEX.md` |
| This summary | `README_REFACTORING.md` |

---

## 🧪 Development Workflow

```
1. Run: bun run dev
2. Edit: src/ files
3. Browser: Auto-refreshes (HMR)
4. Type check: bun run type-check
5. Build: bun run build when ready
6. Preview: bun run preview
```

---

## 🚀 Deployment

### Netlify
```bash
bun run build
netlify deploy --prod --dir=dist
```

### Vercel
```bash
bun run build
vercel deploy
```

### GitHub Pages
```bash
bun run build
# Push dist/ to gh-pages branch
```

---

## 🔍 Port Conflict?

```bash
bun run dev -- --port 5174
```
(Uses port 5174 instead of 5173)

---

## ❓ Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | `bun run dev -- --port 5174` |
| Type errors | `bun run type-check` |
| Browser not refreshing | Hard refresh: Cmd+Shift+R |
| Build fails | Run `bun run type-check` first |
| Module not found | Run `bun install` again |

---

## 📊 Stats

| Metric | Value |
|--------|-------|
| Components | 11 |
| Total Lines | ~1,055 |
| Main App | 40 lines |
| TypeScript | 100% |
| Dependencies | 10 |
| Documentation Files | 8 |
| Time to dev | 2 min |

---

## 🎯 From Here

- **Read:** `QUICK_START.md` for detailed guidance
- **Run:** `bun install && bun run dev` to start
- **Edit:** `src/constants.ts` to customize
- **Deploy:** Follow `VERIFICATION_CHECKLIST.md`

---

**Quick Ref v1.0 | April 14, 2026**
