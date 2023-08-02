import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/*.ts', '!./src/types.ts'],
  format: ['cjs', 'esm'],
  target: 'node16.14',
  splitting: true,
  clean: true,
  dts: true,
})
