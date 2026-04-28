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
</script>

<template>
  <div class="w-full h-full flex items-center justify-center relative"
    :style="{ transform: flipped ? 'rotate(180deg)' : 'none' }">
    <div class="flex items-center justify-center flex-1 h-full">
      <div class="cursor-pointer absolute z-10 w-1/2 h-full left-0" @click="emit('change', -1)">
      </div>
      <div class="absolute left-[5dvw] top-[calc(50%-2rem)]">
        <button
          class="size-16 rounded-full flex items-center justify-center text-[28px] font-light shrink-0 leading-none pointer-events-none">
          −
        </button>
      </div>

      <div
        class="text-[clamp(120px,42vw,180px)] font-bold leading-none text-center tabular-nums min-w-40 pointer-events-none tracking-wide"
        :style="{ color: fg }">
        {{ lore }}
      </div>

      <div class="absolute right-[5dvw] top-[calc(50%-2rem)]">
        <button
          class="size-16 rounded-full flex items-center justify-center text-[28px] font-light shrink-0 leading-none pointer-events-none">
          +
        </button>
      </div>
      <div class="cursor-pointer absolute z-10 w-1/2 h-full right-0" @click="emit('change', 1)">
      </div>
    </div>
  </div>
</template>
