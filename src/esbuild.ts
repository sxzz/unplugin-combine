import { sortPlugin } from '.'
import type { EsbuildPlugin, EsbuildPluginList, Options } from '.'

export default ({
  name,
  plugins,
}: Options<EsbuildPlugin, EsbuildPluginList>): EsbuildPlugin => {
  return {
    name,
    setup(build) {
      // TODO: supports with esbuild-plugin-transform

      for (const { plugin } of sortPlugin(plugins)) {
        plugin.setup(build)
      }
    },
  }
}
