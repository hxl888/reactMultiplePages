import request from '@/service/request'
import jsonp from '@/service/jsonp'
import store from '@/store'

// web
export const callWebServer = (url: string, data: object) => {
  const state = store.getState().commonState
  const APP_SRC = state.appSrc || 'web'
  const dataParams = { ...data, src: APP_SRC, r: Math.random() }
  return request({
    url,
    method: 'get',
    params: dataParams
  })
}

// jsonp
export const callJsonp = (url: any, data: any) => {
  const state = store.getState().commonState
  const APP_SRC = state.appSrc || 'web'
  const dataParams = { ...data, src: APP_SRC }
  return jsonp({
    url, // cmd= ‘名字’
    data: dataParams // 具体参数
  })
}
