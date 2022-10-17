# unplugin-combine [![npm](https://img.shields.io/npm/v/unplugin-combine.svg)](https://npmjs.com/package/unplugin-combine)

[![Unit Test](https://github.com/sxzz/unplugin-combine/actions/workflows/unit-test.yml/badge.svg)](https://github.com/sxzz/unplugin-combine/actions/workflows/unit-test.yml)

Unified plugin that combines other plugins into one plugin.

Currently supports:

- [Vite](https://vitejs.dev/)
- [Rollup 3](https://rollupjs.org/)
  - For Rollup 2, please use 0.2.x version
- [Webpack](https://webpack.js.org/)
- [esbuild](https://esbuild.github.io/)

## Install

```bash
npm i unplugin-combine
```

## Usage

Similar to [unplugin](https://github.com/unjs/unplugin).

```ts
import { createCombinePlugin } from 'unplugin-combine'
import type { OptionsPlugin } from 'unplugin-combine'

export const unplugin = createCombinePlugin((userOptions: UserOptions = {}) => {
  const plugins: OptionsPlugin[] = [plugin1, plugin2, plugin3]

  return {
    name: 'unplugin-combine-xxxx',
    plugins,
  }
})

export const vitePlugin = unplugin.vite
export const rollupPlugin = unplugin.rollup
export const webpackPlugin = unplugin.webpack
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

[MIT](./LICENSE) License © 2022 [三咲智子](https://github.com/sxzz)
