/*
 * @Author: xinlei.hu
 * @Date: 2020-11-03 11:53:52
 * @LastEditTime: 2020-06-01 18:11:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-mpa-template/src/service/appToh5JX/common.ts
 */
/**
 * 断环境是Android还是IOS
 */
import store from '@/store'
import { setAppSrc, setAppVersion } from '@/store/common/action'

export const deviceType = (() => {
  const u = navigator.userAgent
  if (u.match(/Android/i) != null) {
    return 'Android'
  } else if (u.match(/iPhone|iPod|ios/i) != null) {
    return 'IOS'
  } else {
    return 'h5'
  }
})()

export const getAppDefaultData = () => {
  try {
    switch (deviceType) {
      case 'Android': {
        const json1 =
          '{"action":"control_getversion","callback":"versionCallBack"}'
        window.KuwoInterface.jsCallNative(json1)

        // 获取用户信息
        const json2 =
          '{"action":"control_getmyinfoobj","callback":"getMyInfoObjCallBack"}'
        window.KuwoInterface.jsCallNative(json2)
        break
      }
      // ----------------安卓----------------
      // 获取具体手机型号
      case 'IOS': {
        // ----------------ios----------------
        // 获取具体手机型号、app版本号 （{"src":"android_jx","version":"5.5.7.1","from":"","macid":"","ip":""}）
        const iosVersionCallback = window.jscObj.getVersionInfo() // ios回调用户返回版本号，该版本号可以用于区分独立版或者航母版
        store.dispatch(setAppSrc(iosVersionCallback.src))
        store.dispatch(setAppVersion(iosVersionCallback.version))

        // 获取用户信息
        setTimeout(() => {
          window.location.href = 'kwip://kwplayerhd/getmyinfoobj'
        }, 100)
        break
      }
    }
  } catch (error) {
    console.log('getAppDefaultData--不是在手机端~')
  }
}

const selfExecutingFu = {
  init () {
    getAppDefaultData()
  }
}
export default selfExecutingFu
