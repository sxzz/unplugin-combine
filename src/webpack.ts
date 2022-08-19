import { resolvePlugin } from '.'
import type { Factory, FactoryOutput, WebpackPlugin } from './types'
import type { Compiler } from 'webpack'

export const getWebpackPlugin = <UserOptions>(
  factory: Factory<UserOptions>
): FactoryOutput<UserOptions, WebpackPlugin> => {
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
