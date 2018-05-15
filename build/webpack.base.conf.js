'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

const externals = {
  // 'element-ui':'ELEMENT'
}
// 生产环境中使用生产环境的 vue
// 开发环境继续使用本地 node_modules 中的 vue
if (process.env.NODE_ENV === 'production') {
  externals['vue'] = 'Vue'
  externals['element-ui'] = 'ELEMENT'
}
// 生产环境默认注入 vue 
// 开发环境中不注入
const defaultJS = process.env.NODE_ENV === 'production' ? [{ path: 'https://cdn.bootcss.com/vue/2.4.2/vue.min.js', type: 'js' }] : []
console.log(process.env.NODE_ENV, defaultJS)
const plugins = [
  new HtmlWebpackIncludeAssetsPlugin({
      assets: defaultJS.concat([
        { path: 'https://cdn.bootcss.com/element-ui/2.3.2/index.js', type: 'js' },
        { path: 'https://cdn.bootcss.com/element-ui/2.3.2/locale/zh-CN.min.js', type: 'js' },
        // { path: './static/js/vendor.dll.js', type: 'js'}
      ]),
      // 是否在 webpack 注入的 js 文件后新增？true 为 append, false 为 prepend。
      // 生产环境中，这些 js 应该先加载。
      append: process.env.NODE_ENV !== 'production',
      publicPath: '',
    })
]
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  externals,
  plugins,
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test') ,resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
