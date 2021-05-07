# react-more-page-pro

### 启动(host 环境)

`举例： yarn start -l demo1`

### 启动(mock 环境)

`举例： yarn mock -l demo1`

`浏览器打开方式 http://ip(本地ip):3030/demo1.html 例如:(http://172.17.88.139:3030/demo1.html)`

### 打包

`举例： yarn build -l demo1`

## 打完包上线命令如下

### 上 11 环境

`yarn 11`

### 上 39 环境

`yarn 39`

### 引用 store 注意事项如下

`1.引用store 的话需要手动更改每次活动的sore引用地址 文件地址: src/store/index.ts`

`2.使用 useSelector, useDispatch 去更新store的时候 非dom中引用（父级页面 需要 store.getState().pendantState.roomActivity 去调取获得最新数据；子级需要 useSelector 引用就是最新的数据）`
