// import Vue from 'vue'
// import { ErrorLogModule } from '@/store/modules/error-log'
// import { isArray } from '@/utils/validate'
// import settings from '@/settings'
// // todo 是否需要错误提示

// const { errorLog: needErrorLog } = settings

// const checkNeed = () => {
//   const env = process.env.NODE_ENV
//   if (isArray(needErrorLog) && env) {
//     return needErrorLog.includes(env)
//   }
//   return false
// }

// if (checkNeed()) {
//   Vue.config.errorHandler = function (err, vm, info) {
//     ErrorLogModule.AddErrorLog({
//       err,
//       vm,
//       info,
//       url: window.location.href
//     })
//   }
// }
