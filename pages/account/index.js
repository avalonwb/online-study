import React from 'react'

import style from './index.less'

import Register from '../../components/account/Register'

import Login from '../../components/account/Login'

import { Tabs } from 'antd'

const { TabPane } = Tabs

class Account extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className={style.account}>
        <div className={style.tabs}>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='登录' key='1'>
              <Login />
            </TabPane>
            <TabPane tab='注册' key='2'>
              <Register />
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default Account
