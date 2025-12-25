import { resolvePlugins } from './index'
import type { Factory, UnpluginCombineInstance } from './types'

export function getRollupPlugin<UserOptions>(
  factory: Factory<UserOptions>,
): UnpluginCombineInstance<UserOptions>['rollup'] {
  return async (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!, { framework: 'rollup' })
    return resolvePlugins(await plugins, 'rollup')
  }
}
