<script setup lang="ts">
const MIN_LORE = 0
const MAX_LORE = 20

const lores = ref<[number, number]>([0, 0])

onMounted(() => {
  const raw = localStorage.getItem('lorcana')

  if (!raw) {
    return
  }

  const saved = JSON.parse(raw)
  if (Array.isArray(saved) && saved.length === 2) {
    lores.value = saved as [number, number]
  }
})

watch(lores, val => localStorage.setItem('lorcana', JSON.stringify(val)), { deep: true })

function change(idx: 0 | 1, amount: number) {
  lores.value[idx] = Math.min(MAX_LORE, Math.max(MIN_LORE, lores.value[idx] + amount))
}

function reset() {
  lores.value = [0, 0]
}
</script>

<template>
  <div class="w-full h-dvh overflow-hidden flex flex-col relative font-sans">
    <!-- Player 1 — dark, flipped toward opponent -->
    <div class="bg-[#f5f5f5] flex-1">
      <div class="bg-[#111111] h-full min-h-0 rounded-bl-[20dvw] overflow-hidden">
        <PlayerPanel :lore="lores[0]" fg="#ffffff" fg-muted="rgba(255,255,255,0.22)" :flipped="true"
          @change="change(0, $event)" />
      </div>
    </div>

    <!-- Player 2 — light, normal orientation -->
    <div class="bg-[#111111] flex-1">
      <div class="flex-1 min-h-0 h-full bg-[#f5f5f5] rounded-tr-[20dvw] overflow-hidden relative z-[2]">
        <PlayerPanel :lore="lores[1]" fg="#111111" fg-muted="rgba(0,0,0,0.2)" :flipped="false"
          @change="change(1, $event)" />

        <button
          class="absolute bottom-7 right-6 z-20 rounded-full px-[18px] py-[7px] text-[11px] font-bold tracking-[0.12em] uppercase cursor-pointer"
          :style="{
            borderWidth: '1.5px',
            borderStyle: 'solid',
            borderColor: 'rgba(0,0,0,0.18)',
            color: 'rgba(0,0,0,0.38)',
          }" @click="reset">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>
