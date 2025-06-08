import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './dist',  // Builds to root `/dist` (default)
  },
  server: {
    proxy: {
      '/api': {  // Proxy API calls to Express
        target: 'http://localhost:5001',
        changeOrigin: true,
      }
    }
  }
});