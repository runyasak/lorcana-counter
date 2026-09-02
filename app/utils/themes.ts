export interface Theme {
  name: string
  bg: string
  fg: string
  fgMuted: string
}

export const THEMES: Theme[] = [
  { name: 'Graphite', bg: '#16171d', fg: '#ffffff', fgMuted: 'rgba(255,255,255,0.22)' },
  { name: 'Navy', bg: '#0f1f3d', fg: '#ffffff', fgMuted: 'rgba(255,255,255,0.22)' },
  { name: 'Dusk', bg: '#1e1428', fg: '#ffffff', fgMuted: 'rgba(255,255,255,0.22)' },
]
