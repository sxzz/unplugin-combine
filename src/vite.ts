import { resolvePlugins } from '.'
import type { Factory, UnpluginCombineInstance } from './types'

export const getVitePlugin = <UserOptions>(
  factory: Factory<UserOptions>
): UnpluginCombineInstance<UserOptions>['vite'] => {
  return (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!)
    return resolvePlugins(plugins, 'vite')
  }
}
