const mockType = process.env.MOCK_TYPE
const { pc } = require('../build/utils')
let proxy = {
  '/dev-api/proxy.p': {
    target: 'http://zhiboserver.kuwo.cn/',
    changeOrigin: true,
    pathRewrite: { '^/dev-api': '' }
  },
  '/dev-api': {
    target: 'http://jx.kuwo.cn/live/',
    changeOrigin: true,
    pathRewrite: { '^/dev-api': '' }
  }
}
const devServer = {
  compress: true,
  open: true,
  // hotOnly: true,
  hot: true,
  useLocalIp: true,
  host: '0.0.0.0',
  port: 3030,
  disableHostCheck: true,
  // historyApiFallback: true,
  contentBase: pc('dist'),
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  hotOnly: false,
  stats: {
    colors: true
  },
  proxy
}
if (mockType === 'server') {
  devServer.before = require('../mock/mock-server')
}

module.exports = {
  devServer
}
