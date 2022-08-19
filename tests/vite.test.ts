import path from 'node:path'
import { expect, test } from 'vitest'
import { build } from 'vite'
import { createCombinePlugin } from '../src'
import type { OptionsPlugin } from '../src'

const orders: string[] = []

const plugins = (prefix = ''): OptionsPlugin[] => [
  {
    name: `${prefix}1`,
    // useless
    enforce: 'pre',
    transform: () => (orders.push(`${prefix}-pre`), undefined),
  },
  {
    name: `${prefix}2`,
    transform: () => (orders.push(`${prefix}-none`), undefined),
  },
  {
    name: `${prefix}3`,
    enforce: 'post',
    transform: () => (orders.push(`${prefix}-post`), undefined),
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
      {
        name: 'PRE',
        enforce: 'pre',
        transform: () => (orders.push('PRE'), undefined),
      },

      {
        name: 'POST',
        enforce: 'post',
        transform: () => (orders.push('POST'), undefined),
      },

      createCombinePlugin(() => ({
        name: 'vite-combine1',
        enforce: 'post',
        plugins: plugins('pre1'),
      })).vite(),

      createCombinePlugin(() => ({
        name: 'vite-combine2',
        enforce: 'pre',
        plugins: plugins('pre2'),
      })).vite(),

      createCombinePlugin(() => ({
        name: 'vite-combine3',
        plugins: plugins('none'),
      })).vite(),
    ],
  })
  expect(orders).toMatchInlineSnapshot(`
    [
      "PRE",
      "pre2-pre",
      "pre2-none",
      "pre2-post",
      "none-pre",
      "none-none",
      "none-post",
      "POST",
      "pre1-pre",
      "pre1-none",
      "pre1-post",
    ]
  `)
})
