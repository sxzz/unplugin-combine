import { resolvePlugins } from './index'
import type { Factory, UnpluginCombineInstance } from './types'

export const getRollupPlugin = <UserOptions>(
  factory: Factory<UserOptions>,
): UnpluginCombineInstance<UserOptions>['rollup'] => {
  return (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!, { framework: 'rollup' })
    return resolvePlugins(plugins, 'rollup')
  }
}
