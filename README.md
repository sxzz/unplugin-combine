# unplugin-combine

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Unit Test][unit-test-src]][unit-test-href]

Unified plugin that combines other plugins into one plugin.

Currently supports:

- [Vite](https://vitejs.dev/)
- [Rollup](https://rollupjs.org/)
- [Rolldown](https://rolldown.rs/)
- [Webpack](https://webpack.js.org/)
- [Rspack](https://rspack.dev/)
- [esbuild](https://esbuild.github.io/)

## Install

```bash
npm i unplugin-combine
```

## Usage

Similar to [unplugin](https://github.com/unjs/unplugin).

```ts
import { createCombinePlugin, type OptionsPlugin } from 'unplugin-combine'

export const unplugin = createCombinePlugin((userOptions: UserOptions = {}) => {
  const plugins: OptionsPlugin[] = [plugin1, plugin2, plugin3]

  return {
    name: 'unplugin-combine-xxxx',
    plugins,
  }
})

export const vitePlugin = unplugin.vite
export const rollupPlugin = unplugin.rollup
export const rolldownPlugin = unplugin.rolldown
export const webpackPlugin = unplugin.webpack
export const rspackPlugin = unplugin.rspack
export const esbuildPlugin = unplugin.esbuild
```

### Plugin Installation

###### Vite

```ts
// vite.config.ts
import UnpluginFeature from './unplugin-feature'
export default {
  plugins: [
    UnpluginFeature.vite({
      /* options */
    }),
  ],
}
```

###### Rollup

```ts
// rollup.config.js
import UnpluginFeature from './unplugin-feature'
export default {
  plugins: [
    UnpluginFeature.rollup({
      /* options */
    }),
  ],
}
```

###### Webpack

```ts
// webpack.config.js
module.exports = {
  plugins: [
    require('./unplugin-feature').webpack({
      /* options */
    }),
  ],
}
```

###### Rspack

```ts
// rspack.config.js
module.exports = {
  plugins: [
    require('./unplugin-feature').rspack({
      /* options */
    }),
  ],
}
```

###### esbuild

```ts
// esbuild.config.js
import { build } from 'esbuild'
build({
  plugins: [
    require('./unplugin-feature').esbuild({
      /* options */
    }),
  ],
})
```

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2022-PRESENT [Kevin Deng](https://github.com/sxzz)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/unplugin-combine.svg
[npm-version-href]: https://npmjs.com/package/unplugin-combine
[npm-downloads-src]: https://img.shields.io/npm/dm/unplugin-combine
[npm-downloads-href]: https://www.npmcharts.com/compare/unplugin-combine?interval=30
[unit-test-src]: https://github.com/sxzz/unplugin-combine/actions/workflows/unit-test.yml/badge.svg
[unit-test-href]: https://github.com/sxzz/unplugin-combine/actions/workflows/unit-test.yml
