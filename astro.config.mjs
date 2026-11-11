import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://lucaso.io',
  outDir: './output',
  build: {
    format: 'file',
  },
});
