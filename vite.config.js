import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/CyberDivination/',
  optimizeDeps: {
    include: ['openai', 'element-plus']
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})