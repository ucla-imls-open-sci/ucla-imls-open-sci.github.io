import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  site: 'https://ucla-imls-open-sci.info',
  integrations: [react(), // Only load Keystatic in development to avoid adapter requirement for static builds
  ...(process.env.NODE_ENV === 'development' ? [keystatic()] : []), markdoc()],
  vite: {
    optimizeDeps: {
      exclude: ['@keystatic/core', '@keystatic/astro'],
    },
    plugins: [yaml()],
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions'],
          quietDeps: true
        }
      }
    }
  },
  output: 'static'
});