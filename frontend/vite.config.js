import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/get_weather': 'http://localhost:5000',
      '/predict': 'http://localhost:5000',
      '/analyze_soil': 'http://localhost:5000'
    }
  }
})
