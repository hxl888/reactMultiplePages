import './index.css'
import 'styles/common.css'
import 'styles/reset.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IndexPage from './components'

// 业务相关如下
import appBridge from '@/service/appToh5JX'

// 初始化相关
import { pendantRankHover } from '@/api/apiJX/may-love2021'

const ContentPage = () => {
  const [infoData, SetInfoData] = useState<object>({})
  // TODO: 测试数据 start
  const oldTanObj = {
    closeTip: '提示信息264',
    compatibleFlag: true,
    fid: 102324,
    tid: 414662942,
    rid: 603975,
    uid: 0,
    sid: 0,
    goodsObj: {
      2385: {
        num: 9
      }
    },
    webData: {
      day: 10
    }
  }
  // 测试数据 end
  const roomCache = useSelector((state: any) => state.commonState.roomCache)
  const [tanObj, setTanObj] = useState<object>(oldTanObj)
  const [showContentFlag, setShowContentFlag] = useState<boolean>(false) // 页面开关

  useEffect(() => {
    defaultFu()
  }, [])

  const defaultFu = () => {
    appBridge.getRoomCache('mayLoveInfo2021Apache')
    setTimeout(() => {
      const mayLoveInfo2021Apache = roomCache.mayLoveInfo2021Apache
      const inFoJson = mayLoveInfo2021Apache
        ? JSON.parse(
            decodeURIComponent(decodeURIComponent(mayLoveInfo2021Apache))
          )
        : tanObj
      setTanObj(inFoJson)
      console.log('inFoJson: ', inFoJson)
      defaultInfo(inFoJson)
    }, 300)
  }

  const defaultInfo = async (inFoJson: any) => {
    let newData: any = {}
    try {
      const res = await pendantRankHover(inFoJson.tid, inFoJson.uid)
      newData = res.data || {}
    } catch (error) {}
    const infoData = {
      prank: parseFloat(newData.prank) || 0,
      pcnt: parseFloat(newData.pcnt) || 0,
      pdiff: parseFloat(newData.pdiff) || 0,
      trank: parseFloat(newData.trank) || 0,
      tcnt: parseFloat(newData.tcnt) || 0,
      tdiff: parseFloat(newData.tdiff) || 0,
      user: newData.user || {}
    }
    SetInfoData(infoData)
    // 显示开关
    setShowContentFlag(true)
  }
  return showContentFlag ? (
    <IndexPage infoData={infoData} tanObj={tanObj} />
  ) : (
    <></>
  )
}

export default ContentPage
