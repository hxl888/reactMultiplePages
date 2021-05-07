import { callWebServer } from '../api-common'

// 默认挂件数据
export const pendantRank = (tid: any, uid: any) => {
  return callWebServer('/activity/love5202021/pendantRank', {
    channel: 'web',
    cache: 1,
    tid,
    uid,
  })
}

// hover挂件
export const pendantRankHover = (tid: any, uid: any) => {
  return callWebServer('/activity/love5202021/pendantRankHover', {
    channel: 'web',
    cache: 1,
    tid,
    uid
  })
}

// 兑换玫瑰接口
export const activityDraw = (uid: any, sid: any, rid: any) => {
  return callWebServer('/proxy.p', {
    cmd: 'activitydraw',
    channel: 'jsonp',
    uid,
    rid,
    sid,
    type: 0,
    times: 0,
    facet: 'love520202105'
  })
}
// 抢心动礼包
export const openfmpktasync = (uid: any, sid: any, rid: any, pid: any, pcnt: any) => {
  return callWebServer('/proxy.p', {
    cmd: 'openfmpktasync',
    channel: 'jsonp',
    uid,
    sid,
    rid,
    pid,
    pcnt,
    facet: 'love520202105'
  })
}

// 购买礼包接口
export const openactboxasync = (uid: any, sid: any, rid: any) => {
  return callWebServer('/proxy.p', {
    cmd: 'openactboxasync',
    channel: 'jsonp',
    uid,
    sid,
    rid,
    boxid: 0,
    boxtype: 0,
    facet: 'love520202105'
  })
}
