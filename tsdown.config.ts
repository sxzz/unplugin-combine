import { lib } from 'tsdown-preset-sxzz'

export default lib({
  entry: ['./src/*.ts', '!./src/types.ts'],
  inlineDeps: ['@antfu/utils'],
})
