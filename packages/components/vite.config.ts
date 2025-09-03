import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, UserConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(
  async () =>
    ({
      plugins: [vue(), vueJsx()],

      // 打包路径问题
      base: './',

      // 1. prevent vite from obscuring rust errors
      clearScreen: false,
      // 2. tauri expects a fixed port, fail if that port is not available
      server: {
        port: 8080,
        host: '0.0.0.0',
        strictPort: true
      },
      // 3. to make use of `TAURI_DEBUG` and other env variables
      // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
      envPrefix: ['VITE_', 'TAURI_'],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      }
    }) as UserConfig
);
