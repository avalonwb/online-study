const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')

module.exports = withCSS(withLess({
  // 开启Less模块化，但是同时也会开启css的模块化，这样会使得antd的样式加载不成功
  cssModules: true,
}))