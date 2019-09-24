import { connect } from 'react-redux'
import Head from 'next/head'
import { Row, Col, message, Affix, Menu, Icon, Collapse } from 'antd'
const Panel = Collapse.Panel
import Left from './left.js'
import css from './course.less'
import router from 'next/router'
import request from '../../utils/request'
import { fmtDate } from '../../utils/fmtDate'

class Course extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      top: 80,
      currentCourse: null,
      CourseList: null
    }
  }

  // 在生命周期函数中请求数据
  componentWillMount() {
    this.getcourse()
  }

  getcourse() {
    request.get('/ch/mycenter/getMyCourseList').then(res => {
      console.log(res)
      // 未登录处理
      if (res.status == 2) {
        message.warn('您未登录', 1, () => {
          router.push({ pathname: '/account' })
        })
        return
      }

      // 错误处理
      if (res.status == 1) {
        message.error(res.message, 1)
        return
      }

      // 成功
      this.setState({
        currentCourse: res.message.currentCourse,
        CourseList: res.message.CourseList
      })
    })
  }

  render() {
    return (
      <div style={{ minHeight: 800 }}>
        <Head>
          <title>学成在线-个人中心</title>
        </Head>
        {/* 顶部banner */}
        <div className={css.personal_header} />
        {/* 顶部banner */}

        <div className={css.container}>
          {/* 左边菜单 */}
          <Row>
            <Col span='6'>
              <Affix offsetTop={this.state.top}>
                <Left mid='2' />
              </Affix>
            </Col>
            {/* 左边菜单 */}

            {/* 右边内容 */}
            <Col span='18'>
              <div className={css.personal_content + ' ' + css.pull_right}>
                <div className={css.personal_cont}>
                  <div className='top'>
                    <div className={css.tit}>
                      <span>当前课程</span>
                    </div>
                    <div className={css.top_cont}>
                      <div className={css.col_lg_8}>
                        <div className={css.imgIco}>
                          <img
                            src='/static/img/asset-timg.png'
                            width='60'
                            height='28'
                            alt=''
                          />
                        </div>
                        <div className={css.title}>
                          <span className={css.lab}>继续学习</span>{' '}
                          {this.state.currentCourse &&
                            this.state.currentCourse.goods_title}{' '}
                          <span className={css.status}>学习中</span>
                        </div>
                        <div className={css.about}>
                          <span className={css.lab}>正在学习</span>{' '}
                          {this.state.currentCourse &&
                            this.state.currentCourse.last_section_name}{' '}
                        </div>
                        <div className={css.about}>
                          {' '}
                          <span className={css.status}>
                            有效日期:{' '}
                            {this.state.currentCourse &&
                              fmtDate(this.state.currentCourse.begin_time)}{' '}
                            ~{' '}
                            {this.state.currentCourse &&
                              fmtDate(this.state.currentCourse.end_time)}
                          </span>
                        </div>
                      </div>
                      <div className={css.division} />
                      <div className={css.col_lg_4}>
                        <a href='#' className={css.goLear}>
                          {' '}
                          继续学习
                        </a>
                        {/* <a href="#" className={css.evalu}> 课程评价</a> */}
                        <div className={css.aft}>● ● ●</div>
                      </div>
                      <div className={css.clearfix} />
                    </div>

                    <div className={css.tit}>
                      <span>我的课程</span>
                    </div>
                    {this.state.CourseList &&
                      this.state.CourseList.map((item, index) => (
                        <div className={css.top_cont} key={index}>
                          <div className={css.col_lg_8}>
                            <div className={css.imgIco}>
                              <img
                                src='/static/img/asset-timg.png'
                                width='60'
                                height='28'
                                alt=''
                              />
                            </div>
                            <div className={css.title}>
                              <span className={css.lab}>继续学习</span>{' '}
                              {item.goods_title}{' '}
                              <span className={css.status}>学习中</span>
                            </div>
                            <div className={css.about}>
                              <span className={css.lab}>正在学习</span>{' '}
                              {item.last_section_name}{' '}
                            </div>
                            <div className={css.about}>
                              {' '}
                              <span className={css.status}>
                                有效日期: {fmtDate(item.begin_time)} ~{' '}
                                {fmtDate(item.end_time)}
                              </span>
                            </div>
                          </div>
                          <div className={css.division} />
                          <div className={css.col_lg_4}>
                            <a href='#' className={css.goLear}>
                              {' '}
                              继续学习
                            </a>
                            {/* <a href="#" className={css.evalu}> 课程评价</a> */}
                            <div className={css.aft}>● ● ●</div>
                          </div>
                          <div className={css.clearfix} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Col>
            {/* 右边内容 */}
          </Row>
        </div>
      </div>
    )
  }
}

export default Course
