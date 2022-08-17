import Rollup from './rollup'

import type { Options, VitePlugin, VitePluginList } from '.'

export default ({
  enforce,
  ...options
}: Options<VitePlugin, VitePluginList>) => {
  return {
    ...Rollup(options as any),
    enforce,
  } as VitePlugin
}
