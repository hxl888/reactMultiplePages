import qs from 'qs'
import Constant from '@/constant'

/**
 * JSONP请求工具
 * @param param url 请求的地址 data 请求的参数
 * @returns {Promise}
 */
let id = 0
const jsonp = (param: { url?: '' | undefined; data: any }) => {
  const { url = '', data } = param
  const baseUrl = Constant.KU_WO_LIVE_SERVICE
  id++ // id 自增
  return new Promise((resolve, reject) => {
    // 动态创建script标签
    const script = document.createElement('script')
    // 接口返回的数据获取
    const callback = `callback${id}`
    const jsonError = `jsonError${id}`;
    (window as any)[callback] = (res: unknown) => {
      document.body.removeChild(script)
      delete (window as any)[callback]
      resolve(res)
    }

    (window as any)[jsonError] = (err: any) => {
      document.body.removeChild(script)
      delete (window as any)[jsonError]
      reject(err)
    }
    script.src = `${baseUrl}cmd=${url}&${qs.stringify(
      data
    )}&callback=${callback}&jsonError=${jsonError}&r=${Math.random()}`
    document.body.appendChild(script)
    script.onload = function () {
      // console.log(`跨域 ${script.src} 接口调用成功`)
    }
    script.onerror = function () {
      // console.log(`跨域 ${script.src} 接口调用失败`)
    }
  })
}
export default jsonp
