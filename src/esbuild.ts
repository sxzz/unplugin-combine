import {
  type EsbuildPlugin,
  type Factory,
  type UnpluginCombineInstance,
} from './types'
import { resolvePlugins } from '.'

export const getEsbuildPlugin = <UserOptions>(
  factory: Factory<UserOptions>
): UnpluginCombineInstance<UserOptions>['esbuild'] => {
  return (userOptions?: UserOptions): EsbuildPlugin => {
    const { name, plugins } = factory(userOptions!, { framework: 'esbuild' })
    return {
      name,
      setup(build) {
        // TODO: supports with esbuild-plugin-transform

        for (const plugin of resolvePlugins(plugins, 'esbuild')) {
          plugin.setup(build)
        }
      },
    }
  }
}
