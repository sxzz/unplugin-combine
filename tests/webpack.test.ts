import path from 'node:path'
import { expect, test } from 'vitest'
import webpack from 'webpack'
import Webpack from '../src/webpack'
import type { Plugins, WebpackPlugin, WebpackPluginList } from '../src'

const orders: string[] = []

const plugins: Plugins<WebpackPlugin, WebpackPluginList> = [
  {
    plugin: () => orders.push('post'),
    order: 'post',
  },
  {
    plugin: () => orders.push('pre1'),
    order: 'pre',
  },
  {
    plugin: () => orders.push('pre2'),
    order: 'pre',
  },
]

const fixture = path.resolve(__dirname, 'fixtures')

test('webpack', async () => {
  const compiler = webpack({
    entry: path.resolve(fixture, 'foo.ts'),
    mode: 'production',
    plugins: [
      () => orders.push('PRE'),
      Webpack({
        name: 'webpack-combine',
        plugins,
      }),
    ],
  })
  await new Promise<void>((resolve, reject) =>
    compiler.run((err) => (err ? reject(err) : resolve()))
  )

  expect(orders).toMatchInlineSnapshot(`
    [
      "PRE",
      "pre1",
      "pre2",
      "post",
    ]
  `)
})
