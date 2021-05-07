/**
 * 此js 是为了初始化进房的时候 从app中获取到了所有的用户、主播、房间相关信息
 * 挂件 里面用到 rid 、uid 等字段得时候 需要在 initApiFn 函数成功回调之后走页面相关逻辑
 */

import EventEmitter from '@/service/event-bus'
// import jsonp from '@/service/jsonp'
import { callWebServer } from '@/api/api-common'
import store from '@/store'
import { setIsLogin, setMyInfoObj, setUserInfoObj, setIsAnchor, setSystemTime, setSystemTimeUpdate, setEnterInfo } from '@/store/common/action'
import jxServiceMock from '@/service/jx-service-mock' // 在浏览器mock app数据使用
import appBridge from './appToh5JX/index' // app to h5 方法集

// 进房(需要调取)
appBridge.getRoomInfo()
appBridge.getUserInfo()

// let myInfoObj = { user: { id: 0 } }; let enterInfo = { user: { id: 0, singerstatus: 0 } }; let stateNum = 0
let myInfoObj: any
let enterInfo: any

const anchorInfo = {
  rid: 0,
  tid: 0
}
const userInfo = {
  uid: 0,
  sid: 0,
  secrectname: '',
  logintype: 0
}

// 本地开发mock 手机端进房数据
if (!window.KuwoInterface && !window.jscObj) {
  jxServiceMock()
}

const enterInfoNotice = new Promise(resolve => {
  EventEmitter.addListener('enterInfoNotice', (data: any) => {
    enterInfo = data
    anchorInfo.rid = data?.room?.id // 房间id
    anchorInfo.tid = data?.room?.ownerid // 房间主播id
    store.dispatch(setEnterInfo(data))
    resolve(null)
  })
})
const getMyInfoNotice = new Promise(resolve => {
  EventEmitter.addListener('getMyInfoNotice', (data: any) => {
    userInfo.uid = data.uid // 房间主播id
    userInfo.sid = data.sid // 房间主播id
    userInfo.secrectname = data.secrectname // 房间主播id
    userInfo.logintype = data.logintype // 房间主播id
    store.dispatch(setUserInfoObj(data))
    const isLogin = data.uid || 0
    store.dispatch(setIsLogin(isLogin))
    resolve(null)
  })
})
const getUserInfoNotice = new Promise(resolve => {
  EventEmitter.addListener('getUserInfoNotice', (data: any) => {
    myInfoObj = data
    store.dispatch(setMyInfoObj(data))
    resolve(null)
  })
})

const isAnchorFn = () => {
  // 判断是主播还是用户
  let isAnchor = 0
  if (
    myInfoObj && myInfoObj.user && myInfoObj.user.id === enterInfo.user.id &&
    enterInfo.user.singerstatus === 2
  ) {
    // 是当前房间主播
    isAnchor = 1
  } else {
    // 不是当前房间主播
    isAnchor = 0
  }
  store.dispatch(setIsAnchor(isAnchor))
}

const apiFn = async () => {
  const rid = anchorInfo.rid || 2012
  const uid = userInfo.uid || 0
  const sid = userInfo.sid || 0
  const logintype = userInfo.logintype || ''
  const secrectname = userInfo.secrectname || ''
  // let roomUserInfo = {}
  // const roomInfoData: any = await callWebServer('proxy.p', { cmd: 'getroominfo', rid, channel: 'jsonp' }) // 进房接口
  const activityInfoData: any = await callWebServer('proxy.p', { cmd: 'getactivityinfo', rid, uid, channel: 'jsonp', facet: 'love520202105' }) // 进房接口
  if (uid) {
    // roomUserInfo = await callWebServer('proxy.p', { cmd: 'getroomuserinfo', rid, uid, sid, channel: 'jsonp' }) // 进房接口
    // console.log('roomUserInfo: ', roomUserInfo)
    const myInfo = await callWebServer('proxy.p', { cmd: 'getmyinfo', uid, sid, secrectname, logintype, channel: 'jsonp' }) // 进房接口
    store.dispatch(setMyInfoObj(myInfo))
  }
  // 同步系统时间
  const systemTime = activityInfoData.systm
  store.dispatch(setSystemTime(systemTime))
  return { activityInfoData }
}



const initApiFn = (userFromFlag = true, goAgainFlag = false) => {
  // userFromFlag 默认为true 默认调取进房接口； goAgainFlag 默认为false，true的话则使用在挂件倒计时结束的时候
  return new Promise(resolve => {
    if (goAgainFlag) {
      isAnchorFn()
      resolve(apiFn())
    } else {
      Promise.all([enterInfoNotice, getMyInfoNotice, getUserInfoNotice]).then(() => {
        isAnchorFn()
        // 默认调取进房 相关接口
        if (userFromFlag) {
          // 挂件进房需要
          resolve(apiFn())
        } else {
          // 活动不需要调取进房参数的话可以选择不调取 apiFn 里面的接口
          resolve(null)
        }
      })
    }
  })
}

export default initApiFn
