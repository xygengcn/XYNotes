import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const markdown = readFileSync(join(__dirname, './readme.md'), 'utf-8');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  define: {
    __MARKDOWN__: JSON.stringify(markdown)
  },
  resolve: {
    alias: [
      {
        find: /^~(.*)$/,
        replacement: '$1'
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      }
    ]
  },
  server: {
    host: '0.0.0.0',
    port: 8080
  }
});
