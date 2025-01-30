import type { Factory, UnpluginCombineInstance } from './types'
import { resolvePlugins } from './index'

export function getRollupPlugin<UserOptions>(
  factory: Factory<UserOptions>,
): UnpluginCombineInstance<UserOptions>['rollup'] {
  return async (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!, { framework: 'rollup' })
    return resolvePlugins(await plugins, 'rollup')
  }
}
