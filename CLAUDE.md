# lorcana-counter

Single-page static Lorcana lore counter — tracks 2 players racing to 20 lore.

## Stack
- Nuxt 4 (`compatibilityVersion: 4`, srcDir = `app/`)
- Tailwind CSS v4 via `@tailwindcss/vite` Vite plugin (no `@nuxtjs/tailwindcss`)
- ESLint via `@nuxt/eslint` (flat config, ESLint 9)
- No `pages/` dir — no vue-router in bundle

## Commands
```sh
vp run dev        # dev server → http://localhost:3000
vp run build       # nuxt generate → .output/public/
vp run preview     # preview static output
vp lint             # eslint .
vp lint --fix       # eslint . --fix
```

## First-time setup
```sh
vp install
vp exec nuxt prepare   # generates .nuxt/ — required before linting
```

Uses Vite+ (`vp`) as of 2026-09-04 — previously this standalone repo used raw `pnpm` directly; switched to match the vault-wide convention. `packageManager: pnpm@10.33.2` in `package.json` and the `pnpm`-based husky pre-commit hook (`vp exec lint-staged`) still resolve through vp's bundled pnpm/node, no system-wide Node install required.

## Key decisions
- localStorage key `lorcana` persists player names + scores across refreshes
- Win condition: first player to reach 20 lore
- Player names are editable inline (click name to edit)
- Reset keeps player names, only clears scores
- No dark mode, no routing, no component library
