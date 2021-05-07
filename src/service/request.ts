import axios from 'axios'
import qs from 'qs'
// import { getToken } from '@/utils/cookies'
import Constant from '@/constant'
// todo 不同项目可能不一致 按需更改

const service = axios.create({
  timeout: 5000
})
// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded'
// Request interceptors
service.interceptors.request.use(
  config => {
    // const token = getToken()
    if (process.env.NODE_ENV === 'development') {
      config.baseURL = Constant.REACT_APP_BASE_API
    } else {
      const channel = config.params.channel
      if (channel === 'jsonp') {
        config.baseURL = Constant.REACT_APP_BASE_API_C
      } else if (channel === 'web') {
        config.baseURL = Constant.REACT_APP_BASE_API_WEB
      }
    }
    if (config.method === 'get') {
      config.params = {
        ...config.params
        // token
      }
    }
    if (config.method === 'post') {
      config.data = {
        ...config.data
        // token
      }
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
