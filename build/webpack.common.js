const CONFIG = require('./config')

const isDev = process.env.NODE_DEV === 'development'
const { generatePages, pc } = require('./utils')
const { entry } = generatePages()

module.exports = {
  entry,
  output: {
    path: pc('dist'),
    filename: '[name]-[hash:8].js',
    chunkFilename: '[name]-[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.less', '.css'],
    alias: {
      '@': pc('src'),
      api: pc('src/api'),
      styles: pc('src/styles'),
      utils: pc('src/utils'),
      react: pc('node_modules/react'),
      'react-dom': pc('node_modules/react-dom')
    }
  },
  module: {
    rules: [...CONFIG.rules]
  },
  plugins: [...CONFIG.plugins],
  externals: {
    React: 'React',
    'React-dom': 'ReactDOM'
  }
}
