import { type Compiler } from 'webpack'
import { type Factory, type UnpluginCombineInstance } from './types'
import { resolvePlugins } from '.'

export const getWebpackPlugin = <UserOptions>(
  factory: Factory<UserOptions>
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
