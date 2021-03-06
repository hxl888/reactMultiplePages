import { CommonState } from './types'

export const defaultState: CommonState = {
  isAnchor: 0, // 是否为主播0 当前房间不是主播 1是当前房间主播
  myInfoAndEnterInfoData: null,
  userInfoObj: {
    uid: undefined,
    sid: undefined,
    logintype: undefined,
    secrectname: '',
    roomid: undefined,
    coin: 0
  },
  myInfoObj: {
    cmd: '',
    status: 0,
    statusdesc: '',
    systm: 0,
    logintype: '',
    coin: '',
    user: {
      id: 0,
      nickname: '',
      pic: '',
      logo: '',
      rid: 0,
      gender: 0,
      singerlvl: 0,
      singerupleft: 0,
      richlvl: 0,
      richupleft: 0,
      consume: 0,
      coin: '',
      shell: '',
      flowercnt: 0,
      goldflowercnt: 0,
      status: 0,
      singerflag: 0,
      onlinestatus: 0,
      fav: 0,
      fans: 0,
      regtm: 0,
      upay: 0,
      onlinetm: 0,
      fid: 0,
      frole: 0,
      badgetm: 0,
      sex: 0,
      identity: 0,
      car: 0,
      getvipawardstatus: 0,
      sigin: {
        curmap: 0,
        lastmap: 0,
        days: 0
      }
    }
  },
  enterInfo: {
    cmd: '',
    status: 1,
    statusdesc: '',
    systm: 0,
    room: {},
    user: {},
    votes: {},
    live: {},
    chatid: '',
    role: '',
    chatroom: {},
    roomwhisper: 0,
    myenterinfo: {},
    activity: {}
  },
  roomCache: {},
  appCache: {},
  // h5singInfo: null,
  version: '',
  appVersion: '',
  jsVersion: '',
  deviceUtils: '',
  isLogin: 0,
  isAppSrc: false,
  isAppGoIn: '',
  fromHead: '',
  appSrc: '',
  systemTime: 0,
  systemTimeUpdate: 0 // 系统时间有更新(开关)
}
