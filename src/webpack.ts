import type { Factory, OptionsPlugin, UnpluginCombineInstance } from './types'
import { resolvePlugins } from '.'
import type { Compiler } from 'webpack'

export function getWebpackPlugin<UserOptions>(
  factory: Factory<UserOptions>,
  framework: 'webpack' | 'rspack' = 'webpack',
): UnpluginCombineInstance<UserOptions>['webpack'] {
  return (userOptions?: UserOptions) => {
    const { name, plugins } = factory(userOptions!, { framework })
    return (compiler: Compiler) => {
      if (plugins instanceof Promise) {
        compiler.hooks.beforeRun.tapPromise(name, async () => {
          executePlugins(compiler, framework, await plugins)
        })
      } else {
        executePlugins(compiler, framework, plugins)
      }
    }
  }
}

function executePlugins(
  compiler: Compiler,
  framework: any,
  plugins: Awaited<OptionsPlugin>,
) {
  for (const plugin of resolvePlugins(plugins, framework)) {
    if (typeof plugin === 'object') {
      plugin.apply.call(compiler, compiler)
    } else {
      plugin.call(compiler, compiler)
    }
  }
}
