import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({

  modules: ['@nuxt/fonts', '@nuxt/eslint'],

  devtools: { enabled: false },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL ?? '/',
  },

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-11-01',

  vite: {
    plugins: [tailwindcss()],
  },

  eslint: {
    config: {
      stylistic: {
        semi: false,
        quotes: 'single',
        indent: 2,
        braceStyle: '1tbs',
      },
    },
  },
})
