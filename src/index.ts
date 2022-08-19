import { getRollupPlugin } from './rollup'
import { getVitePlugin } from './vite'
import { getEsbuildPlugin } from './esbuild'
import { getWebpackPlugin } from './webpack'
import type { Factory, Plugin, PluginMap, PluginType, Unplugin } from './types'

export * from './types'

export function resolvePlugin<T extends PluginType>(
  plugin: Plugin | Unplugin<any>,
  type: T
): PluginMap[T] {
  if (Array.isArray(plugin)) {
    return plugin[0][type](plugin[1]) as any
  } else {
    return plugin as any
  }
}

export const createCombinePlugin = <UserOptions>(
  factory: Factory<UserOptions>
) => {
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
  }
}
