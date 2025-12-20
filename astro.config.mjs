import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

// https://astro.build/config
export default defineConfig({
  site: 'https://ucla-imls-open-sci.info',
  vite: {
    plugins: [yaml()],
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions'],
          quietDeps: true
        }
      }
    }
  }
});