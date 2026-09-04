import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({

  modules: ['@nuxt/fonts', '@nuxt/eslint', '@nuxt/icon'],

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

  fonts: {
    families: [
      { name: 'Space Grotesk', provider: 'google', weights: [300, 400, 700] },
    ],
  },
})
