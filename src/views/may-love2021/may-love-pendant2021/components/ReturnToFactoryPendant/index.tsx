import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { handleRank, getName, showActivePic, getPicImg } from 'utils/juxing'
import { pendantRankHover } from '@/api/apiJX/may-love2021'
import appBridge from '@/service/appToh5JX'

const CenterPage = () => {
  const userInfoObj = useSelector((state: any) => state.commonState.userInfoObj)
  const enterInfo = useSelector((state: any) => state.commonState.enterInfo)
  const webData = useSelector((state: any) => state.pendantState.webData)
  const [infoData, SetInfoData] = useState<any>({})

  useEffect(() => {
    defaultInfo()
  }, [])
  const defaultInfo = async () => {
    let newData: any = {}
    try {
      const res = await pendantRankHover(
        enterInfo.room.ownerid,
        userInfoObj.uid
      )
      newData = res.data || {}
      const infoData = newData.user || {}
      SetInfoData(infoData)
    } catch (error) {}
  }
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
  const goToDetailsFn = () => {
    appBridge.pushPage(
      'https://jx.kuwo.cn/apph5/huodong/love-come-back2021.html',
      '活动详情'
    )
  }
  return (
    <div className='guajian521' onClick={() => goToDetailsFn()}>
      <div className='guajian_paiming521'>
        <p>今日排名:{handleRank(webData.rank, 30)}</p>
        <p>爱意值:{webData.cnt}</p>
        <p>{getPersonDiff(webData.diff, webData.rank, webData.cnt)}</p>
      </div>
      <div className='gongxianN1521'>
        {infoData.uid ? (
          <>
            <div>
              <a>
                <img src={getPicImg(infoData.pic)} />
              </a>
              <p>贡献第一</p>
              <p>
                <a>{getName(infoData.nickName)}</a>
              </p>
            </div>
            <p>爱意值:{infoData.cnt}</p>
            <img src={showActivePic(infoData.badgeid)} />
          </>
        ) : (
          <>
            <div>
              <a>
                <img src='//imagexc.kuwo.cn/kuwolive/huodong/loveDay2021520/pendant_h5/qiang.png' />
              </a>
              <p>贡献第一</p>
              <p>
                <a>虚位以待</a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CenterPage
