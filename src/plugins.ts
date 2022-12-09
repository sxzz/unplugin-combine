import type { Factory, UnpluginCombineInstance } from '.'

export const getPluginList = <UserOptions>(
  factory: Factory<UserOptions>
): UnpluginCombineInstance<UserOptions>['plugins'] => {
  return (userOptions?: UserOptions) => {
    const { plugins } = factory(userOptions!, {})
    return plugins
  }
}
