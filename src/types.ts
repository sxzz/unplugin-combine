import type { UnpluginInstance } from 'unplugin'
import type { Configuration } from 'webpack'
import type { Plugin as RollupPlugin } from 'rollup'
import type { Plugin as VitePlugin } from 'vite'
import type { Plugin as EsbuildPlugin } from 'esbuild'

export type { RollupPlugin, VitePlugin, EsbuildPlugin }
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
  instance: UnpluginInstance<UserOptions>,
  options: UserOptions
]
export type OptionsPlugin = Plugin | Unplugin<any>
export interface CombineOptions {
  name: string
  /** vite only */
  enforce?: 'post' | 'pre' | undefined
  plugins: OptionsPlugin[]
}

export interface UnpluginCombineInstance<UserOptions> {
  rollup: FactoryOutput<UserOptions, RollupPlugin[]>
  webpack: FactoryOutput<UserOptions, WebpackPlugin>
  vite: FactoryOutput<UserOptions, VitePlugin[]>
  esbuild: FactoryOutput<UserOptions, EsbuildPlugin>
  raw: Factory<UserOptions>
}
