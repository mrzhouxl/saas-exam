import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueMacros from 'unplugin-vue-macros/vite'
import autoImports from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue(),
        vueJsx: vueJsx(),
        
      }
    }),
    autoImports({
      imports: ['vue'],
      dts: './typings/auto-imports.d.ts',
      eslintrc: {
        enabled: true, // 一般更新imports启动一次即可
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  }
})
