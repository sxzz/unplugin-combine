import { expect, test } from 'vitest'
import { createCombinePlugin, type OptionsPlugin } from '../src'

const plugins: OptionsPlugin[] = [{ name: `1` }, { name: `2` }, { name: `3` }]

test('plugin', () => {
  expect(
    createCombinePlugin(() => ({
      name: 'name',
      plugins,
    })).plugins(),
  ).toMatchInlineSnapshot(`
    [
      {
        "name": "1",
      },
      {
        "name": "2",
      },
      {
        "name": "3",
      },
    ]
  `)
})
