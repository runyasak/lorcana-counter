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
  <div class="relative flex h-dvh w-full flex-col overflow-hidden font-sans">
    <!-- Player 1 — dark, flipped toward opponent -->
    <div class="flex-1 bg-[#f5f5f5]">
      <div class="h-full min-h-0 overflow-hidden rounded-bl-[20dvw] bg-[#111111]">
        <PlayerPanel
          :lore="lores[0]"
          fg="#ffffff"
          fg-muted="rgba(255,255,255,0.22)"
          :flipped="true"
          @change="change(0, $event)"
        />
      </div>
    </div>

    <!-- Player 2 — light, normal orientation -->
    <div class="flex-1 bg-[#111111]">
      <div class="relative z-[2] h-full min-h-0 flex-1 overflow-hidden rounded-tr-[20dvw] bg-[#f5f5f5]">
        <PlayerPanel
          :lore="lores[1]"
          fg="#111111"
          fg-muted="rgba(0,0,0,0.2)"
          :flipped="false"
          @change="change(1, $event)"
        />

        <button
          class="absolute right-6 bottom-7 z-20 cursor-pointer rounded-full px-[18px] py-[7px] text-[11px] font-bold tracking-[0.12em] uppercase"
          :style="{
            borderWidth: '1.5px',
            borderStyle: 'solid',
            borderColor: 'rgba(0,0,0,0.18)',
            color: 'rgba(0,0,0,0.38)',
          }"
          @click="reset"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>
