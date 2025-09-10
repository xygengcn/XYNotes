import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import packageConfig from './package.json';

const appVersion = packageConfig.version;

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 500
  },
  plugins: [
    vue(),
    vueJsx({
      isCustomElement: (tag) => {
        return ['mind-mark', 'code-preview','img-viewer'].includes(tag);
      }
    })
  ],
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
    strictPort: true
  },
  define: {
    __APP_VERSION__: JSON.stringify(appVersion)
  },
  envPrefix: [
    'VITE_',
    'TAURI_PLATFORM',
    'TAURI_ARCH',
    'TAURI_FAMILY',
    'TAURI_PLATFORM_VERSION',
    'TAURI_PLATFORM_TYPE',
    'TAURI_DEBUG'
  ]
});
