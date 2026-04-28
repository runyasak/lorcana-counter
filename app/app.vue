<script setup lang="ts">
const MAX_LORE = 20

const lores = ref([0, 0])
const winner = ref<number | null>(null)
const resetConfirm = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  const raw = localStorage.getItem('lorcana')
  if (!raw) return
  try {
    const saved = JSON.parse(raw)
    if (Array.isArray(saved) && saved.length === 2) lores.value = saved
  }
  catch {}
})

watch(lores, val => localStorage.setItem('lorcana', JSON.stringify(val)), { deep: true })

function change(idx: number, amount: number) {
  if (winner.value !== null) return
  lores.value[idx] = Math.max(0, Math.min(MAX_LORE, lores.value[idx] + amount))
  if (lores.value[idx] >= MAX_LORE) {
    setTimeout(() => { winner.value = idx + 1 }, 300)
  }
}

function handleReset() {
  if (resetConfirm.value || winner.value !== null) {
    lores.value = [0, 0]
    winner.value = null
    resetConfirm.value = false
  }
  else {
    resetConfirm.value = true
    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(() => { resetConfirm.value = false }, 2500)
  }
}
</script>

<template>
  <div class="w-full h-dvh overflow-hidden bg-[#111111] flex flex-col relative font-sans">
    <!-- Player 1 — dark, flipped toward opponent -->
    <div class="flex-1 min-h-0 rounded-tl-[100px] overflow-hidden">
      <PlayerPanel
        :lore="lores[0]"
        fg="#ffffff"
        fg-muted="rgba(255,255,255,0.22)"
        :flipped="true"
        @change="change(0, $event)"
      />
    </div>

    <!-- Player 2 — light, normal orientation -->
    <div class="flex-1 min-h-0 bg-[#f5f5f5] rounded-tr-[100px] overflow-hidden relative z-[2]">
      <PlayerPanel
        :lore="lores[1]"
        fg="#111111"
        fg-muted="rgba(0,0,0,0.2)"
        :flipped="false"
        @change="change(1, $event)"
      />

      <button
        class="absolute bottom-7 right-6 z-10 rounded-full px-[18px] py-[7px] text-[11px] font-bold tracking-[0.12em] uppercase cursor-pointer"
        :style="{
          borderWidth: '1.5px',
          borderStyle: 'solid',
          borderColor: resetConfirm ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.18)',
          background: resetConfirm ? 'rgba(0,0,0,0.08)' : 'transparent',
          color: resetConfirm ? '#111111' : 'rgba(0,0,0,0.38)',
          transition: 'all 0.2s',
        }"
        @click="handleReset"
      >
        {{ resetConfirm ? 'Confirm?' : 'Reset' }}
      </button>
    </div>

    <!-- Win overlay -->
    <Transition name="fade">
      <div
        v-if="winner !== null"
        class="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3"
        style="background: rgba(0,0,0,0.6); backdrop-filter: blur(12px);"
      >
        <p
          class="text-[11px] font-semibold tracking-[0.22em] uppercase"
          style="color: rgba(255,255,255,0.45)"
        >
          Winner
        </p>
        <p class="text-[64px] font-bold leading-none tracking-[-2px] text-white">
          Player {{ winner }}
        </p>
        <p class="text-sm font-normal mt-0.5" style="color: rgba(255,255,255,0.4)">
          reached 20 lore
        </p>
        <button
          class="mt-7 bg-white text-[#111111] rounded-full px-10 py-3.5 text-[15px] font-bold tracking-[0.05em] cursor-pointer"
          @click="handleReset"
        >
          New Game
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
