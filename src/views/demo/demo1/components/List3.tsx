import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { StateType } from '../types'
import appBridge from '@/service/appToh5JX/index'
// console.log('appBridge: ', appBridge);

type PropType = {
  setDownTimeTxt?: Function
  downTimeTxt?: string
  txt?: string
  userInfoObj?: Object
  enterInfo?: Object
  isLogin?: number | string
  roomCache?: number | string
}
type StateType = {
  text: string
  roomTxt: string
  number: number
}
// interface List {
//   state: StateType
//   props: PropType
// }
const mapStateToProps = (state: any) => {
  return {
    isLogin: state.commonState.isLogin,
    userInfoObj: state.commonState.userInfoObj,
    enterInfo: state.commonState.enterInfo,
    roomCache: state.commonState.roomCache,
    downTimeTxt: state.pendantState.downTimeTxt
  }
}
class LifeCycle extends Component<PropType, StateType> {
  constructor (props: PropType) {
    super(props)
    console.log('进入constructor')
    // state 可以在 constructor 里初始化
    this.state = { text: '子组件的文本', number: 9, roomTxt: '' }
    console.log('this.props--->: ', this.props)
  }
  // 初始化/更新时调用
  static getDerivedStateFromProps (props: PropType, state: StateType) {
    console.log('getDerivedStateFromProps方法执行')

    return {
      fatherText: props.downTimeTxt
    }
  }
  // 初始化渲染时调用
  componentDidMount () {
    console.log('componentDidMount方法执行')
  }
  // 组件更新时调用
  shouldComponentUpdate (prevProps: PropType, nextState: StateType) {
    console.log('shouldComponentUpdate方法执行')
    return true
  }
  // 组件更新时调用
  getSnapshotBeforeUpdate (prevProps: PropType, nextState: StateType) {
    console.log('getSnapshotBeforeUpdate: ', prevProps)
    console.log('getSnapshotBeforeUpdate: ', nextState)
    console.log('getSnapshotBeforeUpdate方法执行')
    return 'haha'
  }
  // 组件更新后调用
  componentDidUpdate (
    prevProps: PropType,
    nextState: StateType,
    valueFromSnapshot: string
  ) {
    console.log('componentDidUpdate方法执行')
    console.log('从 getSnapshotBeforeUpdate 获取到的值是', valueFromSnapshot)
  }
  // 组件卸载时调用
  // componentWillUnmount () {
  //   console.log('子组件的componentWillUnmount方法执行')
  // }
  componentDidCatch () {
    console.log('componentDidCatch: ')
  }
  // 点击按钮，修改子组件文本内容的方法
  changeText = () => {
    this.setState({
      text: '修改后的子组件文本'
    })
  }
  addRoomCache = () => {
    appBridge.addRoomCache('forExample', '哈哈哈9')
  }
  getRoomCache = () => {
    appBridge.getRoomCache('forExample')
    setTimeout(() => {
      const roomCache = (this.props.roomCache as any).forExample
      console.log('roomCache-->: ', roomCache)
      this.setState({
        text: '修改后的子组件文本',
        roomTxt: roomCache
      })
    }, 300)
  }
  render () {
    console.log('render方法执行')
    return (
      <div className='container fontSty'>
        {/* <div className="fontSty_small">isLogin:{JSON.stringify(this.props.isLogin)}</div>
        <div className="fontSty_small">enterInfo:{JSON.stringify(this.props.enterInfo)}</div>
        <div className="fontSty_small">userInfoObj:{JSON.stringify(this.props.userInfoObj)}</div> */}
        <button onClick={this.changeText} className='changeText'>
          修改子组件文本内容
        </button>
        <button onClick={this.addRoomCache} className='changeText'>
          添加appRoom缓冲
        </button>
        <button onClick={this.getRoomCache} className='changeText'>
          {this.state.roomTxt}取出appRoom缓冲
        </button>
        <p className='textContent'>子组件&gt; {this.state.text}</p>
        <p className='fatherContent'>父组件&gt; {this.props.downTimeTxt}</p>
      </div>
    )
  }
}

type StateType2 = {
  text: string
  hideChild: Boolean
}
// 定义 LifeCycle 组件的父组件
class LifeCycleContainer extends React.Component<PropType, StateType2> {
  // state 也可以像这样用属性声明的形式初始化
  // constructor(props: any) {
  //   super(props)
  //   this.
  // }
  state = {
    text: '父组件的文本',
    hideChild: false
  }
  // 点击按钮，修改父组件文本的方法
  changeText = () => {
    this.setState({
      text: '修改后的父组件文本'
    })
  }
  // 点击按钮，隐藏（卸载）LifeCycle 组件的方法
  hideChild = () => {
    type StateType2 = {
      text: string
      hideChild: Boolean
    }
    this.setState((state: StateType2) => ({
      hideChild: !state.hideChild
    }))
  }
  render () {
    return (
      <div className='fatherContainer fontSty'>
        {this.state.hideChild ? null : (
          <LifeCycle {...this.props} downTimeTxt={this.state.text} />
        )}
        <button onClick={this.changeText} className='changeText'>
          修改父组件文本内容
        </button>
        <button onClick={this.hideChild} className='hideChild'>
          {this.state.hideChild ? '显示子组件' : '隐藏子组件'}
          {JSON.stringify(this.state.hideChild)}
        </button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(LifeCycleContainer)
