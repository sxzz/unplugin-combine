import { resolvePlugin } from '.'
import type { Factory, UnpluginCombineInstance } from './types'

export const getVitePlugin = <UserOptions>(
  factory: Factory<UserOptions>
): UnpluginCombineInstance<UserOptions>['vite'] => {
  return (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!)
    return plugins.map((plugin) => resolvePlugin(plugin, 'vite'))
  }
}
