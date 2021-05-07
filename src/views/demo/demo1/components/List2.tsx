import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StateType } from '../types'

export type PropType = {
  setDownTimeTxt?: Function
  downTimeTxt?: string
  userInfoObj?: Object
  enterInfo?: Object
  isLogin?: number | string
  roomCache?: number | string
}
interface List {
  state: StateType
  props: PropType
}
const mapStateToProps = (state: any) => {
  return {
    isLogin: state.commonState.isLogin,
    userInfoObj: state.commonState.userInfoObj,
    enterInfo: state.commonState.enterInfo,
    roomCache: state.commonState.roomCache,
    downTimeTxt: state.pendantState.downTimeTxt
  }
}
class List extends Component<PropType, StateType> {
  render () {
    return (
      <div className='fontSty'>
        <p className='content'>{JSON.stringify(this.props.roomCache)}</p>
        {this.props.isLogin}哈哈哈--{this.props.downTimeTxt}-userInfoObj
        <br />
      </div>
    )
  }
}

export default connect(mapStateToProps)(List)
