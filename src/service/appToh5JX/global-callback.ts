/*
 * @Author: xinlei.hu
 * @Date: 2020-11-03 11:53:52
 * @LastEditTime: 2020-06-01 18:54:18
 * app 调用 js的方法库
 */

import EventEmitter from '@/service/event-bus'
import store from '@/store'
import { setIsLogin, setMyInfoObj, setUserInfoObj, setRoomCache, setMyInfoAndEnterInfoData, setFromHead, setIsAppGoIn, setAppSrc, setJsVersion, setAppVersion, setEnterInfo, setAppCache } from '@/store/common/action'

// 安卓获取用户信息回调
const getMyInfoObjCallBack = (data: string) => {
  let isLogin = 0
  let myInfoData = {}
  if (data) {
    const myInfoObj = JSON.parse(data)
    isLogin = 1
    myInfoData = myInfoObj
  } else {
    isLogin = 0
  }
  store.dispatch(setIsLogin(isLogin))
  store.dispatch(setMyInfoObj(myInfoData))
  EventEmitter.emit('getUserInfoNotice', myInfoData)
}
// ios获取用户信息回调
const iosMyInfoObjCallback = (data: any) => {
  let isLogin = 0
  if (data) {
    isLogin = 1
  } else {
    isLogin = 0
  }

  store.dispatch(setIsLogin(isLogin))
  store.dispatch(setMyInfoObj(data))
  EventEmitter.emit('getUserInfoNotice', data)
}

// 安卓充值回调
const androidCallback = (data: any) => {
  if (data) {
    window.location.reload()
  }
}
// 安卓充值回调
const iosCallback = (data: any) => {
  if (data) {
    window.location.reload()
  }
}
//
const getMyInfoCallBack = (data: string) => {
  let userData = {}
  try {
    const user = JSON.parse(data)
    userData = user
  } catch (error) {
    console.log('未登录状态')
  }
  EventEmitter.emit('getMyInfoNotice', userData)
  store.dispatch(setUserInfoObj(userData))
}
//
const iosMyInfoCallback = (data: Record<string, any>) => {
  let userData = {}
  try {
    userData = data
  } catch (error) {
    console.log('未登录状态')
  }
  EventEmitter.emit('getMyInfoNotice', userData)
  store.dispatch(setUserInfoObj(userData))
}

const loginReload = () => {
  window.location.reload()
}
const getSinginTokenCallback = () => {
  // window.h5SinginInfo = data
}

// 房间缓存
const roomCacheCallBack = (data: string) => {
  const jsonData = JSON.parse(data); const roomCache = []
  const key = jsonData.key
  roomCache[key] = jsonData.value
  store.dispatch(setRoomCache(roomCache))
}

// app缓存
const appCacheCallBack = (data: string) => {
  const jsonData = JSON.parse(data); const appCache = []
  const key = jsonData.key
  appCache[key] = jsonData.value
  store.dispatch(setAppCache(appCache))
}

// 同时获取登录信息进房信息渠道号
const getMyInfoAndEnterInfoCallBack = (data: string) => {
  const jsonData = JSON.parse(data)
  store.dispatch(setMyInfoAndEnterInfoData(jsonData))
}

const validateJSONStr = (data: string, replaceCharacter?: string) => {
  try {
    // const json = JSON.parse(data)
  } catch (e) {
    try {
      const dataArray = data.split('')
      const dataArrayLength = dataArray.length
      for (let i = 0; i < dataArrayLength; i++) {
        if (dataArray[i] === ':' && dataArray[i + 1] === '"') {
          for (let j = i + 2; j < dataArrayLength; j++) {
            if (dataArray[j] === '"') {
              if (dataArray[j + 1] !== ',' && dataArray[j + 1] !== '}') {
                dataArray[j] = replaceCharacter || '\\"'
              } else if (dataArray[j + 1] === ',' || dataArray[j + 1] === '}') {
                break
              }
            }
          }
        }
      }
      data = dataArray.join('')
    } catch (e) { }
  }
  return data
}

// 安卓回调
const feedback_ardeviceinfo = () => {
  try {
    // data = validateJSONStr(data)
  } catch (e) { }
  // const uf = JSON.parse(data)
}

// 安卓回调
const feedback_deviceinfo = (data: string) => {
  try {
    data = validateJSONStr(data)
  } catch (e) { }
  const uf = JSON.parse(data)
  let reversion = uf.src
  reversion = reversion.split('_')
  const isAppGoIn = reversion[2].slice(0, 5)
  const fromHead = true
  store.dispatch(setFromHead(fromHead))
  store.dispatch(setIsAppGoIn(isAppGoIn))
}

// android回调用户返回版本号，该版本号可以用于区分独立版或者航母版
const versionCallBack = (data: string) => {
  const dataObj = JSON.parse(data)
  const jsVersion = parseFloat(dataObj.jsversion) || 0
  store.dispatch(setAppSrc(dataObj.src))
  store.dispatch(setJsVersion(jsVersion))
  store.dispatch(setAppVersion(dataObj.version))
}

// const swfInvoke = (data: any) => {
// EventEmitter.emit('flashNotice', data)
// }
const androidNotifty = (data: any) => {
  const obj = JSON.parse(data)
  EventEmitter.emit('flashNotice', obj)
}
const iOSNotiftInfoCallback = (data: any) => {
  EventEmitter.emit('flashNotice', data)
}
const iosGetEnterInfoCallback = (data: any) => {
  EventEmitter.emit('enterInfoNotice', data)
  store.dispatch(setEnterInfo(data))
}
const androidGetEnterInfoCallback = (data: string) => {
  const obj = JSON.parse(data)
  EventEmitter.emit('enterInfoNotice', obj)
  store.dispatch(setEnterInfo(obj))
}

export default {
  getMyInfoObjCallBack,
  iosMyInfoObjCallback,
  versionCallBack,
  // appVersionCallBack,
  androidCallback,
  iosCallback,
  getMyInfoCallBack,
  iosMyInfoCallback,
  loginReload,
  getSinginTokenCallback,
  roomCacheCallBack,
  appCacheCallBack,
  getMyInfoAndEnterInfoCallBack,
  feedback_ardeviceinfo,
  feedback_deviceinfo,
  // swfInvoke,
  androidNotifty,
  iOSNotiftInfoCallback,
  iosGetEnterInfoCallback,
  androidGetEnterInfoCallback
}
