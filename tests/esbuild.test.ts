import path from 'node:path'
import { expect, test } from 'vitest'
import { build } from 'esbuild'
import Esbuild from '../src/esbuild'
import type { EsbuildPlugin, EsbuildPluginList, Plugins } from '../src'

const orders: string[] = []

const plugins: Plugins<EsbuildPlugin, EsbuildPluginList> = [
  {
    plugin: {
      name: 'post',
      setup(build) {
        build.onStart(() => (orders.push('post'), undefined))
      },
    },
    order: 'post',
  },
  {
    plugin: {
      name: 'preA',
      setup(build) {
        build.onStart(() => (orders.push('pre1'), undefined))
      },
    },
    order: 'pre',
  },
  {
    plugin: {
      name: 'preB',
      setup(build) {
        build.onStart(() => (orders.push('pre2'), undefined))
      },
    },
    order: 'pre',
  },
]

const fixture = path.resolve(__dirname, 'fixtures')

test('esbuild', async () => {
  await build({
    entryPoints: [path.resolve(fixture, 'foo.ts')],
    treeShaking: false,
    write: false,
    plugins: [
      {
        name: 'PRE',
        setup(build) {
          build.onStart(() => {
            orders.push('PRE')
          })
        },
      },
      Esbuild({
        name: 'esbuild-combine',
        plugins,
      }),
    ],
  })
  expect(orders).toMatchInlineSnapshot(`
    [
      "PRE",
      "pre1",
      "pre2",
      "post",
    ]
  `)
})
