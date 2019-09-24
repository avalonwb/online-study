import { connect } from 'react-redux'
import css from './pay.less'
import QRCode from 'qrcode.react'
import request from '../../utils/request'
import router from 'next/router'
import { message } from 'antd'

let intervalHander = null

class Pay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      payUrl: 'https://www.bilibili.com/'
    }
  }

  getWXPayUrl() {
    let orderid = this.props.orderInfo.order_id
    let orderno = this.props.orderInfo.order_no
    let amount = this.props.orderInfo.amount

    console.log(orderid, orderno, amount)

    request
      .post('/ch/shop/wxpay', {
        order_id: orderid,
        out_trade_no: orderno,
        nonce_str: amount
      })
      .then(res => {
        if (res.status == 1) {
          message.error(res.message, 1)
          return
        }

        // 成功就要将res.message.code_url值赋值给this.state中的payUrl
        this.setState({
          payUrl: res.message.code_url
        })

        // 开启定时器轮询支付状态接口
        intervalHander = setInterval(() => {
          request
            .post('/ch/shop/checkpay', {
              order_id: orderid,
              out_trade_no: orderno,
              nonce_str: amount
            })
            .then(json => {
              if (json.status == 0 && json.message.trade_state == 'SUCCESS') {
                // 提示用户支付完成，并且跳转到我的订单页面
                message.success(json.message.statusTxt, 1, () => {
                  // 清除定时器
                  if (intervalHander) {
                    clearInterval(intervalHander)
                  }
                  // 跳转到个人中心
                  router.push({ pathname: '/center/course' })
                })
              }
            })
        }, 3000)
      })
  }
  componentWillMount() {
    // 调用支付url获取连接接口
    this.getWXPayUrl()
  }

  // 离开页面之前清除定时器
  componentWillUnmount() {
    if (intervalHander) {
      clearInterval(intervalHander)
    }
  }

  render() {
    return (
      <div style={{ minHeight: 800 }}>
        {/* 订单信息 */}
        <div className={css.CashierBodyTop}>
          <div className={css.CashierLeft}>
            <p className={css.cashierTitle}>
              产品名称：
              <span id='bookName'>{this.props.orderInfo.remark}</span>
            </p>
            <p>
              业务订单：<span>{this.props.orderInfo.order_no}</span>
            </p>
          </div>
          <div className={css.CashierRight}>
            <p className={css.org}>
              应付金额：<span>￥{this.props.orderInfo.amount}</span>
            </p>
          </div>
        </div>
        {/* 订单信息 -end */}
        {/* 扫码支付 */}
        <div className={css.CashierBodyTop}>
          <span style={{ fontSize: 20 }}>
            <h4>
              请使用手机微信扫码下面支付二维码完成支付：
              {this.state.payUrl
                ? this.state.payUrl
                : 'https://www.bilibili.com/'}
            </h4>
            <QRCode
              value={
                this.state.payUrl
                  ? this.state.payUrl
                  : 'https://www.bilibili.com/'
              }
              // bgColor='yellowgreen'
            />
          </span>
          <div />
        </div>
        {/* 扫码支付 */}
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    orderInfo: state.order.orderInfo
  }
}

export default connect(
  mapStateToProps,
  null
)(Pay)
