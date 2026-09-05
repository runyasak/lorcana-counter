import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({

  modules: ['@nuxt/fonts', '@nuxt/eslint', '@nuxt/icon'],

  devtools: { enabled: false },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL ?? '/',
    head: {
      title: 'Lorcana Counter',
      meta: [
        { name: 'description', content: 'A lore counter web app for Disney Lorcana, built with Nuxt.' },
        { property: 'og:title', content: 'Lorcana Counter' },
        { property: 'og:description', content: 'A lore counter web app for Disney Lorcana, built with Nuxt.' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'icon.svg' },
        { rel: 'apple-touch-icon', href: 'icon.svg' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-11-01',

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['@vueuse/core'],
    },
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
