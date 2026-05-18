export interface Theme {
  name: string
  bg: string
  fg: string
  fgMuted: string
}

export const THEMES: Theme[] = [
  { name: 'Graphite', bg: '#1c1c1e', fg: '#ffffff', fgMuted: 'rgba(255,255,255,0.22)' },
  { name: 'Chalk', bg: '#f5f5f5', fg: '#111111', fgMuted: 'rgba(0,0,0,0.2)' },
  { name: 'Navy', bg: '#0f1f3d', fg: '#ffffff', fgMuted: 'rgba(255,255,255,0.22)' },
  { name: 'Sage', bg: '#e8f0e8', fg: '#111111', fgMuted: 'rgba(0,0,0,0.2)' },
  { name: 'Dusk', bg: '#1e1428', fg: '#ffffff', fgMuted: 'rgba(255,255,255,0.22)' },
]
