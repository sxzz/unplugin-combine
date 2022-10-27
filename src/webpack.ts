import { resolvePlugins } from '.'
import type { Factory, UnpluginCombineInstance } from '.'
import type { Compiler } from 'webpack'

export const getWebpackPlugin = <UserOptions>(
  factory: Factory<UserOptions>
): UnpluginCombineInstance<UserOptions>['webpack'] => {
  return (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!)

    return (compiler: Compiler) => {
      for (const plugin of resolvePlugins(plugins, 'webpack')) {
        if (typeof plugin === 'object') {
          plugin.apply.bind(compiler, compiler)
        } else {
          plugin.call(compiler, compiler)
        }
      }
    }
  }
}
