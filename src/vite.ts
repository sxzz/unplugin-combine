import type { Factory, UnpluginCombineInstance } from './types'
import { resolvePlugins } from '.'

export function getVitePlugin<UserOptions>(
  factory: Factory<UserOptions>,
): UnpluginCombineInstance<UserOptions>['vite'] {
  return async (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!, { framework: 'vite' })
    return resolvePlugins(await plugins, 'vite')
  }
}
