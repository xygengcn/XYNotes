import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vueDevTools from 'vite-plugin-vue-devtools';
import manifestJson from './mainifest';
import packageConfig from './package.json';
const appVersion = packageConfig.version;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: '/',
    build: {
      outDir: 'dist',
      emptyOutDir: true
    },
    plugins: [
      vueDevTools(),
      vue(),
      vueJsx({
        isCustomElement: (tag) => {
          return ['mind-mark', 'code-preview', 'img-viewer'].includes(tag);
        }
      }),
      VitePWA({
        base: '/',
        devOptions: { enabled: false },
        manifest: manifestJson as any,
        registerType: 'autoUpdate',
        workbox: {
          cacheId: 'notes-xygengcn-cache',
          runtimeCaching: [
            {
              urlPattern: ({ url }) => url.origin === 'https://notes.xygeng.cn',
              handler: 'NetworkFirst',
              options: {
                cacheName: 'notes-xygengcn',
                cacheableResponse: {
                  statuses: [200]
                }
              }
            },
            {
              urlPattern: /.*\.[js|json|css].*/,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'notes-xygengcn-js',
                expiration: {
                  maxEntries: 50, // 最多缓存30个，超过的按照LRU原则删除
                  maxAgeSeconds: 30 * 24 * 60 * 60
                },
                cacheableResponse: {
                  statuses: [200]
                }
              }
            }
          ]
        }
      })
    ],
    resolve: {
      conditions: ['development'],
      alias: [
        {
          find: /^~(.*)$/,
          replacement: '$1'
        },
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url))
        },
        {
          find: '@editor',
          replacement: fileURLToPath(new URL('../editor/src', import.meta.url))
        }
      ]
    },
    server: {
      host: '0.0.0.0',
      strictPort: true,
      allowedHosts: true,
      watch: {
        usePolling: true
      }
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
