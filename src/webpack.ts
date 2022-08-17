import { sortPlugin } from '.'
import type { Options, WebpackPlugin, WebpackPluginList } from '.'
import type { Compiler } from 'webpack'

export default ({ plugins }: Options<WebpackPlugin, WebpackPluginList>) => {
  return (compiler: Compiler) => {
    for (const { plugin } of sortPlugin(plugins)) {
      if (typeof plugin === 'object') {
        plugin.apply.bind(compiler, compiler)
      } else {
        plugin.call(compiler, compiler)
      }
    }
  }
}
