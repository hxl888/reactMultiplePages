import React, {
  // useImperativeHandle,
  // forwardRef,
  useEffect,
  useState
} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import store from '@/store'
import {
  setRoomActivity,
  setWebData
} from '@/store/pendant/may-love2021/action'
import { setSystemTime } from '@/store/common/action'

// 业务相关如下
import EventEmitter from '@/service/event-bus'
import appBridge from '@/service/appToh5JX'

// import { deviceType } from '@/service/appToh5JX/common'

// js库
import { formatObjToStr, getRandomNumber } from 'utils/index'
import { getName, showActivePic } from 'utils/juxing'

// 业务组件相关
import CountdownPage from './CountdownPage/index' // 倒计时
import CenterPage from './CenterPage/index' // 正式页面
import ReturnToFactoryPendant from './ReturnToFactoryPendant/index' // 返厂页面

const IndexPage = (props: any, ref: any) => {
  const dispatch = useDispatch()
  const [goodsObj, setGoodsList] = useState<object>({ 2385: {} })
  // store.getState().pendantState.roomActivity

  const webData = useSelector((state: any) => state.pendantState.webData)
  const roomActivity = useSelector(
    (state: any) => state.pendantState.roomActivity
  )
  const isAnchor = useSelector((state: any) => state.commonState.isAnchor)
  const isLogin = useSelector((state: any) => state.commonState.isLogin)
  const userInfoObj = useSelector((state: any) => state.commonState.userInfoObj)
  const enterInfo = useSelector((state: any) => state.commonState.enterInfo)
  const myInfoObj = useSelector((state: any) => state.commonState.myInfoObj)

  useEffect(() => {
    initFn()
    // TODO: 测试
    // const timeNull = setTimeout(() => {
    //   const data = {
    //     cmd: 'notifygloballove520daychg',
    //     uid: '225056653',
    //     rank: '1',
    //     daytype: '15',
    //     consume: '1990',
    //     pkrid: '0',
    //     pktname: '',
    //     rid: '630759',
    //     tid: '315762289',
    //     tname: '%E9%9A%BE%E5%8F%97666%25',
    //     tpic:
    //       'https://kwimg9.kuwo.cn/star/kuwolive/89/7/1616466848611_315762289.jpg',
    //     fid: '225056653',
    //     fname: '%E4%B9%8C%E6%BC%86%E5%A2%A8%E9%BB%918074',
    //     fpic:
    //       'https://kwimg8.kuwo.cn/star/koowolive/53/52/1590651188937_225056653.jpg',
    //     fonst: '1',
    //     pid: '1619343422',
    //     pcnt: '1',
    //     starttm: '1619336410',
    //     endtm: '1619350810'
    //   }
    //   // document.getElementsByTagName('body')[0].style.background = 'red'
    //   EventEmitter.emit('flashNotice', data)
    //   // if (this.uid === 225056653) {
    //   // }
    // }, 3000)
    // return () => {
    //   clearTimeout(timeNull)
    // }
  }, [])
  const initFn = () => {
    callApp()
    setListenFlash()
    getCarDataFn()
    showPayGiftPackageFn() // 付费礼包设置
    showGiftBoxFn(
      roomActivity.l520starttm,
      roomActivity.l520endtm,
      roomActivity.l520boxid,
      roomActivity.l520pcnt
    )
  }
  const showGiftBoxFn = (
    starTime: number,
    endTime: number,
    boxId: number | string,
    pcnt: number | string,
    closeTime = 0
  ) => {
    const systemTime = +new Date() / 1000
    if (systemTime > starTime && systemTime < endTime) {
      // 礼包
      goToTanMore(3, '', {
        boxId,
        pcnt,
        closeTime: closeTime || endTime - starTime
      })
    }
  }
  const getCarDataFn = () => {
    const goodsList =
      (myInfoObj && myInfoObj.user && myInfoObj.user.goodslist) || []
    const newObj: any = {
      2385: {
        num: 0
      }
    }
    if (goodsList.length) {
      goodsList.forEach((item: any) => {
        const id = parseFloat(item.id)
        newObj[id] = item
      })
    }
    setGoodsList(newObj)
  }

  const showPayGiftPackageFn = () => {
    // 付费礼包显示
    if (props.activeStarFlag || webData.day >= 15) return
    appBridge.getAppCache('BuyingGiftBagCache')
    setTimeout(() => {
      const BuyingGiftBagCacheFlag = (store.getState().commonState
        .appCache as any).BuyingGiftBagCache
      // 已经买过 或者关闭的不弹
      if (BuyingGiftBagCacheFlag || webData.isbuy === 1) return
      goToTanMore(4, '')
    }, 300)
  }

  const callApp = () => {
    const notify =
      'notifygoods|notifylove520lightchg|notifyroomlove520pkt|notifylove520pktreward|notifylove520chg|notifygloballove520daychg|notifyroomlove520magicbook|notifylove520202105badgelvl|notifylove520202105hour|notifylove520202105hrank|notifylove520202105wheeleffect|notifyactivityfire|notifyrobactivityfire'
    appBridge.getRoomNotify(notify)
  }
  const setListenFlash = () => {
    // 活动送礼收到通知
    EventEmitter.addListener('flashNotice', (obj: any) => {
      if (!obj) return false
      if (obj.cmd === 'notifygoods') {
        console.log('用户送礼获得卡片通知: ', obj)
        notifygoodsFn(obj)
      } else if (obj.cmd === 'notifylove520lightchg') {
        console.log('心动灯心动值变化通知: ', obj)
        notifylove520lightchgFn(obj)
      } else if (obj.cmd === 'notifyroomlove520pkt') {
        console.log('房间心动礼包掉落通知: ', obj)
        notifyroomlove520pktFn(obj)
      } else if (obj.cmd === 'notifylove520pktreward') {
        console.log('抢到心动礼包奖励房间通知: ', obj)
        notifylove520pktrewardFn(obj)
      } else if (obj.cmd === 'notifylove520chg') {
        console.log('排名变化通知: ', obj)
        notifylove520chgFn(obj)
      } else if (obj.cmd === 'notifygloballove520daychg') {
        console.log('切天通知: ', obj)
        notifygloballove520daychgFn(obj)
      } else if (obj.cmd === 'notifyroomlove520magicbook') {
        console.log('爱情魔法书通知: ', obj)
        notifyroomlove520magicbookFn(obj)
      } else if (obj.cmd === 'notifylove520202105badgelvl') {
        console.log('用户徽章升级: ', obj)
        notifylove520202105badgelvlFn(obj)
      } else if (obj.cmd === 'notifylove520202105hour') {
        console.log('切小时通知: ', obj)
        notifylove520202105hourFn(obj)
      } else if (obj.cmd === 'notifylove520202105hrank') {
        console.log('小时排名通知: ', obj)
        notifylove520202105hrankFn(obj)
      } else if (obj.cmd === 'notifylove520202105wheeleffect') {
        console.log('摩天轮特效通知: ', obj)
        notifylove520202105wheeleffectFn(obj)
      } else if (obj.cmd === 'notifyactivityfire') {
        console.log('抢烟花通知: ', obj)
        notifyactivityfireFn(obj)
      } else if (obj.cmd === 'notifyrobactivityfire') {
        console.log('抢到星币数量通知: ', obj)
        notifyrobactivityfireFn(obj)
      }
    })
  }
  const notifygoodsFn = (obj: any) => {
    console.log('用户送礼获得卡片通知: ', obj)
    const goods = obj.goodslist && obj.goodslist.goods
    // const OSFlag = deviceType !== 'Android' // h5 暂时未定义
    if (goods) {
      if (goods.length) {
        goods.forEach((item: any) => {
          const id = parseFloat(item.id)
          if ((goodsObj as any)[id]) {
            ;(goodsObj as any)[id].num = parseFloat(item.num)
          }
        })
      } else {
        const id = parseFloat(goods.id)
        if ((goodsObj as any)[id]) {
          ;(goodsObj as any)[id].num = parseFloat(goods.num)
        }
      }
    }
    setGoodsList(goodsObj)
  }

  const notifylove520lightchgFn = (obj: any) => {
    const fonSt = parseFloat(obj.fonst) || 0
    let fName = getName(obj.fname) || ''
    fName = fName && fonSt ? fName : '神秘人'
    const newObj = {
      l520coin: parseFloat(obj.coin) || 0,
      l520coinUser: fName,
      fid: parseFloat(obj.fid) || 0,
      consume: parseFloat(obj.consume) || 0
    }
    dispatch(setRoomActivity(newObj))
  }
  const notifyroomlove520pktFn = (obj: any) => {
    // 房间心动礼包掉落通知
    const newObj = {
      l520boxid: parseFloat(obj.pid) || 0,
      l520pcnt: parseFloat(obj.pcnt) || 0,
      l520starttm: parseFloat(obj.starttm) || 0,
      l520endtm: parseFloat(obj.endtm) || 0
    }
    dispatch(setRoomActivity(newObj))
    showGiftBoxFn(
      newObj.l520starttm,
      newObj.l520endtm,
      newObj.l520boxid,
      newObj.l520pcnt,
      60
    )
  }
  const notifylove520pktrewardFn = (obj: any) => {
    // 抢到心动礼包奖励房间通知
    const uid = parseFloat(userInfoObj.uid) || 0
    if (uid !== parseFloat(obj.uid)) return
    const coin = parseFloat(obj.coin) || 0
    const rose = parseFloat(obj.rose) || 0
    const card = parseFloat(obj.card) || 0
    let tips = ''
    if (!coin && !rose && !card) {
      // 抢空了
      tips = '距离奖励就差一点点哦！<br />下次加油吧～'
    } else {
      tips = `手气爆棚,恭喜您抢到<span>${coin ? `${coin}星币` : ''} ${
        rose ? `${rose}个玫瑰道具` : ''
      } ${card ? `${card}个加油卡` : ''}</span>`
    }
    goToTanMore(9, tips)
  }
  const notifylove520chgFn = (obj: any) => {
    // 排名变化通知
    const webData = {
      cnt: parseFloat(obj.love) || 0,
      rank: parseFloat(obj.rank) || 0,
      diff: parseFloat(obj.diff) || 0
    }
    dispatch(setWebData(webData))
  }
  const notifygloballove520daychgFn = (obj: any) => {
    // 切天通知
    const webData = {
      rank: 100,
      cnt: 0,
      diff: 0,
      hrank: 100,
      hcnt: 0,
      hdiff: 0,
      day: parseFloat(obj.daytype) || 0
    }
    dispatch(setWebData(webData))
  }
  const notifyroomlove520magicbookFn = (obj: any) => {
    // 爱情魔法书通知
    if (!isAnchor) return
    const rank = parseFloat(obj.rank) || 100
    const coinPool = [10, 8, 6, 5, 4]
    let tips =
      rank <= 5
        ? `恭喜你进入昨日日榜前五，奖励${
            coinPool[rank - 1]
          }万星币和爱情魔盒一个，快点打开吧~`
        : `恭喜你进入昨日日榜前1000，获得爱情魔盒一个，快点打开吧~`
    goToTanMore(5, tips, {
      anchorName: getName(enterInfo.room.name) || '',
      fName: getName(obj.fname) || '',
      fPic: getName(obj.fpic) || ''
    })
  }
  const notifylove520202105badgelvlFn = (obj: any) => {
    // 用户徽章升级
    if (parseFloat(obj.uid) !== parseFloat(userInfoObj.uid)) return
    const tips = `<p>恭喜<a>您</a>升级到</p><img src="${showActivePic(
      obj.badgeid
    )}" />`
    goToTanMore(6, tips)
  }
  const notifylove520202105wheeleffectFn = (obj: any) => {
    // 摩天轮特效通知
    if (!isAnchor) return
    const rank = parseFloat(obj.rank) || 4
    const tipObj: any = {
      1: '恭喜你成为上一时段<span>全网第一</span>,获得<span>20990星币</span>和<span>情侣入场特效</span>,并进入爱情摩天轮',
      2: '恭喜你成为上一时段<span>全网第二</span>,获得<span>10990星币</span>奖励,继续加油哦！',
      3: '恭喜你成为上一时段<span>全网第三</span>,获得<span>6600星币</span>,继续加油哦！'
    }
    if (rank > 3) return
    let tips = tipObj[rank]
    goToTanMore(7, tips)
  }
  const notifylove520202105hourFn = (obj: any) => {
    // 切小时通知
    const sysTm = parseFloat(obj.systm) || 0
    dispatch(setSystemTime(sysTm))

    const webData = {
      hrank: 100,
      hcnt: 0,
      hdiff: 0
    }
    dispatch(setWebData(webData))
  }
  const notifylove520202105hrankFn = (obj: any) => {
    // 小时排名通知
    const webData = {
      hrank: parseFloat(obj.rank) || 0,
      hcnt: parseFloat(obj.score) || 0,
      hdiff: parseFloat(obj.diff) || 0
    }
    dispatch(setWebData(webData))
  }
  const notifyactivityfireFn = (obj: any) => {
    // 抢烟花通知
    if (Math.floor(obj.rid) === Math.floor(enterInfo.room.id)) {
      const coinDropUrl = 'https://jx.kuwo.cn/apph5/huodong/coin-drop.html'
      const params = {
        nickname: enterInfo.user.nickname,
        rid: enterInfo.room.id,
        uid: userInfoObj.uid || 0,
        sid: userInfoObj.sid || 0,
        isLogin: isLogin,
        flowerid: obj.append || 0,
        type: obj.type || 0
      }
      const commonUrl = formatObjToStr(params)
      appBridge.addRoomCache('coinDropApache', commonUrl)
      appBridge.openBigPage(coinDropUrl, '', '')
    }
  }
  const notifyrobactivityfireFn = (obj: any) => {
    // 抢到星币数量通知
    const cnt = obj.cnt || 0
    const gid = obj.gid || 0
    const url = `https://jx.kuwo.cn/apph5/huodong/coins.html?cnt=${cnt}&gid=${gid}`
    appBridge.dilogOpen(url, '抢星币')
  }
  const goToDetailsFn = () => {
    // 跳转榜单
    appBridge.pushPage(
      'https://jx.kuwo.cn/apph5/huodong/love-come-list2021.html?type=0',
      '活动详情'
    )
  }
  const goToTanMore = (type: number, tips = '', obj = {}) => {
    // 跳转弹框页面
    const closeTip = `提示信息${getRandomNumber(1, 1000)}`
    const tanObj = {
      type: type,
      closeTip: closeTip,
      tipTxt: tips,
      tid: enterInfo.room.ownerid,
      rid: enterInfo.room.id,
      uid: userInfoObj.uid || 0,
      sid: userInfoObj.sid || 0,
      webData: webData,
      isLogin: isLogin,
      roomActivity: roomActivity
    }
    let commonUrl = null
    let url = null
    Object.assign(tanObj, obj)
    commonUrl = formatObjToStr(tanObj)
    appBridge.addRoomCache('mayLoveTan2021Apache', commonUrl)
    url = 'https://jx.kuwo.cn/apph5/huodong/may-love-tan2021.html'
    // url = 'http://172.17.89.128:3030/may-love-tan2021.html'
    appBridge.dilogOpen(url, closeTip)
  }

  const hoverPendantFn = () => {
    goMorePage()
  }

  const goMorePage = (obj = {}, flag = true) => {
    // 跳转hover页面
    console.log(isAnchor)
    const compatibleFlag = appBridge.bottomDilogFlag()
    const closeTip = `提示信息${getRandomNumber(1, 1000)}`
    const tanObj = {
      closeTip: closeTip,
      compatibleFlag: compatibleFlag,
      fid: enterInfo.user.fid,
      tid: enterInfo.room.ownerid,
      rid: enterInfo.room.id,
      uid: userInfoObj.uid || 0,
      sid: userInfoObj.sid || 0,
      webData: webData,
      isLogin: isLogin,
      goodsObj: goodsObj,
      userInfoObj: userInfoObj,
      roomActivity: roomActivity
    }
    // console.log('roomActivityObj----: ', roomActivityObj)
    let commonUrl = null
    let url = null
    Object.assign(tanObj, obj)
    console.log('tanObj: ', tanObj)
    url = 'https://jx.kuwo.cn/apph5/huodong/may-love-info2021.html'
    // url = 'http://172.17.89.128:3030/may-love-info2021.html'
    commonUrl = formatObjToStr(tanObj)
    appBridge.addRoomCache('mayLoveInfo2021Apache', commonUrl)

    let botHei = 0
    const botHeiArr = [919]
    if (compatibleFlag && flag) {
      // 支持从底部滑入打开的弹框(新版本)
      botHei = botHeiArr[0]
      appBridge.bottomDilogOpen(url, closeTip, 0, botHei)
    } else {
      // 不支持（老版本中间弹框）
      appBridge.dilogOpen(url, closeTip)
    }
  }

  return (
    <div className='defaultClass' style={{ bottom: '0' }}>
      {props.activeStarFlag ? (
        <CountdownPage goToDetailsFn={goToDetailsFn} />
      ) : webData.day < 15 ? (
        <CenterPage hoverPendantFn={hoverPendantFn} />
      ) : (
        <ReturnToFactoryPendant />
      )}
    </div>
  )
}

export default IndexPage
// export default forwardRef(IndexPage)
