// testReducer
import {
  test
} from './test'

// 改变购物车的reducer
import cart from './cart'

// 订单相关的reducer
import order from './order'

// 将具体的reducer编译成统一的rootReducer,并且提供一个初始化store函数，交给 next-redux-wrapper的withRedux 使用
import {
  combineReducers
} from 'redux'

import {
  persistReducer
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

const config = {
  key: 'redux-persist',
  storage
}

// 将多个reducer编译成统一的rootReducer
const rootReducer = combineReducers({
  test, //颜色改变测试reducer，无实际意义
  cart,
  order
})

export default persistReducer(config, rootReducer)