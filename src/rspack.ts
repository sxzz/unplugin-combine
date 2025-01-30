import { getWebpackPlugin } from './webpack'
import type { Factory, UnpluginCombineInstance } from './types'

export function getRspackPlugin<UserOptions>(
  factory: Factory<UserOptions>,
): UnpluginCombineInstance<UserOptions>['rspack'] {
  return getWebpackPlugin(factory, 'rspack') as any
}
