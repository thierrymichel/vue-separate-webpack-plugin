# vue-separate-webpack-plugin

> Are you a Vue.js fan?<br>
> Do you believe in separation of concerns **AND files**?<br>
> Do you use webpack?<br>
> …<br>
> You probably need this plugin… 😎

![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg?style=flat-square)
[![npm version](https://img.shields.io/npm/v/vue-separate-webpack-plugin.svg?style=flat-square)](https://www.npmjs.org/package/vue-separate-webpack-plugin)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/thierrymichel/vue-separate-webpack-plugin/blob/master/LICENSE)
[![CircleCI](https://img.shields.io/circleci/project/github/thierrymichel/vue-separate-webpack-plugin/master.svg?style=flat-square)](https://circleci.com/gh/thierrymichel/vue-separate-webpack-plugin/tree/master)
[![Coverage Status](https://img.shields.io/coveralls/github/thierrymichel/vue-separate-webpack-plugin/master.svg?style=flat-square)](https://coveralls.io/github/thierrymichel/vue-separate-webpack-plugin?branch=master)

## Description

**vue-separate-webpack-plugin** is a webpack resolver plugin that allows you to write **Vue.js** components into separate files while using **vue-loader**, **HRM** and without creating any physical or temporary `.vue` file.

## Install

```sh
npm i -D vue-separate-webpack-plugin
```

or

```sh
yarn add -D vue-separate-webpack-plugin
```

## Getting started

```js
// webpack.config.js

const { VueSeparatePlugin } = require('vue-separate-webpack-plugin')

module.exports = {
  resolve: {
    plugins: [new VueSeparatePlugin()]
  }
}
```

### With @vue/cli

```js
// vue.config.js

const { VueSeparatePlugin } = require('./dev/plugin')

module.exports = {
  chainWebpack: config => {
    // prettier-ignore
    config
      .resolve
      .plugin('vue-separate-webpack-plugin')
      .use(VueSeparatePlugin)
  }
}
```

### Option

Passed as regular `Object`.

| Property | Type     | Default | Description                                       |
| -------- | -------- | ------- | ------------------------------------------------- |
| root     | `string` | `'src'` | Root/src folder where your components are located |

## How it works

Simply create your separated files side by side:

- `Component.vue.html` (`pug|jade`)
- `Component.vue.css` (`scss|sass|less|styl|stylus`)
- `Component.vue.js` (`ts|coffee`)

Then, import your component:

```js
import Component from 'Component.vue'
```

That's it!

### [Scoped CSS](https://vue-loader.vuejs.org/guide/scoped-css.html#scoped-css)

`Component.vue.scoped.css` (`scss|sass|less|styl|stylus`)

> Works alongside with `Component.vue.css`

### [Functional components](https://vue-loader.vuejs.org/guide/functional.html#functional-components)

`Component.vue.functional.html` (`pug|jade`)

### [Custom blocks](https://vue-loader.vuejs.org/guide/custom-blocks.html#custom-blocks)

`Component.vue.custom`

---

## Inspiration

Inspired by [vuemaker-webpack-plugin](https://github.com/thierrymichel/vuemaker-webpack-plugin) and [vue-separate-files-webpack-loader](https://www.npmjs.com/package/vue-separate-files-webpack-loader)
Thanks to [webpack-virtual-modules](https://github.com/sysgears/webpack-virtual-modules)

## How to contribute

If you want to report a bug or if you just want to request for a new feature/improvement, please **follow [those instructions](CONTRIBUTING.md) before**.

Thanks for taking time to contribute to `vue-separate-webpack-plugin` :+1:
