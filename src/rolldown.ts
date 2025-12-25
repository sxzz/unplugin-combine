import { resolvePlugins } from './index'
import type { Factory, UnpluginCombineInstance } from './types'

export function getRolldownPlugin<UserOptions>(
  factory: Factory<UserOptions>,
): UnpluginCombineInstance<UserOptions>['rolldown'] {
  return async (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!, { framework: 'rolldown' })
    return resolvePlugins(await plugins, 'rolldown')
  }
}
