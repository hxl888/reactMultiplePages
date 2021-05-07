// 进房信息
export interface WebData {
    rank: number;
    cnt: number;
    diff: number;
    day: number;
    times: number;
    ftimes: number;
}
export interface RoomActivity {
    curround: number; // 当前星战比赛轮次(0报名阶段)
    userround: number; // 主播所在的轮次 (未晋级为-1)
    cttype: number; // 主播报名的比赛项(未报名为0) 赛道 1-8
    fcurround: number; // 当前家族比赛轮次(0报名阶段)
    ffround: number; // 主播所在家族的轮次(未晋级为-1)
    fmid: number; // 主播所在家族id
    fmtype: number; // 家族类型 1:实力 3:成长(未晋级为 0) (冲刺赛期间 1:王者 2:钻石 3:成长)
    fmname: ''; // 主播所在家族名字
    pkfmid: number; // PK家族id，没有为
    dailyscore: number;
    task1cnt: number;
    lasttask1daytype: number;
}
export interface PendantState {
    scrollLen: number;
    downTimeTxt: string;
    roomActivity: RoomActivity;
    webData: WebData;
}
