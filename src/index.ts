import { toArray } from '@antfu/utils'
import { getRollupPlugin } from './rollup'
import { getVitePlugin } from './vite'
import { getEsbuildPlugin } from './esbuild'
import { getWebpackPlugin } from './webpack'
import type {
  Factory,
  OptionsPlugin,
  Plugin,
  PluginMap,
  PluginType,
  Unplugin,
  UnpluginCombineInstance,
} from './types'
export * from './types'

function flatPlugins(plugins: OptionsPlugin): (Plugin | Unplugin<any>)[] {
  return toArray(plugins as any).flat(Number.POSITIVE_INFINITY)
}

export function resolvePlugins<T extends PluginType>(
  plugins: OptionsPlugin,
  type: T
): Array<PluginMap[T]> {
  return flatPlugins(plugins)
    .filter(Boolean)
    .map((plugin) => {
      if ('instance' in plugin) {
        const { instance, options } = plugin as Unplugin<any>
        return instance[type](options)
      }
      return plugin as any
    })
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
