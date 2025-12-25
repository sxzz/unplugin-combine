import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/*.ts', '!./src/types.ts'],
  inlineOnly: ['@antfu/utils'],
  exports: true,
  publint: 'ci-only',
})
