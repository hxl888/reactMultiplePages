import React, { useState, createRef, useEffect, useContext } from 'react'
import { TanObjContext } from '../../../context-manager'
// 业务相关
import { getName } from 'utils/juxing'
import { openfmpktasync } from '@/api/apiJX/may-love2021'
import appBridge from '@/service/appToh5JX'

const UserBox = (prop: any) => {
  const tanObj = useContext(TanObjContext) as any
  const [showType, setShowType] = useState<number>(tanObj.type)
  const [showTipTxt, setShowTipTxt] = useState<string>(tanObj.tipTxt)
  const innerHtmlDom_1 = createRef<any>()

  useEffect(() => {
    showTipTanFn()
  }, [showTipTxt])

  const showTipTanFn = () => {
    innerHtmlDom_1.current.innerHTML = showTipTxt
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
    const res: any = await openfmpktasync(
      tanObj.uid,
      tanObj.sid,
      tanObj.rid,
      tanObj.boxId,
      tanObj.pcnt
    )
    const errTipObj = {
      10: '距离奖励就差一点点哦！<br />下次加油吧～',
      19: '只有给主播送过活动礼物的用户才能抢哦！快去送礼吧～',
      22: '只有给主播送过活动礼物的用户才能抢哦！快去送礼吧～',
      32: '您已经抢过了不要贪心哦~'
    }
    let tips = ''
    if (res.status !== 1) {
      tips = (errTipObj as any)[res.status] || getName(res.statusdesc)
      setShowType(9)
      setShowTipTxt(tips)
    } else {
      prop.closeTanBoxFn()
    }
  }
  return (
    <>
      <div
        className={`centenDownBox libaoTips520 ${showType === 3 ? '' : 'hide'}`}
      >
        <a
          onClick={() => {
            buyingGiftBagsFn()
          }}
        ></a>
      </div>

      {/* 心动礼包提示框 */}
      <div
        className={`centenDownBox libaoTan_520 ${showType === 9 ? '' : 'hide'}`}
      >
        <a
          className='libaoTan_close520'
          onClick={() => prop.closeTanBoxFn()}
        ></a>
        <p ref={innerHtmlDom_1}></p>
        <a className='libaoTan_520_know' onClick={() => prop.closeTanBoxFn()}>
          知道了
        </a>
      </div>
    </>
  )
}

export default UserBox
