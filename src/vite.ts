import { type Factory, type UnpluginCombineInstance } from './types'
import { resolvePlugins } from '.'

export const getVitePlugin = <UserOptions>(
  factory: Factory<UserOptions>
): UnpluginCombineInstance<UserOptions>['vite'] => {
  return (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!, { framework: 'vite' })
    return resolvePlugins(plugins, 'vite')
  }
}
