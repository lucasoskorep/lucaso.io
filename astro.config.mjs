import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://lucaso.io',
  server: {
    port: 8000,
    host: true,
  },
  preview: {
    port: 8000,
    host: true,
  },
  outDir: './output',
  build: {
    format: 'file',
  },
});
