# Lorcana Counter

A lore counter web app for Disney Lorcana, built with Nuxt. Two players, one screen — pass it across the table and each side reads right-side up from their own seat.

[https://lorcana-counter.runyasak.com](https://lorcana-counter.runyasak.com)

## Features

- Two-player lore counter, 0–99, with a crown once a player crosses the 20-lore win threshold
- Per-turn diff badge — shows how much lore changed since the last turn
- Per-player color themes, static per-player border accents
- Screen wake lock, so the display doesn't sleep mid-game
- Responsive across phone, tablet, and desktop

## Stack

- [Nuxt 4](https://nuxt.com) (static generation via `nuxt generate`)
- [Tailwind CSS v4](https://tailwindcss.com)
- TypeScript

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm run build
```
