import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      "*": path.resolve(__dirname, "./src"),
      // '/images': '/src/assets/images/',
    },
  },
  base: './',
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
        assetFileNames: (assetInfo) => {
          if(assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name][extname]';
          }
        }
      }
    }
  }
})

