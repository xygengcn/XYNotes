// vite.build.config.ts
import vue from "file:///config/workspace/xynotes/node_modules/.pnpm/@vitejs+plugin-vue@5.1.1_vite@5.3.5_@types+node@22.7.7_sass@1.77.8_terser@5.36.0__vue@3.5.13_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///config/workspace/xynotes/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.0_vite@5.3.5_@types+node@22.7.7_sass@1.77.8_terser@5.36.0__vue@3.5.13_typescript@5.5.4_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { fileURLToPath, URL } from "node:url";
import * as path from "path";
import { defineConfig } from "file:///config/workspace/xynotes/node_modules/.pnpm/vite@5.3.5_@types+node@22.7.7_sass@1.77.8_terser@5.36.0/node_modules/vite/dist/node/index.js";
import dts from "file:///config/workspace/xynotes/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@22.7.7_rollup@4.19.1_typescript@5.5.4_vite@5.3.5_@types+nod_rd4gkctcsnmm6ko7blpzga3m7a/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/config/workspace/xynotes/packages/store";
var __vite_injected_original_import_meta_url = "file:///config/workspace/xynotes/packages/store/vite.build.config.ts";
var vite_build_config_default = defineConfig(
  async () => ({
    plugins: [vue(), vueJsx(), dts({ entryRoot: "./src" })],
    base: path.join(__vite_injected_original_dirname, "./src"),
    envPrefix: ["VITE_"],
    resolve: {
      alias: {
        // @ts-ignore
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    build: {
      outDir: "./dist",
      emptyOutDir: true,
      target: "esnext",
      lib: {
        name: "components",
        fileName: (format) => `[name].${format}.js`,
        entry: {
          index: path.join(__vite_injected_original_dirname, "src/index.ts"),
          configs: path.join(__vite_injected_original_dirname, "src/state/configs.ts"),
          note: path.join(__vite_injected_original_dirname, "src/state/note.ts"),
          app: path.join(__vite_injected_original_dirname, "src/state/app.ts")
        },
        formats: ["cjs", "es"]
      },
      rollupOptions: {
        external: ["vue", "@xynotes/components", "@xynotes/utils", "eventemitter3"]
      }
    }
  })
);
export {
  vite_build_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5idWlsZC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvY29uZmlnL3dvcmtzcGFjZS94eW5vdGVzL3BhY2thZ2VzL3N0b3JlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvY29uZmlnL3dvcmtzcGFjZS94eW5vdGVzL3BhY2thZ2VzL3N0b3JlL3ZpdGUuYnVpbGQuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9jb25maWcvd29ya3NwYWNlL3h5bm90ZXMvcGFja2FnZXMvc3RvcmUvdml0ZS5idWlsZC5jb25maWcudHNcIjtpbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKFxuICBhc3luYyAoKSA9PlxuICAgICh7XG4gICAgICBwbHVnaW5zOiBbdnVlKCksIHZ1ZUpzeCgpLCBkdHMoeyBlbnRyeVJvb3Q6ICcuL3NyYycgfSldLFxuICAgICAgYmFzZTogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICBlbnZQcmVmaXg6IFsnVklURV8nXSxcbiAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGJ1aWxkOiB7XG4gICAgICAgIG91dERpcjogJy4vZGlzdCcsXG4gICAgICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgICAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgICAgICBsaWI6IHtcbiAgICAgICAgICBuYW1lOiAnY29tcG9uZW50cycsXG4gICAgICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGBbbmFtZV0uJHtmb3JtYXR9LmpzYCxcbiAgICAgICAgICBlbnRyeToge1xuICAgICAgICAgICAgaW5kZXg6IHBhdGguam9pbihfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgICAgICAgIGNvbmZpZ3M6IHBhdGguam9pbihfX2Rpcm5hbWUsICdzcmMvc3RhdGUvY29uZmlncy50cycpLFxuICAgICAgICAgICAgbm90ZTogcGF0aC5qb2luKF9fZGlybmFtZSwgJ3NyYy9zdGF0ZS9ub3RlLnRzJyksXG4gICAgICAgICAgICBhcHA6IHBhdGguam9pbihfX2Rpcm5hbWUsICdzcmMvc3RhdGUvYXBwLnRzJylcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZvcm1hdHM6IFsnY2pzJywgJ2VzJ11cbiAgICAgICAgfSxcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgIGV4dGVybmFsOiBbJ3Z1ZScsICdAeHlub3Rlcy9jb21wb25lbnRzJywgJ0B4eW5vdGVzL3V0aWxzJywgJ2V2ZW50ZW1pdHRlcjMnXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBhcyBVc2VyQ29uZmlnKVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1QsT0FBTyxTQUFTO0FBQ3RVLE9BQU8sWUFBWTtBQUNuQixTQUFTLGVBQWUsV0FBVztBQUNuQyxZQUFZLFVBQVU7QUFDdEIsU0FBUyxvQkFBZ0M7QUFDekMsT0FBTyxTQUFTO0FBTGhCLElBQU0sbUNBQW1DO0FBQXFKLElBQU0sMkNBQTJDO0FBUS9PLElBQU8sNEJBQVE7QUFBQSxFQUNiLGFBQ0c7QUFBQSxJQUNDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxHQUFHLElBQUksRUFBRSxXQUFXLFFBQVEsQ0FBQyxDQUFDO0FBQUEsSUFDdEQsTUFBVyxVQUFLLGtDQUFXLE9BQU87QUFBQSxJQUNsQyxXQUFXLENBQUMsT0FBTztBQUFBLElBQ25CLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQTtBQUFBLFFBRUwsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxNQUN0RDtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLGFBQWE7QUFBQSxNQUNiLFFBQVE7QUFBQSxNQUNSLEtBQUs7QUFBQSxRQUNILE1BQU07QUFBQSxRQUNOLFVBQVUsQ0FBQyxXQUFXLFVBQVUsTUFBTTtBQUFBLFFBQ3RDLE9BQU87QUFBQSxVQUNMLE9BQVksVUFBSyxrQ0FBVyxjQUFjO0FBQUEsVUFDMUMsU0FBYyxVQUFLLGtDQUFXLHNCQUFzQjtBQUFBLFVBQ3BELE1BQVcsVUFBSyxrQ0FBVyxtQkFBbUI7QUFBQSxVQUM5QyxLQUFVLFVBQUssa0NBQVcsa0JBQWtCO0FBQUEsUUFDOUM7QUFBQSxRQUNBLFNBQVMsQ0FBQyxPQUFPLElBQUk7QUFBQSxNQUN2QjtBQUFBLE1BQ0EsZUFBZTtBQUFBLFFBQ2IsVUFBVSxDQUFDLE9BQU8sdUJBQXVCLGtCQUFrQixlQUFlO0FBQUEsTUFDNUU7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNKOyIsCiAgIm5hbWVzIjogW10KfQo=
