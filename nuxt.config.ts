import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-11-01',

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL ?? '/',
  },

  devtools: { enabled: false },

  modules: ['@nuxt/fonts', '@nuxt/eslint'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },
})
