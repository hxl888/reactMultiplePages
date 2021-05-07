//
import eventBus from '@/service/event-bus'

const user = {
  id: 426240373,
  nickname: '%E4%B9%8C%E6%BC%86%E5%A2%A8%E9%BB%918074',
  pic: '',
  logo: 'http://imgxc1.kwcdn.kuwo.cn/star/newKoowoLive/93/50/1545721048798_22943993.jpg',
  rid: 683172,
  gender: 0,
  singerlvl: 36,
  singerupleft: 16314149,
  richlvl: 36,
  richupleft: 132124330,
  consume: 867875670,
  coin: '976232924',
  shell: '3126771',
  flowercnt: 10,
  goldflowercnt: 20,
  status: 2,
  singerflag: 8,
  onlinestatus: 1,
  fav: 18,
  fans: 2,
  regtm: 1542250519,
  upay: 0,
  onlinetm: 1706047,
  fid: 102388,
  frole: 0,
  badgetm: 0,
  sex: 1,
  identity: 0,
  car: 0,
  getvipawardstatus: 1
}

const activity = {
  dw20subround: 0, // 是否正在pk中 0 不参与,  1/2/3/4/5  那一轮,  5 展示结果// 一下字段只有正在pk的时候才有
  dw20etm: 0, // 当前轮的结束时间
  dw20teamid: 0, // 所在小组id
  dw20singerscore: 0, // 本轮主播个人贡献
  dw20singerrank: 0 // 本轮主播小组内排名 （从1开始）
}

const infoData = {
  cmd: 'enterroom',
  status: 1,
  statusdesc: '%E6%AD%A3%E7%A1%AE',
  room: {
    ownerid: 417730629,
    roomtype: 0,
    livemethod: 1,
    selectsongprice: 1500,
    particulargifts: 0,
    livestatus: 1,
    id: 683172,
    name: '%E4%B9%8C%E6%BC%86%E5%A2%A8%E9%BB%918074',
    logo: 'http://imgxc1.kwcdn.kuwo.cn/star/newKoowoLive/93/50/1545721048798_22943993.jpg',
    artpic: '',
    poster: '',
    bg: '',
    pubwelcome: '',
    priwelcome: '',
    address: '',
    singerstatus: 2,
    exclusive: 0,
    starttm: 1592461349,
    toptm: 0,
    cleanmess: 0,
    pid: 202,
    locflag: 1,
    singerflag: 8,
    singerattr: 2,
    onlinecnt: 1,
    firstlivetm: 1545721164,
    pk: 0,
    user: user,
    activity: activity
  },
  user: user
}

const userData = {
  secrectname: '%E4%B9%8C%E6%BC%86%E5%A2%A8%E9%BB%918074',
  logintype: '5',
  uid: '426240373',
  sid: '1053664331',
  coin: '976232924',
  roomid: '683172'
}

const myInfoData = {
  cmd: 'getmyinfo',
  status: 1,
  statusdesc: '%E6%AD%A3%E7%A1%AE',
  systm: Math.floor(+new Date() / 1000),
  user: user,
  logintype: '5',
  coin: '976232924'
}

const jxServiceMock = () => {
  setTimeout(() => {
    eventBus.emit('enterInfoNotice', infoData)
    eventBus.emit('getMyInfoNotice', userData)
    eventBus.emit('getUserInfoNotice', myInfoData)
  }, 300)
}
export default jxServiceMock
