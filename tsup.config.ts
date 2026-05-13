import { defineConfig } from 'tsup'
import Vue from 'unplugin-vue/esbuild'

const isProd = process.env.NODE_ENV === 'production'
const outDir = isProd ? 'extension/prod/dist' : 'extension/dev/dist'
const onSuccess = isProd ? 'esno scripts/mvsw-prod.js' : 'esno scripts/mvsw-dev.js'

export default defineConfig({
  entry: ['src/background/index.js', 'src/content/index.js'],
  format: 'iife',
  outDir,
  splitting: false,
  minify: isProd,
  loader: { '.css': 'text' },
  // Vue references process.env / feature flags at runtime; resolve them
  // at build time so the content script doesn't crash in the browser.
  define: {
    'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
  },
  esbuildPlugins: [Vue({ isProduction: isProd })],
  onSuccess
})
