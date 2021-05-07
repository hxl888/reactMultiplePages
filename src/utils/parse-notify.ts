/**
  * 功能: 解析通知
  * 示例:
  * author: yongyang.hu
  * cmd=notifyhonourflghtend
    groupid=2
    memlist{//队员列表
      mem<id|rid|name|pic|team|exp|mvp|lvl>{
        3|6666|test|picurl|1|200|0|2
        4|5555|test1|picurl|2|300|1|1
        ...
      }
    }
  *
  */
const parseNotify = function (msg: string) {
  const strArrStart = msg.split('\n')
  const obj: any = {} // 最终输出json

  const outerArr = []
  const innerArr = []
  const keys = []
  const values = []
  let valuesItem = []
  let isClear = false

  // 去掉数组里空字符串
  const strArr = []
  for (let j = 0; j < strArrStart.length; j++) {
    if (strArrStart[j] !== '') {
      strArr.push(strArrStart[j])
    }
  }

  for (let i = 0; i < strArr.length; i++) {
    const item = strArr[i]
    // var inner = {}; //内层字段存放 如：mem
    // var innerKeys = {}; //mem json数组每个对象key
    // var innerValues = {}; //mem json数组每个对象value

    if (item.indexOf('}') > -1) {
      isClear = true
      if (i === strArr.length - 1) {
        values.push(valuesItem)
      }
      continue
    } else if (item.indexOf('{') > -1) {
      if (item.indexOf('<') > -1 && item.indexOf('>') > -1) {
        // mem<id|exp>{
        let innerName = ''
        innerName = item.substring(0, item.indexOf('<'))
        innerArr.push(innerName)

        // innerKeys -> {mem:[id,exp]}
        const temNames = item.substring(item.indexOf('<') + 1, item.indexOf('>'))
        const names = temNames.split('|')
        keys.push(names)
      } else {
        // memlist{
        // outer -> {memlist:memlist}
        let outerName = ''
        outerName = item.substring(0, item.indexOf('{'))
        outerArr.push(outerName)
      }
    } else if (item.indexOf('=') > -1 && item.indexOf('|') === -1) {
      // groupid=1
      const keyVal = item.split('=')
      const key = keyVal[0]
      const value = keyVal[1]
      // 组装obj
      obj[key] = value
    } else if (item.indexOf('|') > -1 && item.indexOf('{') === -1) {
      // 1|2
      const valArr = item.split('|')
      if (isClear) {
        // 添加后清空
        values.push(valuesItem)
        valuesItem = []
        isClear = false
      }
      valuesItem.push(valArr)
    }
  }

  const handle_arr = []

  for (let k = 0; k < values.length; k++) {
    const valueItem = values[k]
    const keyItem = keys[k]
    const arr = []
    for (let o = 0; o < valueItem.length; o++) {
      const value_item = valueItem[o] // ["11", "0"]
      const curObj: any = {}
      for (let w = 0; w < value_item.length; w++) {
        const v = value_item[w]
        const keyName = keyItem[w]
        curObj[keyName] = v
      }
      arr.push(curObj)
    }
    handle_arr.push(arr)
  }
  for (let n = 0; n < outerArr.length; n++) {
    const outer_key = outerArr[n]
    const innerObj: any = {}
    const inner_key = innerArr[n]
    innerObj[inner_key] = handle_arr[n]
    obj[outer_key] = innerObj
  }

  return obj
}
export default parseNotify
