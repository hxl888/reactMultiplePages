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
const mapStateToProps = (state: any) => {
  return {
    roomActivity: state.pendantState.roomActivity,
    webData: state.pendantState.webData
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    setIsLoginFn: () => {
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
  parentClickFn: Function
  setUserInfoFn: Function
  isLogin?: number | string
  onRef?: any
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
  shouldComponentUpdate () {
    console.log('shouldComponentUpdate: ')
    return true
  }
  // setIsLogin () {
  //   interface nowObj {
  //     foExample: number
  //   }
  //   this.setState((state: nowObj) => ({
  //     foExample: ++state.foExample
  //   }))
  //   appBridge.dilogClose('1')
  // }
  setNewKey () {
    interface nowObj {
      foExample: number
    }
    this.setState((state: nowObj) => ({
      foExample: ++state.foExample
    }))
  }

  componentDidMount () {
    this.props.onRef(this)
  }
  childClickFn (num: any) {
    console.log('子级元素被点击了', num)
  }
  render () {
    const { roomActivity } = this.props as any
    console.log('6464646464: ', roomActivity)
    // console.log('exam: ', exam.pendantState)
    return (
      <div>
        <div
          onClick={() => {
            this.props.parentClickFn(666)
          }}
        >
          子级点击父级事件
        </div>
        <div className='font_sty_1 rubberBand'>
          动画{this.props.isLogin}999哈哈{this.state.foExample}----
          {roomActivity.dailyscore}
        </div>
        <div onClick={this.setNewKey}>setNewKey</div>
        <div className='slider_content'>
          左右 swipe
          <Carousel key={this.state.foExample} {...this.props}>
            <div className='swipe-slide slide1'>1</div>
            <div className='swipe-slide slide2'>2</div>
          </Carousel>
        </div>
        {/* 单行滚动 */}
        <div className='line_scroll_content'>
          <OneLineScrollLeft>
            <div className='font_sty_1'>
              艾萨拉浪费捡垃圾放辣椒发垃圾费了是进房垃圾费冷风机
            </div>
          </OneLineScrollLeft>
        </div>
        {/* 单行上下滚动 */}
        单行上下滚动8
        <div className='font_sty_1 scroll_up_content'>
          <OneLineScrollUp marqueeList={this.marqueeList}></OneLineScrollUp>
        </div>
        {/* 多行滚动 */}
        多行滚动
        <div className='font_sty_1 scroll_up_content more_line_content'>
          <MultiLineScrollUp>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </MultiLineScrollUp>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
