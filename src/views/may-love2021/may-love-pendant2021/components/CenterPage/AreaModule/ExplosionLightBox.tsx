import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setRoomActivity } from '@/store/pendant/may-love2021/action'
import { getName } from '@/utils/juxing'

const ExplosionLightBox = () => {
  const dispatch = useDispatch()
  const roomActivity = useSelector(
    (state: any) => state.pendantState.roomActivity
  )
  const [showFlag, setShowFlag] = useState(false)

  useEffect(() => {
    let flag = true
    const timeNul = setTimeout(() => {
      flag = !flag
      setShowFlag(flag)
      // 3秒将第一用户清空
      dispatch(
        setRoomActivity({
          fid: 0, // 进房默认为空
          l520coinUser: '', // 进房默认为空
          consume: 0 // 进房默认为空
        })
      )
    }, 3000)
    return () => {
      clearTimeout(timeNul)
    }
  }, [roomActivity.fid])

  return (
    <Fragment>
      {/* 爆灯进度 */}
      {!showFlag && !roomActivity.fid ? (
        <div className='fireBox520'>
          <p>
            距离爆灯还需{520 - Math.floor(roomActivity.l520coin / 1000)}火苗
          </p>
        </div>
      ) : (
        <div className='fireBox520 fireBox2_520'>
          <em></em>
          <div>
            <p>
              <a>{getName(roomActivity.l520coinUser)}</a>
            </p>
            <p>
              增加<span>{Math.floor(roomActivity.consume / 1000)}</span>火苗
            </p>
          </div>
        </div>
      )}
    </Fragment>
  )
}
export default ExplosionLightBox
