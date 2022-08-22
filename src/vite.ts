import { resolvePlugin } from '.'
import type { Factory, FactoryOutput, VitePlugin } from './types'

export const getVitePlugin = <UserOptions>(
  factory: Factory<UserOptions>
): FactoryOutput<UserOptions, VitePlugin[]> => {
  return (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!)
    return plugins.map((plugin) => resolvePlugin(plugin, 'vite'))
  }
}
