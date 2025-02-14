import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/CyberDivination/' : '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        blog: 'blog.html'
      }
    },
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: ['openai', 'element-plus']
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})