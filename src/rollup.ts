import { resolvePlugin } from '.'
import type {
  CombineOptions,
  Factory,
  RollupPlugin,
  RollupPluginList,
  UnpluginCombineInstance,
  VitePlugin,
} from './types'

export function addPlugin(
  name: string,
  pluginList: RollupPluginList,
  plugins: CombineOptions['plugins']
) {
  const resolvedPlugins = plugins.map((plugin) =>
    resolvePlugin(plugin, 'rollup')
  )

  const index = pluginList.findIndex((plugin) => plugin && plugin.name === name)
  pluginList.splice(index + 1, 0, ...resolvedPlugins)
}

export const getRollupPlugin = <UserOptions>(
  factory: Factory<UserOptions>,
  vite = false
): UnpluginCombineInstance<UserOptions>['rollup'] => {
  return (userOptions?: UserOptions) => {
    const { name, enforce, plugins } = factory(userOptions!)

    const plugin: RollupPlugin = {
      name,
      options(options) {
        options.plugins ||= []
        addPlugin(name, options.plugins, plugins)
      },
    }

    if (vite) {
      ;(plugin as VitePlugin).enforce = enforce
    }

    return plugin
  }
}
