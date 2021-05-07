/**
 * h5 与 app 交互协议通道
 */
import store from '@/store'
import { deviceType } from './common'
import { setRoomCache, setAppCache } from '@/store/common/action'

const OSFlag = deviceType !== 'Android' // h5 暂时未定义

const appBridge = {
  callLogin: function () {
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      window.jscObj.openLoginAlert()
    } else {
      try {
        window.KuwoInterface.jsCallNative(
          '{"action":"control_login_getmyinfo","callback":"loginReload"}'
        )
      } catch (e) { }
    }
  },
  callPay: function () {
    // 呼叫充值页面
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      // ios
      window.open('kwip://kwplayerhd/open_recharge')
    } else {
      // 安卓
      let jsonstr =
        '{"action":"control_pay_fragment","callback":"androidCallback"}'
      window.KuwoInterface.jsCallNative(jsonstr)

      jsonstr = '{"action":"pay_fragment","callback":"androidCallback"}'
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  getRoomNotify: function (notify: string) {
    // 获取房间内的通知
    if (!window.KuwoInterface && !window.jscObj) return
    try {
      if (OSFlag) {
        setTimeout(function () {
          window.location.href =
            'kwip://kwplayerhd/getnotifyinfo?notify=' + notify
        }, 1000)
      } else {
        const jsonstr =
          '{"action":"control_getnotifyinfo","callback":"androidNotifty","notify":"' +
          notify +
          '"}'
        window.KuwoInterface.jsCallNative(jsonstr)
      }
    } catch (error) {
      console.log('getRoomNotify--不在手机端')
    }
  },
  closeSmallPage: function () {
    // 关闭视频旁边的H5
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      window.location.href = 'kwip://kwplayerhd/closethispage'
    } else {
      const jsonstr = '{"action":"control_closesmallpage"}'
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  closeBigPage: function () {
    // 关闭大的H5
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      window.jscObj.closeH5Page()
    } else {
      const jsonstr = '{"action":"control_closebigpage"}'
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  // type=1 该页面可以被新的openbigh5 请求顶替
  // type=2 该页面不能被新的openbigh5 请求顶替
  openBigPage: function (url: string | number | boolean, type: string, showFlag: string) {
    // 打开大的H5  url 路径   type 1  showFlag 0不展示不再展示    1展示不再展示
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      url = encodeURIComponent(url)
      // window.location.href = "kwip://kwplayerhd/openbigh5?url="+url+"&type="+type+"&showFlag="+showFlag;
      window.jscObj.openOuterH5PageWithUrl(url)
    } else {
      const jsonstr =
        '{"action":"control_openbigh5","url":"' +
        url +
        '","type":"' +
        type +
        '","showFlag":"' +
        showFlag +
        '"}'
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  pushpage: function (url: any, title: any) {
    // 打开大的H5
    if (!window.KuwoInterface && !window.jscObj) return
    const urlStr = encodeURI(url)
    const titleStr = encodeURI(title)
    if (OSFlag) {
      window.open('kwip://kwplayerhd/pushpage?url=' + urlStr + '&title=' + titleStr) // url 会encode
    } else {
      const jsonstr =
        '{"action":"control_pushpage","url":"' +
        url +
        '","title":"' +
        title +
        '"}' // url 会encode
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  // 注意该方法的调用跟其他调用ios方法的处理不要同一时间做，需要一个操作完毕后再调用另一个或者每个操作之间留点时间间隔，否则可能导致ios回调不了
  getUserInfo: function () {
    // 获取用户信息
    try {
      // if (getNickname('userid')) {
      //   removeNickname('userid')
      //   removeNickname('websid')
      // }
      if (OSFlag) {
        if (!window.jscObj) return
        // ios window.location.href = "kwip://kwplayerhd/getmyinfo";   2018.1.16修改为新接口  半年未更新的用户可能不支持使用app了
        const retObj = window.jscObj.getMyInfo()
        setTimeout(() => {
          window.iosMyInfoCallback(retObj)
        }, 300)
      } else {
        // 安卓
        if (!window.KuwoInterface) return
        const getMyinfo =
          '{"action":"control_getmyinfo","callback":"getMyInfoCallBack"}'
        window.KuwoInterface.jsCallNative(getMyinfo)
      }
    } catch (error) {
      console.log('1不是在手机端~')
    }
  },
  // ios返回的该接口的数据结构是固化的(结构已经定死了)，后台enterroom新加的数据结构该接口都收不到，只能利用原来的接口中已有的属性来处理
  getRoomInfo: function () {
    try {
      if (OSFlag) {
        if (!window.jscObj) return
        window.location.href = 'kwip://kwplayerhd/getenterinfo'
      } else {
        if (!window.KuwoInterface) return
        const jsonstr =
          '{"action":"control_getenterinfo","callback":"androidGetEnterInfoCallback"}'
        window.KuwoInterface.jsCallNative(jsonstr)
      }
    } catch (error) {
      console.log('2不是在手机端~')
    }
  },
  refreshCoin: function (coin: string) {
    // 刷新用户星币数, coin刷新的星币数
    if (!window.KuwoInterface && !window.jscObj) return
    const regex = /^(0|[1-9]\d*)$/
    if (!regex.test(coin)) {
      return
    }
    if (OSFlag) {
      // ios
      if (!window.jscObj) return
      window.location.href = 'kwip://kwplayerhd/refreshCoin?coin=' + coin
    } else {
      // 安卓
      if (!window.KuwoInterface) return
      const refreshCoin =
        '{"action":"control_refresh_coin","coin":"' + coin + '"}'
      window.KuwoInterface.jsCallNative(refreshCoin)
    }
  },
  refreshCoin_new: function (coin: string) {
    // 刷新用户星币数, coin刷新的星币数
    if (!window.KuwoInterface && !window.jscObj) return
    const regex = /^(0|[1-9]\d*)$/
    if (!regex.test(coin)) {
      return
    }
    if (OSFlag) {
      // ios
      if (!window.jscObj) return
      window.jscObj.refreshCoin(coin)
    } else {
      // 安卓
      if (!window.KuwoInterface) return
      const refreshCoin =
        '{"action":"control_refresh_coin","coin":"' + coin + '"}'
      window.KuwoInterface.jsCallNative(refreshCoin)
    }
  },
  flyScreen: function (stat: string) {
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      window.jscObj.animationStateChanged(stat)
    } else {
      const flyScreenParam =
        '{"action":"control_fly_screen","status":' + stat + '}'
      window.KuwoInterface.jsCallNative(flyScreenParam)
    }
  },
  controlPandent: function (display: number) {
    // display:展开OR收缩 1:收缩 2：展开   type:位置（仅ANDROID需要）
    // 控制房间内上 右 左侧挂件
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      window.jscObj.openStateChanged(display)
    } else {
      let padentParam = ''
      if (display === 1) {
        padentParam = '{"action":"control_foldpendant"}'
      } else {
        padentParam = '{"action":"control_unfoldpendant"}'
      }
      window.KuwoInterface.jsCallNative(padentParam)
    }
  },
  dilogOpen: function (url: string, index: string) {
    // 房间内弹窗展示，会显示在APP中间
    if (!window.KuwoInterface && !window.jscObj) return
    try {
      if (OSFlag) {
        window.jscObj.openDetailH5PageWithUrl(url)
      } else {
        const openDilogParam =
          '{"action":"control_opendialogh5","url":"' +
          url +
          '","index":"' +
          index +
          '"}'
        window.KuwoInterface.jsCallNative(openDilogParam)
      }
    } catch (error) {
      console.log('没有此弹框协议~: ', error)
    }
  },
  // index标识弹框的唯一标识; iosVersion用来兼容ios前期不支持关闭弹窗的方法
  dilogClose: function (index: string) {
    if (!window.KuwoInterface && !window.jscObj) return
    const state = store.getState().commonState
    const APPVersion = parseFloat(state.appVersion) || 0 // ios 版本号
    if (OSFlag) {
      // IOS 3.6.1后用此关闭
      if (APPVersion && APPVersion >= 361) {
        window.jscObj.closeH5Page()
      } else {
        window.location.href = 'kwip://kwplayerhd/closethispage'
      }
    } else {
      const openDilogParam =
        '{"action":"control_closedialogh5","index":"' + index + '"}'
      window.KuwoInterface.jsCallNative(openDilogParam)
    }
  },
  pushPage: function (url: string, title: string) {
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      window.jscObj.pushOuterH5Page(url, title)
    } else {
      const pushPageParam =
        '{"action":"control_pushpage","url":"' +
        url +
        '","title":"' +
        title +
        '"}'
      window.KuwoInterface.jsCallNative(pushPageParam)
    }
  },
  openRoom: function (roomId: string, type?: string) {
    // 进房间
    // type:调用入口 1表示全站飞屏调用 2流量红包调用 3鱼塘(安卓)
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      window.jscObj.openShowRoomWithRoomID(roomId)
    } else {
      let jsonstr
      if (typeof type !== 'undefined') {
        jsonstr =
          '{"action":"control_open_room","roomId":"' +
          roomId +
          '","type":"' +
          type +
          '"}'
      } else {
        jsonstr =
          '{"action":"control_open_room","roomId":"' + roomId + '"}'
      }
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  closeRoomBanner: function () {
    // 关闭直播间焦点图
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      window.jscObj.closeH5Page()
    } else {
      const jsonstr = '{"action":"control_closeroombanner"}'
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  closePandent: function () {
    // 关闭挂件
    if (!window.KuwoInterface && !window.jscObj) return
    try {
      if (OSFlag) {
        window.jscObj.closeH5Page()
      } else {
        const jsonstr = '{"action":"control_foldpendant","height":"1"}'
        window.KuwoInterface.jsCallNative(jsonstr)
      }
    } catch (error) { }
  },
  closePushPage: function () {
    // 2018年1月4日 新增关键弹窗挂件
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      window.jscObj.closeH5Page()
    } else {
      const jsonstr = '{"action":"control_closeweb"}'
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  shareH5: function (options: { shareUrl: string; title: string; desc: string; sharePicUrl: string }) {
    // H5分享
    if (!window.KuwoInterface && !window.jscObj) return
    if (!options) return
    const shareUrl = options.shareUrl ? decodeURIComponent(options.shareUrl) : ''
    const title = options.title ? decodeURIComponent(options.title) : ''
    const desc = options.desc ? decodeURIComponent(options.desc) : ''
    const sharePicUrl = options.sharePicUrl
      ? decodeURIComponent(options.sharePicUrl)
      : ''
    if (OSFlag) {
      if (!window.jscObj) return
      window.jscObj.openShareView(shareUrl, title, sharePicUrl, desc)
    } else {
      const jsonstr =
        '{"action":"control_add_share","url":"' +
        shareUrl +
        '","title":"' +
        title +
        '","desc":"' +
        desc +
        '","pic":"' +
        sharePicUrl +
        '"}'
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  // H5getSinginToken: function () {
  //   if (OSFlag) {
  //     window.h5SinginInfo = window.jscObj.getSiginInfo()
  //   } else {
  //     let jsonstr =
  //       '{"action":"control_getsigntoken","callback":"getSinginTokenCallback"}'
  //     window.KuwoInterface.jsCallNative(jsonstr)
  //   }
  // },
  addRoomCache: function (key: string, value: string) {
    // app房间内缓存存储，对本房间内有效，离开房间失效 （key value 必须为string类型 否则会造成app进房页面奔溃）
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      window.jscObj.setNativeValue(value, key)
    } else {
      const jsonstr =
        '{"action":"control_addcache","key":"' +
        key +
        '","value":"' +
        value +
        '"}'
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  getRoomCache: function (key: string) {
    // app房间内缓存获取，对本房间内有效，离开房间失效
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      const roomCache: any = {}
      const cache = window.jscObj.getNativeValueByKey(key)
      roomCache[key] = cache
      store.dispatch(setRoomCache(roomCache))
    } else {
      const jsonstr =
        '{"action":"control_getcache","callback":"roomCacheCallBack","key":"' +
        key +
        '"}'
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  addAppCache: function (key: string, value: string) {
    // 存储app级别缓存 （key value 必须为string类型 否则会造成app进房页面奔溃）
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      window.jscObj.setAppNativeValue(value, key)
    } else {
      const jsonstr =
        '{"action":"control_addcache_app","key":"' +
        key +
        '","value":"' +
        value +
        '"}'
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  getAppCache: function (key: string) {
    // 获取app级别缓存 （key value 必须为string类型 否则会造成app进房页面奔溃）
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      const appCache: any = {}
      const cache = window.jscObj.getAppNativeValueByKey(key)
      appCache[key] = cache
      store.dispatch(setAppCache(appCache))
    } else {
      const jsonstr =
        '{"action":"control_getcache_app","callback":"appCacheCallBack","key":"' +
        key +
        '"}'
      window.KuwoInterface.jsCallNative(jsonstr)
      // appCache[key] = '1_1521687047';
    }
  },
  delAppCache: function (key: string) {
    try {
      // 清除指定app级别缓存
      if (OSFlag) {
        if (!window.jscObj) return
        window.jscObj.deleteAppNativeValueByKey(key)
      } else {
        if (!window.KuwoInterface) return
        const jsonstr = '{"action":"control_delcache_app","key":"' + key + '"}'
        window.KuwoInterface.jsCallNative(jsonstr)
      }
    } catch (error) {
      console.log('3不是在手机端~')
    }
  },
  delAllAppCache: function () {
    try {
      // 清除所有app级别缓存
      if (OSFlag) {
        if (!window.jscObj) return
        window.jscObj.deleteAllAppNativeValue()
      } else {
        if (!window.KuwoInterface) return
        const jsonstr = '{"action":"control_clearcache_app"}'
        window.KuwoInterface.jsCallNative(jsonstr)
      }
    } catch (error) {
      console.log('4不是在手机端~')
    }
  },
  openRoomNew: function (roomId: string, opts: { type: any; channel: any }) {
    // type:调用入口 1表示全站飞屏调用 2流量红包调用
    if (!window.KuwoInterface && !window.jscObj) return
    let type = null
    if (OSFlag) {
      type = typeof opts.type !== 'undefined' ? opts.type : ''
      const channel = typeof opts.channel !== 'undefined' ? opts.channel : ''
      // 秀场
      // 设置渠道
      if (window.jscObj && window.jscObj.setJXFromChannelId) {
        window.jscObj.setJXFromChannelId(channel)
      }
      // 跳房
      if (window.jscObj && window.jscObj.enterRoomWithRoomID) {
        const jsonObj = { h5type: type }
        window.jscObj.enterRoomWithRoomID(roomId, jsonObj)
      } else if (
        window.jscObj &&
        !window.jscObj.enterRoomWithRoomID &&
        window.jscObj.openShowRoomWithRoomID
      ) {
        window.jscObj.openShowRoomWithRoomID(roomId)
      }
      // 音乐盒
      const params = { h5type: type }
      const paramstr = encodeURIComponent(JSON.stringify(params))
      const jsonstr =
        '{"action":"goto_showroom","channel":"' +
        channel +
        '","roomType":"2","roomId":"' +
        roomId +
        '","param":"' +
        paramstr +
        '"}'
      setTimeout(function () {
        window.location.href =
          'kwip://kwplayerhd/goto_showroom?param=' +
          encodeURIComponent(jsonstr)
      }, 100)
    } else {
      type = typeof opts.type !== 'undefined' ? opts.type : ''
      const channel = typeof opts.channel !== 'undefined' ? opts.channel : ''
      const jsonstr =
        '{"action":"control_open_room","roomId":"' +
        roomId +
        '","type":"' +
        type +
        '","channel":"' +
        channel +
        '"}'
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  openRoomMusic: function (roomId: string, opts: { type: any; channel: any }) {
    // 音乐盒点击弹框带渠道号进房
    // type:0表示一般情况，其他情况再说
    if (!window.KuwoInterface && !window.jscObj) return
    const type = typeof opts.type !== 'undefined' ? opts.type : ''
    const channel = typeof opts.channel !== 'undefined' ? opts.channel : ''
    if (OSFlag) {
      // 设置渠道
      if (window.jscObj && window.jscObj.setJXFromChannelId) {
        window.jscObj.setJXFromChannelId(channel)
      }
      // 跳房
      if (window.jscObj && window.jscObj.openShowRoomWithRoomID) {
        window.jscObj.openShowRoomWithRoomID(roomId)
      }
    } else {
      const jsonstr =
        '{"action":"control_open_room","roomId":"' +
        roomId +
        '","type":"' +
        type +
        '","channel":"' +
        channel +
        '"}'
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  closeMusicBox: function () {
    // 关闭音乐盒点击弹框带渠道号进房
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      window.jscObj.closeH5Page()
    } else {
      const jsonstr = '{"action":"control_closethis"}'
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  openRoomWithType: function (roomId: string, type: string) {
    // 区分进房方式
    // type:调用入口 1表示全站飞屏调用 2流量红包调用 3鱼塘
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      if (window.jscObj && window.jscObj.enterRoomWithRoomID) {
        type = typeof type !== 'undefined' ? type : ''
        const jsonObj = { h5type: type }
        window.jscObj.enterRoomWithRoomID(roomId, jsonObj)
      } else if (
        window.jscObj &&
        !window.jscObj.enterRoomWithRoomID &&
        window.jscObj.openShowRoomWithRoomID
      ) {
        window.jscObj.openShowRoomWithRoomID(roomId)
      }
    } else {
      let jsonstr
      if (typeof type !== 'undefined') {
        jsonstr =
          '{"action":"control_open_room","roomId":"' +
          roomId +
          '","type":"' +
          type +
          '"}'
      } else {
        jsonstr =
          '{"action":"control_open_room","roomId":"' + roomId + '"}'
      }
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  // 聚星，音乐盒共用进房
  openJxAndMusicRoom: function (roomId: string) {
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      // 跳房
      // 聚星
      if (window.jscObj && window.jscObj.openShowRoomWithRoomID) {
        window.jscObj.openShowRoomWithRoomID(roomId)
      }
      // 音乐盒
      const jsonstr =
        '{"action":"goto_showroom","channel":"","roomType":"2","roomId":"' +
        roomId +
        '","param":""}'
      setTimeout(function () {
        window.location.href =
          'kwip://kwplayerhd/goto_showroom?param=' +
          encodeURIComponent(jsonstr)
      }, 100)
    } else {
      const jsonstr = '{"action":"control_open_room","roomId":"' + roomId + '"}'
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  // 是否在盒内
  // isInApp: function () {
  //   if (this.isOutApp()) {
  //     return false
  //   }
  //   if (window.navigator.userAgent.indexOf('kuwopage') > -1) {
  //     return true
  //   } else {
  //     try {
  //       let deviceUtils = window.deviceUtils
  //       if (
  //         typeof deviceUtils === 'object' &&
  //         typeof deviceUtils.ver !== 'undefined'
  //       ) {
  //         return true
  //       }
  //     } catch (e) {
  //       return false
  //     }
  //     return false
  //   }
  // },
  // 在盒外
  // isOutApp: function () {
  //   // if (window.location.href.indexOf('fromkw=share') > -1 || this.isQQ() || this.isWeChat() || this.isWeiBo() || this.isInAli()) {
  //   if (window.location.href.indexOf('fromkw=share') > -1) {
  //     return true
  //   }
  //   return false
  // },
  // getMyInfoAndEnterInfo: function () {
  //   if (OSFlag) {
  //     window.myInfoAndEnterInfoData = window.jscObj.getMyInfoAndEnterRoomInfo()
  //   } else {
  //     let jsonstr =
  //       '{"action":"controlGetMyInfo_EnterInfo","callback":"getMyInfoAndEnterInfoCallBack"}'
  //     window.KuwoInterface.jsCallNative(jsonstr)
  //   }
  // },
  setBannerLogo: function (url: string) {
    // 设置手机直播间收起logo链接
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      if (window.jscObj.replaceRongYaoPKShowIcon) {
        window.jscObj.replaceRongYaoPKShowIcon(url)
      }
    } else {
      const jsonstr =
        '{"action":"control_roombannerbuttonicon","url":"' + url + '"}'
      window.KuwoInterface.jsCallNative(jsonstr)
    }
  },
  callOpenRoomDeeplink: function (rid: string) {
    // 唤醒app进房
    if (!window.KuwoInterface && !window.jscObj) return
    const deeplink_url = 'splash://juxing.kuwo.cn?type=0&rid=' + rid
    if (OSFlag) {
      window.location.href = deeplink_url
    } else {
      const ifr = document.createElement('iframe')
      ifr.style.display = 'none'
      ifr.src = deeplink_url
      document.documentElement.appendChild(ifr)
    }
  },
  callOpenPageDeeplink: function (title: string, url: string) {
    // 唤醒app打开指定页面
    if (!window.KuwoInterface && !window.jscObj) return
    const deeplink_url =
      'splash://juxing.kuwo.cn?type=1&title=' + title + '&url=' + url
    if (OSFlag) {
      window.location.href = deeplink_url
    } else {
      const ifr = document.createElement('iframe')
      ifr.style.display = 'none'
      ifr.src = deeplink_url
      document.documentElement.appendChild(ifr)
    }
  },
  setWebviewScroll: function (value: any) {
    // 设置webview是否滑动
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      // 1： 允许，0：不允许
      window.jscObj.setWebViewBouncesEnable &&
        window.jscObj.setWebViewBouncesEnable(value)
    }
  },
  controlPK: function (type: string) {
    // 设置荣耀pk显示隐藏  显示：1，隐藏：2
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      try {
        window.jscObj.controlPK(type)
      } catch (error) { }
    } else {
      try {
        const jsonstr = '{"action":"control_PK","type":"' + type + '"}'
        window.KuwoInterface.jsCallNative(jsonstr)
      } catch (error) { }
    }
  },
  versionfunegt: function (ver1: string, ver2: string) {
    const version1pre = parseFloat(ver1)
    const version2pre = parseFloat(ver2)
    const version1next = ver1.replace(version1pre + '.', '')
    const version2next = ver2.replace(version2pre + '.', '')
    if (version1pre > version2pre) {
      return true
    } else if (version1pre < version2pre) {
      return false
    } else {
      if (version1next >= version2next) {
        return true
      } else {
        return false
      }
    }
  },
  // 进房间
  goRooms: function (roomId: string) {
    const state = store.getState().commonState
    const AppSrc = state.appSrc
    const APPVersion = state.appVersion
    if (!roomId) return
    if (OSFlag) {
      if (AppSrc === 'iphone_jx') {
        // ios 独立版
        const versionCompare1 = appBridge.versionfunegt(APPVersion, '4.1.4')
        if (!versionCompare1) {
          return
        }
      } else if (AppSrc === 'iphone_mbox') {
        // ios 航母版
        const versionCompare2 = appBridge.versionfunegt(APPVersion, '8.6.0')
        if (!versionCompare2) {
          return
        }
      }
    }
    if (!window.KuwoInterface && !window.jscObj) {
      // h5
      window.location.href = 'https://jx.kuwo.cn/' + roomId
    } else {
      appBridge.openRoom(roomId)
    }
  },
  setNoLoginMethod: function (call: () => any, failCall: () => any) {
    // 此方法只适用于app中
    const state = store.getState().commonState
    const ISLogin = state.isLogin
    if (!window.KuwoInterface && !window.jscObj) return
    if (!ISLogin) {
      // 未登录
      appBridge.callLogin()
      failCall && failCall()
    } else {
      call && call()
    }
  },
  applyH5Pendant: function (type: string, url: string) {
    // 创建挂件
    if (!window.KuwoInterface && !window.jscObj) return
    try {
      if (OSFlag) {
        window.jscObj.applyH5Pendant(type, url)
      } else {
        const jsonstr =
          '{"action":"control_applyH5Pendant","type":"' +
          type +
          '","url":"' +
          url +
          '"}'
        window.KuwoInterface.jsCallNative(jsonstr)
      }
    } catch (error) { }
  },
  applyH5MorePendant: function (type: string, url: string) {
    // 创建挂件 与applyH5Pendant 方法的去呗是安卓url：后面少加了两个“”
    if (!window.KuwoInterface && !window.jscObj) return
    try {
      if (OSFlag) {
        window.jscObj.applyH5Pendant(type, url)
      } else {
        const jsonstr =
          '{"action":"control_applyH5Pendant","type":"' +
          type +
          '","url":' +
          url +
          '}'
        window.KuwoInterface.jsCallNative(jsonstr)
      }
    } catch (error) { }
  },
  closeH5Pendant: function (type: string) {
    // 销毁挂件 type
    if (!window.KuwoInterface && !window.jscObj) return
    try {
      if (OSFlag) {
        window.jscObj.closeH5Pendant(type)
      } else {
        const jsonstr =
          '{"action":"control_closeH5Pendant","type":"' + type + '"}'
        window.KuwoInterface.jsCallNative(jsonstr)
      }
    } catch (error) { }
  },
  changeH5Pendant: function (type: string, operate: string, Id: string) {
    /**
     * 单个挂件刷新(8号挂件位)
     * @param type 挂件类型:int 对应挂件后台配置列表位置字段（16、4、8 ）--- 3个挂件位由上到下依次序号为16, 4, 8 --
     * @param operate 做操类型:int (1:刷新 2:销毁)
     * @param Id 挂件Id:int 对应挂件后台配置列表 排序 字段
     */
    if (!window.KuwoInterface && !window.jscObj) return
    try {
      if (OSFlag) {
        window.jscObj.changeH5Pendant(type, operate, Id)
      } else {
        const changeH5PendantParam =
          '{"action":"control_changeH5Pendant","type":"' +
          type +
          '","operate":"' +
          operate +
          '","id":"' +
          Id +
          '"}'
        window.KuwoInterface.jsCallNative(changeH5PendantParam)
      }
    } catch (error) { }
  },
  replaceH5Pendant: function (type: string, urlStr: string) {
    /**
     * 单个挂件替换 (8号轮播挂件位)
     * @param type 挂件类型:int
     * @param param url 挂件信息: String 例如（'{id: 8, url: ''}'）
     */
    if (!window.KuwoInterface && !window.jscObj) return
    try {
      if (OSFlag) {
        window.jscObj.replaceH5Pendant(type, urlStr)
      } else {
        const replaceH5PendantParam =
          '{"action":"control_replaceH5Pendant","type":"' +
          type +
          '","url":"' +
          urlStr +
          '"}'
        window.KuwoInterface.jsCallNative(replaceH5PendantParam)
      }
    } catch (error) { }
  },
  // 此方法为版本新加协议控制（原生底部弹框对应的app版本号控制）
  bottomDilogFlag: function () {
    const state = store.getState().commonState
    const AppSrc = state.appSrc
    const JsVersion = state.jsVersion
    const APPVersion = state.appVersion
    if (AppSrc === 'iphone_mbox') {
      // ios 航母版
      // 暂时不能底部掉起弹框
      return false
    } else if (AppSrc === 'iphone_jx') {
      // ios 独立版
      return appBridge.versionfunegt(APPVersion, '5.5.0')
    } else if (AppSrc === 'android_mbox') {
      // android 航母版
      // 暂时不能底部掉起弹框  需要通过 jsVersion 进行版本判断 是否调取协议
      // JS_VERSION = "3"：
      // 1、加入H5活动页保存分享；
      // 2、H5活动页显示时，禁用侧边栏和右滑退出直播间。
      // 3、H5活动页显示规则优化。
      // 航母从版本3开始加了上面3个修改;
      return parseFloat(JsVersion) >= 3
    } else if (AppSrc === 'android_jx') {
      // android 独立版
      return appBridge.versionfunegt(APPVersion, '5.5.2.0')
    }
  },
  bottomDilogOpen: function (url: string, index: string, topMargin = 0, webviewHeight = 0) {
    /**
     * 房间内 半屏弹窗展示，会显示在APP页面最下面由下而上滑动上来  topMargin、webviewHeight 为了灵活打开app底部弹框样式;
     * 注释：
     * 1.topMargin 为每次ui定的弹框 顶部 到手机 顶部 的高度、topMargin为每次ui设定的弹框顶部到手机顶部的高度间距（此值不为空的话 底部弹框的高度则为 手机总高度 减去 topMargin 的高度 此处计算原生处理）
     * 2.webviewHeight 为每次ui设定的弹框 顶部 到手机 底部 的实际高度(原生不做处理)
     * 3. 用法： （如果页面特别过长的话）
     * 4. 如果 topMargin和webviewHeight 都传0的话 则原生显示默认弹框高度
     * @param {String} url
     * @param {String} index（安卓需要根据此字段关闭弹框按钮）
     * @param {Number} topMargin (务必传值：不穿则传 0) -- 设计图高度 --
     * @param {Number} webviewHeight Number类型(务必传值：不穿则传 0) --- webviewHeight = 设计图实际高度 / 2 * 设备宽度 / 375 --- (375 是已iphone 6 为标准)
     */
    if (!window.KuwoInterface && !window.jscObj) return
    webviewHeight = webviewHeight
      ? Math.floor((window.screen.availWidth / 375) * (webviewHeight / 2))
      : 0 // window.screen.availWidth （手机屏幕宽度）
    if (OSFlag) {
      window.jscObj.presentH5PageWithUrl(url, topMargin, webviewHeight)
    } else {
      const pubParam =
        '{"action":"control_presentH5PageWithUrl","url":"' +
        url +
        '","index":"' +
        index +
        '","topMargin":"' +
        topMargin +
        '","webviewHeight":"' +
        webviewHeight +
        '"}'
      window.KuwoInterface.jsCallNative(pubParam)
    }
  },
  /**
   * @param {Number} type // 1. 保存图片; 2.分享到微信; 3.分享到QQ; 4.分享到微博;  5.分享到 qq空间;  6.分享到微信朋友圈;(图片分享)
   * @param {String} category //  1: 'base64' 传的参数为base64 数据；  '2: url'传的参数为正常图片路径; !!必传!!!!
   * @param {base64} base64 // base64 OR url
   */
  handleImageWithOperateType(type: string, category: string, base64: string) {
    if (!window.KuwoInterface && !window.jscObj) return
    try {
      if (OSFlag) {
        window.jscObj.handleImageWithOperateType(type, category, base64)
      } else {
        const pubParam =
          '{"action":"control_handleImageWithOperateType","type":"' +
          type +
          '","category":"' +
          category +
          '","img":"' +
          base64 +
          '"}'
        window.KuwoInterface.jsCallNative(pubParam)
      }
    } catch (error) { }
  },
  // 关闭H5飘屏 hide 关， show 开
  luckGiftScreen: function (operate: string) {
    if (!window.KuwoInterface && !window.jscObj) return
    if (OSFlag) {
      (window.jscObj as any).flyIngScreenOperate(operate)
    } else {
      const luckGiftScreenParam =
        '{"action":"control_luckgift_screen","operate":' + operate + '}'
      window.KuwoInterface.jsCallNative(luckGiftScreenParam)
    }
  },
  /**
     * 设置界面刷新机制
     * 0：不打开刷新
     * 1：打开刷新
     */
  setAppIsReload: function (type: number) {
    if (OSFlag) {
      try {
        (window.jscObj as any).setResumeReload(type)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const jsonstr = '{"action":"set_resume_reload","type":"' + type + '"}'
        window.KuwoInterface.jsCallNative(jsonstr)
      } catch (error) {
        console.log(error)
      }
    }
  }, /**
  *
  * @param type string type: 1: 普通发言； 2: 公屏提示 3： 谁对谁说话
  * @param msg 发言信息
  * @param tellUid  (type 等于3的时候生效 ) 前者
  * @param tellToUid  (type 等于3的时候生效 ) 后者
  * @returns
  */
  addH5PubChatMsg(type: string, msg: string, tellUid: string | number, tellToUid: string | number) {
    if (!window.KuwoInterface && !window.jscObj) return
    try {
      if (OSFlag) {
        (window.jscObj as any).addH5PubChatMsg(type, msg, tellUid, tellToUid)
      } else {
        const pubParam =
          '{"action":"control_addH5PubChatMsg","type":"' +
          type +
          '","msg":"' +
          msg +
          '","tellUid":"' +
          tellUid +
          '","tellToUid":"' +
          tellToUid +
          '"}'
        window.KuwoInterface.jsCallNative(pubParam)
      }
    } catch (error) { }
  },
  /**
  * closeTime 传有的话是关闭时间（closeTime = 1 代表1小时）； closeTime 等于0或者不穿的话下次进房还显示
  * 关闭中间游戏区域(关闭之后一天之内不会再显示)
  * @returns
  */
  closeMiddleSmallScreenRegion(closeTime: string | number) {
    if (!window.KuwoInterface && !window.jscObj) return
    try {
      if (OSFlag) {
        (window.jscObj as any).closeMiddleSmallScreenRegion(closeTime)
      } else {
        const pubParam =
          '{"action":"control_closeMiddleSmallScreenRegion","closeTime":"' +
          closeTime +
          '"}'
        window.KuwoInterface.jsCallNative(pubParam)
      }
    } catch (error) { }
  },
  /**
  * 设置界面刷新机制
  * @param {appId} id 需要跳转的appId
  * @param {网页地址} url 如果跳转不成功进入的h5界面（ios忽略，其会直接跳转AppStore）
  */
  jumpToApp: function (id: string, url: string) {
    if (OSFlag) {
      try {
        (window.jscObj as any).jumpToApp(id)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const jsonstr = '{"action":"jump_to_app","id":"' + id + '","url":"' + url + '"}'
        window.KuwoInterface.jsCallNative(jsonstr)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
export default appBridge
