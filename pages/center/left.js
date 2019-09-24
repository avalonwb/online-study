import css from './left.less'
import { Menu, Icon } from 'antd'
import { getUser } from '../../utils/storage'
import Link from 'next/link'

export default class Left extends React.Component {
  render() {
    let user = getUser()
    return (
      <div className={css.personal_nav + ' ' + css.pull_left}>
        <div className={css.nav + ' ' + css.text_left}>
          <div className={css.title}>个人中心</div>
          <div className={css.my_ico}>
            <img src='/static/img/asset-myimg.jpg' alt='' />
            <p>{user.uname}</p>
          </div>
          <div className={css.item}>
            <Menu
              style={{ width: 200 }}
              defaultSelectedKeys={['1']}
              mode='vertical'>
              <Menu.Item key='1'>
                <Link href={{ pathname: '/center/course' }}>
                  <span>
                    <Icon type='mail' />
                    我的课程
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key='2'>
                <Link href={{ pathname: '/center/order' }}>
                  <span>
                    <Icon type='calendar' />
                    我的订单
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key='3'>
                <Icon type='appstore' />
                退出系统
              </Menu.Item>
            </Menu>
          </div>
        </div>
        <style>{`
                body{
                    background: #f3f5f7;
                }
                
                `}</style>
      </div>
    )
  }
}
