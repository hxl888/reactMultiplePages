import React from 'react'

// 业务相关
import { getPicImg, getName } from 'utils/juxing'

const UserBox = (prop: any) => {
  const infoData = prop.infoData || {}
  const userObj = infoData.user || {}
  return (
    <div className='guajianTips_userInfor520'>
      <a className='pic152_520'>
        <img src={getPicImg(userObj.pic)} />
      </a>
      <div>
        <p>今日贡献第一用户</p>
        <p>
          <a>{userObj.uid ? getName(userObj.nickName) : '虚位以待'}</a>
        </p>
        <p>送出票数: {userObj.cnt || 0}</p>
      </div>
    </div>
  )
}

export default UserBox
