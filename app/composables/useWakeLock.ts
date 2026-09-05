import { useWakeLock as useVueUseWakeLock } from '@vueuse/core'

export function useWakeLock() {
  const { isSupported, isActive, request: requestNative } = useVueUseWakeLock()

  let audioCtx: AudioContext | null = null

  async function request(): Promise<void> {
    if (!isSupported.value) return
    try {
      await requestNative('screen')
    } catch { /* permission denied or API unavailable */ }
  }

  // Silent AudioContext oscillator fallback — needed both pre-iOS 16.4 (no
  // native API) and on Safari versions where the native lock silently fails
  // or gets dropped despite the API existing (Safari is flakier than
  // Chromium here, and doesn't always reject the promise when this happens).
  // Gate on isActive (a lock is actually held right now), not isSupported
  // (the API merely exists) — must be called from a user gesture.
  function startAudioFallback(): void {
    if (isActive.value || audioCtx) return
    try {
      const Ctx = (window as { AudioContext?: typeof AudioContext, webkitAudioContext?: typeof AudioContext }).AudioContext
        ?? (window as { AudioContext?: typeof AudioContext, webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Ctx) return
      audioCtx = new Ctx()
      const gain = audioCtx.createGain()
      gain.gain.value = 0
      gain.connect(audioCtx.destination)
      const osc = audioCtx.createOscillator()
      osc.connect(gain)
      osc.start(0)
    } catch { /* API unavailable */ }
  }

  function release(): void {
    audioCtx?.close().catch(() => {})
    audioCtx = null
  }

  return { request, release, startAudioFallback }
}
