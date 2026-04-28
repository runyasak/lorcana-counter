import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-11-01',

  devtools: { enabled: false },

  modules: ['@nuxt/fonts', '@nuxt/eslint'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },
})
