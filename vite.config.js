import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Пользовательский сайт warashl.github.io живёт в корне домена — base остаётся "/".
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
