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
- localStorage key `lorcana` persists both players' scores and theme choices across refreshes
- Lore is clamped 0–99; reaching 20 shows a crown (not a hard win/end state — games can run past 20)
- Reset zeroes both scores
- No dark mode, no routing, no component library

## Hard-won gotchas
- **Container queries only see what you tell them to.** `container-type: inline-size` tracks width only — sizing driven purely by `cqw` breaks in landscape, where each stacked panel's *height* is the real constraint. Fix: establish `container-type: size` per-panel (not on the outer frame) and clamp with `min(Xcqw, Ycqh)` wherever a size needs to respect both dimensions.
- **A raw comma inside a Tailwind arbitrary value (`text-[min(10cqw,15cqh)]`) trips up classname parsing.** Move that expression into a real scoped CSS rule instead of fighting the linter.
- **`@vite-pwa/nuxt` needs `<VitePwaManifest />` mounted explicitly** (in `app.vue`) — without it, `manifest.webmanifest` and `sw.js` are generated but never linked from the page, so the app silently isn't installable.
- **Cloudflare Pages' Git-integration build uses Nitro's `cloudflare-pages-static` preset, which outputs to `dist/`, not `.output/public/`** (the default used locally and by the GitHub Pages workflow). The Cloudflare project's "Build output directory" setting must be `dist`, or the build succeeds and deploy fails with "Output directory not found."
- **Don't add `wrangler` as a project dependency for local CLI convenience.** It pulls in `workerd`/`miniflare` (native Workers runtime binaries) that the static build doesn't need, and can break Cloudflare's own CI install. Use `vp dlx wrangler` (or `pnpm dlx wrangler`) instead.
- **`@nuxt/fonts`' automatic weight detection can miss `font-bold`/`font-light` usage under Tailwind v4** — only weight 400 gets fetched, so "bold" text silently renders as regular. Declare `fonts.families[].weights` explicitly.
- **Screen Wake Lock requires a secure context.** Testing over `http://<lan-ip>:port` means `navigator.wakeLock` is `undefined` in every browser — not a bug, just not HTTPS/localhost.
