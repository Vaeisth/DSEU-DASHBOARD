import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { API_BASE_URL } from './src/config/api.config'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/login': {
        target: API_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
