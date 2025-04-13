import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // This resolves '@' to 'src' folder
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // ✅ Your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
