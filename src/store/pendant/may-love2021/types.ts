// 进房信息
export interface WebData {
    rank: number;
    cnt: number;
    diff: number;
    hrank: number;
    hcnt: number;
    hdiff: number;
    isbuy: number;
    day: number;
}
export interface RoomActivity {
    l520boxid: number;
    l520starttm: number;
    l520endtm: number;
    l520coin: number;
    l520pcnt: number;
    consume: number;
    fid: number;
    l520coinUser: string;
    l520car: number;
}
export interface PendantState {
    downTimeTxt: string;
    roomActivity: RoomActivity;
    webData: WebData;
}
