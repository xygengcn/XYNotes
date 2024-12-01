import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';
import * as path from 'path';
import { defineConfig, UserConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(
  async () =>
    ({
      plugins: [vue(), vueJsx(), dts()],
      base: './',
      envPrefix: ['VITE_'],
      resolve: {
        alias: {
          // @ts-ignore
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
      build: {
        outDir: './dist',
        emptyOutDir: true,
        target: 'esnext',
        lib: {
          name: 'components',
          fileName: (format) => `[name].${format}.js`,
          entry: {
            index: path.join(__dirname, 'src/index.ts'),
            'code-block': path.join(__dirname, 'src/components/code-block/index.tsx')
          },
          formats: ['cjs', 'es']
        },
        rollupOptions: {
          external: ['vue', 'vue-router']
        }
      }
    } as UserConfig)
);
