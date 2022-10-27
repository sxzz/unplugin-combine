import { toArray } from '@antfu/utils'
import { getRollupPlugin } from './rollup'
import { getVitePlugin } from './vite'
import { getEsbuildPlugin } from './esbuild'
import { getWebpackPlugin } from './webpack'
import { getPluginList } from './plugins'
import type {
  EsbuildPlugin,
  Plugin,
  PluginMap,
  PluginType,
  RollupPlugin,
  VitePlugin,
  WebpackPlugin,
} from './types'

import type { UnpluginInstance } from 'unplugin'
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
    get plugins() {
      return getPluginList(factory)
    },
  }
}

export type Factory<UserOptions> = (userOptions: UserOptions) => CombineOptions
export type FactoryOutput<UserOptions, Return> = [never] extends UserOptions
  ? () => Return
  : undefined extends UserOptions
  ? (options?: UserOptions) => Return
  : (options: UserOptions) => Return

export type Unplugin<UserOptions> = [
  instance: UnpluginInstance<UserOptions, any> | UnpluginCombineInstance<any>,
  options: UserOptions
]
export type OptionsPlugin =
  | Plugin
  | Unplugin<any>
  | UnpluginCombineInstance<any>
export interface CombineOptions {
  name: string
  /** vite only */
  enforce?: 'post' | 'pre' | undefined
  plugins: OptionsPlugin[]
}

export interface UnpluginCombineInstance<UserOptions> {
  rollup: FactoryOutput<UserOptions, RollupPlugin>
  webpack: FactoryOutput<UserOptions, WebpackPlugin>
  vite: FactoryOutput<UserOptions, VitePlugin[]>
  esbuild: FactoryOutput<UserOptions, EsbuildPlugin>
  raw: Factory<UserOptions>
  plugins: FactoryOutput<UserOptions, OptionsPlugin[]>
}
