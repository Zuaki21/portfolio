import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/portfolio/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'), // ← これを追加
    },
  },
})
