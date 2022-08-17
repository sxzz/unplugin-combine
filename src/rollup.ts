import { addPlugin } from '.'
import type { Options, RollupPlugin, RollupPluginList } from '.'

export default ({
  name,
  plugins,
}: Options<RollupPlugin, RollupPluginList>): RollupPlugin => {
  return {
    name,
    options(options) {
      options.plugins ||= []
      addPlugin(options.plugins, plugins)
    },
  }
}
