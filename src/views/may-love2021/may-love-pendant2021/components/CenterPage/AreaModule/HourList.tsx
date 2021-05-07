import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

// 业务相关
import { handleRank } from 'utils/juxing'

const HourList = (props: any) => {
  const roomActivity = useSelector(
    (state: any) => state.pendantState.roomActivity
  )
  const webData = useSelector((state: any) => state.pendantState.webData)
  // useEffect(() => {}, [])

  const getPersonDiff = (diff: number, rank: number, cnt: number) => {
    let tipTxt = ''
    const diffs = diff > 0 ? diff : 1
    if (!rank || !cnt) return '暂无收礼速来支持'
    if (rank === 1) {
      tipTxt = `超第2名:${diffs}`
    } else if (rank >= 20) {
      tipTxt = `差前5名:${diffs}`
    } else if (rank >= 4) {
      tipTxt = `差第3名:${diffs}`
    } else {
      tipTxt = `差上1名:${diffs}`
    }
    return tipTxt
  }
  return (
    <div className='xiaoshiBox520'>
      <div className='xiaoshiTit520'>
        {props.nowHour}-{props.nowHour + 1}点
      </div>
      <p>今日排名: {handleRank(webData.hrank, 99)}</p>
      <p>爱意值:{webData.hcnt}</p>
      <p>{getPersonDiff(webData.hdiff, webData.hrank, webData.hcnt)}</p>
    </div>
  )
}

export default HourList
