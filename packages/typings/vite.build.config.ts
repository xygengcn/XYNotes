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
      build: {
        outDir: './dist',
        emptyOutDir: true,
        target: 'esnext',
        lib: {
          name: 'components',
          fileName: (format) => `[name].${format}.js`,
          entry: {
            index: path.join(__dirname, 'src/index.ts'),
            note: path.join(__dirname, 'src/note.ts')
          },
          formats: ['cjs', 'es']
        }
      }
    } as UserConfig)
);
