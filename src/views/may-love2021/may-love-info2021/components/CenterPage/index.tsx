/**
 * 此页面为倒计时之外的页面
 */
import React, { useEffect, useState } from 'react'

// 业务组件相关
import UserBox from './AreaModule/UserBox'
import StageRanking from './AreaModule/StageRanking'

const CenterPage = (props: any) => {
  const webData = props.tanObj.webData || {}
  const nowDay = parseFloat(webData.day) + 6
  const [nowIndex, SetNowIndex] = useState<number>(-1)
  useEffect(() => {
    getNowFlrFn()
  }, [])
  const stateTxt = ['7日-10日', '11日-13日', '14日-17日', '18日-20日']
  const getNowFlrFn = () => {
    stateTxt.forEach((item, index) => {
      const flrArr = item.split('-')
      const starTm = parseFloat(flrArr[0].split('日')[0])
      const endTm = parseFloat(flrArr[1].split('日')[0])
      if (nowDay >= starTm && nowDay <= endTm) {
        SetNowIndex(index)
        return
      }
    })
  }
  return nowIndex !== -1 ? (
    <div className='guajianTips520'>
      <a
        className='guajianTips520_close'
        onClick={() => {
          props.closeTanBoxFn()
        }}
      ></a>
      <div className='guajianTips_tit520'>
        第{nowIndex + 1}阶段({stateTxt[nowIndex]})
      </div>
      {/* 阶段排名 */}
      <StageRanking {...props} />
      {/* 第一用户 */}
      <UserBox {...props} />
      <div className='guajianTips_btn520'>
        <a
          onClick={() => {
            props.goToDetailsFn()
          }}
        >
          查看榜单
        </a>
        <a
          onClick={() => {
            props.exchangeGiftsFn()
          }}
        >
          获得玫瑰数:{props.tanObj.goodsObj[2385].num}
        </a>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default CenterPage
