import path from 'node:path'
import { expect, test } from 'vitest'
import { rollup } from 'rollup'
import { createCombinePlugin } from '../src'
import type { OptionsPlugin, UnpluginCombineInstance } from '../src'

const orders: string[] = []

const plugins: (OptionsPlugin | UnpluginCombineInstance<any>)[] = [
  {
    name: '1',
    buildStart: () => (orders.push('1'), undefined),
  },
  {
    name: '2',
    buildStart: () => (orders.push('2'), undefined),
  },
  createCombinePlugin(() => ({
    name: 'rollup-combine',
    plugins: [
      {
        name: '3',
        buildStart: () => (orders.push('3'), undefined),
      },
    ],
  })).rollup(),
  [
    createCombinePlugin(() => ({
      name: 'rollup-combine',
      plugins: [
        {
          name: '4',
          buildStart: () => (orders.push('4'), undefined),
        },
      ],
    })),
    undefined,
  ],
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
      "4",
      "POST",
    ]
  `)
})
