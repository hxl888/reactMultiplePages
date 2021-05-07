import React, { useEffect, createRef, useState, useContext } from 'react'

import { TanObjContext } from '../../context-manager'

// 业务相关
import { activityDraw } from '@/api/apiJX/may-love2021'
import { getName } from 'utils/juxing'
import { parseTime } from 'utils/index'

import BeckoningGiftBag from './AreaModule/BeckoningGiftBag' // 心动礼包
import BuyingGiftBag from './AreaModule/BuyingGiftBag'
import { dailyDescribe, dailyArr } from './daily-copywriting'

const CenterPage = (props: any) => {
  const tanObj = useContext(TanObjContext) as any

  const innerHtmlDom_1 = createRef<any>()
  const innerHtmlDom_2 = createRef<any>()
  const innerHtmlDom_3 = createRef<any>()
  const innerHtmlDom_4 = createRef<any>()
  const innerHtmlDom_5 = createRef<any>()
  const [showType, setShowType] = useState<number>(tanObj.type)
  const [showTipTxt, setShowTipTxt] = useState<string>(tanObj.tipTxt)
  useEffect(() => {
    showTipsFn()
  })

  const showTipsFn = () => {
    innerHtmlDom_1.current.innerHTML = showTipTxt
    innerHtmlDom_2.current.innerHTML = showTipTxt
    innerHtmlDom_3.current.innerHTML = showTipTxt
    innerHtmlDom_4.current.innerHTML = showTipTxt
    innerHtmlDom_5.current.innerHTML = showTipTxt
  }
  const showTipTanFn = (type = 1, tips: string) => {
    setShowType(type)
    setShowTipTxt(tips)
  }

  const openLoveBooksFn = () => {
    setShowType(8)
    setShowTipTxt('')
  }
  const goToExchangeFn = async () => {
    // 兑换
    if (tanObj.getFlowerNum < 999) {
      props.closeTanBoxFn()
      return
    }
    const res: any = await activityDraw(tanObj.uid, tanObj.sid, tanObj.rid)
    const errTipObj: any = {
      12: '玫瑰数不足，请继续收集哦！',
      13: '时间检查错误',
      22: '参数错误'
    }
    let tips = ''
    const cnt = parseFloat(res.cnt) || 0
    if (res.status !== 1) {
      tips = `兑换失败! <br />${errTipObj[res.status] ||
        getName((res as any).statusdesc)}`
    } else {
      tips = `兑换成功! <br /><span>${cnt * 200}</span>个爱意天使已放入你的库存`
    }
    showTipTanFn(1, tips)
  }

  return (
    <>
      {/* 普通提示弹框 */}
      <div
        className={`guajianTips520_s centenDownBox ${
          showType === 1 ? '' : 'hide'
        }`}
      >
        <a
          className='guajianTips520_s_close'
          onClick={() => props.closeTanBoxFn()}
        ></a>
        <p ref={innerHtmlDom_1}></p>
        <a onClick={() => props.closeTanBoxFn()}>知道了</a>
      </div>

      {/* 兑换弹框 */}
      <div
        className={`guajianTips520_s centenDownBox ${
          showType === 2 ? '' : 'hide'
        }`}
      >
        <a
          className='guajianTips520_s_close'
          onClick={() => props.closeTanBoxFn()}
        ></a>
        <p ref={innerHtmlDom_2}></p>
        <a onClick={() => goToExchangeFn()}>
          {tanObj.getFlowerNum >= 999 ? '兑 换' : '知道了'}
        </a>
      </div>

      {/* 心动礼包 */}
      <div
        className={`centenDownBox ${
          showType === 3 || showType === 9 ? '' : 'hide'
        }`}
      >
        <BeckoningGiftBag showTipTanFn={showTipTanFn} {...props} />
      </div>

      {/* 付费礼包 */}
      <div className={`centenDownBox ${showType === 4 ? '' : 'hide'}`}>
        <BuyingGiftBag showTipTanFn={showTipTanFn} {...props} />
      </div>

      {/* 爱情魔盒 */}
      <div
        className={`centenDownBox moheTips520 ${showType === 5 ? '' : 'hide'}`}
      >
        <p ref={innerHtmlDom_3}></p>
        <a onClick={() => openLoveBooksFn()}></a>
      </div>

      {/* 用户徽章升级 */}
      <div
        className={`xunzhangshengjiTips centenDownBox ${
          showType === 6 ? '' : 'hide'
        }`}
      >
        <div ref={innerHtmlDom_4}></div>
        <a className='close_btn' onClick={() => props.closeTanBoxFn()}></a>
      </div>

      {/* 摩天轮特效 */}
      <div
        className={`centenDownBox motianlunTips520 ${
          showType === 7 ? '' : 'hide'
        }`}
      >
        <p ref={innerHtmlDom_5}></p>
        <a onClick={() => props.closeTanBoxFn()}></a>
      </div>

      {/* 爱情魔法书 */}
      <div
        className={`centenDownBox mailTips520 ${showType === 8 ? '' : 'hide'}`}
      >
        <p>TO：亲爱的{tanObj.anchorName}</p>
        <p>
          {
            dailyDescribe[
              dailyArr[parseFloat(tanObj.uid) % 20][tanObj.webData.day - 1]
            ]
          }
        </p>
        <div className='mail_btn520'>
          <a className='pic90_520'>
            <img src={tanObj.fPic} />
          </a>
          <div>
            <p>爱你的</p>
            <p>
              <a>{tanObj.fName}</a>
            </p>
            <p>{parseTime(+new Date(), '{y}.{m}.{d}')}</p>
          </div>
        </div>
        <span className='closeBtn' onClick={() => props.closeTanBoxFn()}></span>
      </div>
    </>
  )
}

export default CenterPage
