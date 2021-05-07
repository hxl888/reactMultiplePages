import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// 业务相关
import { handleRank } from 'utils/juxing'

const StageRanking = (prop: any) => {
  const infoData = prop.infoData || {}
  const getPersonDiff = (diff: number, rank: number, cnt: number) => {
    let tipTxt = ''
    const diffs = diff > 0 ? diff : 1
    if (!rank || !cnt) return '暂无收礼速来支持'
    if (rank === 1) {
      tipTxt = `超第2名:${diffs}`
    } else if (rank >= 20) {
      tipTxt = `差前5名:${diffs}`
    } else if (rank >= 9) {
      tipTxt = `差第8名:${diffs}`
    } else {
      tipTxt = `差上1名:${diffs}`
    }
    return tipTxt
  }
  return (
    <>
      <div className='guajianTips_paiming520'>
        <p>
          阶段排名：<span>{handleRank(infoData.prank, 99)}</span>
        </p>
        <p>
          {
            getPersonDiff(infoData.pdiff, infoData.prank, infoData.pcnt).split(
              ':'
            )[0]
          }
          <span>
            {
              getPersonDiff(
                infoData.pdiff,
                infoData.prank,
                infoData.pcnt
              ).split(':')[1]
            }
          </span>
        </p>
      </div>
      <div className='guajianTips_totalpaiming520'>
        <p>
          总榜排名：<span>{handleRank(infoData.trank, 99)}</span>
        </p>
        <p>
          {
            getPersonDiff(infoData.tdiff, infoData.trank, infoData.tcnt).split(
              ':'
            )[0]
          }
          <span>
            {
              getPersonDiff(
                infoData.tdiff,
                infoData.trank,
                infoData.tcnt
              ).split(':')[1]
            }
          </span>
        </p>
      </div>
    </>
  )
}

export default StageRanking
