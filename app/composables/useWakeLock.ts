import { useWakeLock as useVueUseWakeLock } from '@vueuse/core'

export function useWakeLock() {
  const { isSupported, request: requestNative } = useVueUseWakeLock()

  let audioCtx: AudioContext | null = null

  async function request(): Promise<void> {
    if (!isSupported.value) return
    try {
      await requestNative('screen')
    } catch { /* permission denied or API unavailable */ }
  }

  // iOS < 16.4 fallback: silent AudioContext oscillator — must be called from a user gesture
  function startIosFallback(): void {
    if (isSupported.value || audioCtx) return
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

  return { request, release, startIosFallback }
}
