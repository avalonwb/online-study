const init = {
  orderInfo: {}
}

function Order(state = init, action) {
  let {
    type,
    payload
  } = action
  switch (type) {
    case 'SET_ORDER':
      return {
        ...state,
        orderInfo: payload
      }
      default:
        return state
  }
}
export default Order