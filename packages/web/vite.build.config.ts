import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath } from 'url';
import { defineConfig, PluginOption } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import manifestJson from './mainifest';
import packageConfig from './package.json';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

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
        return ['mind-mark', 'code-preview'].includes(tag);
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
    }),
    // 数据分析
    visualizer({
      filename: path.join(__dirname, 'dist', 'stats.html'),
      open: false, //注意这里要设置为true，否则无效
      gzipSize: true,
      brotliSize: true
    }) as PluginOption
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
