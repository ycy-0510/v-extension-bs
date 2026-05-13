import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: false,
  ignores: [
    'dist',
    'node_modules',
    'public',
    'extension',
  ],
})
