import { PendantState } from './types'

export const State: PendantState = {
  downTimeTxt: '',
  webData: {
    rank: 0,
    cnt: 0,
    diff: 0,
    day: 0,
    times: 0,
    ftimes: 0
  },
  scrollLen: 0,
  roomActivity: {
    curround: 1, // 当前星战比赛轮次(0报名阶段)
    userround: 0, // 主播所在的轮次 (未晋级为-1)
    cttype: 0, // 主播报名的比赛项(未报名为0) 赛道 1-8
    fcurround: 0, // 当前家族比赛轮次(0报名阶段)
    ffround: -1, // 主播所在家族的轮次(未晋级为-1)
    fmid: 0, // 主播所在家族id
    fmtype: 0, // 家族类型 1:实力 3:成长(未晋级为 0) (冲刺赛期间 1:王者 2:钻石 3:成长)
    fmname: '', // 主播所在家族名字
    pkfmid: 0, // PK家族id，没有为0
    dailyscore: 0,
    task1cnt: 0,
    lasttask1daytype: 0
  }
}
