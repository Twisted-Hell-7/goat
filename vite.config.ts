import { defineConfig } from 'vite';

const base = '/goat/';

export default defineConfig({
  base,
  build: {
    target: 'es2022',
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
  server: {
    port: 5173,
  },
});