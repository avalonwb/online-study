import Footer from '../../layouts/Footer'

import {
  connect
} from 'react-redux'

import {
  change_color
} from '../../actions/test'

const mapStateToProps = state => {
  return {
    color: state.test.color
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeColor(color) {
      dispatch(change_color(color))
    }
  }
}

const reFooter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)

export default reFooter