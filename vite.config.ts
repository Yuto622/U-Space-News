import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Cloud Run上でのランタイム環境変数注入に対応するため、ビルド時のdefineを削除
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});