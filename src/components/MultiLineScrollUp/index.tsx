import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.css'
// type PropType = {}

class OneLineScrollUp extends Component<any, any> {
  time: number = 60
  isShow: Boolean
  inVal: number
  moveBoxRef: React.RefObject<HTMLDivElement>
  outBoxRef: React.RefObject<HTMLDivElement>
  private _isMounted: boolean
  constructor (props: any) {
    super(props)
    this._isMounted = true
    this.moveBoxRef = React.createRef()
    this.outBoxRef = React.createRef()
    this.defaultFun = this.defaultFun.bind(this)
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
    if (this.inVal) clearInterval(this.inVal)
    if (!this._isMounted) return
    const moveBoxTarget = this.moveBoxRef.current
    const outBoxTarget = this.outBoxRef.current
    const outOffsetHeight = outBoxTarget?.offsetHeight || 0
    const moveOffsetHeight = moveBoxTarget?.offsetHeight || 0
    if (outOffsetHeight < moveOffsetHeight) {
      this.isShow = true
    } else {
      return
    }
    let initTop = 0
    this.inVal = setInterval(() => {
      initTop++
      if (initTop >= moveOffsetHeight - outOffsetHeight / 2) {
        initTop = 0
      }
      const arr = [
        'transform',
        '-ms-transform',
        '-moz-transform',
        '-webkit-transform',
        '-o-transform'
      ]
      let styTxt: string = ''
      arr.forEach((item: string) => {
        return (styTxt += `${item}: translateY(-${initTop}px);`)
      })
      ;(moveBoxTarget as any).style.cssText = styTxt
    }, this.time)
  }
  render () {
    const { children } = this.props
    return (
      <div ref={this.outBoxRef} className='my-outbox'>
        <div ref={this.moveBoxRef} className='my-inbox'>
          <div className='my-listbox'>{children}</div>
          {this.isShow ? <div className='my-listbox'>{children}</div> : ''}
        </div>
      </div>
    )
  }
}

export default connect(null, null)(OneLineScrollUp)
