import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.css'
type PropType = {
  children: any
}

class Carousel extends Component<PropType, any> {
  scrollBoxRef: React.RefObject<HTMLDivElement>
  scrollContentRef: React.RefObject<HTMLDivElement>
  parentOffWid: number
  defaultNum: number
  childOffWid: number
  inVal: number
  leftNum: number | string | any
  private _isMounted: boolean
  constructor (props: any) {
    super(props)
    this._isMounted = true
    this.defaultFun = this.defaultFun.bind(this)
    this.animateFun = this.animateFun.bind(this)
    this.scrollBoxRef = React.createRef()
    this.scrollContentRef = React.createRef()
  }
  componentDidMount () {
    this._isMounted = true
    this.defaultFun()
  }
  componentWillUnmount () {
    this._isMounted = false
    clearInterval(this.inVal)
  }
  defaultFun () {
    const scrollBoxDom = this.scrollBoxRef.current
    const scrollContentDom = this.scrollBoxRef.current
    this.parentOffWid = (scrollBoxDom as HTMLDivElement).offsetWidth
    this.childOffWid = (scrollContentDom as HTMLDivElement).scrollWidth
    this.defaultNum = this.parentOffWid - 20
    this.leftNum = this.defaultNum
    if (this.childOffWid <= this.parentOffWid) return
    this.animateFun()
  }
  animateFun () {
    if (this.inVal) clearInterval(this.inVal)
    if (!this._isMounted) return
    this.inVal = setInterval(() => {
      try {
        if (
          parseFloat((this.scrollContentRef.current as any).style.left) <=
          -this.childOffWid
        ) {
          this.leftNum = this.defaultNum
          ;(this.scrollContentRef.current as any).style.left =
            this.leftNum + 'px'
        } else {
          this.leftNum -= 1
          ;(this.scrollContentRef.current as any).style.left =
            this.leftNum + 'px'
        }
      } catch (error) {
        console.log('异常: ', error)
        clearInterval(this.inVal)
      }
    }, 50)
  }
  render () {
    const { children } = this.props
    return (
      <div ref={this.scrollBoxRef} className='scrollBox'>
        <div ref={this.scrollContentRef} className='scrollContent'>
          {children}
        </div>
      </div>
    )
  }
}

export default connect(null, null)(Carousel)
