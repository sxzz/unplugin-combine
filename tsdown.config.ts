import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/*.ts', '!./src/types.ts'],
  publint: true,
  exports: true,
  inlineOnly: ['@antfu/utils'],
})
