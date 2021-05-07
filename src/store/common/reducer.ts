import { DefaultObj } from '../types'
// import * as common from './action-type';
import { defaultState } from './state'

const actionFn = (state = defaultState, action: DefaultObj) => {
  const TYPE = action.type
  const actionObj: DefaultObj = {
    'USER_INFO': {
      name: 'userInfoObj',
      state: state.userInfoObj
    },
    'MY_INFO': {
      name: 'myInfoObj',
      state: state.myInfoObj
    },
    'ENTER_INFO': {
      name: 'enterInfo',
      state: state.enterInfo
    },
    'ROOM_CACHE': {
      name: 'roomCache',
      state: state.roomCache
    },
    'APP_CACHE': {
      name: 'appCache',
      state: state.appCache
    },
    'VER_SION': {
      name: 'version',
      state: state.version
    },
    'APP_VER_SION': {
      name: 'appVersion',
      state: state.appVersion
    },
    'JS_VERSION': {
      name: 'jsVersion',
      state: state.jsVersion
    },
    'DEVICE_UTILS': {
      name: 'deviceUtils',
      state: state.deviceUtils
    },
    'IS_LOGIN': {
      name: 'isLogin',
      state: state.isLogin
    },
    'IS_APP_GO_IN': {
      name: 'isAppGoIn',
      state: state.isAppGoIn
    },
    'FROM_HEAD': {
      name: 'fromHead',
      state: state.fromHead
    },
    'APP_SRC': {
      name: 'appSrc',
      state: state.appSrc
    },
    'IS_ANCHOR': {
      name: 'isAnchor',
      state: state.isAnchor
    },
    'SYSTEM_TIME': {
      name: 'systemTime',
      state: state.systemTime
    },
    'SYSTEM_TIMEUPDATE': {
      name: 'systemTimeUpdate',
      state: state.systemTimeUpdate
    },
    'MY_INFO_AND_ENTER_INFO_DATA': {
      name: 'myInfoAndEnterInfoData',
      state: state.myInfoAndEnterInfoData
    }
  }
  if (actionObj[TYPE]) {
    // console.log('actionObj[TYPE]: ', actionObj[TYPE]);
    const newValueData = action.value
    const name = actionObj[TYPE].name
    let defaultData = (state as any)[actionObj[TYPE].name]
    if (defaultData instanceof Object) {
      // 对象
      Object.assign(defaultData, newValueData)
    } else if (Array.isArray(defaultData)) {
      // 数组
      defaultData = [...defaultData, ...newValueData]
    } else {
      // 字符串||数字
      defaultData = newValueData
    }
    return { ...state, [name]: defaultData }
  }
  return state
}

// 公共参数
export const commonState = (state = defaultState, action: DefaultObj) => {
  return actionFn(state, action)
}

