import type { UnpluginInstance } from 'unplugin'
import type {
  Compiler as WebpackCompiler,
  WebpackPluginInstance,
} from 'webpack'
import type { RspackPluginFunction, RspackPluginInstance } from '@rspack/core'
import type { Plugin as RollupPlugin } from 'rollup'
import type { Plugin as RolldownPlugin } from 'rolldown'
import type { Plugin as VitePlugin } from 'vite'
import type { Plugin as EsbuildPlugin } from 'esbuild'

export type { RollupPlugin, VitePlugin, EsbuildPlugin }

export type WebpackPlugin =
  | ((this: WebpackCompiler, compiler: WebpackCompiler) => void)
  | WebpackPluginInstance

export type RspackPlugin = RspackPluginInstance | RspackPluginFunction

export interface PluginMap {
  rollup: RollupPlugin
  rolldown: RolldownPlugin
  vite: VitePlugin
  esbuild: EsbuildPlugin
  webpack: WebpackPlugin
  rspack: RspackPlugin
}
export type PluginType = keyof PluginMap
export type Plugin = PluginMap[PluginType]
export type RemoveFalsy<T> = Exclude<T, false | '' | 0 | null | undefined>

export type Factory<UserOptions> = (
  userOptions: UserOptions,
  meta: { framework?: PluginType },
) => CombineOptions
export type FactoryOutput<UserOptions, Return> = [never] extends UserOptions
  ? () => Return
  : undefined extends UserOptions
    ? (options?: UserOptions) => Return
    : (options: UserOptions) => Return

export type Unplugin<UserOptions> = {
  instance:
    | UnpluginInstance<UserOptions, boolean>
    | UnpluginCombineInstance<any>
  options?: UserOptions
}
export type OptionsPlugin = Plugin | Unplugin<any> | OptionsPlugin[]
export interface CombineOptions {
  name: string
  /** vite only */
  enforce?: 'post' | 'pre' | undefined
  plugins: OptionsPlugin
}

export interface UnpluginCombineInstance<UserOptions> {
  rollup: FactoryOutput<UserOptions, RollupPlugin[]>
  rolldown: FactoryOutput<UserOptions, RolldownPlugin[]>
  webpack: FactoryOutput<UserOptions, WebpackPlugin>
  rspack: FactoryOutput<UserOptions, RspackPlugin>
  vite: FactoryOutput<UserOptions, VitePlugin[]>
  esbuild: FactoryOutput<UserOptions, EsbuildPlugin>
  raw: Factory<UserOptions>
  plugins: FactoryOutput<UserOptions, OptionsPlugin>
}
