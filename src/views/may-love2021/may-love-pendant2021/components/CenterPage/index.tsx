/**
 * 此页面为倒计时之外的页面
 */
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

// 业务相关
import { getPercentageOne } from 'utils/juxing'

// 业务组件相关
import HourList from './AreaModule/HourList'
import TodayList from './AreaModule/TodayList'
import ExplosionLightBox from './AreaModule/ExplosionLightBox'

const CenterPage = (props: any) => {
  const roomActivity = useSelector(
    (state: any) => state.pendantState.roomActivity
  )
  const webData = useSelector((state: any) => state.pendantState.webData)
  const systemTime = useSelector((state: any) => state.commonState.systemTime)

  const nowHour = useMemo(() => new Date(systemTime * 1000).getHours(), [
    systemTime
  ])
  // console.log('nowHour: ', nowHour)

  return (
    <div className='guajian520' onClick={() => props.hoverPendantFn()}>
      <div className='dengzhu520'>
        <em
          style={{
            height: getPercentageOne(roomActivity.l520coin, 520 * 1000)
          }}
        ></em>
      </div>
      <div className='act_time520'>{webData.day}/14</div>
      <div className='guajian_tit520'></div>
      {/* 中间区域 start */}
      {nowHour >= 19 && nowHour <= 22 ? (
        <HourList nowHour={nowHour} />
      ) : (
        <TodayList nowHour={nowHour} />
      )}
      {/* 中间区域 end */}
      <ExplosionLightBox />
    </div>
  )
}

export default CenterPage
