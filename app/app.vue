<script setup lang="ts">
const LORE_WIN = 20

interface Player {
  name: string
  lore: number
}

const vAutofocus = {
  mounted: (el: HTMLElement) => el.focus(),
}

const players = ref<Player[]>([
  { name: 'Player 1', lore: 0 },
  { name: 'Player 2', lore: 0 },
])

const editingIndex = ref<number | null>(null)
const pendingReset = ref(false)

onMounted(() => {
  const raw = localStorage.getItem('lorcana')
  if (!raw) return
  try {
    const parsed = JSON.parse(raw) as Player[]
    if (Array.isArray(parsed) && parsed.length === 2) {
      players.value = parsed
    }
  }
  catch {}
})

watch(players, val => localStorage.setItem('lorcana', JSON.stringify(val)), { deep: true })

function add(i: number) {
  if (players.value[i].lore < LORE_WIN) players.value[i].lore++
}

function sub(i: number) {
  if (players.value[i].lore > 0) players.value[i].lore--
}

function confirmReset() {
  players.value = players.value.map(p => ({ name: p.name, lore: 0 }))
  pendingReset.value = false
}

const winner = computed(() => players.value.findIndex(p => p.lore >= LORE_WIN))
</script>

<template>
  <div class="min-h-dvh bg-slate-100 flex flex-col select-none">
    <header class="shrink-0 py-3 text-center">
      <h1 class="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">
        Lorcana Counter
      </h1>
    </header>

    <main class="flex-1 flex flex-col md:flex-row gap-3 px-3 pb-3">
      <div
        v-for="(player, i) in players"
        :key="i"
        class="flex-1 bg-white rounded-2xl shadow flex flex-col items-center justify-center gap-5 py-8 px-6 relative overflow-hidden transition-shadow"
        :class="winner === i ? 'ring-2 ring-amber-400' : ''"
      >
        <!-- Win banner -->
        <div
          v-if="winner === i"
          class="absolute inset-x-0 top-0 bg-amber-400 text-white text-xs font-bold tracking-widest text-center py-1.5 uppercase"
        >
          Winner!
        </div>

        <!-- Player name -->
        <div class="mt-2">
          <input
            v-if="editingIndex === i"
            v-autofocus
            v-model="player.name"
            maxlength="20"
            class="text-base font-semibold text-center border-b-2 outline-none bg-transparent w-36"
            :class="i === 0 ? 'border-blue-400 text-blue-700' : 'border-rose-400 text-rose-700'"
            @blur="editingIndex = null"
            @keydown.enter="editingIndex = null"
          />
          <button
            v-else
            class="text-base font-semibold text-slate-400 hover:text-slate-700 transition-colors"
            @click="editingIndex = i"
          >
            {{ player.name }}
          </button>
        </div>

        <!-- Lore number -->
        <div
          class="text-8xl font-black tabular-nums leading-none"
          :class="i === 0 ? 'text-blue-600' : 'text-rose-600'"
        >
          {{ player.lore }}
        </div>

        <!-- +/- buttons -->
        <div class="flex items-center gap-6">
          <button
            class="w-16 h-16 rounded-full text-3xl font-bold text-white shadow active:scale-95 transition-transform disabled:opacity-25 disabled:cursor-not-allowed"
            :class="i === 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-rose-600 hover:bg-rose-700'"
            :disabled="player.lore <= 0"
            :aria-label="`Decrease ${player.name} lore`"
            @click="sub(i)"
          >
            −
          </button>
          <button
            class="w-16 h-16 rounded-full text-3xl font-bold text-white shadow active:scale-95 transition-transform disabled:opacity-25 disabled:cursor-not-allowed"
            :class="i === 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-rose-600 hover:bg-rose-700'"
            :disabled="player.lore >= LORE_WIN"
            :aria-label="`Increase ${player.name} lore`"
            @click="add(i)"
          >
            +
          </button>
        </div>

        <!-- Progress bar -->
        <div class="w-full space-y-1">
          <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-300"
              :class="i === 0 ? 'bg-blue-500' : 'bg-rose-500'"
              :style="{ width: `${(player.lore / LORE_WIN) * 100}%` }"
            />
          </div>
          <p class="text-xs text-center text-slate-400">
            {{ player.lore }} / {{ LORE_WIN }} lore
          </p>
        </div>
      </div>
    </main>

    <footer class="shrink-0 py-4 flex justify-center">
      <div v-if="pendingReset" class="flex items-center gap-2">
        <span class="text-sm text-slate-500">Reset scores?</span>
        <button
          class="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-semibold hover:bg-rose-700 transition-colors"
          @click="confirmReset"
        >
          Yes, reset
        </button>
        <button
          class="px-4 py-2 bg-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-300 transition-colors"
          @click="pendingReset = false"
        >
          Cancel
        </button>
      </div>
      <button
        v-else
        class="px-6 py-2 bg-slate-200 text-slate-500 rounded-lg text-sm font-semibold hover:bg-slate-300 transition-colors"
        @click="pendingReset = true"
      >
        Reset Game
      </button>
    </footer>
  </div>
</template>
