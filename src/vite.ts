import { getRollupPlugin } from './rollup'

import type { Factory, FactoryOutput, VitePlugin } from './types'

export const getVitePlugin = <UserOptions>(
  factory: Factory<UserOptions>
): FactoryOutput<UserOptions, VitePlugin> =>
  getRollupPlugin(factory, true) as any
