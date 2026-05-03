# Veli Parlak — Portfolio

Personal portfolio of **Veli Parlak (Weli)**. Built with Next.js (App Router), TypeScript, and Tailwind CSS. Designed to grow into a production-grade site (and possibly a SaaS platform) without restructuring.

## Stack

- Next.js 14 (App Router) + React 18
- TypeScript (strict)
- Tailwind CSS 3 (custom design tokens, dark mode via `class`)
- ESLint + Prettier

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command            | Description                            |
| ------------------ | -------------------------------------- |
| `npm run dev`      | Start the dev server                   |
| `npm run build`    | Production build                       |
| `npm run start`    | Run the production build               |
| `npm run lint`     | Run ESLint                             |
| `npm run lint:fix` | Run ESLint with autofix                |
| `npm run format`   | Run Prettier across `src/`             |
| `npm run typecheck`| TypeScript with no emit                |

## Architecture

The project follows a feature-based layout. Shared, presentation-only primitives live in `src/components`. Each user-facing feature owns its sections, hooks, and types under `src/modules/<feature>` and exposes a single barrel (`index.ts`) — pages compose these modules and never reach inside them.

```
src/
  app/           # Next.js App Router (layout, pages, globals)
  components/    # Shared UI + layout chrome
    ui/          # Button, Container, Section
    layout/      # Navbar, Footer
  modules/       # Feature-scoped code
    home/
      components/  # Hero, AboutPreview, ProjectsPreview, ContactCTA
      index.ts     # Public surface of the module
  lib/           # Framework-agnostic helpers (utils, constants)
  hooks/         # React-only hooks (useTheme)
  types/         # Cross-cutting types
  styles/        # Reserved for module-scoped styles
```

### Design system

- Colors, spacing, typography, and shadows are defined in `tailwind.config.ts`.
- Surface colors (`background`, `foreground`, `muted`, `border`) are CSS variables in `src/app/globals.css` so dark mode is a single class flip on `<html>`.
- The `cn()` helper in `src/lib/utils.ts` merges Tailwind classes safely.

### Dark mode

A small inline script in `app/layout.tsx` reads the saved theme from `localStorage` (or system preference) and applies the `dark` class **before** React hydrates — no flash on first paint. The `useTheme()` hook keeps it in sync after mount.

## Path aliases

`@/*` is mapped to `src/*`. Sub-aliases (`@/components`, `@/modules`, `@/lib`, `@/hooks`, `@/types`, `@/styles`) are configured in `tsconfig.json`.

## License

© Veli Parlak. All rights reserved.
