import { resolvePlugins } from '.'
import type {
  Factory,
  RollupPlugin,
  RollupPluginList,
  UnpluginCombineInstance,
  VitePlugin,
} from './types'

export function addPlugin(
  name: string,
  pluginList: RollupPluginList,
  plugins: RollupPlugin[]
) {
  const index = pluginList.findIndex((plugin) => plugin && plugin.name === name)
  pluginList.splice(index + 1, 0, ...plugins)
}

export const getRollupPlugin = <UserOptions>(
  factory: Factory<UserOptions>,
  vite = false
): UnpluginCombineInstance<UserOptions>['rollup'] => {
  return (userOptions?: UserOptions) => {
    const { name, enforce, plugins } = factory(userOptions!)

    const resolvedPlugins = resolvePlugins(plugins, 'rollup')

    const plugin: RollupPlugin = {
      name,
      options(options) {
        options.plugins ||= []
        addPlugin(name, options.plugins, resolvedPlugins)
      },
      combinedPlugins: resolvedPlugins,
    }

    if (vite) {
      ;(plugin as VitePlugin).enforce = enforce
    }

    return plugin
  }
}
