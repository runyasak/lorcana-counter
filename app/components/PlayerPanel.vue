<script setup lang="ts">
import type { Theme } from '~/utils/themes'
import NumberFlow from '@number-flow/vue'

const props = defineProps<{
  lore: number
  diff: number
  themeIndex: number
  flipped: boolean
  borderColor: string
}>()

const emit = defineEmits<{
  'change': [amount: number]
  'update:themeIndex': [index: number]
}>()

const WIN_LORE = 20

const settingsOpen = ref(false)

const theme = computed<Theme>(() => THEMES[props.themeIndex] ?? THEMES[0]!)
const hasCrown = computed(() => props.lore >= WIN_LORE)
</script>

<template>
  <div
    class="relative h-full w-full rounded-xl border"
    :style="{ transform: flipped ? 'rotate(180deg)' : 'none', borderColor, containerType: 'size' }"
  >
    <!-- Click areas + score -->
    <div class="flex h-full flex-1 items-center justify-center">
      <div
        class="absolute left-0 z-10 h-full w-1/2 cursor-pointer"
        @click="emit('change', -1)"
      />

      <div class="absolute top-[calc(50%-2rem)] left-[8cqw] lg:top-[calc(50%-2.5rem)]">
        <div class="relative">
          <button
            class="pointer-events-none flex size-16 shrink-0 items-center justify-center rounded-full text-6xl leading-none font-light lg:size-20"
            :style="{ color: theme.fg }"
          >
            −
          </button>
          <span
            v-if="diff < 0"
            :key="diff"
            class="bounce-in pointer-events-none absolute -top-full left-1/4 -translate-x-1/4 text-[10cqw] font-bold text-white/50 landscape:-top-1/2"
            :style="{ fontSize: 'clamp(20px, min(10cqw, 15cqh), 60px)' }"
          >
            {{ diff }}
          </span>
        </div>
      </div>

      <div class="relative">
        <div class="pointer-events-none absolute inset-x-0 top-[-5%] flex justify-center">
          <Icon
            v-if="hasCrown"
            name="akar-icons:crown"
            class="tada crown-size text-yellow-400"
          />
        </div>
        <div
          class="pointer-events-none min-w-40 text-center leading-none font-bold tracking-wide tabular-nums"
          :style="{ color: theme.fg, fontSize: 'clamp(60px, min(30cqw, 45cqh), 180px)' }"
        >
          <NumberFlow :value="lore" />
        </div>
      </div>

      <div class="absolute top-[calc(50%-2rem)] right-[8cqw] lg:top-[calc(50%-2.5rem)]">
        <div class="relative">
          <button
            class="pointer-events-none flex size-16 shrink-0 items-center justify-center rounded-full text-6xl leading-none font-light lg:size-20"
            :style="{ color: theme.fg }"
          >
            +
          </button>
          <span
            v-if="diff > 0"
            :key="diff"
            class="bounce-in pointer-events-none absolute -top-full left-1/2 -translate-x-1/2 text-[10cqw] font-bold text-white/50 landscape:-top-1/2"
            :style="{ fontSize: 'clamp(20px, min(10cqw, 15cqh), 60px)' }"
          >
            +{{ diff }}
          </span>
        </div>
      </div>

      <div
        class="absolute right-0 z-10 h-full w-1/2 cursor-pointer"
        @click="emit('change', 1)"
      />
    </div>

    <!-- Hamburger -->
    <button
      class="absolute top-4 right-4 z-20 hidden p-2 opacity-40 transition-opacity hover:opacity-100"
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
.crown-size {
  font-size: min(10cqw, 15cqh);
}

/* @media (min-width: 1024px) {
  .crown-size {
    font-size: min(5cqw, 8cqh);
  }
} */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

.bounce-in {
  animation: bounceIn 0.75s cubic-bezier(0.215, 0.61, 0.355, 1);
}

@keyframes tada {
  0% {
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  100% {
    transform: scale3d(1, 1, 1);
  }
}

.tada {
  animation: tada 1s;
}
</style>
