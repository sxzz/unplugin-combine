import { toArray } from '@antfu/utils'
import { getRollupPlugin } from './rollup'
import { getVitePlugin } from './vite'
import { getEsbuildPlugin } from './esbuild'
import { getWebpackPlugin } from './webpack'
import type {
  Factory,
  OptionsPlugin,
  PluginMap,
  PluginType,
  UnpluginCombineInstance,
} from './types'
export * from './types'

export function resolvePlugin<T extends PluginType>(
  plugin: OptionsPlugin,
  type: T
): Array<PluginMap[T]> {
  const result = Array.isArray(plugin)
    ? toArray(plugin[0][type](plugin[1]))
    : [plugin]

  return result.flatMap((plugin) => {
    if ('combinedPlugins' in plugin) {
      return plugin.combinedPlugins
    }
    return plugin
  })
}

export function resolvePlugins<T extends PluginType>(
  plugins: OptionsPlugin[],
  type: T
): Array<PluginMap[T]> {
  return plugins.flatMap((plugin) => resolvePlugin(plugin, type))
}

export const createCombinePlugin = <UserOptions>(
  factory: Factory<UserOptions>
): UnpluginCombineInstance<UserOptions> => {
  return {
    get rollup() {
      return getRollupPlugin(factory)
    },
    get vite() {
      return getVitePlugin(factory)
    },
    get esbuild() {
      return getEsbuildPlugin(factory)
    },
    get webpack() {
      return getWebpackPlugin(factory)
    },
    get raw() {
      return factory
    },
  }
}
