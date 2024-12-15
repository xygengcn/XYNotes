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
      plugins: [
        vue({
          template: {
            compilerOptions: {
              isCustomElement: (tag) => {
                return ['mind-mark', 'code-preview'].includes(tag);
              }
            }
          }
        }),
        vueJsx({
          isCustomElement: (tag) => {
            return ['mind-mark', 'code-preview'].includes(tag);
          }
        }),
        dts({ entryRoot: './src' })
      ],
      base: path.join(__dirname, './src'),
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
          entry: path.join(__dirname, 'src/index.ts'),
          formats: ['cjs', 'es']
        },
        rollupOptions: {
          external: ['vue', '@xynotes/components', '@xynotes/utils']
        }
      }
    } as UserConfig)
);
