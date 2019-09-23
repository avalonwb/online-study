// 改变购物车课程数量
let init = {
  count: 0,
  orderList: []
}

function Cart(state = init, action) {
  const {
    type,
    payload
  } = action
  switch (type) {
    case 'CHANGE_COUNT':
      return {
        ...state,
        count: payload
      }
      case 'ADD_ORDER_LIST':
        return {
          ...state,
          orderList: payload
        }
        case 'SET_ORDER_LIST':
          return {
            ...state,
            orderList: payload
          }
          case 'CHANGE_COUNT':
            return {
              ...state,
              count: payload
            }
            default:
              return state
  }
}

export default Cart