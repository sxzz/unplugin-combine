import type { EsbuildPlugin, Factory, UnpluginCombineInstance } from './types'
import { resolvePlugins } from '.'

export const getEsbuildPlugin = <UserOptions>(
  factory: Factory<UserOptions>,
): UnpluginCombineInstance<UserOptions>['esbuild'] => {
  return (userOptions?: UserOptions): EsbuildPlugin => {
    const { name, plugins } = factory(userOptions!, { framework: 'esbuild' })
    return {
      name,
      async setup(build) {
        for (const plugin of resolvePlugins(await plugins, 'esbuild')) {
          plugin.setup(build)
        }
      },
    }
  }
}
