import React, { Component } from 'react'
import css from './index.less'
import request from '../../utils/request'
import router from 'next/router'
import { message, Row, Col, Button, Table } from 'antd'
import { connect } from 'react-redux'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      totalAmount: 0,
      disabled: true
    }
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(
        //   `selectedRowKeys: ${selectedRowKeys}`,
        //   'selectedRows: ',
        //   selectedRows
        // )

        // 计算用户勾选商品总价格,发现selectedRows里面每个数据都有一个sell_price，只要全部相加即可得到总价格
        if (selectedRows.length > 0) {
          let totalAmount = 0
          selectedRows.forEach(item => {
            totalAmount += item.sell_price
          })

          // 存储选中的结算课程到redux 订单确认页面要用
          this.props.addOrder(selectedRows)

          // 修改state中的totalAmount
          this.setState({
            totalAmount: totalAmount,
            disabled: false //表示只要用户有勾选商品，就将结算按钮变为可用
          })
        } else {
          // 清空redux中的购买课程
          this.props.setOrder([])

          this.setState({
            totalAmount: 0,
            disabled: true //将结算按钮变为不可用
          })
        }
      }
    }
    this.columns = [
      {
        title: '课程图片',
        dataIndex: 'img_url',
        render: text => <img src={text} width='180' height='100' />
      },
      {
        title: '课程名称',
        dataIndex: 'title'
      },
      {
        title: '服务周期',
        dataIndex: 'timeout',
        render: text => <span>{text}个月</span>
      },
      {
        title: '销售价格',
        dataIndex: 'sell_price',
        render: text => <span style={{ color: 'red' }}>￥{text}</span>
      },
      {
        title: '操作',
        dataIndex: 'shop_car_id',
        render: (text, data, index) => (
          <a onClick={this.del.bind(this, text)}>删除</a>
        )
      }
    ]
  }

  componentDidMount() {
    this.getCartList()
  }

  getCartList() {
    request.get('/ch/shop/getshopcarlist').then(res => {
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

      // 更新redux中关于购物车课程数量的数据
      this.props.setCount(res.message.length)

      // 将购物车的数据赋值给state.data
      this.setState({
        data: res.message
      })
    })
  }

  del(id) {
    // console.log(id)
    request.get('/ch/shop/deleteshopcar/' + id).then(res => {
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

      // 删除成功
      message.success('删除成功', 1, () => {
        this.getCartList()
      })
    })
  }

  check() {
    router.push({ pathname: '/cart/confirm' })
  }

  render() {
    return (
      <div style={{ minHeight: 800 }}>
        <div className={css.shoppingCart}>
          <div className={css.shoppingTitle}>
            <span className={css.cartitle}>我的购物车</span>
            <span className='numenber'>共</span>
            <span id='shoppingNumber'>{this.state.data.length}</span>个课程
          </div>
          <div className={css.shoppingTableTitle}>
            <Table
              rowKey='shop_car_id'
              rowSelection={this.rowSelection}
              columns={this.columns}
              dataSource={this.state.data}
            />
          </div>
          <div className={css.shoppingTitle}>
            <Row>
              <Col offset='11' span='8'>
                若购买享有满减等优惠，相应金额将在订单结算页面减扣
              </Col>
              <Col span='3'>
                合计:{' '}
                <span style={{ color: 'red', fontSize: '20px' }}>
                  ￥{this.state.totalAmount}
                </span>
              </Col>
              <Col span='2'>
                <Button
                  type='primary'
                  size='large'
                  disabled={this.state.disabled}
                  onClick={this.check.bind(this)}>
                  结算
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

const mapDispatchToProps = dispatch => {
  return {
    addOrder: list => {
      dispatch({
        type: 'ADD_ORDER_LIST',
        payload: list
      })
    },
    setOrder: list => {
      dispatch({
        type: 'SET_ORDER_LIST',
        payload: list
      })
    },
    setCount: count => {
      dispatch({
        type: 'CHANGE_COUNT',
        payload: count
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Cart)
