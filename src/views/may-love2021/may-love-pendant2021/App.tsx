import './index.less'
import 'styles/common.css'
import 'styles/reset.css'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import IndexPage from './components'

import { useSelector, useDispatch } from 'react-redux'
// store相关
// import store from '@/store'
import {
  setDownTimeTxt,
  setRoomActivity,
  setWebData
} from '@/store/pendant/may-love2021/action'
// import { setSystemTime } from '@/store/common/action'

// 业务相关如下
import { countdownFn } from 'utils/juxing'

// 初始化相关
import { pendantRank } from '@/api/apiJX/may-love2021'
import initApiFn from '@/service/jx-service'

const ContentPage = () => {
  // const chidRenFun = useRef<any>()

  // const webDataObj = useSelector((state: any) => state.pendantState.webData)
  // TODO: 活动正式开始时间
  const [activityStartTime] = useState<number>(
    new Date('2021/05/07 11:00:00').getTime() / 1000
  )
  const userInfoObj = useSelector((state: any) => state.commonState.userInfoObj)
  const enterInfo = useSelector((state: any) => state.commonState.enterInfo)

  const [activeStarFlag, setActiveStarFlag] = useState<boolean>(false) // 倒计时开关
  const [showContentFlag, setShowContentFlag] = useState<boolean>(false) // 页面开关
  const dispatch = useDispatch()

  useEffect(() => {
    initFn()
  }, [])
  const initFn = async (flag = false) => {
    const data = await initApiFn(true, flag)
    const dataObj = data as any
    const { activityInfoData } = dataObj
    initPendant(activityInfoData)
  }
  const initPendant = (activityInfoData: any) => {
    const system = activityInfoData.systm // 系统时间
    const goTm = activityStartTime
    if (system < goTm) {
      countdownFn(
        'initPendant',
        system,
        goTm,
        (secHtml, minHtml) => {
          const downTimeHtml = `${minHtml}:${secHtml}`
          dispatch(setDownTimeTxt(downTimeHtml))
        },
        () => {
          setTimeout(() => {
            // 防止接口在11点之前后端没有上线请求失败
            initFn(true)
          }, 1000)
        }
      )
      setActiveStarFlag(true) // 倒计时打开
      setShowContentFlag(true)
      return
    }
    const data2 = activityInfoData || {}
    const activity = {
      l520boxid: parseFloat(data2.l520boxid) || 0,
      l520starttm: parseFloat(data2.l520starttm) || 0,
      l520endtm: parseFloat(data2.l520endtm) || 0,
      l520coin: parseFloat(data2.l520coin) || 0,
      l520pcnt: parseFloat(data2.l520pcnt) || 0,
      fid: 0, // 进房默认为空
      l520coinUser: '', // 进房默认为空
      consume: 0, // 进房默认为空
      l520car: parseFloat(data2.l520car) || 0
    }

    console.log('activity: ', activity)
    dispatch(setRoomActivity(activity))
    defaultPendant()
  }
  const defaultPendant = async () => {
    let newData: any = {}
    try {
      const tid = enterInfo.room.ownerid
      const uid = userInfoObj.uid || 0
      const res = await pendantRank(tid, uid)
      newData = res.data || {}
    } catch (error) {}
    const webData = {
      rank: parseFloat(newData.rank) || 0,
      cnt: parseFloat(newData.cnt) || 0,
      diff: parseFloat(newData.diff) || 0,
      hrank: parseFloat(newData.hrank) || 0,
      hcnt: parseFloat(newData.hcnt) || 0,
      hdiff: parseFloat(newData.hdiff) || 0,
      isbuy: parseFloat(newData.isbuy) || 0,
      day: parseFloat(newData.day) || 1
    }
    dispatch(setWebData(webData))
    // 显示开关
    setActiveStarFlag(false) // 倒计时关闭
    setShowContentFlag(true)
  }

  return showContentFlag ? (
    <div>
      <IndexPage activeStarFlag={activeStarFlag} />
    </div>
  ) : (
    <></>
  )
}

export default ContentPage
