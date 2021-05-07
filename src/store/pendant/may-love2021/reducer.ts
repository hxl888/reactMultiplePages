import { DefaultObj } from '../../types'
// import * as common from './action-type';
import { State } from './state'

const actionFn = (state = State, action: DefaultObj) => {
  const TYPE = action.type
  const actionObj: DefaultObj = {
    'DOWN_TIME_TXT': {
      name: 'downTimeTxt',
      state: state.downTimeTxt
    },
    'WEB_DATA': {
      name: 'webData',
      state: state.webData
    },
    'ROOM_ACTIVITY': {
      name: 'roomActivity',
      state: state.roomActivity
    },
  }
  if (actionObj[TYPE]) {
    // console.log('actionObj[TYPE]: ', actionObj[TYPE]);
    const newValueData = action.value
    const name = actionObj[TYPE].name
    let defaultData = (state as any)[actionObj[TYPE].name]
    defaultData = JSON.parse(JSON.stringify(defaultData)) // 深拷贝改变store引用地址(防止store 已更改 dom 不被更新问题)
    if (defaultData instanceof Object) {
      // 对象
      Object.assign(defaultData, newValueData)
    } else if (Array.isArray(defaultData)) {
      // 数组
      defaultData = [...defaultData, ...newValueData]
    } else {
      // 字符串||数字
      defaultData = newValueData
    }
    return { ...state, [name]: defaultData }
  }
  return state
}

// 公共参数
export const pendantState = (state = State, action: DefaultObj) => {
  return actionFn(state, action)
}

