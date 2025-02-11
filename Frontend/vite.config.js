import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Point to your backend
        changeOrigin: true, // Ensures the host header is updated correctly
        rewrite: (path) => path.replace(/^\/api/, '/api/v1') // Rewrite /api to /api/v1
      }
    }
  },
  plugins: [
    tailwindcss(),
  ],
})
