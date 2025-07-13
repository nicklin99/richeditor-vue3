/**
 * vue组件编译导出 esm 模块
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { dirname, resolve } from 'node:path'
import dts from "vite-plugin-dts"
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
// https://vite.dev/config/

export default defineConfig(({ 
  // mode, 
  // command 
}) => {
  const config = {
    plugins: [
      vue(),
      vueJsx(),
      dts({
        rollupTypes: true,
        root: resolve(__dirname),
        entryRoot: resolve(__dirname, 'src'),
      })
    ],
    build: {
      outDir: "./dist",
      lib: {
        name: 'TiptapRichEditor',
        entry: resolve(__dirname, 'src/index.ts'),
        fileName: (format: string, entryName: string) => {
          // 默认 es / umd
          if (format == "es") {
            return `${entryName}.mjs`
          } else {
            return `${entryName}.js`
          }
        },
        cssFileName: "style"
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    }
  }
  return config
})
