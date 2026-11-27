<script setup lang="ts">
defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
    <div class="flex w-full max-w-xs flex-col items-center gap-6 rounded-2xl bg-slate-950 p-6 text-center text-white">
      <p class="text-sm font-medium">
        Reset both scores to 0?
      </p>
      <div class="flex gap-3">
        <button
          class="cursor-pointer rounded-full border border-white/30 px-5 py-2 text-xs font-bold tracking-wide uppercase"
          @click="$emit('cancel')"
        >
          Cancel
        </button>
        <button
          class="cursor-pointer rounded-full bg-white px-5 py-2 text-xs font-bold tracking-wide text-slate-950 uppercase"
          @click="$emit('confirm')"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>
