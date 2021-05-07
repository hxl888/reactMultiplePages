/**
 * 活动倒计时页面
 */
import React from 'react'
import { useSelector } from 'react-redux'

const CountdownPage = (props: any) => {
  const downTimeTxt = useSelector(
    (state: any) => state.pendantState.downTimeTxt
  )
  const goToDetailsFn = props.goToDetailsFn
  return (
    <>
      <div
        className='djs_guajian520'
        onClick={() => {
          goToDetailsFn()
        }}
      >
        <div className='act_time520'>1/14</div>
        <p>
          <span>{downTimeTxt.split(':')[0]}</span>
          <span>{downTimeTxt.split(':')[1]}</span>
        </p>
      </div>
    </>
  )
}

export default CountdownPage
