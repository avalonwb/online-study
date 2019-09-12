// 改变购物车课程数量
let init = {
  count: 0
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
      default:
        return state
  }
}

export default Cart