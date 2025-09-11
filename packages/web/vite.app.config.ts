import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import packageConfig from './package.json';

const appVersion = packageConfig.version;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
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
          return ['mind-mark', 'code-preview', 'img-viewer'].includes(tag);
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
      __APP_VERSION__: JSON.stringify(appVersion),
      __VITE_APP_AXIOS_BASEURL__: JSON.stringify(env.VITE_APP_AXIOS_BASEURL || ''),
      __VITE_APP_ENV__: JSON.stringify(env.VITE_APP_ENV)
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
  };
});
