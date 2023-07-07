import { type Factory, type UnpluginCombineInstance } from './types'
import { resolvePlugins } from './index'

export const getRollupPlugin = <UserOptions>(
  factory: Factory<UserOptions>
): UnpluginCombineInstance<UserOptions>['rollup'] => {
  return (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!, { framework: 'rollup' })
    return resolvePlugins(plugins, 'rollup')
  }
}
