<script setup lang="ts">
import type { Theme } from '~/utils/themes'

const MIN_LORE = 0
const MAX_LORE = 99

const lores = ref<[number, number]>([0, 0])
const diffs = ref<[number, number]>([0, 0])
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
})

watch([lores, themeIndices], ([l, t]) => {
  localStorage.setItem('lorcana', JSON.stringify({ lores: l, themes: t }))
}, { deep: true })

function change(idx: 0 | 1, amount: number) {
  if (!iosFallbackStarted) {
    startIosFallback()
    iosFallbackStarted = true
  }

  const before = lores.value[idx]
  const after = Math.min(MAX_LORE, Math.max(MIN_LORE, before + amount))
  lores.value[idx] = after

  const realized = after - before
  if (realized !== 0) {
    diffs.value[idx] += realized
    if (realized > 0) {
      diffs.value[idx === 0 ? 1 : 0] = 0
    }
  }
}

function reset() {
  lores.value = [0, 0]
  diffs.value = [0, 0]
}
</script>

<template>
  <div class="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-slate-950 sm:p-8">
    <!-- Ambient stage glow — picks up each player's accent color, only visible once the frame is contained -->
    <div class="pointer-events-none absolute top-0 left-0 hidden size-[55vw] -translate-x-1/3 -translate-y-1/3 rounded-full bg-[#b39aff]/10 blur-[100px] sm:block" />
    <div class="pointer-events-none absolute right-0 bottom-0 hidden size-[55vw] translate-x-1/3 translate-y-1/3 rounded-full bg-[#00dc82]/10 blur-[100px] sm:block" />

    <div
      class="relative flex h-dvh w-full max-w-md flex-col overflow-hidden font-sans sm:aspect-[9/19.5] sm:h-auto sm:max-h-[85dvh] sm:rounded-[2.5rem] sm:shadow-2xl sm:ring-1 sm:ring-white/10"
      :style="{ containerType: 'inline-size' }"
    >
      <!-- Player 2 — flipped toward opponent -->
      <div
        class="flex-1"
        :style="{ background: p2Theme.bg }"
      >
        <div
          class="h-full min-h-0 overflow-hidden bg-slate-950 p-2"
        >
          <PlayerPanel
            :lore="lores[0]"
            :diff="diffs[0]"
            :theme-index="themeIndices[0]"
            :flipped="true"
            border-color="#b39aff"
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

      <!-- Player 1 — normal orientation -->
      <div
        class="flex-1"
        :style="{ background: p1Theme.bg }"
      >
        <div
          class="relative z-2 h-full min-h-0 flex-1 overflow-hidden bg-slate-950 p-2"
        >
          <PlayerPanel
            :lore="lores[1]"
            :diff="diffs[1]"
            :theme-index="themeIndices[1]"
            :flipped="false"
            border-color="#00dc82"
            @change="change(1, $event)"
            @update:theme-index="(v: number) => (themeIndices[1] = v)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
