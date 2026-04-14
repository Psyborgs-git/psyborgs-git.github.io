import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BASE_URL || '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    host: '0.0.0.0',
    allowedHosts: ['localhost', '<IP_ADDRESS>', "jae.local"],
  },
  build: {
    target: 'ES2022',
    outDir: 'dist',
    sourcemap: false,
  },
})
