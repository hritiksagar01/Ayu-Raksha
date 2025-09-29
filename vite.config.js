// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',          // Listen on all network interfaces
    allowedHosts: true,       // CRITICAL: Allow ALL hosts (including ngrok's URL)
    port: 5174,               // Explicitly set the port you are using
  }
})
