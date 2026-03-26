/* ============================================
   VITE CONFIGURATION
   Build optimization & performance
   ============================================ */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  
  // Build optimization
  build: {
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunk for React
          vendor: ['react', 'react-dom'],
        },
      },
    },
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Source maps for production (optional)
    sourcemap: false,
  },
  
  // Development server
  server: {
    port: 5173,
    open: true,
    cors: true,
  },
  
  // Preview server
  preview: {
    port: 4173,
  },
  
  // CSS optimization
  css: {
    devSourcemap: true,
  },
  
  // Resolve aliases (optional)
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@styles': '/src/styles',
    },
  },
});