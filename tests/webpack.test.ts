import path from 'node:path'
import { expect, test } from 'vitest'
import webpack from 'webpack'
import { type OptionsPlugin, createCombinePlugin } from '../src'

const orders: string[] = []

const plugins: OptionsPlugin[] = [
  () => orders.push('1'),
  () => orders.push('2'),
  () => orders.push('3'),
]

const fixture = path.resolve(__dirname, 'fixtures')

test('webpack', async () => {
  const compiler = webpack({
    entry: path.resolve(fixture, 'foo.ts'),
    mode: 'production',
    plugins: [
      () => orders.push('PRE'),
      createCombinePlugin(() => ({
        name: 'webpack-combine',
        plugins,
      })).webpack(),
      () => orders.push('POST'),
    ],
  })
  await new Promise<void>((resolve, reject) =>
    compiler.run((err) => (err ? reject(err) : resolve())),
  )

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
