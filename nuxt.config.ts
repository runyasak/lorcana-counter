import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({

  modules: ['@nuxt/fonts', '@nuxt/eslint', '@nuxt/icon', '@vite-pwa/nuxt', 'nuxt-gtag'],

  devtools: { enabled: false },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL ?? '/',
    head: {
      title: 'Lorcana Counter',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'description', content: 'A lore counter web app for Disney Lorcana, built with Nuxt.' },
        { property: 'og:title', content: 'Lorcana Counter' },
        { property: 'og:description', content: 'A lore counter web app for Disney Lorcana, built with Nuxt.' },
        { property: 'og:type', content: 'website' },
        { name: 'theme-color', content: '#0d0d14' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'icon.svg' },
        { rel: 'apple-touch-icon', href: 'apple-touch-icon.png' },
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

  gtag: {
    id: 'G-89L4XZP62C',
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Lorcana Counter',
      short_name: 'Lorcana Counter',
      description: 'A lore counter web app for Disney Lorcana, built with Nuxt.',
      theme_color: '#0d0d14',
      background_color: '#0d0d14',
      display: 'standalone',
      start_url: '.',
      icons: [
        { src: 'icons/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'icons/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        { src: 'icons/pwa-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    },
  },
})
