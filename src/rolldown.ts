import { resolvePlugins } from './index'
import type { Factory, UnpluginCombineInstance } from './types'

export const getRolldownPlugin = <UserOptions>(
  factory: Factory<UserOptions>,
): UnpluginCombineInstance<UserOptions>['rolldown'] => {
  return (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!, { framework: 'rolldown' })
    return resolvePlugins(plugins, 'rolldown')
  }
}
