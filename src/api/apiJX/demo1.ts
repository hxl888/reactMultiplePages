import { callWebServer } from '../api-common'

// 默认挂件数据
export const pendantRank = (tid: any) => {
  return callWebServer('/activity/soulholiday202010/pendantRank', {
    channel: 'web',
    cache: 1,
    tid
  })
}

// 主播十道题
export const getQueSionList = (tid: any) => {
  return callWebServer('/activity/teachersDay202008/questionList', {
    channel: 'web',
    cache: 1,
    tid
  })
}

// // 2. 提交答案
// export const subMitAnswer = (uid: any, rid: any, sid: any, stageid: any, answer: any) => {
//   return callWebServer('/proxy.p', {
//     cmd: 'activitysubmitanswer',
//     channel: 'jsonp',
//     uid,
//     rid,
//     sid,
//     stageid,
//     answer
//   })
// }
