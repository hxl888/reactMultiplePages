import React from 'react'
// 业务相关如下
import appBridge from '@/service/appToh5JX'

// js库
import { formatObjToStr, getRandomNumber } from 'utils/index'
// import { getName, countdownFn, showActivePic } from 'utils/juxing'

// 业务组件相关
import CenterPage from './CenterPage/index'

const IndexPage = (props: any) => {
  const goToDetailsFn = () => {
    // 跳转榜单
    appBridge.pushPage(
      'https://jx.kuwo.cn/apph5/huodong/love-come-list2021.html?type=2',
      '活动详情'
    )
    setTimeout(() => {
      closeTanBoxFn()
    }, 300)
  }

  const goToTanMore = (type: number, tips = '', obj = {}) => {
    // 跳转弹框页面
    const closeTip = `提示信息${getRandomNumber(1, 1000)}`
    const tanObj = {
      type: type,
      closeTip: closeTip,
      tipTxt: tips,
      tid: props.tanObj.tid,
      rid: props.tanObj.rid,
      uid: props.tanObj.uid,
      sid: props.tanObj.sid,
      webData: props.tanObj.webData,
      isLogin: props.tanObj.isLogin,
      roomActivity: props.tanObj.roomActivity
    }
    let commonUrl = null
    let url = null
    console.log('999999: ', tanObj)
    Object.assign(tanObj, obj)
    commonUrl = formatObjToStr(tanObj)
    appBridge.addRoomCache('mayLoveTan2021Apache', commonUrl)
    url = 'https://jx.kuwo.cn/apph5/huodong/may-love-tan2021.html'
    // url = 'http://172.17.89.128:3030/may-love-tan2021.html'
    appBridge.dilogOpen(url, closeTip)
  }

  const exchangeGiftsFn = () => {
    if (!props.tanObj.isLogin) {
      appBridge.callLogin()
      closeTanBoxFn()
      return
    }
    // 兑换
    const getFlowerNum = props.tanObj.goodsObj[2385].num
    let tipTxt = ''
    if (getFlowerNum >= 999) {
      tipTxt = `已获得<span>${getFlowerNum}</span>朵玫瑰可兑换<span>${Math.floor(
        getFlowerNum / 999
      ) * 200}</span>个爱意天使`
    } else {
      tipTxt = `已获得<span>${getFlowerNum}</span>朵玫瑰<span>,小于999朵玫瑰还不能够兑换~`
    }
    goToTanMore(2, tipTxt, {
      getFlowerNum
    })
    setTimeout(() => {
      closeTanBoxFn()
    }, 300)
  }

  const closeTanBoxFn = () => {
    appBridge.dilogClose(props.tanObj.closeTip)
  }

  return (
    <CenterPage
      goToDetailsFn={goToDetailsFn}
      closeTanBoxFn={closeTanBoxFn}
      exchangeGiftsFn={exchangeGiftsFn}
      {...props}
    />
  )
}

export default IndexPage
