import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
  host: '127.0.0.1', // или '0.0.0.0', если нужно из WSL/Docker
    port: 5173,
    strictPort: true,  // не переключаться на 5174, а падать с ошибкой
  },
})