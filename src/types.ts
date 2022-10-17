import type { UnpluginInstance } from 'unplugin'
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

export type Factory<UserOptions> = (userOptions: UserOptions) => CombineOptions
export type FactoryOutput<UserOptions, Return> = [never] extends UserOptions
  ? () => Return
  : undefined extends UserOptions
  ? (options?: UserOptions) => Return
  : (options: UserOptions) => Return

export type Unplugin<UserOptions> = [
  instance: UnpluginInstance<UserOptions> | UnpluginCombineInstance<any>,
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
}
