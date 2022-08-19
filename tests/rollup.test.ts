import path from 'node:path'
import { expect, test } from 'vitest'
import { rollup } from 'rollup'
import { createCombinePlugin } from '../src'
import type { OptionsPlugin } from '../src'

const orders: string[] = []

const plugins: OptionsPlugin[] = [
  {
    name: '1',
    buildStart: () => (orders.push('1'), undefined),
  },
  {
    name: '2',
    buildStart: () => (orders.push('2'), undefined),
  },
  {
    name: '3',
    buildStart: () => (orders.push('3'), undefined),
  },
]

const fixture = path.resolve(__dirname, 'fixtures')

test('rollup', async () => {
  await rollup({
    input: [path.resolve(fixture, 'foo.ts')],
    treeshake: false,
    plugins: [
      { name: 'PRE', buildStart: () => (orders.push('PRE'), undefined) },
      createCombinePlugin(() => ({
        name: 'rollup-combine',
        plugins,
      })).rollup(),
      { name: 'POST', buildStart: () => (orders.push('POST'), undefined) },
    ],
  })

  expect(orders).toMatchInlineSnapshot(`
    [
      "PRE",
      "1",
      "2",
      "3",
      "POST",
    ]
  `)
})
