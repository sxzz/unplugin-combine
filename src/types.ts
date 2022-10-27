import type { Configuration } from 'webpack'
import type { InputOptions, Plugin as _RollupPlugin } from 'rollup'
import type { Plugin as VitePlugin } from 'vite'
import type { Plugin as EsbuildPlugin } from 'esbuild'

export type RollupPluginList = NonNullable<InputOptions['plugins']>
export type RollupPlugin = _RollupPlugin & { combinedPlugins: RollupPlugin[] }
export type { VitePlugin }
export type { EsbuildPlugin }
export type WebpackPlugin = NonNullable<Configuration['plugins']> extends Array<
  infer T
>
  ? T
  : never

export interface PluginMap {
  rollup: RollupPlugin
  vite: VitePlugin
  esbuild: EsbuildPlugin
  webpack: WebpackPlugin
}
export type PluginType = keyof PluginMap
export type Plugin = PluginMap[PluginType]
