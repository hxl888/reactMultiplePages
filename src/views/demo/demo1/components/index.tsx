import { pendantRank } from '@/api/apiJX/demo1'
import initApiFn from '@/service/jx-service'
import React, { Component, Fragment } from 'react'
import { connect, Provider } from 'react-redux'
import EventEmitter from '@/service/event-bus'
import appBridge from '@/service/appToh5JX'

// store
import {
  setDownTimeTxt,
  setRoomActivity,
  setWebData
} from '@/store/pendant/demo1/action'

import List1 from './List1'
import List3 from './List3'

// import { PropType, StateType } from '../types'
interface IndexPage {
  props: PropType
}
type PropType = {}
const mapDispatchToProps = (dispatch: any) => {
  return {
    setRoomActivityFn: (obj: Object) => {
      dispatch(setRoomActivity(obj))
    },
    setWebDataFn: () => {
      dispatch(
        setWebData({
          'name---': 9999,
          'tid---': 66666
        })
      )
    },
    setDownTimeTxt: () => {
      const timeTxt = '999'
      dispatch(setDownTimeTxt(timeTxt))
    }
  }
}
const mapStateToProps = (state: any) => {
  return {
    exam: state
  }
}
class IndexPage extends Component<PropType, any> {
  timeNull: number
  childDom: any
  constructor (props: any) {
    super(props)
    this.timeNull = 0
    this.state = {
      contentShowFlag: false,
      activeStarFlag: false // 活动正式开始开关
    }
  }
  mockServeFn () {
    this.timeNull = setTimeout(() => {
      const data = {
        cmd: 'notifyfm2104singerrank',
        uid: '225056653',
        daytype: '3',
        cttype: '0',
        ctstatus: '1',
        pkuid: '0',
        grade: '0',
        dailyscore: 9797978,
        task1cnt: 88,
        lasttask1daytype: 888,
        track: '4',
        gid: '1000',
        stat: '2',
        finishgid: '2219',
        status: '1',
        pktid: '0',
        pkrid: '0',
        pktname: ''
      }
      // document.getElementsByTagName('body')[0].style.background = 'red'
      EventEmitter.emit('flashNotice', data)
      // if (this.uid === 225056653) {
      // }
    }, 3000)
  }
  async initFn (flag = false) {
    this.callApp()
    this.setListenFlash()
    const data = (await initApiFn(true, flag)) as any
    const { activityInfoData } = data
    console.log('999: ', activityInfoData)
    const pendantData = await pendantRank(123)
    console.log('pendantData: ', pendantData)
    this.setState({
      contentShowFlag: true
    })
    const { setRoomActivityFn } = this.props as any // dispatch
    setRoomActivityFn({
      dailyscore: 10,
      task1cnt: 100,
      lasttask1daytype: 1000
    })
  }
  initPendant () {}
  callApp () {
    const notify = 'notifyfm2104singerrank'
    appBridge.getRoomNotify(notify)
  }
  setListenFlash () {
    // 活动送礼收到通知
    EventEmitter.addListener('flashNotice', (obj: any) => {
      if (!obj) return false
      if (obj.cmd === 'notifyfm2104singerrank') {
        console.log('react------家族日排名变化: ', obj)
        this.notifyfm2104singerrankFn(obj)
      }
    })
  }
  notifyfm2104singerrankFn (obj: any) {
    console.log('11111111111: ')
    const { setRoomActivityFn } = this.props as any // dispatch
    setRoomActivityFn(obj)
  }
  shouldComponentUpdate () {
    console.log('shouldComponentUpdate: ')
    return true
  }
  componentWillUnmount () {
    clearTimeout(this.timeNull)
  }
  parentClickFn (num: any) {
    console.log('父级元素被点击了', num)
  }
  async componentDidMount () {
    this.initFn()
    // TODO: 测试
    this.mockServeFn()
  }
  render () {
    const { exam } = this.props as any
    const { contentShowFlag } = this.state
    // console.log('exam: ', exam.pendantState)
    // commonState pendantState
    return contentShowFlag ? (
      <Fragment>
        <div className='fontSty'>
          <div
            onClick={() => {
              this.childDom.childClickFn(99)
            }}
          >
            点击子级元素事件
          </div>
          哈哈666---{exam.pendantState.roomActivity.dailyscore}
          {/* {this.state.contentShowFlag ? <List3 {...this.props} /> : ''} */}
          <List1
            parentClickFn={this.parentClickFn}
            onRef={(ref: any) => (this.childDom = ref)}
          />
          {/* <List3 {...this.props} /> */}
        </div>
        <div>2222</div>
      </Fragment>
    ) : (
      ''
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
