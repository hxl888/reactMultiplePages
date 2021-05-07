import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.css'
type PropType = {
  marqueeList: Array<string>
}

class OneLineScrollUp extends Component<PropType, any> {
  time: number = 3
  inVal: number
  private _isMounted: boolean
  constructor (props: any) {
    super(props)
    this._isMounted = true
    this.defaultFun = this.defaultFun.bind(this)
    this.showMarquee = this.showMarquee.bind(this)
    this.state = {
      marqueeListOld: [],
      animate: false
    }
  }
  componentDidMount () {
    this._isMounted = true
    this.defaultFun()
  }
  componentWillUnmount () {
    this._isMounted = false
    if (this.inVal) clearInterval(this.inVal)
  }
  defaultFun () {
    if (this.inVal) clearInterval(this.inVal)
    this.setState({
      marqueeListOld: this.props.marqueeList
    })
    this.inVal = setInterval(this.showMarquee, this.time * 1000)
  }
  showMarquee () {
    if (!this._isMounted) return
    this.setState({
      animate: true
    })
    setTimeout(() => {
      const marqueeListOld = this.state.marqueeListOld
      marqueeListOld.push(marqueeListOld[0])
      marqueeListOld.shift()
      if (this._isMounted) {
        this.setState({
          marqueeListOld,
          animate: false
        })
      }
    }, 500)
  }
  render () {
    return (
      <div className='marquee'>
        <div
          className={
            this.state.animate ? 'marquee_box marquee_top' : 'marquee_box'
          }
        >
          {this.state.marqueeListOld.map((item: string, index: number) => {
            return <p key={index}>{item}</p>
          })}
        </div>
      </div>
    )
  }
}

export default connect(null, null)(OneLineScrollUp)
