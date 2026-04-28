<script setup lang="ts">
const props = defineProps<{
  lore: number
  fg: string
  fgMuted: string
  flipped: boolean
}>()

const emit = defineEmits<{
  change: [amount: number]
}>()

const display = ref(props.lore)
const bumping = ref(false)
const activeBtn = ref<'minus' | 'plus' | null>(null)
let pressTimer: ReturnType<typeof setTimeout> | null = null
let pressInterval: ReturnType<typeof setInterval> | null = null

watch(() => props.lore, (val) => {
  bumping.value = true
  setTimeout(() => {
    display.value = val
    bumping.value = false
  }, 90)
})

function startPress(amount: number, btn: 'minus' | 'plus') {
  activeBtn.value = btn
  emit('change', amount)
  pressTimer = setTimeout(() => {
    pressInterval = setInterval(() => emit('change', amount), 110)
  }, 450)
}

function endPress() {
  activeBtn.value = null
  if (pressTimer) { clearTimeout(pressTimer); pressTimer = null }
  if (pressInterval) { clearInterval(pressInterval); pressInterval = null }
}

onUnmounted(endPress)
</script>

<template>
  <div
    class="w-full h-full flex items-center justify-center"
    :style="{ transform: flipped ? 'rotate(180deg)' : 'none' }"
    @pointerleave="endPress"
  >
    <div class="flex items-center justify-center gap-[52px]">
      <!-- Minus -->
      <button
        class="size-16 rounded-full flex items-center justify-center text-[28px] font-light shrink-0 leading-none"
        :style="{
          border: `2px solid ${fgMuted}`,
          background: activeBtn === 'minus' ? fgMuted : 'transparent',
          color: fg,
          transition: 'background 0.1s',
        }"
        @pointerdown.prevent="startPress(-1, 'minus')"
        @pointerup="endPress"
      >
        −
      </button>

      <!-- Score -->
      <div
        class="text-[clamp(120px,32vw,180px)] font-bold leading-none text-center tabular-nums min-w-40 pointer-events-none"
        :style="{
          color: fg,
          letterSpacing: '-6px',
          transform: bumping ? 'scale(0.91)' : 'scale(1)',
          transition: 'transform 0.09s ease, color 0.3s',
        }"
      >
        {{ display }}
      </div>

      <!-- Plus -->
      <button
        class="size-16 rounded-full flex items-center justify-center text-[28px] font-light shrink-0 leading-none"
        :style="{
          border: `2px solid ${fgMuted}`,
          background: activeBtn === 'plus' ? fgMuted : 'transparent',
          color: fg,
          transition: 'background 0.1s',
        }"
        @pointerdown.prevent="startPress(1, 'plus')"
        @pointerup="endPress"
      >
        +
      </button>
    </div>
  </div>
</template>
