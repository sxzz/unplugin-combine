import path from 'node:path'
import { build } from 'vite'
import { expect, test } from 'vitest'
import { createCombinePlugin, type OptionsPlugin } from '../src'
import { wrapPromise } from './_utils'

const fixture = path.resolve(__dirname, 'fixtures')

test.each([true, false] as const)('vite async = %s', async (async) => {
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
        plugins: wrapPromise(plugins('pre1'), async),
      })).vite(),

      createCombinePlugin(() => ({
        name: 'vite-combine2',
        enforce: 'pre',
        plugins: wrapPromise(plugins('pre2'), async),
      })).vite(),

      createCombinePlugin(() => ({
        name: 'vite-combine3',
        plugins: wrapPromise(plugins('none'), async),
      })).vite(),
    ],
  })
  expect(orders).toEqual([
    'PRE',
    'pre1-pre',
    'pre2-pre',
    'none-pre',
    'pre1-none',
    'pre2-none',
    'none-none',
    'POST',
    'pre1-post',
    'pre2-post',
    'none-post',
  ])
})
