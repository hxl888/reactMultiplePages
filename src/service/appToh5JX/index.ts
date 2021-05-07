
import windComFn from './global-callback' // 暴露给app window下全局调用方法
import selfExecutingFu from './common'
import appBridge from './bridge' // app to h5 方法集
import { keys } from '@/utils'

// 自执行函数加载
selfExecutingFu.init()

for (const key of keys(windComFn)) {
  (window as any)[key] = windComFn[key]
}

export default appBridge
