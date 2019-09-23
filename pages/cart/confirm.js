import { connect } from 'react-redux'
import css from './confirm.less'
import Link from 'next/link'
import { Row, Col, Button, Table, message } from 'antd'
import request from '../../utils/request'
import router from 'next/router'

class Confirm extends React.Component {
  // 在当前日期上加上一个月份得到新日期
  AddMouth(num) {
    var d = new Date()
    var y = d.getFullYear()
    var m = d.getMonth() + 1
    var day = d.getDate()
    if (parseInt(day) < 10) {
      day = '0' + day
    }
    var date = y + '-' + m + '-' + day
    //date为格式化后的日期字符yyyy-MM-dd,num为增加的月份
    var mouthnum = parseInt(num)
    var year = parseInt(date.substring(0, 4))
    var mouth = parseInt(date.substring(5, 7))
    var day = parseInt(date.substring(8, 10))
    if (mouth + mouthnum > 12) {
      var newyear = year + 1
      var newmouth = mouth + mouthnum - 12
      var newday = day
    } else {
      var newyear = year
      var newmouth = mouth + mouthnum
      var newday = day
    }
    var newdate =
      newyear +
      '-' +
      (newmouth < 10 ? '0' + newmouth : newmouth) +
      '-' +
      (newday < 10 ? '0' + newday : newday)
    return newdate
  }

  constructor(props) {
    super(props)
    this.state = {
      totalAmount: 0
    }
    this.columns = [
      {
        title: '课程图片',
        dataIndex: 'img_url',
        render: text => <img src={text} width='150' height='80' />
      },
      {
        title: '课程名称',
        dataIndex: 'title'
      },
      {
        title: '课程服务期',
        dataIndex: 'timeout',
        render: text => <span>即日起至{this.AddMouth(text)}</span>
      },
      {
        title: '小计',
        dataIndex: 'sell_price',
        render: text => <span style={{ color: 'red' }}>￥{text}</span>
      }
    ]
  }

  componentWillMount() {
    let amount = 0
    this.props.orderList.forEach(item => {
      amount += item.sell_price
    })
    this.setState({
      totalAmount: amount
    })
  }

  // 下单方法
  setOrder() {
    // 调用下单接口完成下单操作
    let amount = this.state.totalAmount
    let gids = this.props.orderList.map(item => item.goods_id).join(',')

    request
      .post('/ch/shop/postOrder', {
        amount: amount,
        payment_id: 1,
        goodsIds: gids
      })
      .then(res => {
        console.log(res)
        if (res.status == 2) {
          message.warn('用户未登录', 1, () => {
            router.push({ pathname: '/account' })
          })
          return
        }

        if (res.status == 1) {
          message.error(res.message, 1)
          return
        }

        // 下单成功后应该将接口返回的数据保存到redux中
        message.success('下单成功', 1, () => {
          this.props.onSetOrderInfo(res.message)
          // 跳转到支付页面
          router.push({ pathname: '/cart/pay' })
        })
      })
  }
  render() {
    return (
      <div style={{ minHeight: 800 }}>
        <div className={css.shoppingCart}>
          <div className={css.shoppingTitle}>
            <span className={css.cartitle}>订单确认</span>
          </div>
          <div className={css.shoppingTableTitle}>
            <Table columns={this.columns} dataSource={this.props.orderList} />
          </div>
          <div className={css.shoppingTitle}>
            <Row>
              <Col offset='11' span='8'>
                <Link href={{ pathname: '/car/carlist' }}>
                  <a>返回购物车修改</a>
                </Link>
              </Col>
              <Col span='3'>
                合计:{' '}
                <span style={{ color: 'red', fontSize: '20px' }}>
                  ￥{this.state.totalAmount}
                </span>
              </Col>
              <Col span='2'>
                {' '}
                <Button
                  type='primary'
                  size='large'
                  onClick={this.setOrder.bind(this)}>
                  提交订单
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        <style>
          {`
        .ant-pagination.ant-table-pagination{
            display:none;
        }
        `}
        </style>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    orderList: state.cart.orderList
  }
}

let mapDispatchToProps = dispatch => {
  return {
    onSetOrderInfo: orderinfo => {
      dispatch({ type: 'SET_ORDER', payload: orderinfo })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirm)
