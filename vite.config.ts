import { defineConfig } from 'vite';
import { createVuePlugin as vue } from 'vite-plugin-vue2';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath } from 'url';
import { VitePWA } from 'vite-plugin-pwa';
import manifestJson from './mainifest';
export default defineConfig({
  base: '/',
  plugins: [vue(), vueJsx(), VitePWA({ base: '/', manifest: manifestJson as any })],
  resolve: {
    alias: [
      {
        find: /^~(.*)$/,
        replacement: '$1',
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
  server: {
    host: '0.0.0.0',
  },
});
