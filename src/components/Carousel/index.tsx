import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.css'
type PropType = {
  children: any
}
// interface Carousel {
//   props: PropType
//   state: any
// }
class Carousel extends Component<PropType, any> {
  listDom: HTMLElement | null
  containerDom: HTMLElement | null
  originBoxDom: HTMLElement | null
  sliderItemsDom: HTMLElement | null
  originSpItemsDom: HTMLElement | null
  sliderItemsLen: number
  index: number = 0
  inVal: number
  private _isMounted: boolean
  constructor (props: any, context: any) {
    super(props)
    this._isMounted = true
    this.state = {
      defaultSetting: {
        width: '1.68rem',
        height: '0.8rem',
        originBoxFlag: true,
        time: 15,
        index: 1
      },
      setting: {}
    }
    this.rotate = this.rotate.bind(this)
    this.defaultDom = this.defaultDom.bind(this)
    this.animateFun = this.animateFun.bind(this)
  }
  componentDidMount () {
    this._isMounted = true
    this.defaultDom()
    setTimeout(() => {
      this.animateFun()
    }, 0)
  }
  componentWillUnmount () {
    this._isMounted = false
    clearInterval(this.inVal)
  }
  // swipe 方法star
  defaultDom () {
    this.setState((state: any) => ({
      setting: Object.assign({}, state.defaultSetting)
    }))
    this.listDom = document.querySelector('#list')
    this.containerDom = document.querySelector('#container')
    this.sliderItemsDom = (this.listDom as any).getElementsByClassName(
      'swipe-slide'
    )
    this.sliderItemsLen = this.getShowSliderLen(this.sliderItemsDom)
    this.index =
      this.state.setting.index > this.sliderItemsLen
        ? 1
        : this.state.setting.index

    setTimeout(() => {
      this.originBoxDom = document.querySelector('.originBox')
      this.originSpItemsDom = (this.originBoxDom as any).getElementsByClassName(
        'originSp'
      )
      ;(this.listDom as any).style.left =
        parseFloat(this.state.setting.width) -
        this.index * parseFloat(this.state.setting.width) +
        'rem' // 改变left值
      if (this.containerDom) {
        this.containerDom.style.width =
          parseFloat(this.state.setting.width) + 'rem'
        this.containerDom.style.height =
          parseFloat(this.state.setting.height) + 'rem'
        this.containerDom.style.marginLeft =
          -parseFloat(this.state.setting.width) / 2 + 'rem'
        // slider 的长度
        // store.dispatch('SCROLL_LEN', this.sliderItemsLen)
      }
    }, 300)
  }
  rotate (dir: string) {
    let newLeft = 0 // 变化后的left值
    const _thisLeft = parseFloat((this.listDom as any).style.left) || 0 // 原left值
    const sliderWidth = parseFloat(this.state.setting.width) // 可见视口宽度，这里也是一张图片宽度
    const len = this.sliderItemsLen // 图片总张数
    const totalWidth = len * sliderWidth
    if (dir === 'left') {
      // 点击左按钮，往前一张
      if (!_thisLeft) {
        newLeft = _thisLeft + sliderWidth
      } else {
        newLeft = _thisLeft + sliderWidth
        this.index--
      }
      if (newLeft > 0) {
        // 如果是第一张图片往前切换，则切换到最后一张
        newLeft = -totalWidth + sliderWidth
        this.index = len
      }
      ;(this.listDom as any).style.left = newLeft + 'rem' // 改变left值
      // this.showButtons();
    }
    if (dir === 'right') {
      // 点击右按钮，往后一张, 则left值增加一个负sliderWidth
      if (!_thisLeft) {
        newLeft = _thisLeft - sliderWidth
        this.index++
      } else {
        newLeft = _thisLeft - sliderWidth
        this.index++
      }
      if (newLeft <= -totalWidth) {
        newLeft = 0
        this.index = 1
      }
      ;(this.listDom as any).style.left = newLeft + 'rem' // 改变left值
    }
    // TODO:
    // store.dispatch('SCROLL_LEN', this.index)
    // window.swiperIndex = this.index // 暴露出去，供全局对象使用
  }
  getShowSliderLen (data: any) {
    let len = 0
    if (!data.length) return 0
    for (let i = 0; i < data.length; i++) {
      if (this.getDomStyle(data[i], 'display') !== 'none') {
        len++
      }
    }
    return len
  }
  getDomStyle (dom: any, styleName: any) {
    return dom.currentStyle
      ? dom.currentStyle[styleName]
      : getComputedStyle(dom, null)[styleName]
  }
  trigger (element: any, method: string) {
    const func = element[method]
    return func && func()
  }
  animateFun () {
    if (this.inVal) clearInterval(this.inVal)
    if (!this._isMounted) return
    this.inVal = setInterval(() => {
      this.rotate('right')
    }, this.state.setting.time * 1000)
  }
  // swipe 方法end
  render () {
    const { children } = this.props
    return (
      <div id='container'>
        <div id='list'>{children}</div>
        {/* 向右点击标签 */}
        {this.sliderItemsLen > 1 ? (
          <span className='next' onClick={() => this.rotate('right')} />
        ) : (
          ''
        )}
        {/* slider 点点显示 start */}
        {this.sliderItemsLen > 1 && this.state.setting.originBoxFlag ? (
          <div className='originBox page_nzsd'>
            {Array(this.sliderItemsLen).map((item: any, index: number) => {
              return (
                <a
                  key={index}
                  className={
                    this.state.index === index ? 'on originSp' : 'originSp'
                  }
                />
              )
            })}
          </div>
        ) : (
          ''
        )}
        {/* slider 点点显示 end */}
      </div>
    )
  }
}

export default connect(null, null)(Carousel)
