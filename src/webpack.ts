import type { Factory, UnpluginCombineInstance } from './types'
import { resolvePlugins } from '.'
import type { Compiler } from 'webpack'

export const getWebpackPlugin = <UserOptions>(
  factory: Factory<UserOptions>,
): UnpluginCombineInstance<UserOptions>['webpack'] => {
  return (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!, { framework: 'webpack' })

    return (compiler: Compiler) => {
      for (const plugin of resolvePlugins(plugins, 'webpack')) {
        if (typeof plugin === 'object') {
          plugin.apply.call(compiler, compiler)
        } else {
          plugin.call(compiler, compiler)
        }
      }
    }
  }
}
