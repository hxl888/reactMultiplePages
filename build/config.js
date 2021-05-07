const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const { pc, generatePages } = require('./utils')
const { htmlWebpackPages } = generatePages()

// const isDev = process.env.NODE_ENV === 'development'

const CONFIG = {
  publicPathJs: 'https://s1j.kuwo.cn/apph5/huodong/',
  publicPathCss: 'https://xcss.kuwo.cn/apph5/huodong/',
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
      include: pc('src')
    },
    {
      test: /\.(ts)x?$/,
      exclude: /node_modules/,
      include: pc('src'),
      use: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      ]
    },
    {
      test: /\.(gif|jpg|jpeg|png|svg)$/,
      exclude: /node-modules/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 1024, // 小于1024的转base64格式
            name: '[name]-cyy.[ext]'
          }
        }
      ]
    }
  ],
  plugins: [
    new CleanWebpackPlugin(),
    ...htmlWebpackPages,
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [autoprefixer]
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}

module.exports = CONFIG
