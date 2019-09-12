import { Icon, Badge } from 'antd'
import css from './layout.less'

export default class Header extends React.Component {
  render() {
    // console.log(this.props)
    let { color, changeColor, user, signOut, count } = this.props
    return (
      <header className={css.headtop + ' w'}>
        <a href='' className='fl'>
          <img src='/static/img/asset-logoIco.png' alt='' />
        </a>
        <div className={css.left + ' fl'}>
          <a className={css.a} href=''>
            首页
          </a>
          <a className={css.a} href=''>
            课程
          </a>
          <a className={css.a} href=''>
            职业规划
          </a>
        </div>
        <div className={css.input + ' fl'}>
          <input type='text' className='fl' placeholder='输入查询关键字' />
          <button className='fr'>搜索</button>
        </div>
        <div className={css.right + ' fr'}>
          <div className={css.signin}>
            <Badge count={count}>
              {/* 加入antd中的购物车图标 */}
              <Icon type='shopping-cart' className={css.Icon} />
            </Badge>
            {/* 根据登录状态渲染 */}
            {user.uid ? (
              <span>
                <a href=''>
                  <Icon type='bell' theme='twoTone' />
                  个人中心
                </a>
                <a href=''>
                  <img
                    src='/static/img/asset-myImg.jpg'
                    alt=''
                    width='45'
                    height='45'
                  />
                  {user.uname}
                </a>
                <a
                  href=''
                  onClick={e => {
                    signOut(e)
                  }}>
                  退出{' '}
                </a>
              </span>
            ) : (
              <span>
                <a href=''>登录 </a> <span> |</span> <a href='#'> 注册</a>
              </span>
            )}
          </div>
        </div>
      </header>
    )
  }
}
