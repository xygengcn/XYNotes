import { fileURLToPath, URL } from 'node:url';
import * as path from 'path';
import { defineConfig, UserConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(
  async () =>
    ({
      plugins: [dts({ entryRoot: './src' })],
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
          entry: {
            index: path.join(__dirname, 'src/index.ts'),
            web: path.join(__dirname, 'src/web/index.ts')
          },
          formats: ['cjs', 'es']
        },
        rollupOptions: {
          external: ['@xynotes/store']
        }
      }
    } as UserConfig)
);
