let init = {
  color: '#e93323'
}

export function test(state = init, action) {
  let {
    type,
    payload
  } = action
  switch (type) {
    case 'CHANGE_COLOR':
      return {
        color: payload
      }
      break

    default:
      return state
  }
}