import { resolvePlugin } from '.'
import type { Factory, UnpluginCombineInstance } from './types'
import type { Compiler } from 'webpack'

export const getWebpackPlugin = <UserOptions>(
  factory: Factory<UserOptions>
): UnpluginCombineInstance<UserOptions>['webpack'] => {
  return (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!)

    return (compiler: Compiler) => {
      for (const plugin of plugins) {
        const webpackPlugin = resolvePlugin(plugin, 'webpack')
        if (typeof webpackPlugin === 'object') {
          webpackPlugin.apply.bind(compiler, compiler)
        } else {
          webpackPlugin.call(compiler, compiler)
        }
      }
    }
  }
}
