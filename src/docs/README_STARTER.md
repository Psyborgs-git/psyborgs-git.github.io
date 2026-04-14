# 🤖 Psyborgs Starter Kit

A modern, fast starter kit using **Bun**, **Vite**, and **React** with TypeScript support.

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh) (v1.3.11 or later)
- Node.js 18+ (for compatibility)

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

This starts the Vite dev server at `http://localhost:5173` with Hot Module Replacement (HMR) enabled.

### Build

```bash
bun run build
```

Creates an optimized production build in the `dist/` directory.

### Preview

```bash
bun run preview
```

Serves the production build locally.

### Type Checking

```bash
bun run type-check
```

Runs TypeScript compiler without emitting files.

## 📁 Project Structure

```
src/
  ├── main.tsx        # React app entry point
  ├── App.tsx         # Root component
  ├── App.css         # App styles
  └── index.css       # Global styles
index.html            # HTML template
vite.config.ts        # Vite configuration
tsconfig.json         # TypeScript configuration
package.json          # Project metadata and dependencies
```

## 🛠️ Tech Stack

- **Bun** - Fast JavaScript runtime and package manager
- **Vite** - Next-generation frontend tooling
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite React Plugin** - JSX compilation and HMR

## 📦 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| dev | `bun run dev` | Start development server |
| build | `bun run build` | Build for production |
| preview | `bun run preview` | Preview production build |
| type-check | `bun run type-check` | Check TypeScript types |
| lint | `bun run lint` | Lint code (ESLint setup ready) |

## 🔧 Configuration

### Vite (`vite.config.ts`)
- React plugin enabled for JSX support
- Configured for ES2022 target
- Dev server on port 5173

### TypeScript (`tsconfig.json`)
- Strict mode enabled
- React JSX transformation
- Bundler module resolution

## 🎯 Next Steps

1. Update `src/App.tsx` with your components
2. Add more routes or pages as needed
3. Install additional dependencies: `bun add <package-name>`
4. Configure ESLint and Prettier for consistent code style
5. Set up testing with Vitest or your preferred test runner

## 📚 Resources

- [Bun Documentation](https://bun.sh/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## ⚡ Performance Tips

- Bun is significantly faster than npm/yarn for dependency management
- Vite provides near-instant HMR with on-demand compilation
- Use `bun install` instead of `npm install` for faster setup
- TypeScript is compiled on-the-fly during development

## 📝 License

This starter kit is open source and available under the MIT License.
