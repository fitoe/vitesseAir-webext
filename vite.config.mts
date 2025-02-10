/// <reference types="vitest" />

import type { UserConfig } from 'vite'
import { dirname, relative } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'
import packageJson from './package.json'
import { isDev, port, r } from './scripts/utils'

export const sharedConfig: UserConfig = {
  root: r('src'),
  resolve: {
    alias: {
      '~/': `${r('src')}/`,
    },
  },
  define: {
    __DEV__: isDev,
    __NAME__: JSON.stringify(packageJson.name),
  },
  plugins: [
    Vue(),
    ElementPlus({
      useSource: true,
      defaultLocale: 'zh-cn',
      sourceMap: !!isDev,
    }),
    VueRouter({
      extensions: ['.vue', '.md'],
      dts: 'src/typed-router.d.ts',
      exclude: ['**/play.vue', '**/PlayMap.vue'],
      routesFolder: [
        'src/popup/pages',
      ],
    }),
    Layouts({
      layoutsDirs: 'popup/layouts',
    }),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'css' })],
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          'webextension-polyfill': [
            ['=', 'browser'],
          ],
          'alova/client': ['useRequest'],
        },
      ],
      dts: r('src/auto-imports.d.ts'),
      dirs: [
        r('src/composables'),
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: [r('src/components')],
      dts: r('src/components.d.ts'),
      resolvers: [
        ElementPlusResolver({ importStyle: 'css' }),
        IconsResolver({
          prefix: '',
        }),
      ],
    }),

    // https://github.com/antfu/unplugin-icons
    Icons(),

    // https://github.com/unocss/unocss
    UnoCSS({
      variants: [
        {
          match: (s) => {
            if (s.startsWith('i-')) {
              return {
                matcher: s,
                selector: (s) => {
                  return s.startsWith('.') ? `${s.slice(1)},${s}` : s
                },
              }
            }
          },
        },
      ],
    }),

    // rewrite assets to use relative path
    {
      name: 'assets-rewrite',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html, { path }) {
        return html.replace(/"\/assets\//g, `"${relative(dirname(path), '/assets')}/`)
      },
    },
  ],
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    },
    // 增加此规则会导致popup的elementui样式缺少变量
    // postcss: {
    //   plugins: [
    //     {
    //       postcss(root) {
    //         root.walkRules((rule) => {
    //           if (rule.selector === ':root')
    //             rule.selector = ':host'
    //         })
    //       },
    //     },
    //   ],
    // },
  },
  optimizeDeps: {
    include: [
      'vue',
      '@vueuse/core',
      'webextension-polyfill',
    ],
    exclude: [
      'vue-demi',
    ],
  },
  build: {
    sourcemap: isDev ? 'inline' : false,
  },
}

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === 'serve' ? `http://localhost:${port}/` : '/dist/',
  server: {
    port,
    hmr: {
      host: 'localhost',
    },
    origin: `http://localhost:${port}`,
  },
  build: {
    watch: isDev
      ? {}
      : undefined,
    outDir: r('extension/dist'),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    minify: !isDev,
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        options: r('src/options/index.html'),
        popup: r('src/popup/index.html'),
        sidepanel: r('src/sidepanel/index.html'),
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
}))
