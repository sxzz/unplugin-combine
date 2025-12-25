import path from 'node:path'
import rspack from '@rspack/core'
import { expect, test } from 'vitest'
import { createCombinePlugin, type OptionsPlugin } from '../src'
import { wrapPromise } from './_utils'

const fixture = path.resolve(__dirname, 'fixtures')

test.each([true, false] as const)('rspack async = %s', async (async) => {
  const orders: string[] = []

  const plugins: OptionsPlugin[] = [
    () => orders.push('1'),
    () => orders.push('2'),
    () => orders.push('3'),
  ]

  const compiler = rspack({
    entry: path.resolve(fixture, 'foo.ts'),
    mode: 'production',
    plugins: [
      () => orders.push('PRE'),
      createCombinePlugin(() => ({
        name: 'rspack-combine',
        plugins: wrapPromise(plugins, async),
      })).rspack(),
      () => orders.push('POST'),
    ],
  })
  await new Promise<void>((resolve, reject) =>
    compiler!.run((err) => (err ? reject(err) : resolve())),
  )

  expect(orders).toEqual(
    async ? ['PRE', 'POST', '1', '2', '3'] : ['PRE', '1', '2', '3', 'POST'],
  )
})
