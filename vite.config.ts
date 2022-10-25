import { defineConfig } from 'vite';
import { createVuePlugin as vue } from 'vite-plugin-vue2';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath } from 'url';
import { VitePWA } from 'vite-plugin-pwa';
import manifestJson from './mainifest';
import packageConfig from './package.json';
import path from 'path';

const appVersion = packageConfig.version;

export default defineConfig({
  base: '/',
  build: {
    outDir: path.join(__dirname, 'dist', appVersion),
    emptyOutDir: true,
  },
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
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
  },
});
