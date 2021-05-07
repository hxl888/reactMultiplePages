const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// __dirname 是文件所在目录 ./webpack
const pd = v => path.resolve(__dirname, v)
// process.cwd 是命令执行目录 ./
const pc = v => path.resolve(process.cwd(), v)

const isDev = process.env.NODE_ENV === 'development'

const getArgv = () => {
  return require('yargs')
    .options({
      list: {
        alias: 'l',
        describe: '打包项目名列表'
      },
      excludeList: {
        alias: 'e',
        describe: '不打包项目名列表'
      }
    })
    .example('yarn build -l 文件名 -l 文件名')
    .example('yarn build -e 文件名 -e 文件名')
    .array('list')
    .array('excludeList')
    .alias('h', 'help').argv
}

const generatePagePlugin = (path, pageName) => {
  return new HtmlWebpackPlugin({
    // 模板来源
    template: pc(`src/views/${path}/index.html`),
    // 在 dist/pageName.html 的输出
    filename: `${isDev ? '' : 'html/'}${pageName}.html`,
    // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    title: pageName,
    inlineSource: '.css$',
    inject: true,
    minify: {
      html5: true,
      collapseWhitespace: true,
      preserveLineBreaks: false,
      minifyCSS: true,
      minifyJS: true,
      removeComments: false
    },
    // 提取出来的通用 chunk 和 vendor chunk。
    chunks: ['chunk-vendors', 'chunk-common', pageName]
  })
}

const argv = getArgv()
const list = argv.list
const excludeList = argv.excludeList

const generatePages = () => {
  const entry = {
    // react: ['react']
  }
  const htmlWebpackPages = []
  const entryFiles = glob.sync('./src/views/**/index.view.tsx')
  entryFiles.forEach(item => {
    const match = item.match(/src\/views\/(.*)\/index\.view\.ts/)
    const path = match && match[1]
    const pathArr = path.split('/')
    const pageName = pathArr.pop()

    if (list && list.length) {
      if (list.includes(pageName)) {
        entry[pageName] = item
        htmlWebpackPages.push(generatePagePlugin(path, pageName))
      }
    } else {
      if (excludeList && excludeList.length) {
        // 不需进行操作的文件
        if (!excludeList.includes(pageName)) {
          entry[pageName] = item
          htmlWebpackPages.push(generatePagePlugin(path, pageName))
        } else {
          entry[pageName] = item
          htmlWebpackPages.push(generatePagePlugin(path, pageName))
        }
      } else {
        entry[pageName] = item
        htmlWebpackPages.push(generatePagePlugin(path, pageName))
      }
    }
  })
  return { entry, htmlWebpackPages }
}

module.exports = {
  pd,
  pc,
  getArgv,
  generatePages
}
