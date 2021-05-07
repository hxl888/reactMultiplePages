import React, { useState, createRef, useEffect, useContext } from 'react'
import { TanObjContext } from '../../../context-manager'

// 业务相关
import { getName } from 'utils/juxing'
import { openactboxasync } from '@/api/apiJX/may-love2021'
import appBridge from '@/service/appToh5JX'

const UserBox = (prop: any) => {
  const tanObj = useContext<any>(TanObjContext)
  const [showType, setShowType] = useState<number>(1)
  const [showTipTxt, setShowTipTxt] = useState<string>('')
  const innerHtmlDom_1 = createRef<any>()

  useEffect(() => {
    showTipTanFn()
  }, [showTipTxt])
  const showTipTanFn = () => {
    innerHtmlDom_1.current.innerHTML = showTipTxt
  }
  const goToCallPlay = () => {
    // 充值
    appBridge.callPay()
    setTimeout(() => {
      prop.closeTanBoxFn()
    }, 300)
  }
  const buyingGiftBagsFn = async () => {
    // 购买礼包
    if (!tanObj.isLogin) {
      appBridge.callLogin()
      setTimeout(() => {
        prop.closeTanBoxFn()
      }, 300)
      return
    }
    let tips = ''
    const res: any = await openactboxasync(tanObj.uid, tanObj.sid, tanObj.rid)
    const reward = parseFloat(res.reward) || 0
    // <p>星币不足，不想错过就快去充值吧~<br />只需充值≥0.1元就够了</p>
    const errTipObj: any = {
      12: '<p>道具 不够错误</p>',
      13: '<p>时间检查错误</p>',
      19: '<p>不是幸运用户</p>',
      22: '<p>参数错误</p>',
      32: '<p>礼包卖完了~</p>',
      36: '<p>星币不足，不想错过就快去充值吧~只需充值≥0.1元就够了充值回来请去520活动规则页购买礼包哦</p>'
    }
    if (res.status !== 1) {
      tips = errTipObj[res.status] || `<p>${getName(res.statusdesc)}</p>`
      if (res.status === 36) {
        // 星币不足
        setShowType(4)
      } else {
        setShowType(3)
      }
    } else {
      // 购买成功
      tips = `<p><strong>恭喜你获得爱意天使*1、春心萌动*1、玫瑰花*3 </strong>${
        reward ? '<span>心动誓言*1</span>' : ''
      }<p>以上奖励已发放到您的账户，请注意查收~</p>`
      setShowType(3)
    }
    setShowTipTxt(tips)
  }
  const closeGiftBoxFn = () => {
    // 下次进房不再提示
    appBridge.addAppCache('BuyingGiftBagCache', '1')
    setTimeout(() => {
      prop.closeTanBoxFn()
    }, 300)
  }
  return (
    <>
      <div
        className={`centenDownBox fufeilibaoTips520 ${
          showType === 1 ? '' : 'hide'
        }`}
      >
        <a onClick={() => closeGiftBoxFn()}></a>
        <a
          className='fufeilibaoBtn520'
          onClick={() => {
            setShowType(2)
          }}
        >
          0.1元购买
        </a>
      </div>

      {/* 付费礼包确认弹框 */}
      <div
        className={`centenDownBox fufeilibaoTan ${
          showType === 2 ? '' : 'hide'
        }`}
      >
        <a
          className='fufeilibaoTan_close'
          onClick={() => prop.closeTanBoxFn()}
        ></a>
        <div>
          <p>你将花费10星币购买520心动礼包，继续请按确认键。</p>
        </div>
        <a
          className='fufeilibaoBtn520'
          onClick={() => {
            buyingGiftBagsFn()
          }}
        >
          确认
        </a>
      </div>

      {/* 付费礼包普通提示框 */}
      <div
        className={`centenDownBox fufeilibaoTan ${
          showType === 3 ? '' : 'hide'
        }`}
      >
        <a
          className='fufeilibaoTan_close'
          onClick={() => prop.closeTanBoxFn()}
        ></a>
        <div ref={innerHtmlDom_1}></div>
        <a className='fufeilibaoBtn520' onClick={() => prop.closeTanBoxFn()}>
          知道了
        </a>
      </div>

      {/* 付费礼包星币不足提示框 */}
      <div
        className={`centenDownBox fufeilibaoTan ${
          showType === 4 ? '' : 'hide'
        }`}
      >
        <a
          className='fufeilibaoTan_close'
          onClick={() => prop.closeTanBoxFn()}
        ></a>
        <div>
          <p>
            星币不足，不想错过就快去充值吧~
            <br />
            只需充值≥0.1元就够了
          </p>
          <p>充值回来请去520活动规则页购买礼包哦</p>
        </div>
        <a className='fufeilibaoBtn520' onClick={() => goToCallPlay()}>
          去充值
        </a>
      </div>
    </>
  )
}

export default UserBox
