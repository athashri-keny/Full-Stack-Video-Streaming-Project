import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://full-stack-video-streaming-project.onrender.com',
        changeOrigin: true, // Ensures the host header is updated correctly
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      },
    },
  },
  plugins: [
    tailwindcss(),
  ],
})
