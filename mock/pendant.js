const Mock = require('mockjs')

const defalutPendant = Mock.mock({
  status: 1,
  statusdesc: '成功',
  data: {
    rank: 0,
    cnt: 0,
    day: 1,
    ulist: [
      {
        tid: 1,
        tnickName: '阿里积分',
        tcnt: 9,
        roomId: 12
      },
      {
        tid: 1,
        tnickName: '阿里积分2',
        tcnt: 9,
        roomId: 14
      },
      {
        tid: 1,
        tnickName: '阿里积分3',
        tcnt: 9,
        roomId: 13
      }
    ]
  }
})
const hoverPendantRank = Mock.mock({
  status: 1,
  statusdesc: '成功',
  data: {
    prank: 3,
    pcnt: 30,
    pdiff: 50,
    trank: 5,
    tcnt: 9,
    tdiff: 15,
    type: 3,
    perReward: 5,
    pk1: {
      fmid: 9,
      cnt: 8,
      pic: '',
      familyReward: 8
    },
    pk2: {
      fmid: 9,
      cnt: 80,
      pic: '',
      familyReward: 8
    },
    user: {
      uid: 9,
      nickName: 8,
      pic: '',
      cnt: 8,
      badgeid: 38,
      richLevel: 38
    }
  }
})

// const payRewardRecord = Mock.mock({
//   status: 1,
//   statusdesc: '成功',
//   data: [
//     {
//       fid: 9,
//       coins: 9,
//       rewardCoins: 90,
//       tm: 1600844292
//     }
//   ]
// })
// const lotteryData = Mock.mock({
//   status: 1,
//   gid: 2,
//   cnt: 2,
//   statusdesc: '成功'
// })

module.exports = [
  {
    url: '/activity/soulholiday202010/pendantRank',
    type: 'get',
    response: config => {
      const { tid } = config.query // get
      console.log('tid: ', tid)
      if (tid) {
        return defalutPendant
      } else {
        return { status: 5, statusdesc: '参数错误', data: '' }
      }
    }
  },
  {
    url: '/activity/familyLeague202010/hoverPendantRank',
    type: 'get',
    response: config => {
      const { tid, fmid } = config.query // get
      if (tid && fmid) {
        return hoverPendantRank
      } else {
        return { status: 5, statusdesc: '参数错误', data: '' }
      }
    }
  }
  // {
  //   url: '/proxy.p',
  //   type: 'get',
  //   response: config => {
  //     const { uid, rid, sid, boxid, cmd } = config.query // get
  //     console.log('cmd: ', config.query)
  //     if (uid && rid && sid && boxid && cmd) {
  //       if (cmd === 'openactboxasync') {
  //         // 抽奖
  //         return lotteryData
  //       }
  //     } else {
  //       return { status: 5, statusdesc: '参数错误', data: '' }
  //     }
  //   }
  // }
]
