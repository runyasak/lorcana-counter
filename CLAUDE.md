# lorcana-counter

Single-page static Lorcana lore counter — tracks 2 players racing to 20 lore.

## Stack
- Nuxt 4 (`compatibilityVersion: 4`, srcDir = `app/`)
- Tailwind CSS v4 via `@tailwindcss/vite` Vite plugin (no `@nuxtjs/tailwindcss`)
- ESLint via `@nuxt/eslint` (flat config, ESLint 9)
- No `pages/` dir — no vue-router in bundle

## Commands
```sh
pnpm dev          # dev server → http://localhost:3000
pnpm build        # nuxt generate → .output/public/
pnpm preview      # preview static output
pnpm lint         # eslint .
pnpm lint:fix     # eslint . --fix
```

## First-time setup
```sh
pnpm install
pnpm exec nuxt prepare   # generates .nuxt/ — required before linting
```

## Key decisions
- localStorage key `lorcana` persists player names + scores across refreshes
- Win condition: first player to reach 20 lore
- Player names are editable inline (click name to edit)
- Reset keeps player names, only clears scores
- No dark mode, no routing, no component library
