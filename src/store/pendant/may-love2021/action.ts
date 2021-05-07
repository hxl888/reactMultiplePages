import * as common from './action-type'

export const setDownTimeTxt = (value: string) => {
  return {
    type: common.DOWN_TIME_TXT,
    value
  }
}
export const setRoomActivity = (value: object) => {
  return {
    type: common.ROOM_ACTIVITY,
    value
  }
}
export const setWebData = (value: object) => {
  return {
    type: common.WEB_DATA,
    value
  }
}