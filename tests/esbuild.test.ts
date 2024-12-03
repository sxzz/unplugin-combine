import path from 'node:path'
import { build } from 'esbuild'
import { expect, test } from 'vitest'
import { createCombinePlugin, type OptionsPlugin } from '../src'

const orders: string[] = []

const plugins: OptionsPlugin[] = [
  {
    name: '1',
    setup(build) {
      build.onStart(() => (orders.push('1'), undefined))
    },
  },
  {
    name: '2',
    setup(build) {
      build.onStart(() => (orders.push('2'), undefined))
    },
  },
  {
    name: '3',
    setup(build) {
      build.onStart(() => (orders.push('3'), undefined))
    },
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
      createCombinePlugin(() => ({
        name: 'esbuild-combine',
        plugins,
      })).esbuild(),
    ],
  })
  expect(orders).toMatchInlineSnapshot(`
    [
      "PRE",
      "1",
      "2",
      "3",
    ]
  `)
})
