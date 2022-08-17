import path from 'node:path'
import { expect, test } from 'vitest'
import { build } from 'vite'
import Vite from '../src/vite'
import type { Plugins, VitePlugin, VitePluginList } from '../src'

const orders: string[] = []
const plugins: Plugins<VitePlugin, VitePluginList> = [
  {
    plugin: {
      name: 'post',
      buildStart: () => (orders.push('post'), undefined),
    },
    order: 'post',
  },
  {
    plugin: {
      name: 'pre1',
      buildStart: () => (orders.push('pre1'), undefined),
    },
    order: 'pre',
  },
  {
    plugin: {
      name: 'pre2',
      buildStart: () => (orders.push('pre2'), undefined),
    },
    order: 'pre',
  },
]

const fixture = path.resolve(__dirname, 'fixtures')

test('vite', async () => {
  await build({
    logLevel: 'silent',
    build: {
      rollupOptions: {
        input: [path.resolve(fixture, 'foo.ts')],
        treeshake: false,
      },
    },
    plugins: [
      { name: 'PRE', buildStart: () => (orders.push('PRE'), undefined) },
      Vite({
        name: 'vite-combine',
        plugins,
      }),
    ],
  })
  expect(orders).toMatchInlineSnapshot(`
    [
      "pre1",
      "pre2",
      "PRE",
      "post",
    ]
  `)
})
