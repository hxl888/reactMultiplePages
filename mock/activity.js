// 后台组接口这种形式 都是无路径 依靠 cmd 参数判断
// 本地 Request URL: http://localhost:2333/dev-api/mbgw.p?uid=1&sid=1&rid=2&cmd=entermotorsbetroom&src=web
// 线上 Request URL: https://qy.kuwo.cn/mbgw.p?uid=1&sid=1&rid=2&cmd=entermotorsbetroom&src=web

module.exports = [
  {
    url: '/mbgw.p',
    type: 'get',
    response: config => {
      const { cmd, uid, sid, rid } = config.query
      switch (cmd) {
        case 'entermotorsbetroom':
          if (cmd && uid && sid && rid) {
            return {
            }
          }
          return {
            // cmd: 'entermotorsbetroom',
            status: 25,
            statusdesc: '%E8%B4%A6%E5%8F%B7%E8%A2%AB%E5%B0%81%E5%81%9C',
            systm: 1592557707
          }
        default:
          break
      }
    }
  }
]
