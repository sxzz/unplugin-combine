import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/*.ts', '!./src/types.ts'],
  format: ['cjs', 'esm'],
  target: 'node16.14',
  clean: true,
  dts: true,
  publint: true,
})
