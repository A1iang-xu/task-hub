import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    vue(), 
    tailwindcss(),
    viteCompression({
      threshold: 10240, // 只有大于10KB的文件才会被压缩
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }, 
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('vue') || id.includes('vue-router') || id.includes('pinia')) {
            return 'vue-vendor'
          }
        }
      }
    }
  }
})

