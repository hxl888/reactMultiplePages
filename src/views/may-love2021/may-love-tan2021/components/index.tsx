import React, { useEffect, useContext } from 'react'

import { TanObjContext } from '../context-manager'
// 业务相关如下
import appBridge from '@/service/appToh5JX'

// 业务组件相关
import CenterPage from './CenterPage/index'

const IndexPage = () => {
  const { type, closeTime, closeTip } = useContext(TanObjContext) as any

  useEffect(() => {
    let timeNul = 0
    if (type === 3) {
      timeNul = setTimeout(() => {
        closeTanBoxFn()
      }, closeTime * 1000)
    }
    return () => {
      clearTimeout(timeNul)
    }
  }, [])

  const closeTanBoxFn = () => {
    appBridge.dilogClose(closeTip)
  }

  return <CenterPage closeTanBoxFn={closeTanBoxFn} />
}

export default IndexPage
