import './index.css'
import 'styles/common.css'
import 'styles/reset.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IndexPage from './components'

// 业务相关如下
import appBridge from '@/service/appToh5JX'
import { TanObjContext } from './context-manager'

const ContentPage = () => {
  // 测试数据 start
  const oldTanObj = {
    type: 4,
    uid: 225056653,
    tid: 410976047,
    sid: 30,
    rid: 12,
    boxId: 10,
    closeTime: 120,
    getFlowerNum: 120,
    tipTxt: '手气爆棚,恭喜抢到<span> 9个玫瑰道具 </span>',
    goodsObj: { 2385: { num: 9 } },
    roomActivity: {},
    webData: {
      day: 10
    }
  }
  // 测试数据 end
  const [tanObj, setTanObj] = useState<object>(oldTanObj)
  const [showContentFlag, setShowContentFlag] = useState<boolean>(false) // 页面开关
  const roomCache = useSelector((state: any) => state.commonState.roomCache)

  useEffect(() => {
    defaultFu()
  }, [])

  const defaultFu = () => {
    appBridge.getRoomCache('mayLoveTan2021Apache')
    setTimeout(() => {
      const mayLoveTan2021Apache = roomCache.mayLoveTan2021Apache
      const inFoJson = mayLoveTan2021Apache
        ? Object.assign(
            tanObj,
            JSON.parse(
              decodeURIComponent(decodeURIComponent(mayLoveTan2021Apache))
            )
          )
        : tanObj
      setTanObj(inFoJson)
      console.log('inFoJson: ', inFoJson)
      defaultInfo()
    }, 300)
  }

  const defaultInfo = async () => {
    // 显示开关
    setShowContentFlag(true)
  }
  return showContentFlag ? (
    <TanObjContext.Provider value={tanObj}>
      <IndexPage />
    </TanObjContext.Provider>
  ) : (
    <></>
  )
  // return showContentFlag ? <IndexPage tanObj={tanObj} /> : <></>
}

export default ContentPage
