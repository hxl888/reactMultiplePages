import React, { Component, EventHandler } from 'react'
import { connect } from 'react-redux'
import { setIsLogin, setUserInfoObj } from '@/store/common/action'
import { setDownTimeTxt } from '@/store/pendant/demo1/action'
// import { PropType, StateType } from '../types'
// import EventEmitter from '@/service/event-bus'
import appBridge from '@/service/appToh5JX'

import Carousel from '@/components/Carousel' // swipe
import OneLineScrollLeft from '@/components/OneLineScrollLeft' // 单行左右滚动
import OneLineScrollUp from '@/components/OneLineScrollUp' // 单行上下滚动
import MultiLineScrollUp from '@/components/MultiLineScrollUp' // 多行滚动
let num = 1
// const mapStateToProps = (state: any) => {
//   console.log('66666: ', state)
//   return {
//     // roomActivity: state.pendantState.roomActivity,
//     // webData: state.pendantState.webData
//   }
// }
const mapDispatchToProps = (dispatch: any) => {
  return {
    setIsLogin: () => {
      num++
      dispatch(setIsLogin(num))
    },
    setUserInfoFn: () => {
      num++
      dispatch(
        setUserInfoObj({
          'name---': 9999,
          'tid---': 66666
        })
      )
    }
  }
}

type PropType = {
  setUserInfoFn: Function
  isLogin?: number | string
}
interface List {
  props: PropType
}
class List extends Component<PropType, any> {
  marqueeList: Array<string> = ['1', '2', '3']
  constructor (props: any, context: any) {
    super(props)
    this.state = {
      foExample: 0
    }
    this.setNewKey = this.setNewKey.bind(this)
  }
  // shouldComponentUpdate () {
  //   console.log('shouldComponentUpdate: ')
  //   return true
  // }
  setIsLogin () {
    interface nowObj {
      foExample: number
    }
    this.setState((state: nowObj) => ({
      foExample: ++state.foExample
    }))
    appBridge.dilogClose('1')
  }
  setNewKey () {
    interface nowObj {
      foExample: number
    }
    this.setState((state: nowObj) => ({
      foExample: ++state.foExample
    }))
  }

  componentDidMount () {}
  render () {
    const { roomActivity } = this.props as any
    return <div></div>
  }
}

export default connect(null, mapDispatchToProps)(List)
