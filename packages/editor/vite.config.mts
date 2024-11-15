import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import dts from 'vite-plugin-dts';

const markdown = readFileSync(join(__dirname, './readme.md'), 'utf-8');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), dts({})],
  define: {
    __MARKDOWN__: JSON.stringify(markdown)
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: ['./src/editor/index.tsx','./src/editor/hook.ts'],
      name: 'MarkdownEditor',
      formats: ['es', 'cjs']
    },
    emptyOutDir: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
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
