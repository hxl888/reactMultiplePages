const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { devServer } = require('../webpack/proxy')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer,
  module: {
    rules: [
      {
        test: /\.css|.less$/, // 正则匹配文件路径
        exclude: /node_modules/,
        use: [
          'style-loader',
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
  }
})
