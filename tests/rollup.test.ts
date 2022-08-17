import path from 'node:path'
import { expect, test } from 'vitest'
import { rollup } from 'rollup'
import Rollup from '../src/rollup'
import type { Plugins, RollupPlugin, RollupPluginList } from '../src'

const orders: string[] = []

const plugins: Plugins<RollupPlugin, RollupPluginList> = [
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

test('rollup', async () => {
  await rollup({
    input: [path.resolve(fixture, 'foo.ts')],
    treeshake: false,
    plugins: [
      { name: 'PRE', buildStart: () => (orders.push('PRE'), undefined) },
      Rollup({
        name: 'rollup-combine',
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
