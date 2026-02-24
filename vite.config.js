import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),

    AutoImport({
      // eslintrc: {
      //   enabled: true,
      //   filepath: './.eslintrc-auto-import.json',
      // },
      imports: [
        'vue',
        '@vueuse/core',
        // VueRouterAutoImports,
        // { '@vueuse/router': ['useRouteQuery', 'useRouteParams'] },
      ],
      dts: true,
      // dirs: ['./src/app/composables', './src/modules/**/composables', './src/modules/**/**/composables', './src/shared/composables'],
      // vueTemplate: true,
    }),
    Components({
      dts: true,
      resolvers: [PrimeVueResolver()],
      dirs: [
        './src/error',
        './src/modules/**/components',
        './src/modules/**/views',
        './src/modules/**/widgets',
        './src/modules/**/**/components',
        './src/modules/**/**/views',
        './src/modules/**/**/widgets',
        './src/components/UI',
        './src/layouts'
      ],
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
