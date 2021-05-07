
export const USER_INFO = 'USER_INFO';
export const MY_INFO = 'MY_INFO';
export const ENTER_INFO = 'ENTER_INFO';
export const ROOM_CACHE = 'ROOM_CACHE';
export const APP_CACHE = 'APP_CACHE';
export const VER_SION = 'VER_SION';
export const APP_VER_SION = 'APP_VER_SION';
export const JS_VERSION = 'JS_VERSION';
export const DEVICE_UTILS = 'DEVICE_UTILS';
export const IS_LOGIN = 'IS_LOGIN';
export const IS_APP_GO_IN = 'IS_APP_GO_IN';
export const FROM_HEAD = 'FROM_HEAD';
export const APP_SRC = 'APP_SRC';
export const IS_ANCHOR = 'IS_ANCHOR';
export const SYSTEM_TIME = 'SYSTEM_TIME';
export const SYSTEM_TIMEUPDATE = 'SYSTEM_TIMEUPDATE';
export const MY_INFO_AND_ENTER_INFO_DATA = 'MY_INFO_AND_ENTER_INFO_DATA';

export interface CommonState {
    isAppGoIn: any;
    userInfoObj: UserInfoObj;
    myInfoObj: MyInfoObj;
    // h5SinginInfo: any
    enterInfo: EnterInfo;
    roomCache: object;
    appCache: object;
    version: string;
    appVersion: string;
    jsVersion: string;
    deviceUtils: string;
    isLogin: number;
    isAppSrc: boolean;
    fromHead: string;
    appSrc: string;
    myInfoAndEnterInfoData: any;
    isAnchor: number;
    systemTime: number;
    systemTimeUpdate: number;
}
export interface UserInfoObj {
    uid: any;
    sid: any;
    logintype: any;
    secrectname: string;
    roomid: any;
    coin: number;
}
export interface MyInfoObj {
    cmd: string;
    status: number;
    statusdesc: string;
    systm: number;
    logintype: string;
    coin: string;
    user: User;
}

export interface EnterInfo {
    cmd: string;
    status: number;
    statusdesc: string;
    systm: number;
    room: any;
    user: any;
    votes: any;
    live: any;
    chatid: string;
    role: string;
    chatroom: any;
    roomwhisper: number;
    myenterinfo: any;
    activity: any;
}

// 签名
export interface User {
    id: number;
    nickname: string;
    pic: string;
    logo: string;
    rid: number;
    gender: number;
    singerlvl: number;
    singerupleft: number;
    richlvl: number;
    richupleft: number;
    consume: number;
    coin: string;
    shell: string;
    flowercnt: number;
    goldflowercnt: number;
    status: number;
    singerflag: number;
    onlinestatus: number;
    fav: number;
    fans: number;
    regtm: number;
    upay: number;
    onlinetm: number;
    fid: number;
    frole: number;
    badgetm: number;
    sex: number;
    identity: number;
    car: number;
    getvipawardstatus: number;
    sigin: Sign;
}
export interface Sign {
    curmap: number;
    lastmap: number;
    days: number;
}
// 用户信息

export interface ProfileState {
    profile: string;
}
