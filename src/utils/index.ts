// Parse the time to string
// import { Commit } from 'vuex'
// import store from '@/store'
// import { setSystemTimeUpdate } from '@/store/common/action'

export const parseTime = (
  time?: object | string | number,
  cFormat?: string
): string | null => {
  if (time === undefined) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time as Date
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}

// Format and filter json data using filterKeys array
export const formatJson = (filterKeys: any, jsonData: any) =>
  jsonData.map((data: any) => filterKeys.map((key: string) => {
    if (key === 'timestamp') {
      return parseTime(data[key])
    } else {
      return data[key]
    }
  }))

// Check if an element has a class
export const hasClass = (ele: HTMLElement, className: string) => {
  return !!ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

// Add class to element
export const addClass = (ele: HTMLElement, className: string) => {
  if (!hasClass(ele, className)) ele.className += ' ' + className
}

// Remove class from element
export const removeClass = (ele: HTMLElement, className: string) => {
  if (hasClass(ele, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

// Toggle class for the selected element
export const toggleClass = (ele: HTMLElement, className: string) => {
  if (!ele || !className) {
    return
  }
  let classString = ele.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  ele.className = classString
}

/**
 * 是否是https
 */
export const isHttps = (): boolean => {
  return window.location.protocol === 'https:'
}

// Object.keys 遍历 key报错问题
export const keys = <O extends object>(obj: O): Array<keyof O> => {
  return Object.keys(obj) as Array<keyof O>
}
// 动态获取对象value
export const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) =>
  obj[key]

export const prop = <T extends object, K extends keyof T>(obj: T, key: K) => {
  return obj[key]
}

// 获取随机数
export const getRandomNumber = (min: number, max: number) => {
  return parseInt(JSON.stringify(Math.random() * (max - min + 1) + min))
}

export const toStringFn = (str: any) => {
  return typeof str === 'string' ? str : JSON.stringify(str)
}
export const toNumberFn = (str: any) => {
  return typeof str === 'string' ? Number(str) : str
}

/*
  * 判断obj是否为一个整数
*/
export const isInteger = (obj: number) => {
  return Math.floor(obj) === obj
}

export const toInteger = (floatNum: string | number) => {
  const ret = { times: 1, num: 0 }
  const float_Num = toNumberFn(floatNum)
  if (isInteger(float_Num)) {
    ret.num = float_Num
    return ret
  }
  const strfi = floatNum + ''
  const dotPos = strfi.indexOf('.')
  const len = strfi.substr(dotPos + 1).length
  const times = Math.pow(10, len)
  const intNum = parseInt(toStringFn(float_Num * times + 0.5), 10)
  ret.times = times
  ret.num = intNum
  return ret
}

export const operation = (a: string | number, b: string | number, op: any): number => {
  const o1 = toInteger(a)
  const o2 = toInteger(b)
  const n1 = o1.num
  const n2 = o2.num
  const t1 = o1.times
  const t2 = o2.times
  const max = t1 > t2 ? t1 : t2
  let result = null
  switch (op) {
    case 'add':
      if (t1 === t2) {
        // 两个小数位数相同
        result = n1 + n2
      } else if (t1 > t2) {
        // o1 小数位 大于 o2
        result = n1 + n2 * (t1 / t2)
      } else {
        // o1 小数位 小于 o2
        result = n1 * (t2 / t1) + n2
      }
      return result / max
    case 'subtract':
      if (t1 === t2) {
        result = n1 - n2
      } else if (t1 > t2) {
        result = n1 - n2 * (t1 / t2)
      } else {
        result = n1 * (t2 / t1) - n2
      }
      return result / max
    case 'multiply':
      result = (n1 * n2) / (t1 * t2)
      return result
    case 'divide':
      result = (n1 / n2) * (t2 / t1)
      return result
    default:
      return 0
  }
}
/*
* 核心方法，实现加减乘除运算，确保不丢失精度
* 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
*
* @param a {number} 运算数1
* @param b {number} 运算数2
* @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
*
*/

export const add = (a: any, b: any) => {
  // 加
  return operation(a, b, 'add')
}
export const subtract = (a: any, b: any) => {
  // 减
  return operation(a, b, 'subtract')
}
export const multiply = (a: any, b: any) => {
  // 乘
  return operation(a, b, 'multiply')
}
export const divide = (a: number, b: number): number => {
  // 除
  return operation(a, b, 'divide')
}

// 判断是否为数字
export const checkNumber = (str: any) => {
  const n = Number(str)
  if (!isNaN(n)) {
    return true
  }
  return false
}

// 判断是否为数组
export const isArray = (obj: any) => {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

// 判断对象是否为空 返回true则为空对象，false则不是空对象
export const isEmptyObj = (obj: any) => {
  return (
    !Object.getOwnPropertySymbols(obj).length &&
    !Object.getOwnPropertyNames(obj).length
  )
}

export const formatObjToStr = (obj: any) => {
  return encodeURIComponent(encodeURIComponent(JSON.stringify(obj)))
}

/**
 * 
 * @param curTm number
 * @param day string 
 * @param hour string
 * @param min string
 * @param sec string
 * @returns 
 */
export const setNewDateTimeFn = (curTm: number, day: any, hour: any, min: any, sec: any): number => {
  const date = new Date(curTm * 1000)
  let newDateNum = 0
  if (day) {
    date.setDate(day)
  }
  if (hour) {
    date.setHours(hour)
  }
  if (min) {
    date.setMinutes(min)
  }
  if (sec) {
    date.setSeconds(sec)
  }
  newDateNum = date.getTime() / 1000
  return Math.floor(newDateNum) // 返回毫秒时间戳
}

