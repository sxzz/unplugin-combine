import type { Factory, UnpluginCombineInstance } from './types'
import { resolvePlugins } from '.'
import type { Compiler } from '@rspack/core'

export const getRspackPlugin = <UserOptions>(
  factory: Factory<UserOptions>,
): UnpluginCombineInstance<UserOptions>['rspack'] => {
  return (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!, { framework: 'rspack' })

    return (compiler: Compiler) => {
      for (const plugin of resolvePlugins(plugins, 'rspack')) {
        if (typeof plugin === 'object') {
          plugin.apply.call(compiler, compiler)
        } else {
          plugin.call(compiler, compiler)
        }
      }
    }
  }
}
