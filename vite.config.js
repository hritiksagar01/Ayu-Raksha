import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // expose to external network
    port: 5174,
    allowedHosts: ['*']   // ✅ allow any host (fixes ngrok issue)
  }
})
