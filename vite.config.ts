import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/*
  One real HTML page per section, so each has its own URL, title and
  description, and any static host can serve them with no rewrite rules.
  Every page loads the same src/main.tsx, which reads <body data-page>.
  'mpa' turns off Vite's SPA fallback, so a mistyped URL 404s in dev instead
  of quietly showing the home page.
*/
export default defineConfig({
  appType: 'mpa',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services/index.html'),
        gallery: resolve(__dirname, 'gallery/index.html'),
        reviews: resolve(__dirname, 'reviews/index.html'),
        about: resolve(__dirname, 'about/index.html'),
      },
    },
  },
})
