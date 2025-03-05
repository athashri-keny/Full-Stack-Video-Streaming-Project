import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// module.exports = {
//   darkMode: 'class', // Add this line
//   // ... rest of your config
// }


export default defineConfig({
    server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', 
        changeOrigin: true, // Ensures the host header is updated correctly
        rewrite: (path) => path.replace(/^\/api/, '/api/v1') 
      }
    }
  },
  plugins: [
    tailwindcss(),
  ],
   
}) 
