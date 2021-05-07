// 排名
import { toStringFn, divide, getRandomNumber, toNumberFn } from './index'
import qs from 'qs'

// 处理ios 安卓返回数据不对的公共方法
import parseNotify from 'utils/parse-notify'
import { deviceType } from '@/service/appToh5JX/common'

export const handleRank = (rank: string | number, limit: string | number) => {
  let rankText: any = ''
  rank = parseInt(toStringFn(rank))
  if (limit) {
    if (rank > limit || rank === -1 || rank === 0) {
      rankText = limit + '+'
    } else if (rank > 0 && rank <= limit) {
      rankText = rank
    }
  } else {
    rankText = rank === -1 || rank === 0 ? '暂无' : rank
  }

  return rankText
}

// 获得百分比数字 (1)
export const getPercentageAnd = (cnt1 = 0, cnt2 = 0) => {
  let num = 0
  cnt1 = parseFloat(toStringFn(cnt1))
  cnt2 = parseFloat(toStringFn(cnt2))
  if (cnt1 === 0 && cnt2 === 0) {
    num = 50
  } else if (cnt1 !== 0 && cnt2 === 0) {
    num = 100
  } else {
    num = divide(cnt1, cnt1 + cnt2) * 100
  }
  return Math.floor(num).toFixed(0) + '%'
}

// 获得百分比数字（2）
export const getPercentageOne = (cnt1 = 0, cnt2 = 0) => {
  cnt1 = parseFloat(toStringFn(cnt1))
  cnt2 = parseFloat(toStringFn(cnt2))
  if (!cnt1 && cnt2) return '0%'
  if (cnt1 && !cnt2) return '100%'
  const perNum = divide(cnt1, cnt2) * 100
  return (perNum >= 100 ? 100 : perNum) + '%'
}

export const getQueryStringArgs = () => {
  const urlStr =
    window.location.search.length > 0
      ? window.location.search.substring(1)
      : ''
  const args = qs.parse(urlStr)
  return args
}
export const dateFormat = (dateTime: number, flag: any, str: string) => {
  const strs = str || '/'
  if (typeof dateTime === 'number') {
    const oDate = new Date(dateTime * 1000)
    const year = oDate.getFullYear()
    const month =
      oDate.getMonth() + 1 >= 10
        ? oDate.getMonth() + 1
        : '0' + (oDate.getMonth() + 1)
    const date =
      oDate.getDate() >= 10 ? oDate.getDate() : '0' + oDate.getDate()
    const hours =
      oDate.getHours() >= 10 ? oDate.getHours() : '0' + oDate.getHours()
    const minutes =
      oDate.getMinutes() >= 10 ? oDate.getMinutes() : '0' + oDate.getMinutes()
    const seconds =
      oDate.getSeconds() >= 10 ? oDate.getSeconds() : '0' + oDate.getSeconds()
    if (flag) {
      return year + strs + month + strs + date
    } else {
      return (
        year +
        strs +
        month +
        strs +
        date +
        ' ' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds
      )
    }
  } else {
    return ''
  }
}

export const handleTime = (time: string | number) => {
  return time < 10 ? '0' + time : time
}

export const getNowTimeStr = (diffTime: any) => {
  // 如果后台给的是毫秒 上面不用除以1000  下面的计算时间也都要除以1000 这里我去掉1000了
  const t = diffTime
  const d = Math.floor(t / 60 / 60 / 24) // 天
  const h = Math.floor((t / 60 / 60) % 24) // 时
  const m = Math.floor((t / 60) % 60) // 分
  const s = Math.floor(t % 60) // 秒
  return {
    s,
    m,
    h,
    d,
    t
  }
}
/**
 *
 *
 * @param {String} clearName 此参数为了一个页面有多个定时器适用的（关 通过window[clearName]关闭定时器）
 * @param {Number} curTm 当前系统时间戳（秒）
 * @param {Number} EndTime 结束的时间戳（秒）
 * @param {Fn} txtCallback
 * @param {Fn} callback
 * @param {boolean} [flag=true]
 * @returns
 */
export const countdownFn = (
  clearName: string | number,
  curTm: number,
  EndTime: number,
  txtCallback: (arg0: string, arg1: string, arg2: string, arg3: string) => any,
  callback: () => any,
  flag = true
) => {
  let dayHtml
  let hourHtml
  let minHtml
  let secHtml
  const nowTime = toNumberFn(
    (new Date(curTm * 1000).getTime() / 1000).toFixed(0)
  )
  let diffTime = EndTime - toNumberFn(nowTime)
  if (nowTime >= EndTime) {
    dayHtml = '00'
    hourHtml = '00'
    minHtml = '00'
    secHtml = '00'
    txtCallback && txtCallback(secHtml, minHtml, hourHtml, dayHtml)
    return
  }
  const { s, m, h, d } = getNowTimeStr(diffTime)
  dayHtml = toStringFn(handleTime(d))
  hourHtml = toStringFn(handleTime(h))
  minHtml = toStringFn(handleTime(m))
  secHtml = toStringFn(handleTime(s))
  txtCallback && txtCallback(secHtml, minHtml, hourHtml, dayHtml)
  const run = function () {
    diffTime--
    const { s, m, h, d, t } = getNowTimeStr(diffTime)
    if (t <= 0 && d <= 0 && h <= 0 && m <= 0 && s <= 0) {
      // 倒计时结束
      if ((window as any)[clearName]) {
        clearInterval((window as any)[clearName])
      }
      dayHtml = '00'
      hourHtml = '00'
      minHtml = '00'
      secHtml = '00'
      const downRanDomTime = getRandomNumber(1000, 3000)
      // 随机数防止 倒计时结束同时向服务请求、服务器承载过大！！！（1s 到 3s 之前的随机数 分批去请求接口）
      if (flag) {
        setTimeout(function () {
          callback && callback()
        }, downRanDomTime)
      } else {
        callback && callback()
      }
      txtCallback && txtCallback(secHtml, minHtml, hourHtml, dayHtml)
    } else {
      dayHtml = toStringFn(handleTime(d))
      hourHtml = toStringFn(handleTime(h))
      minHtml = toStringFn(handleTime(m))
      secHtml = toStringFn(handleTime(s))
      txtCallback && txtCallback(secHtml, minHtml, hourHtml, dayHtml)
    }
  }
  if ((window as any)[clearName]) {
    clearInterval((window as any)[clearName])
  }
  (window as any)[clearName] = setInterval(run, 1000)
}

// export const throttle = (func: Function, delay: number) => {
//   let timer: any
//   let startTime = Date.now()
//   return function () {
//     const curTime = Date.now()
//     const remaining = delay - (curTime - startTime)
//     const args = arguments
//     clearTimeout(timer)
//     if (remaining <= 0) {
//       func.apply(throttle, arguments)
//       startTime = Date.now()
//     } else {
//       timer = setTimeout(func, remaining)
//     }
//   }
// }

// export const debounce = (fn: { apply: (arg0: any, arg1: IArguments) => void }, delay: number) => {
//   const delays = delay || 500
//   let timer: any
//   return function () {
//     const args = arguments
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(function () {
//       timer = null
//       fn.apply(debounce, args)
//     }, delays)
//   }
// }

// 改变地址栏中的type 防止跳页面再跳回来之后页面 导航回到默认tab页
export const changeLocalHistory = (type: string) => {
  const oldHis = window.location.search
  if (oldHis) {
    if (oldHis.indexOf('type=')) {
      const data = getQueryStringArgs()
      data.type = type
      let str = '?'
      Object.keys(data).forEach((item: any) => {
        str += item + '=' + data[item] + '&'
      })
      window.history.replaceState({}, 'null', str)
    } else {
      window.history.replaceState({}, 'null', oldHis + 'type=' + type)
    }
  } else {
    window.history.replaceState({}, 'null', '?type=' + type)
  }
}

export const resetPictureUrl = (url: string) => {
  if (!url) return
  if (url.indexOf('.kuwo.cn') === -1) return url.replace('http:', 'https:')
  return 'https://kwimg.kuwo.cn' + url.split('.kuwo.cn')[1]
}

export const getPicImg = (picUrl: string, saml = true) => {
  if (!saml) {
    return picUrl
      ? decodeURIComponent(picUrl).replace('http:', 'https:')
      : '//imagexc.kuwo.cn/kuwolive/136-136-user.jpg'
  }
  if (picUrl) {
    picUrl = decodeURIComponent(picUrl)
    if (!saml) {
      // 返回原图
      return resetPictureUrl(picUrl)
    }
    // 返回小图 加b后缀小图
    if (picUrl.indexOf('.jpg') === -1) return resetPictureUrl(picUrl)
    return resetPictureUrl(picUrl.split('.jpg')[0] + 'b.jpg')
  } else {
    return '//imagexc.kuwo.cn/kuwolive/136-136-user.jpg'
  }
}

export const getName = (name: string) => {
  try {
    return name ? decodeURIComponent(decodeURIComponent(name)) : ''
  } catch (error) {
    try {
      return name ? decodeURIComponent(name) : ''
    } catch (error) {
      return name
    }
  }
}

export const showFamilyPic = (fid: string) => {
  // 家族徽章图片
  if (!fid) return ''
  return `//imagexc.kuwo.cn/kuwolive/klive/badge_bak2/${fid}.png`
}

export const showActivePic = (badgeId: string, flag = true) => {
  // 活动等级勋章
  if (!badgeId) {
    return '//imagexc.kuwo.cn/kuwolive/huodong/loveDay202077/h5pendant/0.png'
  }
  return flag
    ? `//imagexc.kuwo.cn/kuwolive/badge/${badgeId}_s.png?`
    : `//imagexc.kuwo.cn/kuwolive/badge/${badgeId}.png?`
}

// 处理ios 安卓返回数据不对的公共方法
interface ParseNotifyObj {
  [key: string]: any;
}
/**
 *
 * @param obj // 通知返回来的大对象
 * @param parentStr // 父级参数名 （'userlist')
 * @param childrenStr // 子级参数名 ('user')
 *
 * 例如这种格式的数据
 * userlist{
 *  user<id|name|pic|fid|fname|fpic|rank>{
 *  112|test|http://ddd.jpg|113|user|http://user.jpg|1
 *  }
 * }
*
 */
export const dealWithParseNotifyFn = (obj: ParseNotifyObj, parentStr: string, childrenStr: string): Array<any> => {
  const OSFlag = deviceType !== 'Android' // h5 暂时未定义
  let childrenData = null
  let newData = []
  // ios 返回的参数与安卓不一样（一条数据的话有可能返回一个对象而不是数组多条数据的话则返回数组
  if (OSFlag) {
    // ios mem数据需要自己解析
    const rawNotiInfo = obj?.rawNotiInfo || ''
    const parseNotifyObj = parseNotify(rawNotiInfo)
    const parentData = parseNotifyObj[parentStr]
    childrenData = parentData[childrenStr]
  } else {
    childrenData = obj[parentStr][childrenStr]
  }
  if (!childrenData.length) {
    newData = [childrenData]
  } else {
    newData = childrenData
  }
  return newData // 返回一个数组
}
