import type { Configuration } from 'webpack'
import type { InputOptions, Plugin as RollupPlugin } from 'rollup'
import type { Plugin as VitePlugin } from 'vite'
import type { Plugin as EsbuildPlugin } from 'esbuild'

export function addPlugin<Plugin, PluginList extends Array<any>>(
  pluginList: PluginList,
  plugins: Plugins<Plugin, PluginList>
) {
  let preCount = 0
  for (const { order, plugin } of plugins) {
    let index = typeof order === 'function' ? order(pluginList as any) : order

    if (index === 'post') {
      pluginList.push(plugin)
    } else if (index === 'pre') {
      index = preCount
      preCount++
    }

    if (typeof index === 'number') {
      pluginList.splice(index, 0, plugin)
    }
  }
}

export function sortPlugin<T extends Plugins<any, any>>(plugins: T): T {
  return plugins.sort(({ order: a }, { order: b }) => {
    if (a === b) return 0
    else if (a === 'pre') return -1
    else return 1
  })
}

export type { RollupPlugin }
export type RollupPluginList = InputOptions['plugins']

export type { VitePlugin }
export type VitePluginList = RollupPluginList

export type { EsbuildPlugin }
export type EsbuildPluginList = EsbuildPlugin[]

export type WebpackPluginList = NonNullable<Configuration['plugins']>
export type WebpackPlugin = WebpackPluginList extends Array<infer T> ? T : never

export type Plugins<Plugin, PluginList> = {
  plugin: Plugin
  order: ((plugins: PluginList) => number | 'pre' | 'post') | 'pre' | 'post'
}[]

export interface Options<Plugin, PluginList> {
  name: string
  /** vite only */
  enforce?: 'post' | 'pre' | undefined
  plugins: Plugins<Plugin, PluginList>
}
