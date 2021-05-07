import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// 业务相关
import { handleRank, countdownFn } from 'utils/juxing'
import { setNewDateTimeFn } from 'utils/index'

const TodayList = (prop: any) => {
  // const roomActivity = useSelector(
  //   (state: any) => state.pendantState.roomActivity
  // )
  const systemTime = useSelector((state: any) => state.commonState.systemTime)
  const webData = useSelector((state: any) => state.pendantState.webData)
  const [downTxt, setDownTxt] = useState('') // 倒计时

  const nowHour = prop.nowHour
  const downTimeFn = () => {
    let goTm = 0
    if (nowHour > 22) {
      // 晚上11点之后
      const newDay = new Date(systemTime * 1000).getDate() + 1 + '' // 都在一个月时间内的活动(就不用判断是否是月底了)
      goTm = setNewDateTimeFn(systemTime, newDay, '19', '0', '0')
    } else if (nowHour < 19) {
      // 晚上19点之前
      goTm = setNewDateTimeFn(systemTime, null, '19', '0', '0')
    } else {
      return
    }
    countdownFn(
      'downTimeFn',
      systemTime,
      goTm,
      (secHtml, minHtml, hourHtml, dayHtml) => {
        setDownTxt(
          `${
            dayHtml !== '00' ? `${dayHtml}天` : ''
          }${hourHtml}:${minHtml}:${secHtml}`
        )
      },
      () => {}
    )
  }

  useEffect(() => {
    downTimeFn()
    return () => {
      clearInterval((window as any)['downTimeFn'])
    }
  }, [nowHour])

  const getPersonDiff = (diff: number, rank: number, cnt: number) => {
    let tipTxt = ''
    const diffs = diff > 0 ? diff : 1
    if (!rank || !cnt) return '暂无收礼速来支持'
    if (rank === 1) {
      tipTxt = `超第2名:${diffs}`
    } else if (rank >= 20) {
      tipTxt = `差前5名:${diffs}`
    } else if (rank >= 6) {
      tipTxt = `差第5名:${diffs}`
    } else {
      tipTxt = `差上1名:${diffs}`
    }
    return tipTxt
  }
  return (
    <div>
      <div className='xiaoshibangDjs520'>
        小时榜开启倒计时
        <span>{downTxt}</span>
      </div>
      <div className='paimingBox520'>
        <p>今日排名:{handleRank(webData.rank, 99)}</p>
        <p>爱意值:{webData.cnt}</p>
        <p>{getPersonDiff(webData.diff, webData.rank, webData.cnt)}</p>
      </div>
    </div>
  )
}

export default TodayList
