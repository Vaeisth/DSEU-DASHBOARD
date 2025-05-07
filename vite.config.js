import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {

    proxy: {
      '/login': {
        target: 'http://134.209.144.96:8081',
        changeOrigin: true,
        secure: false,
      },

    },
  },
})
