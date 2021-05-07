const { merge } = require('webpack-merge')
// const webpack = require('webpack')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const HtmlWebpackChangePathPlugin = require('html-webpack-change-path-plugin')
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const DllPlugin = require('webpack/lib/DllPlugin')
const CONFIG = require('./config')
const common = require('./webpack.common.js')
const { pc } = require('./utils')
const glob = require('glob')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css|.less$/, // 正则匹配文件路径
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env', {}]]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            drop_debugger: false
            // 暂时去掉log
            // drop_console: true,
            // pure_funcs: ['console.log'] // 移除console
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          // test: /[\\/]node_modules[\\/]/,
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all'
        },
        commons: {
          name: 'chunk-common',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackChangePathPlugin({
      configCSS: {
        publicPath: CONFIG.publicPathCss
      },
      configJS: {
        publicPath: CONFIG.publicPathJs
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:8].css',
      chunkFilename: 'chunk-common-[hash:8].css'
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${pc('src')}/**/*`, { nodir: true }),
      whitelistPatterns: () => {
        return [/^body/]
      }
    }),
    new HtmlWebpackTagsPlugin({
      scripts: [
        {
          path: 'https://polyfill.io/v3/polyfill.min.js',
          // path: 'https://polyfill.alicdn.com/polyfill.min.js',
          publicPath: false
        }
      ],
      publicPath: false
    })
    // new webpack.DefinePlugin()
  ]
})
