import { resolvePlugin } from '.'
import type { Factory, UnpluginCombineInstance } from './types'

export const getRollupPlugin = <UserOptions>(
  factory: Factory<UserOptions>
): UnpluginCombineInstance<UserOptions>['rollup'] => {
  return (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!)
    return plugins.map((plugin) => resolvePlugin(plugin, 'rollup'))
  }
}
