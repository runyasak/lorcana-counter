<script setup lang="ts">
import type { Theme } from '~/utils/themes'

const props = defineProps<{
  lore: number
  themeIndex: number
  flipped: boolean
}>()

const emit = defineEmits<{
  'change': [amount: number]
  'update:themeIndex': [index: number]
}>()

const settingsOpen = ref(false)

const theme = computed<Theme>(() => THEMES[props.themeIndex] ?? THEMES[0]!)
</script>

<template>
  <div
    class="relative h-full w-full"
    :style="{ transform: flipped ? 'rotate(180deg)' : 'none' }"
  >
    <!-- Click areas + score -->
    <div class="flex h-full flex-1 items-center justify-center">
      <div
        class="absolute left-0 z-10 h-full w-1/2 cursor-pointer"
        @click="emit('change', -1)"
      />

      <div class="absolute top-[calc(50%-2rem)] left-[5dvw]">
        <button
          class="pointer-events-none flex size-16 shrink-0 items-center justify-center rounded-full text-[28px] leading-none font-light"
          :style="{ color: theme.fg }"
        >
          −
        </button>
      </div>

      <div
        class="pointer-events-none min-w-40 text-center leading-none font-bold tracking-wide tabular-nums"
        :style="{ color: theme.fg, fontSize: 'clamp(120px, 42vw, 180px)' }"
      >
        {{ lore }}
      </div>

      <div class="absolute top-[calc(50%-2rem)] right-[5dvw]">
        <button
          class="pointer-events-none flex size-16 shrink-0 items-center justify-center rounded-full text-[28px] leading-none font-light"
          :style="{ color: theme.fg }"
        >
          +
        </button>
      </div>

      <div
        class="absolute right-0 z-10 h-full w-1/2 cursor-pointer"
        @click="emit('change', 1)"
      />
    </div>

    <!-- Hamburger -->
    <button
      class="absolute top-4 right-4 z-20 p-2 opacity-40 transition-opacity hover:opacity-100"
      :style="{ color: theme.fg }"
      @click="settingsOpen = true"
    >
      <svg
        width="18"
        height="12"
        viewBox="0 0 18 12"
        fill="currentColor"
      >
        <rect
          width="18"
          height="1.5"
          rx="0.75"
        />
        <rect
          y="5.25"
          width="18"
          height="1.5"
          rx="0.75"
        />
        <rect
          y="10.5"
          width="18"
          height="1.5"
          rx="0.75"
        />
      </svg>
    </button>

    <!-- Settings overlay -->
    <Transition name="fade">
      <div
        v-if="settingsOpen"
        class="absolute inset-0 z-30 flex flex-col items-center justify-center gap-8"
        :style="{ background: theme.bg }"
      >
        <!-- Close -->
        <button
          class="absolute top-4 right-4 p-2 opacity-40 transition-opacity hover:opacity-100"
          :style="{ color: theme.fg }"
          @click="settingsOpen = false"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <line
              x1="1"
              y1="1"
              x2="13"
              y2="13"
            />
            <line
              x1="13"
              y1="1"
              x2="1"
              y2="13"
            />
          </svg>
        </button>

        <!-- Label -->
        <p
          class="text-[10px] font-bold tracking-[0.25em] uppercase"
          :style="{ color: theme.fgMuted }"
        >
          Theme
        </p>

        <!-- Swatches -->
        <div class="flex gap-4">
          <button
            v-for="(t, idx) in THEMES"
            :key="t.name"
            class="size-11 rounded-full transition-transform duration-150"
            :style="{
              background: t.bg,
              boxShadow: themeIndex === idx
                ? `0 0 0 2px ${theme.bg}, 0 0 0 4px ${theme.fg}`
                : '0 0 0 1px rgba(128,128,128,0.25)',
              transform: themeIndex === idx ? 'scale(1.15)' : 'scale(1)',
            }"
            @click="emit('update:themeIndex', idx); settingsOpen = false"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
