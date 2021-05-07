import * as common from './types'

export const setUserInfoObj = (value: object) => {
  return {
    type: common.USER_INFO,
    value
  }
}
export const setMyInfoObj = (value: object) => {
  return {
    type: common.MY_INFO,
    value
  }

}
export const setEnterInfo = (value: object) => {
  return {
    type: common.ENTER_INFO,
    value,
  }
}
export const setRoomCache = (value: object) => {
  return {
    type: common.ROOM_CACHE,
    value,
  }
}
export const setAppCache = (value: object) => {
  return {
    type: common.APP_CACHE,
    value,
  }
}
export const setVersion = (value: string | number) => {
  return {
    type: common.VER_SION,
    value,
  }
}
export const setAppVersion = (value: string | number) => {
  return {
    type: common.APP_VER_SION,
    value,
  }
}
export const setJsVersion = (value: string | number) => {
  return {
    type: common.JS_VERSION,
    value,
  }
}
export const setDeviceUtils = (value: any) => {
  return {
    type: common.DEVICE_UTILS,
    value,
  }
}
export const setIsLogin = (value: string | number) => {
  return {
    type: common.IS_LOGIN,
    value
  }
}
export const setIsAppGoIn = (value: string | number) => {
  return {
    type: common.IS_APP_GO_IN,
    value,
  }
}
export const setFromHead = (value: any) => {
  return {
    type: common.FROM_HEAD,
    value,
  }
}
export const setAppSrc = (value: string | number) => {
  return {
    type: common.APP_SRC,
    value,
  }
}
export const setIsAnchor = (value: string | number) => {
  return {
    type: common.IS_ANCHOR,
    value,
  }
}
export const setMyInfoAndEnterInfoData = (value: any) => {
  return {
    type: common.MY_INFO_AND_ENTER_INFO_DATA,
    value
  }
}
export const setSystemTimeUpdate = (value: string | number) => {
  return {
    type: common.SYSTEM_TIMEUPDATE,
    value
  }
}
export const setSystemTime = (value: number) => {
  return {
    type: common.SYSTEM_TIME,
    value,
  }
}
