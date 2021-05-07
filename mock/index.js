const pendant = require('./pendant')
const activity = require('./activity')

const mocks = [
  ...pendant, // 挂件mock数据
  ...activity // 活动页mock数据
]

module.exports = {
  mocks
}
