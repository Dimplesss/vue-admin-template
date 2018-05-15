const webpack = require('webpack');
const path = require('path');
const vueLoaderConfig = require('./vue-loader.conf')
const utils = require('./utils')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const vendor = [
    // 'vue/dist/vue.runtime.esm.js', // 由于 vue 在生产环境中使用的是 cdn 引入，所以也无需提前打包进 dll
    // 'raven-js', // 前端监控，若无此需求，可以忽略。
    'vue-router',
    'es6-promise',
    'js-cookie',
    'axios',
    'vuex',
];

const webpackConfig = {
    context: __dirname,
    output: {
        path: path.join(__dirname, '../static/js/'),
        filename: '[name].dll.js',
        library: '[name]_[hash]',
    },
    entry: {
        vendor
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            path: path.join(__dirname, '.', '[name]-manifest.json'),
            name: '[name]_[hash]',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            },
            sourceMap: true,
            // parallel: true
        })
    ],
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
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
    }
};

module.exports = webpackConfig
