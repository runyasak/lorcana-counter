<script setup lang="ts">
import type { Theme } from '~/utils/themes'

const MIN_LORE = 0
const MAX_LORE = 20

const lores = ref<[number, number]>([0, 0])
const themeIndices = ref<[number, number]>([0, 1])

const p1Theme = computed<Theme>(() => THEMES[themeIndices.value[0]] ?? THEMES[0]!)
const p2Theme = computed<Theme>(() => THEMES[themeIndices.value[1]] ?? THEMES[0]!)

const { request: requestWakeLock, startIosFallback } = useWakeLock()
let iosFallbackStarted = false

onMounted(async () => {
  const raw = localStorage.getItem('lorcana')

  if (raw) {
    const saved = JSON.parse(raw)

    if (Array.isArray(saved) && saved.length === 2) {
      lores.value = saved as [number, number]
    } else if (saved?.lores && saved?.themes) {
      lores.value = saved.lores as [number, number]
      themeIndices.value = saved.themes as [number, number]
    }
  }

  await requestWakeLock()

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      requestWakeLock()
    }
  })
})

watch([lores, themeIndices], ([l, t]) => {
  localStorage.setItem('lorcana', JSON.stringify({ lores: l, themes: t }))
}, { deep: true })

function change(idx: 0 | 1, amount: number) {
  if (!iosFallbackStarted) {
    startIosFallback()
    iosFallbackStarted = true
  }
  lores.value[idx] = Math.min(MAX_LORE, Math.max(MIN_LORE, lores.value[idx] + amount))
}

function reset() {
  lores.value = [0, 0]
}
</script>

<template>
  <div class="relative flex h-dvh w-full flex-col overflow-hidden font-sans">
    <!-- Player 1 — flipped toward opponent -->
    <div
      class="flex-1"
      :style="{ background: p2Theme.bg }"
    >
      <div
        class="h-full min-h-0 overflow-hidden bg-slate-950 px-4 py-2"
      >
        <PlayerPanel
          :lore="lores[0]"
          :theme-index="themeIndices[0]"
          :flipped="true"
          @change="change(0, $event)"
          @update:theme-index="(v: number) => (themeIndices[0] = v)"
        />
      </div>
    </div>

    <button
      class="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-white bg-slate-950 px-4.5 py-1 text-[11px] font-bold tracking-[0.12em] text-white uppercase"
      :style="{
        borderWidth: '1.5px',
        borderStyle: 'solid',
      }"
      @click="reset"
    >
      Reset
    </button>

    <!-- Player 2 — normal orientation -->
    <div
      class="flex-1"
      :style="{ background: p1Theme.bg }"
    >
      <div
        class="relative z-2 h-full min-h-0 flex-1 overflow-hidden bg-slate-950 px-4 py-2"
      >
        <PlayerPanel
          :lore="lores[1]"
          :theme-index="themeIndices[1]"
          :flipped="false"
          @change="change(1, $event)"
          @update:theme-index="(v: number) => (themeIndices[1] = v)"
        />
      </div>
    </div>
  </div>
</template>
