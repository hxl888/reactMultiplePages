import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as common from './common/reducer';
// TODO:
// import * as pendant from './pendant/demo1/reducer'; // 此处每次活动变更 ----手动改动-----
import * as pendant from './pendant/may-love2021/reducer'; // 此处每次活动变更 ----手动改动-----

const store = createStore(
  combineReducers({ ...common, ...pendant }),
  applyMiddleware(thunk)
);

export default store;