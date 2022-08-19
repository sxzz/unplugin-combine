import { resolvePlugin } from '.'
import type { EsbuildPlugin, Factory, FactoryOutput } from './types'

export const getEsbuildPlugin = <UserOptions>(
  factory: Factory<UserOptions>
): FactoryOutput<UserOptions, EsbuildPlugin> => {
  return (userOptions?: UserOptions): EsbuildPlugin => {
    const { name, plugins } = factory(userOptions!)
    return {
      name,
      setup(build) {
        // TODO: supports with esbuild-plugin-transform

        for (const plugin of plugins) {
          resolvePlugin(plugin, 'esbuild').setup(build)
        }
      },
    }
  }
}
