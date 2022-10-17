import { resolvePlugin } from '.'
import type { Factory, FactoryOutput, RollupPlugin } from './types'

export const getRollupPlugin = <UserOptions>(
  factory: Factory<UserOptions>
): FactoryOutput<UserOptions, RollupPlugin[]> => {
  return (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!)
    return plugins.map((plugin) => resolvePlugin(plugin, 'rollup'))
  }
}
