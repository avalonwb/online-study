import Header from '../../layouts/Header'
import {
  getUser
} from '../../utils/storage'
import {
  signOut
} from '../../actions/account/login'

import {
  connect
} from 'react-redux'

import {
  change_color
} from '../../actions/test'

const mapStateToProps = state => {
  const user = getUser()
  return {
    color: state.test.color,
    user,
    count: state.cart.count
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeColor(color) {
      dispatch(change_color(color))
    },
    signOut(e) {
      signOut(e)
    }
  }
}

const reHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default reHeader